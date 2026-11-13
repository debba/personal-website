import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createActivityCache} from '../scripts/activity-cache.mjs';

const start = Date.parse('2026-11-13T10:00:00Z');

test('locales and concurrent visitors share generation; six hours triggers a fresh read', async () => {
    let now = start;
    let calls = 0;
    const load = createActivityCache(async ({previous, now}) => {
        calls++;
        assert.equal(!!previous, calls > 1);
        return {updatedAt: now.toISOString(), projects: []};
    }, {clock: () => now});
    const [it, en] = await Promise.all([load(), load()]);
    assert.equal(it, en);
    assert.equal(calls, 1);
    now += 6 * 60 * 60_000 - 1;
    assert.equal(await load(), it);
    now++;
    assert.notEqual(await load(), it);
    assert.equal(calls, 2);
});

test('a failed refresh is not stamped fresh, retries are bounded, and recovery works', async () => {
    let now = start;
    let calls = 0;
    const load = createActivityCache(async ({now}) => {
        calls++;
        if (calls === 2) throw new Error('GitHub unavailable');
        return {updatedAt: now.toISOString(), projects: []};
    }, {clock: () => now});
    const initial = await load();
    now += 6 * 60 * 60_000;
    await assert.rejects(load(), /GitHub unavailable/);
    await assert.rejects(load(), /GitHub unavailable/);
    assert.equal(calls, 2);
    now += 60_000;
    assert.notEqual(await load(), initial);
    assert.equal(calls, 3);
});

test('GitHub-only summaries retry AI after five minutes, not six hours', async () => {
    let now = start;
    let calls = 0;
    const load = createActivityCache(async ({now}) => {
        calls++;
        return {updatedAt: now.toISOString(), summarySource: calls === 1 ? 'github' : 'claude', projects: []};
    }, {clock: () => now});
    await load();
    now += 5 * 60_000 - 1;
    await load();
    assert.equal(calls, 1);
    now++;
    assert.equal((await load()).summarySource, 'claude');
    assert.equal(calls, 2);
});
