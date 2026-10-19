import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import React from "react";
import {PROJECTS} from "../../data/projects";
import {ProjectProps} from "../../interfaces/props";
import Image from "next/image";
import Head from "next/head";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {useRouter} from "next/router";
import ProjectLinks from "../../components/sections/_projects/links";
import {Counter} from "../../components/atoms/counter";
import Breadcrumb from "../../components/atoms/breadcrumb";
import ProjectCover from "../../components/atoms/project-cover";
import {localize} from "../../helpers/localize";
import {PROJECT_DETAILS} from '../../data/project-details';
import ProjectGallery from '../../components/sections/_projects/gallery';

// An optional token avoids the low unauthenticated GitHub rate limit during builds.
const githubHeaders = (): HeadersInit => process.env.GITHUB_TOKEN ? {Authorization: `Bearer ${process.env.GITHUB_TOKEN}`} : {};

// Sums the download counts of every release asset, following pagination.
const fetchReleaseDownloads = async (repoUrl: string): Promise<number> => {
    let total = 0;
    for (let page = 1; page <= 10; page++) {
        const res = await fetch(`${repoUrl}/releases?per_page=100&page=${page}`, {headers: githubHeaders()});
        if (!res.ok) break;
        const releases: { assets: { download_count: number }[] }[] = await res.json();
        total += releases.reduce((sum, release) => sum + release.assets.reduce((acc, asset) => acc + asset.download_count, 0), 0);
        if (releases.length < 100) break;
    }
    return total;
}

