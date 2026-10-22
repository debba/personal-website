import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {collectProjects, generateActivity, parsePrivateRepositories, loadLocalActivity, updateActivity} from '../scripts/update-github-activity.mjs';
import {isActivityFeed} from '../src/lib/github-activity.ts';

const now = new Date('2026-10-19T12:00:00Z');
const at = '2026-10-19T10:00:00Z';
const event = (repository, extra = {}) => ({
    type: 'PushEvent', public: true, actor: {login: 'debba'}, repo: {name: repository},
    created_at: at, payload: {head: 'a'.repeat(40)}, ...extra,
});
const commit = (message, author = 'debba') => ({author: {login: author}, commit: {message}});
const json = data => new Response(JSON.stringify(data), {status: 200});
const toolResponse = projects => json({stop_reason: 'tool_use', content: [{type: 'tool_use', name: 'publish_summaries', input: {projects}}]});
const summaries = [{repository: 'debba/example', name: 'Example', icon: 'code', it: 'Migliorata la ricerca.', en: 'Improved search.'}];

function mockGithub(events, commits = [commit('Improve search')]) {
    return async url => {
        if (url.includes('/events/public?')) return json(events);
        if (url.includes('/commits?')) return json(commits);
        if (url.endsWith('/readme')) return json({encoding:'base64',content:Buffer.from('# Example\n\nA useful software project.').toString('base64')});
        if (new URL(url).pathname.startsWith('/repos/')) return json({private: false, description: 'A software project.', topics: ['software']});
        throw new Error(`Unexpected URL ${url}`);
    };
}

test('only public work by the account is included, across repository owners', async () => {
    const projects = await collectProjects({now, fetcher: mockGithub([
        event('debba/private', {public: false}),
        event('debba/starred', {type: 'WatchEvent'}),
        event('debba/old', {created_at: '2026-01-01T00:00:00Z'}),
        event('debba/foreign', {actor: {login: 'someone-else'}}),
        event('organization/example'),
    ], [commit('Search improvements\nDo not expose this body'), commit('Other work', 'someone-else'), commit('Merge branch main')])});
    assert.equal(projects.length, 1);
    assert.equal(projects[0].repository, 'organization/example');
    assert.deepEqual(projects[0].signals, [{kind: 'commit', title: 'Search improvements', at}]);
});

test('allowed private repositories are read per repository and unreadable ones are skipped', async () => {
    const github = mockGithub([event('debba/public', {id: '1'}), event('debba/hidden', {id: '2', public: false})]);
    const projects = await collectProjects({now, privateRepositories: parsePrivateRepositories(' Debba/Allowed, invalid , debba/unreadable'), fetcher: async url => {
        if (url.includes('/repos/debba/allowed/events?')) return json([event('debba/allowed', {id: '3', public: false})]);
        if (url.includes('/repos/debba/unreadable/events?')) return new Response('{}', {status: 404});
        if (url.endsWith('/repos/debba/allowed')) return json({private: true, description: 'A music player.'});
        return github(url);
    }});
    assert.deepEqual(projects.map(project => project.repository).sort(), ['debba/allowed', 'debba/public']);
    assert.deepEqual([...parsePrivateRepositories(' Debba/Allowed, invalid ,,debba/x')], ['debba/allowed', 'debba/x']);
});

test('a short page does not stop pagination, since GitHub filters events after paginating', async () => {
    const github = mockGithub([]);
    const pages = [[event('debba/first')], [event('debba/second')], []];
    const projects = await collectProjects({now, fetcher: async url => {
        const page = new URL(url).searchParams.get('page');
        return url.includes('/events/public?') ? json(pages[Number(page) - 1]) : github(url);
    }});
    assert.deepEqual(projects.map(project => project.repository).sort(), ['debba/first', 'debba/second']);
});

test('current PushEvent payloads are enriched via the commits endpoint with author and branch filters', async () => {
    const urls = [];
    const fetcher = mockGithub([event('debba/example')]);
    await collectProjects({now, fetcher: async url => {urls.push(url); return fetcher(url);}});
    const url = new URL(urls.find(url => url.includes('/commits?')));
    assert.equal(url.searchParams.get('author'), 'debba');
    assert.equal(url.searchParams.get('sha'), 'a'.repeat(40));
    assert.equal(url.searchParams.get('since'), '2026-09-19T12:00:00.000Z');
});

