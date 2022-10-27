import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import React from "react";
import {PROJECTS} from "../../data/projects";
import {ProjectProps} from "../../interfaces/props";
import Image from "next/image";
import Head from "next/head";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {useRouter} from "next/router";
import GithubButton from "../../components/atoms/ghbutton";
import Link from "next/link";
import ProjectLinks from "../../components/sections/_projects/links";

export const getStaticProps: GetStaticProps<ProjectProps, { slug: string }> = async (context) => {

    const {slug} = context.params;
    const project = PROJECTS.find(project => project.github_name === slug);

    if (!project) {
        return {
            notFound: true
        }
    }

    const res = await fetch(`https://api.github.com/repos/${project.github_user}/${slug}`);
    return {
        props: {
            githubData: await res.json(),
            ...(project?.image && {
                image: project.image
            }),
            name: project.name,
            description: project.description,
            hide_stats: project?.hide_stats || false,
            short_description: project.short_description
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

const ProjectNamePage: NextPage<ProjectProps> = ({githubData, ...data}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter()
    const g11nLocale = getLocale(router);

    const description = typeof data.description === 'string' ? data.description : (g11nLocale in data.description ? data.description[g11nLocale] : '');
    const shortDescription = typeof data.short_description === 'string' ? data.short_description : (g11nLocale in data.short_description ? data.short_description[g11nLocale] : '');

    return <>
        <Head>
            <title>{t('site_title_osp') as string} - {data.name}</title>
            <meta property="og:title" content={t('site_title_osp') as string + ' - ' + data.name}/>
            <meta property="description" content={shortDescription}/>
            <meta property="og:description" content={shortDescription}/>
            {
                process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITEURL && (
                    <meta property="og:image" content={process.env.NEXT_PUBLIC_SITEURL+data.image}/>
                )
            }
        </Head>
        <section id="project" className="py-3 md:py-[100px]">

            <nav className="flex mt-[100px] md:mt-0 " aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-2 text-white font-roboto">
                    <li>
                        <div>
                            <Link href="/" locale={g11nLocale} className=" hover:text-gray-500">

                                <svg className="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                </svg>
                                <span className="sr-only">Home</span>

                            </Link>
                        </div>
                    </li>

                    <li>
                        <div className="flex items-center">
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                            </svg>
                            <Link
                                href={"/projects"}
                                locale={g11nLocale}
                                className="ml-4 text-sm font-medium text-white hover:text-gray-700">
                            {t('projects_title') as string}
                            </Link>
                        </div>
                    </li>

                    <li>
                        <div className="flex items-center">
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                            </svg>
                            <span className="ml-4 text-sm font-medium text-gray-500"
                               aria-current="page">
                                {data.name}
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>


            <h2 className="mt-5 font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl mb-4 leading-normal break-words tracking-tight">
                {data.name}
            </h2>

            <div className="relative py-16 sm:py-24">
                <div
                    className={`lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid ${data.image?.cover ? 'lg:grid-cols-2' : ''} lg:gap-24 lg:items-start`}>
                    {
                        data.image?.cover && (
                            <div className="relative sm:py-16 lg:py-0">
                                <div aria-hidden="true"
                                     className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
                                    <div className="absolute inset-y-0 right-1/2 w-full rounded-r-3xl lg:right-72"></div>
                                    <svg className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                                         width="404"
                                         height="392" fill="none" viewBox="0 0 404 392">
                                        <defs>
                                            <pattern id="02f20b47-fd69-4224-a62a-4c9de5c763f7" x="0" y="0" width="20"
                                                     height="20"
                                                     patternUnits="userSpaceOnUse">
                                                <rect x="0" y="0" width="4" height="4" className="text-gray-200"
                                                      fill="currentColor"/>
                                            </pattern>
                                        </defs>
                                        <rect width="404" height="392" fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"/>
                                    </svg>
                                </div>
                                <div
                                    className="relative mx-auto max-w-md px-0 md:px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                                    <div className="relative pt-64 pb-10 md:rounded-2xl shadow-xl overflow-hidden">

                                        <Image loading={"lazy"} fill={true} className="absolute inset-0 h-full w-full object-contain" src={data.image.cover} alt={shortDescription}/>
                                        <div className="absolute inset-0 white-500 mix-blend-multiply"></div>
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-white-600 via-white-600 opacity-90"></div>

                                    </div>
                                </div>
                                <div className={"relative text-center mt-5"}>
                                    <ProjectLinks githubData={githubData} />
                                </div>
                            </div>
                        )
                    }
                    <div
                        className={`relative mx-auto max-w-md px-0 md:px-4 ${data.image ? 'sm:max-w-3xl' : ''} sm:px-6 lg:px-0`}>
                        <div className="pt-12 sm:pt-16 lg:pt-20">
                            <h3 className="text-xl font-bold font-roboto text-center">{shortDescription}</h3>
                            <div className="mt-6  font-roboto  text-sm space-y-6"
                                 dangerouslySetInnerHTML={{__html: description}}>
                            </div>
                        </div>

                        {
                            ! data.hide_stats && (
                                <div className="mt-10 pb-12 sm:pb-16">
                                    <div className={`relative  ${data.image ? 'max-w-4xl' : ''}  mx-auto`}>
                                        <dl className="rounded-lg bg-slate-800 shadow-lg sm:grid sm:grid-cols-3">
                                            <div
                                                className="flex flex-col border-b  border-slate-500/30 p-6 text-center sm:border-0 sm:border-r">
                                                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500 font-roboto">STARS</dt>
                                                <dd className="order-1 text-5xl font-extrabold text-gray-300 font-roboto">
                                                    <a href={githubData.stargazers_url} target="_blank"
                                                       rel="noopener noreferrer">
                                                        {githubData.stargazers_count}
                                                    </a>
                                                </dd>
                                            </div>
                                            <div
                                                className="flex flex-col border-t border-b  border-slate-500/30 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                                <dt className="order-2 mt-2 text-lg leading-6 font-medium  text-gray-500 font-roboto">FORKS</dt>
                                                <dd className="order-1 text-5xl font-extrabold text-gray-300 font-roboto">
                                                    <a href={githubData.forks_url} target="_blank"
                                                       rel="noopener noreferrer">
                                                        {githubData.forks_count}
                                                    </a>
                                                </dd>
                                            </div>
                                            <div
                                                className="flex flex-col border-t  border-slate-500/30 p-6 text-center sm:border-0 sm:border-l">
                                                <dt className="order-2 mt-2 text-lg leading-6 font-medium  text-gray-500 font-roboto">OPEN
                                                    ISSUES
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold text-gray-300 font-roboto">
                                                    {githubData.open_issues_count}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            )
                        }

                    </div>

                </div>
                {
                    !data.image && (
                        <ProjectLinks githubData={githubData} />
                    )
                }
            </div>

        </section>
    </>;
};

export default ProjectNamePage;
