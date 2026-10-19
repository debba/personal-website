export const PROJECT_ICONS = ['code', 'database', 'cloud', 'globe', 'smartphone', 'terminal', 'plug', 'book', 'shield', 'git', 'audio', 'desktop'] as const;
export type ProjectIcon = typeof PROJECT_ICONS[number];
export const isProjectIcon = (value: unknown): value is ProjectIcon =>
    typeof value === 'string' && (PROJECT_ICONS as readonly string[]).includes(value);
export const isProjectName = (value: unknown): value is string =>
    typeof value === 'string' && value.trim().length > 0 && value.length <= 80 && !/[\r\n<>]/.test(value);

export interface RecentProject {
    repository: string;
    updatedAt: string;
    // Optional so previously published snapshots continue to render during rollout.
    icon?: ProjectIcon;
    name?: string;
    summary: {it: string; en: string};
}

export interface ActivityFeed {
    version: 1;
    updatedAt: string | null;
    projects: RecentProject[];
}

export const EMPTY_ACTIVITY: ActivityFeed = {version: 1, updatedAt: null, projects: []};
export const REPOSITORY_PATTERN = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+$/;

const validDate = (value: unknown): value is string =>
    typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value));

export function isActivityFeed(value: unknown): value is ActivityFeed {
    if (!value || typeof value !== 'object') return false;
    const feed = value as ActivityFeed;
    if (feed.version !== 1 || !Array.isArray(feed.projects) || feed.projects.length > 3) return false;
    if (feed.updatedAt !== null && !validDate(feed.updatedAt)) return false;
    if (feed.projects.length && feed.updatedAt === null) return false;
    const repositories = new Set<string>();
    return feed.projects.every(project => {
        if (!project || typeof project.repository !== 'string' || !REPOSITORY_PATTERN.test(project.repository)) return false;
        if (repositories.has(project.repository.toLowerCase()) || !validDate(project.updatedAt)) return false;
        if (project.icon !== undefined && !isProjectIcon(project.icon)) return false;
        if (project.name !== undefined && !isProjectName(project.name)) return false;
        repositories.add(project.repository.toLowerCase());
        return ['it', 'en'].every(locale => {
            const summary = project.summary?.[locale];
            return typeof summary === 'string' && summary.trim().length > 0 && summary.length <= 220;
        });
    });
}
