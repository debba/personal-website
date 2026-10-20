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
import type {ContributionCalendar} from "../lib/github-contributions";
import {getContributions} from "../lib/github-contributions.server";
import {PROJECT_DETAILS} from "../data/project-details";
import ContributionsTile from "../components/home/contributions-tile";
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

type HomeProps = {activity: ActivityFeed; contributions: ContributionCalendar | null};

export const getStaticProps: GetStaticProps<HomeProps> = async ({revalidateReason}) => {
    const [activity, contributions] = await Promise.allSettled([getActivity(), getContributions()]);
    const failure = [activity, contributions].find((result): result is PromiseRejectedResult => result.status === 'rejected');
    // ISR retains the last successful page if a refresh fails. Development has no previous
    // page to keep, so it renders the fallbacks instead.
    if (failure && revalidateReason !== 'build' && process.env.NODE_ENV !== 'development') throw failure.reason;
    if (failure) console.warn(`GitHub data unavailable (${(failure.reason as Error).message}); using fallbacks.`);
    return {
        props: {
            activity: activity.status === 'fulfilled' ? activity.value : EMPTY_ACTIVITY,
            contributions: contributions.status === 'fulfilled' ? contributions.value : null,
        },
        // Regenerated in the background at most every six hours, only when the page is visited.
        revalidate: failure ? 300 : 6 * 60 * 60,
    };
};

// Silent demo shown on hover, taken from the project's detail page.
const demoVideo = (slug: string) => PROJECT_DETAILS[slug]?.media?.find(media => media.kind === 'video')?.src;

const Home: NextPage<HomeProps> = ({activity, contributions}) => {
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
            <div className="bento bento-enter pt-4 pb-6 md:pt-0 md:pb-10">
                <GithubActivityTile activity={activity} className="sm:col-span-2 lg:row-span-2"/>
                <DockTile projects={dockProjects} className="sm:col-span-2"/>
                <ProjectTile project={tabularis} hoverVideo={demoVideo(tabularis.github_name)} showIcon/>
                <ProfileTile/>
                <ProjectTile project={gitdeck} hoverVideo={demoVideo(gitdeck.github_name)} className="sm:col-span-2" showIcon/>
                <LocationTile/>
                <ProjectTile project={melicum} hoverVideo={demoVideo(melicum.github_name)} showIcon/>
                <ProjectTile project={tuxcleaner} hoverVideo={demoVideo(tuxcleaner.github_name)} showIcon/>
                <ProjectTile project={freeMyArch} hoverVideo={demoVideo(freeMyArch.github_name)} showIcon/>
                <ProjectTile project={storytel} hoverVideo={demoVideo(storytel.github_name)} showIcon/>
                <ProjectTile project={rewindtty} hoverVideo={demoVideo(rewindtty.github_name)} showIcon/>
                <AboutTile className="sm:col-span-2"/>
                <ContactTile/>
                <AllProjectsTile projects={PROJECTS}/>
                {contributions && <ContributionsTile calendar={contributions} className="sm:col-span-2 lg:col-span-4"/>}
            </div>
        </>
    )
}

export default Home;
