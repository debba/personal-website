// Contribution calendar for the last year: one array of seven levels (0-4) per week,
// Sunday first, as GitHub draws it. The first and last weeks may be shorter.
export interface ContributionCalendar {
    total: number;
    weeks: number[][];
}

export function isContributionCalendar(value: unknown): value is ContributionCalendar {
    if (!value || typeof value !== 'object') return false;
    const calendar = value as ContributionCalendar;
    return Number.isInteger(calendar.total) && calendar.total >= 0
        && Array.isArray(calendar.weeks) && calendar.weeks.length > 0 && calendar.weeks.length <= 54
        && calendar.weeks.every(week => Array.isArray(week) && week.length >= 1 && week.length <= 7
            && week.every(level => Number.isInteger(level) && level >= 0 && level <= 4));
}
