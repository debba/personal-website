import {ActivityFeed, EMPTY_ACTIVITY, isActivityFeed, REPOSITORY_PATTERN} from './github-activity';
import {loadLocalActivity} from '../../scripts/update-github-activity.mjs';

// Only the public snapshot is read by Vercel. AI credentials stay in GitHub Actions.
export async function getPublishedActivity(): Promise<ActivityFeed> {
    if (process.env.NODE_ENV === 'development') {
        const local: unknown = await loadLocalActivity();
        if (isActivityFeed(local)) return local;
    }
    const repository = process.env.GITHUB_ACTIVITY_REPOSITORY || 'debba/personal-website';
    if (!REPOSITORY_PATTERN.test(repository)) throw new Error('Invalid activity repository');
    const response = await fetch(`https://raw.githubusercontent.com/${repository}/github-activity/activity.json`, {
        signal: AbortSignal.timeout(8000),
    });
    // The branch is created by the first successful scheduled/manual workflow run.
    if (response.status === 404) return EMPTY_ACTIVITY;
    if (!response.ok) throw new Error(`Activity snapshot HTTP ${response.status}`);
    const body = await response.text();
    if (body.length > 16_384) throw new Error('Activity snapshot too large');
    const feed: unknown = JSON.parse(body);
    if (!isActivityFeed(feed)) throw new Error('Invalid activity snapshot');
    return feed;
}
