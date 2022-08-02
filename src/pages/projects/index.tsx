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
        <section id="project" className="py-3 md:py-[100px]">
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

                                        <Link href={`/projects/${project.github_name}`} locale={g11nLocale}>
                                            <a className="block mt-2 md:flex items-center">
                                                {
                                                    project.image?.icon && (
                                                        <div className="md:flex-initial md:w-auto mb-1 md:mb-0 text-center">
                                                            <Image src={project.image?.icon} width={100} height={100}
                                                                   alt={project.name} className="rounded-lg "/>
                                                        </div>
                                                    )
                                                }
                                                <div className="md:flex-initial md:w-full md:pl-4">
                                                    <p className="text-xl font-semibold text-white font-roboto">{project.name}</p>
                                                    <p className="mt-3 text-sm md:text-xs font-roboto text-gray-100">{project.short_description}</p>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Projects;