test('open pull requests retain their proposed status and only authored PRs are considered', async () => {
    const pr = user => ({action: 'opened', pull_request: {user: {login: user}, title: 'Add export', merged: false}});
    const projects = await collectProjects({now, fetcher: mockGithub([
        event('organization/project', {type: 'PullRequestEvent', payload: pr('debba')}),
        event('debba/reviewed', {type: 'PullRequestEvent', payload: pr('another-user')}),
    ])});
    assert.equal(projects.length, 1);
    assert.equal(projects[0].signals[0].kind, 'opened pull request');
});

test('icon context includes public project descriptions and excludes repositories that became private', async () => {
    const github = mockGithub([event('debba/audio'), event('debba/now-private')]);
    const fetcher = url => {
        if (url.endsWith('/repos/debba/audio')) return json({private:false, description:'A desktop audio mixer.', topics:['audio','macos']});
        if (url.endsWith('/repos/debba/now-private')) return json({private:true, description:'Private description'});
        return github(url);
    };
    const projects = await collectProjects({now,fetcher});
    assert.equal(projects.length,1);
    assert.equal(projects[0].description,'A desktop audio mixer.');
    assert.deepEqual(projects[0].topics,['audio','macos']);
    assert.match(projects[0].readmeIntro, /^# Example/);
});

test('a missing README preserves the project and a long README is bounded', async () => {
    const github = mockGithub([event('debba/missing'), event('debba/long')]);
    const fetcher = url => {
        if (url.endsWith('/repos/debba/missing/readme')) return new Response('', {status:404});
        if (url.endsWith('/repos/debba/long/readme')) return json({encoding:'base64',content:Buffer.from('# Human Project Name\n'+ 'x'.repeat(10_000)).toString('base64')});
        return github(url);
    };
    const projects = await collectProjects({now,fetcher});
    assert.equal(projects.find(p=>p.repository==='debba/missing').readmeIntro, '');
    const readme = projects.find(p=>p.repository==='debba/long').readmeIntro;
    assert.match(readme, /^# Human Project Name/);
    assert.equal(readme.length,4000);
});

test('returns at most three projects in latest-work order', async () => {
    const projects = await collectProjects({now, fetcher: mockGithub([1, 2, 3, 4].map(day =>
        event(`debba/repo${day}`, {created_at: `2026-10-1${day}T10:00:00Z`})
    ))});
    assert.deepEqual(projects.map(project => project.repository), ['debba/repo4', 'debba/repo3', 'debba/repo2']);
});

test('schema rejects invalid links, duplicate repositories, dates and missing translations', () => {
    const feed = {version: 1, updatedAt: at, projects: [{repository: 'debba/example', updatedAt: at, summary: {it: 'Ricerca.', en: 'Search.'}}]};
    assert.equal(isActivityFeed(feed), true);
    for (const patch of [{icon: 'https://untrusted.example/icon.svg'}, {icon: '<svg/>'}, {repository: 'javascript:alert(1)'}, {updatedAt: 'invalid'}, {summary: {it: 'Ricerca.'}}, {summary: {it: 'x'.repeat(221), en: 'Search.'}}]) {
        assert.equal(isActivityFeed({...feed, projects: [{...feed.projects[0], ...patch}]}), false);
    }
    assert.equal(isActivityFeed({...feed, projects: [feed.projects[0], feed.projects[0]]}), false);
});

test('unchanged activity skips Claude and updates the check timestamp', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'github-activity-'));
    try {
        let calls = 0;
        const github = mockGithub([event('debba/example')]);
        const fetcher = async (url, options) => {
            if (!url.startsWith('https://api.anthropic.com')) return github(url);
            calls++;
            assert.equal(options.headers['x-api-key'], 'test-key');
            const payload = JSON.parse(options.body);
            assert.equal(payload.tool_choice.name, 'publish_summaries');
            assert.ok(payload.tools[0].input_schema.properties.projects.items.required.includes('icon'));
            assert.ok(payload.tools[0].input_schema.properties.projects.items.required.includes('name'));
            assert.match(JSON.parse(payload.messages[0].content)[0].readmeIntro, /^# Example/);
            return toolResponse(summaries);
        };
        const output = join(directory, 'activity.json');
        await updateActivity({now, fetcher, output, apiKey: 'test-key'});
        const second = await updateActivity({now: new Date('2026-10-19T18:00:00Z'), fetcher, output, apiKey: 'test-key'});
        assert.equal(calls, 1);
        assert.equal(second.projects[0].icon, 'code');
        assert.equal(second.projects[0].name, 'Example');
        assert.equal(second.updatedAt, '2026-10-19T18:00:00.000Z');
        assert.equal(JSON.parse(await readFile(output, 'utf8')).projects[0].summary.it, summaries[0].it);
    } finally {await rm(directory, {recursive: true, force: true});}
});

