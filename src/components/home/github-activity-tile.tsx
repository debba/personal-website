import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useG11n} from 'next-g11n';
import {DICTIONARY} from '../../i18n/dictionary';
import type {ActivityFeed} from '../../lib/github-activity';
import ProjectActivityIcon from '../atoms/project-activity-icon';
import {PROJECTS} from '../../data/projects';

const SITE_PROJECTS = new Map(PROJECTS.map(project => [
    `${project.github_user}/${project.github_name}`.toLowerCase(),
    {slug: project.github_name, name: project.name, icon: project.image?.icon},
]));

export default function GithubActivityTile({activity, className = ''}: {activity: ActivityFeed; className?: string}) {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const {locale} = useRouter();
    const language = locale === 'it' ? 'it' : 'en';
    const formatDate = (date: string) => new Intl.DateTimeFormat(language, {
        day: 'numeric', month: 'short', timeZone: 'UTC',
    }).format(new Date(date));

    return (
        <section aria-labelledby="github-activity-title" className={`tile flex flex-col p-7 md:p-9 ${className}`}>
            <p className="tile-label mb-3 text-muted">{t('recent_activity_label') as string}</p>
            <h1 id="github-activity-title" className="text-2xl font-bold tracking-tight text-fg md:text-3xl">
                {t('recent_activity_title') as string}
            </h1>
            <hr className="my-6 border-line"/>
            {activity.projects.length > 0 ? (
                <ul role="list" className="flex-1 space-y-6">
                    {activity.projects.map(project => {
                        const siteProject = SITE_PROJECTS.get(project.repository.toLowerCase());
                        const name = siteProject?.name || project.name || project.repository.split('/')[1].replace(/[-_]+/g, ' ');
                        const githubUrl = `https://github.com/${project.repository}`;
                        const titleClass = 'flex items-center gap-3 underline-offset-4 hover:text-accent hover:underline';
                        const titleContent = <>
                            {siteProject?.icon ? (
                                <Image src={siteProject.icon} alt="" width={36} height={36}
                                       className="h-9 w-9 shrink-0 rounded-xl object-contain"/>
                            ) : <ProjectActivityIcon icon={project.icon}/>}
                            <span className="min-w-0 break-words">
                                {name}
                                {!siteProject && <span aria-hidden="true" className="ml-2 text-sm text-muted">↗</span>}
                            </span>
                        </>;
                        return (
                        <li key={project.repository}>
                            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                                <h2 className="min-w-0 text-xl font-semibold tracking-tight text-fg">
                                    {siteProject ? (
                                        <Link href={`/projects/${siteProject.slug}`} locale={locale} className={titleClass}>{titleContent}</Link>
                                    ) : <a href={githubUrl} className={titleClass}>{titleContent}</a>}
                                </h2>
                                <div className="flex shrink-0 items-center gap-3 text-sm text-muted">
                                    {siteProject && <a href={githubUrl} aria-label={`${t('github_repo') as string}: ${name}`}
                                                      className="inline-flex min-h-6 items-center gap-1 underline-offset-4 hover:text-fg hover:underline">
                                        GitHub <span aria-hidden="true">↗</span>
                                    </a>}
                                    <time dateTime={project.updatedAt}>{formatDate(project.updatedAt)}</time>
                                </div>
                            </div>
                            <p className="mt-2 break-words text-base leading-relaxed text-muted">{project.summary[language]}</p>
                        </li>
                        );
                    })}
                </ul>
            ) : <p className="flex-1 text-lg leading-relaxed text-muted">{t('recent_activity_empty') as string}</p>}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
                <a href="https://github.com/debba" className="inline-flex min-h-6 items-center underline underline-offset-4 hover:text-fg">
                    {t('recent_activity_github') as string}
                </a>
                {activity.updatedAt && <p>{t('recent_activity_updated') as string}{' '}<time dateTime={activity.updatedAt}>{formatDate(activity.updatedAt)}</time></p>}
            </div>
        </section>
    );
}
