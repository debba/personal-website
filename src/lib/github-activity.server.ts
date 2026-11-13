import {ActivityFeed, EMPTY_ACTIVITY, isActivityFeed} from './github-activity';
import {generateActivity, loadLocalActivity} from '../../scripts/update-github-activity.mjs';
import {createActivityCache} from '../../scripts/activity-cache.mjs';
import {githubToken} from './github-token.server';

const load = createActivityCache(async options => {
    const feed: unknown = await generateActivity({...options, fallbackSummaries: true});
    if (!isActivityFeed(feed)) throw new Error('Invalid activity feed');
    return feed;
});

// Shared by ISR and the independent public feed endpoint. Keys stay on the server.
export async function getActivity(): Promise<ActivityFeed> {
    if (process.env.NODE_ENV === 'development') {
        const local: unknown = await loadLocalActivity({token: githubToken()});
        return isActivityFeed(local) ? local : EMPTY_ACTIVITY;
    }
    return load();
}
