import type {NextApiRequest, NextApiResponse} from 'next';
import {getActivity} from '../../lib/github-activity.server';

export const config = {maxDuration: 60};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end();
    }
    try {
        const feed = await getActivity();
        const lifetime = feed.summarySource === 'github' ? 300 : 21600;
        // A warm instance may have generated this feed before the edge-cache miss.
        // Do not grant an old snapshot another full cache lifetime.
        const age = feed.updatedAt ? Math.max(0, Math.floor((Date.now() - Date.parse(feed.updatedAt)) / 1000)) : lifetime;
        const ttl = Math.max(1, lifetime - age);
        // Both languages use this same bilingual resource, independently of home-page ISR.
        res.setHeader('Cache-Control', `public, max-age=0, s-maxage=${ttl}, stale-while-revalidate=60, stale-if-error=300`);
        return res.status(200).json(feed);
    } catch (error) {
        console.error('GitHub activity refresh failed:', error instanceof Error ? error.message : 'Unknown error');
        res.setHeader('Cache-Control', 'no-store');
        return res.status(503).json({error: 'Activity temporarily unavailable'});
    }
}
