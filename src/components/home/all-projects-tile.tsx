import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {ProjectItem} from "../../interfaces/data";
import ArrowCircle from "../atoms/arrow-circle";

export const AllProjectsTile: React.FC<{ projects: ProjectItem[], className?: string }> = ({projects, className = ''}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);

    return (
        <Link href="/projects" locale={g11nLocale} className={`tile group flex flex-col p-6 ${className}`}>
            <span aria-hidden="true" className="flex flex-wrap gap-1.5 text-2xl">
                {projects.filter(project => project.emoji).slice(0, 12).map(project => (
                    <span key={project.github_name}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bg transition group-hover:-translate-y-0.5">
                        {project.emoji}
                    </span>
                ))}
            </span>
            <span className="mt-auto flex items-end justify-between gap-3 pt-6">
                <span>
                    <span aria-hidden="true" className="block text-5xl font-bold tracking-tight text-fg">{projects.length}</span>
                    <span className="text-sm text-muted">{t('all_projects_count', {total: projects.length}) as string}</span>
                </span>
                <ArrowCircle/>
            </span>
            <span className="sr-only">{t('all_projects') as string}</span>
        </Link>
    );
}

export default AllProjectsTile;