export const getStaticProps: GetStaticProps<ProjectProps, { slug: string }> = async (context) => {
    const {slug} = context.params;
    const project = PROJECTS.find(project => project.github_name === slug);
    if (!project) {
        return {
            notFound: true
        }
    }

    const repoUrl = `https://api.github.com/repos/${project.github_user}/${slug}`;
    const res = await fetch(repoUrl, {headers: githubHeaders()});
    const repository = res.ok ? await res.json() : {};

    return {
        props: {
            githubData: {
                ...repository,
                html_url: repository.html_url || `https://github.com/${project.github_user}/${slug}`,
                homepage: PROJECT_DETAILS[slug]?.website || repository.homepage || '',
            },
            downloads: await fetchReleaseDownloads(repoUrl),
            ...(project?.image && {
                image: project.image
            }),
            name: project.name,
            description: project.description,
            hide_stats: project?.hide_stats || false,
            short_description: project.short_description,
            ...(PROJECT_DETAILS[slug] ? {details: PROJECT_DETAILS[slug]} : {})
        },
        revalidate: 60 * 60 * 24
    };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async ({locales}) => {
    return {
        paths: PROJECTS
            .flatMap(
                project => locales.map(
                    locale => ({
                        params: {
                            slug: project.github_name,
                        },
                        locale
                    })
                )
            ),
        fallback: false,
    }
}

const ProjectNamePage: NextPage<ProjectProps> = ({githubData, downloads, details, ...data}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter()
    const g11nLocale = getLocale(router);
    const description = localize(data.description, g11nLocale);
    const shortDescription = localize(data.short_description, g11nLocale);
    const pageTitle = `${data.name} | Andrea Debernardi`;

    const stats = [
        {label: t('project_stars') as string, value: githubData.stargazers_count, href: `${githubData.html_url}/stargazers`},
        {label: t('project_forks') as string, value: githubData.forks_count, href: `${githubData.html_url}/forks`},
        {label: t('project_issues') as string, value: githubData.open_issues_count, href: `${githubData.html_url}/issues`},
        // Only projects that publish release binaries have downloads to show.
        ...(downloads > 0 ? [{label: t('project_downloads') as string, value: downloads, href: `${githubData.html_url}/releases`}] : []),
    ];

    return <>
        <Head>
            <title>{pageTitle}</title>
            <meta property="og:title" content={pageTitle}/>
            <meta name="description" content={shortDescription}/>
            <meta property="og:description" content={shortDescription}/>
            {
                process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITEURL && data.image?.cover && (
                    <meta property="og:image" content={process.env.NEXT_PUBLIC_SITEURL + (data.image.still || data.image.cover)}/>
                )
            }
        </Head>
        <article aria-labelledby="project-title" className="py-6 md:py-10">
            <Breadcrumb items={[{label: t('projects_title') as string, href: '/projects'}, {label: data.name}]}/>

            <header className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center">
                {data.image?.icon && (
                    <Image src={data.image.icon} width={80} height={80} alt=""
                           className="h-20 w-20 shrink-0 rounded-2xl shadow-sm"/>
                )}
                <div className="flex-1">
                    <h1 id="project-title" className="page-title">
                        {data.name}
                    </h1>
                    <p className="page-desc max-w-3xl">{shortDescription}</p>
                </div>
            </header>

            <div className="mt-8">
                <ProjectLinks githubData={githubData} projectName={data.name} documentation={details?.websiteKind === 'documentation'}/>
            </div>

            {details && <dl className="mt-8 grid gap-4 md:grid-cols-[1fr_2fr]">
                <div className="tile p-6">
                    <dt className="tile-label">{t('project_platform') as string}</dt>
                    <dd className="mt-2 text-base font-medium text-fg">{localize(details.platform, g11nLocale)}</dd>
                </div>
                <div className="tile p-6">
                    <dt className="tile-label">{t('project_technologies') as string}</dt>
                    <dd className="mt-3 flex flex-wrap gap-2">{details.technologies.map(technology => <span key={technology} className="chip">{technology}</span>)}</dd>
                </div>
            </dl>}

            <div className={`mt-12 grid gap-10 ${data.image?.cover ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''} lg:items-start`}>
                {data.image?.cover && (
                    <div className="tile relative aspect-video lg:sticky lg:top-24">
                        <ProjectCover image={data.image} alt={shortDescription} forceStill
                                      sizes="(min-width: 1024px) 55vw, 100vw"
                                      className="h-full w-full object-contain p-4"/>
                    </div>
                )}
                <div className="tile prose-project space-y-4 p-7 text-base md:p-9"
                     dangerouslySetInnerHTML={{__html: description}}/>
            </div>

            {details && <section aria-labelledby="project-features" className="tile mt-8 p-7 md:p-9">
                <h2 id="project-features" className="section-title">{t('project_in_practice') as string}</h2>
                <p className="mt-3 max-w-4xl text-lg leading-relaxed text-muted">{localize(details.useCase, g11nLocale)}</p>
                <ul role="list" className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">
                    {details.features[g11nLocale === 'it' ? 'it' : 'en'].map(feature => <li key={feature} className="flex gap-3 text-base leading-relaxed text-fg">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"/>
                        <span>{feature}</span>
                    </li>)}
                </ul>
            </section>}

            {details?.media && <ProjectGallery media={details.media}/>}

            {
                !data.hide_stats && (
                    <section aria-labelledby="project-stats" className="mt-14">
                        <h2 id="project-stats" className="sr-only">{t('project_stats_label') as string}</h2>
                        <dl className={`grid gap-4 sm:grid-cols-2 ${stats.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                            {stats.map(stat => (
                                <div key={stat.label} className="tile flex flex-col-reverse p-6 text-center">
                                    <dt className="tile-label mt-2">{stat.label}</dt>
                                    <dd className="font-sans text-4xl font-bold text-fg">
                                        <a href={stat.href} target="_blank" rel="noopener noreferrer" className="rounded hover:text-accent">
                                            <Counter end={stat.value ?? 0} duration={2} locale={g11nLocale}/>
                                            <span className="sr-only"> {t('opens_new_tab') as string}</span>
                                        </a>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )
            }
        </article>
    </>;
};

export default ProjectNamePage;
