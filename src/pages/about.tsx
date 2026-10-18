import type {NextPage} from 'next'
import Head from "next/head";
import Image from "next/image";
import React from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../i18n/dictionary";
import {SERVICES} from "../data/services";
import {ACTIVITIES} from "../data/activities";
import {CUSTOMERS} from "../data/customers";
import Breadcrumb from "../components/atoms/breadcrumb";
import ServiceTile from "../components/home/service-tile";
import ActivityTile from "../components/home/activity-tile";
import CustomersTile from "../components/home/customers-tile";

const About: NextPage = () => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    return (
        <>
            <Head>
                <title>{t('site_title_about') as string}</title>
                <meta property="og:title" content={t('site_title_about') as string}/>
                <meta name="description" content={t('site_description_about') as string}/>
                <meta property="og:description" content={t('site_description_about') as string}/>
            </Head>

            <div className="py-6 md:py-10">
                <Breadcrumb items={[{label: t('menu_aboutme') as string}]}/>

                <div className="bento mt-6">
                    <section aria-labelledby="about-title" className="tile p-7 sm:col-span-2 lg:col-span-3 md:p-9">
                        <p className="tile-label">{t('about_role') as string}</p>
                        <h1 id="about-title" className="page-title mt-2">{t('menu_aboutme') as string}</h1>
                        <p className="page-desc">{t('about_page_desc') as string}</p>
                        <p className="mt-6 max-w-3xl leading-relaxed text-muted">{t('about_claim') as string}</p>
                    </section>
                    <div className="tile relative min-h-[20rem] sm:col-span-2 lg:col-span-1">
                        <Image src="/images/andrea-debernardi.jpg" alt="Andrea Debernardi" fill sizes="(min-width: 1024px) 25vw, 100vw"
                               className="object-cover"/>
                    </div>
                </div>

                <section id="services" aria-labelledby="services-title" className="mt-14">
                    <h2 id="services-title" className="section-title">{t('services_tile_title') as string}</h2>
                    <p className="mt-2 text-muted">{t('services_desc') as string}</p>
                    <div className="bento mt-6">
                        {SERVICES.map(service => <ServiceTile key={service.name} service={service}/>)}
                    </div>
                </section>

                <section id="activities" aria-labelledby="activities-title" className="mt-14">
                    <h2 id="activities-title" className="section-title">{t('section_activities') as string}</h2>
                    <p className="mt-2 text-muted">{t('activities_desc') as string}</p>
                    <div className="bento mt-6 lg:grid-cols-3">
                        {ACTIVITIES.map(activity => <ActivityTile key={activity.id} activity={activity} headingLevel={3}/>)}
                    </div>
                </section>

                <section id="portfolio" aria-labelledby="portfolio-title" className="mt-14">
                    <h2 id="portfolio-title" className="section-title">{t('section_portfolio') as string}</h2>
                    <p className="mt-2 text-muted">{t('section_portfolio_desc') as string}</p>
                    <CustomersTile customers={CUSTOMERS} className="mt-6"/>
                </section>
            </div>
        </>
    );
}

export default About;
