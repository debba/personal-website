import {ContributionCalendar, isContributionCalendar} from './github-contributions';
import {githubToken} from './github-token.server';

const LEVELS: Record<string, number> = {NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4};

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { contributionLevel } }
      }
    }
  }
}`;

// The GraphQL API needs a token, even for public data. A classic token without scopes is enough.
export async function getContributions(): Promise<ContributionCalendar> {
    const token = githubToken();
    if (!token) throw new Error('GITHUB_TOKEN is not configured');
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({query: QUERY, variables: {login: process.env.GITHUB_ACTIVITY_USERNAME || 'debba'}}),
        signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`GitHub GraphQL request failed (${response.status})`);
    const body = await response.json();
    const calendar = body?.data?.user?.contributionsCollection?.contributionCalendar;
    const result = {
        total: calendar?.totalContributions,
        weeks: Array.isArray(calendar?.weeks)
            ? calendar.weeks.map(week => (week.contributionDays || []).map(day => LEVELS[day.contributionLevel] ?? -1))
            : [],
    };
    if (!isContributionCalendar(result)) throw new Error('Invalid contribution calendar');
    return result;
}
