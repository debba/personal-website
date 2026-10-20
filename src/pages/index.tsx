import type {GetStaticProps, NextPage} from 'next'
import Head from "next/head";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../i18n/dictionary";
import {DOCK_PROJECTS, HOME_PROJECTS, PROJECTS} from "../data/projects";
import GithubActivityTile from "../components/home/github-activity-tile";
import {ActivityFeed, EMPTY_ACTIVITY} from "../lib/github-activity";
import {getActivity} from "../lib/github-activity.server";
import DockTile from "../components/home/dock-tile";
import ProfileTile from "../components/home/profile-tile";
import ProjectTile from "../components/home/project-tile";
import LocationTile from "../components/home/location-tile";
import AboutTile from "../components/home/about-tile";
import ContactTile from "../components/home/contact-tile";
import AllProjectsTile from "../components/home/all-projects-tile";

// Sections that used to live on the home page. Anchors never reach the server,
// so old links like /#contacts are redirected here instead of in next.config.js.
const LEGACY_ANCHORS: Record<string, string> = {
    about: '/about',
    services: '/about#services',
    activities: '/about#activities',
    portfolio: '/about#portfolio',
    contacts: '/contacts',
};

const project = (slug: string) => PROJECTS.find(item => item.github_name === slug)!;

export const getStaticProps: GetStaticProps<{activity: ActivityFeed}> = async ({revalidateReason}) => {
    try {
        const activity = await getActivity();
        // Regenerated in the background at most every six hours, only when the page is visited.
        return {props: {activity}, revalidate: 6 * 60 * 60};
    } catch (error) {
        // ISR retains the last successful page if a refresh fails.
        if (revalidateReason !== 'build') throw error;
        console.warn(`GitHub activity unavailable at build time (${(error as Error).message}); showing the profile link.`);
        return {props: {activity: EMPTY_ACTIVITY}, revalidate: 300};
    }
};

const Home: NextPage<{activity: ActivityFeed}> = ({activity}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const [tabularis, gitdeck, melicum, tuxcleaner, freeMyArch, storytel, rewindtty] = HOME_PROJECTS.map(project);
    const dockProjects = DOCK_PROJECTS.map(project);
    const router = useRouter();

    useEffect(() => {
        const target = LEGACY_ANCHORS[window.location.hash.slice(1)];
        if (target) router.replace(target);
    }, [router]);

    return (
        <>
            <Head>
                <title>{t('site_title') as string}</title>
                <meta property="og:title" content={t('site_title') as string} />
                {
                    process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITEURL  && (
                        <meta property="og:image" content={process.env.NEXT_PUBLIC_SITEURL+'/images/andrea-debernardi.jpg'}/>
                    )
                }
                <meta property="og:description" content={t('site_description') as string} />
                <meta name="description" content={t('site_description') as string} />
            </Head>

            <p aria-hidden="true" className="mb-3 hidden items-center justify-end gap-1.5 text-sm text-muted md:flex">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2l16 9.5-7 1.5-3.5 7z"/></svg>
                {t('look_around') as string}
            </p>

            {/* Spans are tuned so every row is full at the 4-column breakpoint. */}
            <div className="bento pt-4 pb-6 md:pt-0 md:pb-10">
                <GithubActivityTile activity={activity} className="sm:col-span-2 lg:row-span-2"/>
                <DockTile projects={dockProjects} className="sm:col-span-2"/>
                <ProjectTile project={tabularis} showIcon/>
                <ProfileTile/>
                <ProjectTile project={gitdeck} className="sm:col-span-2" showIcon/>
                <LocationTile/>
                <ProjectTile project={melicum} showIcon/>
                <ProjectTile project={tuxcleaner} showIcon/>
                <ProjectTile project={freeMyArch} showIcon/>
                <ProjectTile project={storytel} showIcon/>
                <ProjectTile project={rewindtty} showIcon/>
                <AboutTile className="sm:col-span-2"/>
                <ContactTile/>
                <AllProjectsTile projects={PROJECTS}/>
            </div>
        </>
    )
}

export default Home;
