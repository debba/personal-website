import {ActivityFeed, EMPTY_ACTIVITY, isActivityFeed} from './github-activity';
import {generateActivity, loadLocalActivity} from '../../scripts/update-github-activity.mjs';
import {githubToken} from './github-token.server';

// Each locale page regenerates separately. Within one warm instance, share a single
// generation between them so both languages show the same summaries.
const SHARE_WINDOW = 60 * 60 * 1000;
let shared: {at: number; feed: Promise<ActivityFeed>} | null = null;

async function generate(): Promise<ActivityFeed> {
    const feed: unknown = await generateActivity();
    if (!isActivityFeed(feed)) throw new Error('Invalid activity feed');
    return feed;
}

// Runs only inside getStaticProps (build and ISR regeneration), never in the browser.
export async function getActivity(): Promise<ActivityFeed> {
    if (process.env.NODE_ENV === 'development') {
        // Without a key or a local snapshot, development shows the empty state instead of failing.
        const local: unknown = await loadLocalActivity({token: githubToken()});
        return isActivityFeed(local) ? local : EMPTY_ACTIVITY;
    }
    if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not configured');
    const now = Date.now();
    if (!shared || now - shared.at > SHARE_WINDOW) {
        const feed = generate();
        shared = {at: now, feed};
        // Do not share a failure: the next regeneration should retry.
        feed.catch(() => { if (shared?.feed === feed) shared = null; });
    }
    return shared.feed;
}
