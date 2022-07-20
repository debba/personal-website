import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import React from "react";
import {PROJECTS} from "../../data/projects";
import {ProjectProps} from "../../interfaces/props";
import Image from "next/image";
import Head from "next/head";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {useRouter} from "next/router";

export const getStaticProps: GetStaticProps<ProjectProps, { slug: string }> = async (context) => {

    const {slug} = context.params;

    const res = await fetch(`https://api.github.com/repos/debba/${slug}`);

    const project = PROJECTS.find(project => project.github_name === slug);

    return {

        ...!project ? {
            notFound: true
        } : {
            props: {
                githubData: await res.json(),
                ...project?.image && {
                    image: project.image
                },
                name: project.name,
                description: project.description,
                short_description: project.short_description
            },
            revalidate: 60 * 60 * 24
        }
    }
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
        </Head>
        <section id="project" className="py-3 md:py-[100px]">
            <h2 className="mt-[100px] md:mt-0 font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl mb-4 leading-normal break-words tracking-tight">
                {data.name}
            </h2>

            <div className="relative py-16 sm:py-24">
                <div
                    className={`lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid ${data.image ? 'lg:grid-cols-2' : ''} lg:gap-24 lg:items-start`}>
                    {
                        data.image && (
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

                                        <Image loading={"lazy"} className="absolute inset-0 h-full w-full object-cover"
                                               layout={"fill"} src={data.image} alt={shortDescription}/>
                                        <div className="absolute inset-0 white-500 mix-blend-multiply"></div>
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-white-600 via-white-600 opacity-90"></div>

                                    </div>
                                </div>
                                <div className={"relative text-center mt-5"}>
                                    <a href={githubData.html_url} target={"_blank"}
                                       className={`bg-white text-gray-800 hover:bg-slate-500 hover:text-white hover:border hover:border-white font-bold py-2 px-4 rounded inline-flex items-center`}
                                       rel="noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`fill-current w-4 h-4 mr-2`}
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d={"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"}/>
                                        </svg>
                                        <span>
                                Github repo
                            </span>
                                    </a>
                                </div>
                            </div>
                        )
                    }
                    <div
                        className={`relative mx-auto max-w-md px-0 md:px-4 ${data.image ? 'sm:max-w-3xl' : ''} sm:px-6 lg:px-0`}>
                        <div className="pt-12 sm:pt-16 lg:pt-20">
                            <h3 className="text-xl font-bold font-roboto text-center">{shortDescription}</h3>
                            <div className="mt-6  font-roboto font-semibold text-sm space-y-6"
                                 dangerouslySetInnerHTML={{__html: description}}>
                            </div>
                        </div>

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
                    </div>

                </div>
                {
                    !data.image && (
                        <div className={"relative text-center"}>
                            <a href={githubData.html_url} target={"_blank"}
                               className={`bg-white text-gray-800 hover:bg-slate-500 hover:text-white hover:border hover:border-white font-bold py-2 px-4 rounded inline-flex items-center`}
                               rel="noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`fill-current w-4 h-4 mr-2`}
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d={"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"}/>
                                </svg>
                                <span>
                                Github repo
                            </span>
                            </a>
                        </div>
                    )
                }
            </div>

        </section>
    </>
};

export default ProjectNamePage;
