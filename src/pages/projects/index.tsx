import {NextPage} from "next";
import Head from "next/head";
import React from "react";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {PROJECTS} from "../../data/projects";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";

const Projects: NextPage = () => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);

    const getProjects = () => {
        return PROJECTS
            .map(
                project => ({
                    ...project,
                    short_description: typeof project.short_description === 'string' ? project.short_description : (g11nLocale in project.short_description ? project.short_description[g11nLocale] : ''),
                    description: typeof project.description === 'string' ? project.description : (g11nLocale in project.description ? project.description[g11nLocale] : '')
                })
            );
    }

    return <>
        <Head>
            <title>{t('site_title_osp') as string}</title>
            <meta property="og:description" content={t('site_description_osp') as string}/>
            <meta property="description" content={t('site_description_osp') as string}/>
            <meta property="og:title" content={t('site_title_osp') as string}/>
            {
                process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITEURL && (
                    <meta property="og:image" content={process.env.NEXT_PUBLIC_SITEURL + '/images/me.jpg'}/>
                )
            }
        </Head>
        <section id="project" className="py-3 md:py-[100px] max-lg:landscape:py-3">

            <nav className="flex mt-[100px] md:mt-0 " aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-2 text-secondary-color dark:text-white font-roboto">
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
                            <svg className="flex-shrink-0 h-5 w-5  text-secondary-color dark:text-gray-300" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                            </svg>
                            <Link
                                href={"/projects"}
                                locale={g11nLocale}
                                className="ml-4 text-sm font-medium text-secondary-color dark:text-gray-700">
                                {t('projects_title') as string}
                            </Link>
                        </div>
                    </li>
                </ol>
            </nav>

            <h2 className="mt-[100px] md:mt-0 font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl mb-4 leading-normal break-words tracking-tight">
                {t('projects_title') as string}
            </h2>
            <div className="relative  py-16 sm:py-24 lg:py-32">
                <div className="relative">
                    <div
                        className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
                        {getProjects().map((project) => (
                            <div key={project.github_name}
                                 className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                <div className="flex-1 bg-slate-800  p-6 flex flex-col justify-between">
                                    <div className="flex-1 ">

                                        <Link
                                            href={`/projects/${project.github_name}`}
                                            locale={g11nLocale}
                                            className="block mt-2 md:flex items-center">

                                            {
                                                project.image?.icon && (
                                                    <div className="md:flex-initial md:w-auto mb-1 md:mb-0 text-center center">
                                                        <Image src={project.image?.icon} width={100} height={100}
                                                               alt={project.name} className="mx-auto my-2 rounded-lg "/>
                                                    </div>
                                                )
                                            }
                                            <div className="md:flex-initial md:w-full md:pl-4">
                                                <p className="text-xl font-semibold text-white font-roboto">{project.name}</p>
                                                <p className="mt-3 text-sm md:text-xs font-roboto text-gray-100">{project.short_description}</p>
                                            </div>

                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </>;
}

export default Projects;
