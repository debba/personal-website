import {NextPage} from "next";
import Head from "next/head";
import React from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {PROJECTS} from "../../data/projects";
import Breadcrumb from "../../components/atoms/breadcrumb";
import ProjectTile from "../../components/home/project-tile";
import {PROJECT_DETAILS} from '../../data/project-details';

// Tabularis leads with a 2x2 tile; six wide tiles keep every 4-column row full.
const FEATURED_PROJECT = 'tabularis';
const WIDE_PROJECTS = ['gitdeck', 'melicum', 'discophile', 'tuxcleaner', 'storytel-player', 'github-tray-gnome-extension'];
const SORTED_PROJECTS = [
    ...PROJECTS.filter(project => project.github_name === FEATURED_PROJECT),
    ...PROJECTS.filter(project => project.github_name !== FEATURED_PROJECT),
];

const Projects: NextPage = () => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    return <>
        <Head>
            <title>{t('site_title_osp') as string}</title>
            <meta property="og:description" content={t('site_description_osp') as string}/>
            <meta name="description" content={t('site_description_osp') as string}/>
            <meta property="og:title" content={t('site_title_osp') as string}/>
            {
                process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITEURL && (
                    <meta property="og:image" content={process.env.NEXT_PUBLIC_SITEURL + '/images/andrea-debernardi.jpg'}/>
                )
            }
        </Head>
        <section aria-labelledby="projects-title" className="py-6 md:py-10">
            <Breadcrumb items={[{label: t('projects_title') as string}]}/>
            <div className="tile mt-6 p-7 md:p-9">
                <h1 id="projects-title" className="page-title">
                    {t('projects_title') as string}
                </h1>
                <p className="page-desc">{t('projects_desc') as string}</p>
            </div>
            <ul role="list" className="bento mt-4">
                {SORTED_PROJECTS.map(project => {
                    const featured = project.github_name === FEATURED_PROJECT;
                    const span = featured ? 'sm:col-span-2 lg:row-span-2' : WIDE_PROJECTS.includes(project.github_name) ? 'sm:col-span-2' : '';
                    return (
                        <li key={project.github_name} className={`flex ${span}`}>
                            <ProjectTile project={project} className="w-full" showIcon featured={featured} detailed
                                         website={PROJECT_DETAILS[project.github_name]?.website}
                                         documentation={PROJECT_DETAILS[project.github_name]?.websiteKind === 'documentation'}
                                         technologies={PROJECT_DETAILS[project.github_name]?.technologies.slice(0, 3)}/>
                        </li>
                    );
                })}
            </ul>
        </section>
    </>;
}

export default Projects;
