import type {ProjectIcon} from '../../lib/github-activity';

const PATHS: Record<ProjectIcon, string> = {
    code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18',
    database: 'M20 5c0 1.66-3.58 3-8 3S4 6.66 4 5s3.58-3 8-3 8 1.34 8 3ZM4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3',
    cloud: 'M6 18a4 4 0 0 1-.8-7.92 7 7 0 0 1 13.6 0A4 4 0 0 1 18 18Z',
    globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z',
    smartphone: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM10 5h4m-3 14h2',
    terminal: 'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 4 4 4-4 4m6 0h4',
    plug: 'M9 3v4m6-4v4M6 7h12M7 7v4a5 5 0 0 0 10 0V7m-5 9v5',
    book: 'M12 5C9 3 6 3 3 4v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15',
    shield: 'm12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6',
    git: 'M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8v8m12-8c0 7-12 1-12 8',
    audio: 'm11 4-6 5H2v6h3l6 5V4Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',
    desktop: 'M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm4 18h8m-4-4v4',
};

export default function ProjectActivityIcon({icon = 'code'}: {icon?: ProjectIcon}) {
    return (
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent">
            <svg data-project-icon={icon} className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                <path d={PATHS[icon]}/>
            </svg>
        </span>
    );
}