test('provider errors, truncated responses and invented repositories preserve the previous snapshot', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'github-activity-'));
    try {
        const output = join(directory, 'activity.json');
        const previous = JSON.stringify({version: 1, updatedAt: at, projects: []});
        const failures = [
            () => new Response('', {status: 429}),
            () => json({stop_reason: 'max_tokens', content: []}),
            () => toolResponse([{...summaries[0], repository: 'debba/invented'}]),
            () => toolResponse([{...summaries[0], it: ''}]),
            () => toolResponse([{...summaries[0], icon: 'invented-icon'}]),
            () => toolResponse([{...summaries[0], icon: undefined}]),
            () => toolResponse([{...summaries[0], name: ''}]),
            () => toolResponse([{...summaries[0], name: undefined}]),
        ];
        for (const failure of failures) {
            await writeFile(output, previous);
            const github = mockGithub([event('debba/example')]);
            const fetcher = url => url.startsWith('https://api.anthropic.com') ? failure() : github(url);
            await assert.rejects(updateActivity({now, output, fetcher, apiKey: 'test-key'}));
            assert.equal(await readFile(output, 'utf8'), previous);
        }
        await assert.rejects(updateActivity({now, output, fetcher: async () => new Response('', {status: 403})}));
        assert.equal(await readFile(output, 'utf8'), previous);
    } finally {await rm(directory, {recursive: true, force: true});}
});

test('no recent public work publishes an empty feed without contacting Claude', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'github-activity-'));
    try {
        const feed = await updateActivity({now, output: join(directory, 'activity.json'), fetcher: mockGithub([])});
        assert.deepEqual(feed.projects, []);
        assert.equal(isActivityFeed(feed), true);
    } finally {await rm(directory, {recursive: true, force: true});}
});

test('server generation needs no filesystem and validates the feed', async () => {
    const github = mockGithub([event('debba/example')]);
    const fetcher = url => url.startsWith('https://api.anthropic.com') ? toolResponse(summaries) : github(url);
    const feed = await generateActivity({now, fetcher, apiKey: 'test-key'});
    assert.equal(isActivityFeed(feed), true);
    assert.equal(feed.projects[0].summary.en, summaries[0].en);
    assert.equal(feed.updatedAt, now.toISOString());
});

test('local development generates once, shares concurrent requests and caches for six hours', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'github-activity-local-'));
    try {
        const output = join(directory, 'nested', 'activity.json');
        let calls = 0;
        const github = mockGithub([event('debba/example')]);
        const fetcher = async url => {
            if (!url.startsWith('https://api.anthropic.com')) return github(url);
            calls++;
            await new Promise(resolve => setTimeout(resolve, 20));
            return toolResponse(summaries);
        };
        const options = {now, output, fetcher, apiKey: 'test-key'};
        const results = await Promise.all([loadLocalActivity(options), loadLocalActivity(options)]);
        assert.equal(calls, 1);
        assert.deepEqual(results[0], results[1]);
        const cached = await loadLocalActivity({...options, now: new Date('2026-10-19T17:59:00Z'), fetcher: () => {throw new Error('Cache should be reused');}});
        assert.deepEqual(cached, results[0]);
        const refreshed = await loadLocalActivity({...options, now: new Date('2026-10-19T18:01:00Z')});
        assert.equal(refreshed.updatedAt, '2026-10-19T18:01:00.000Z');
        assert.equal(calls, 1, 'unchanged input does not spend another AI call');
    } finally {await rm(directory, {recursive: true, force: true});}
});

test('failed local refresh preserves stale content and throttles retries', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'github-activity-local-'));
    try {
        const output = join(directory, 'activity.json');
        const previous = {version: 1, updatedAt: '2026-10-18T12:00:00Z', projects: []};
        await writeFile(output, JSON.stringify(previous));
        let requests = 0;
        const fetcher = async () => {requests++; return new Response('', {status: 403});};
        const options = {now, output, apiKey:'test-key', fetcher};
        assert.deepEqual(await loadLocalActivity(options), previous);
        assert.deepEqual(await loadLocalActivity(options), previous);
        assert.equal(requests, 1);
        assert.deepEqual(JSON.parse(await readFile(output,'utf8')), previous);
    } finally {await rm(directory, {recursive: true, force: true});}
});
