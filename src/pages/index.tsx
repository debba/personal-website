import type {NextPage} from 'next'
import AboutSection from "../components/sections/about";
import ServicesSection from "../components/sections/services";
import {DataProps} from "../interfaces/props";
import {ContactFormSection} from "../components/sections/contact";
import PortfolioSection from "../components/sections/portfolio";
import {SERVICES} from "../data/services";
import Head from "next/head";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../i18n/dictionary";
import ActivitiesSection from "../components/sections/activites";
import {ACTIVITIES} from "../data/activities";
import React from "react";
import {CUSTOMERS} from "../data/customers";
import scrollHandler from "../hooks/scroll.handler";
import useScrollHandler from "../hooks/scroll.handler";

export async function getStaticProps() {

    return {
        props: {
            services: SERVICES,
            activities: ACTIVITIES,
            customers : CUSTOMERS
        }
    }
}



const Home: NextPage<DataProps> = ({services, customers, activities} ) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const activeSection = useScrollHandler();
    return (
        <>
            <Head>
                <title>{t('site_title') as string}</title>
                <meta property="og:title" content={t('site_title') as string} />
                {
                    process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITEURL  && (
                        <meta property="og:image" content={process.env.NEXT_PUBLIC_SITEURL+'/images/me.jpg'}/>
                    )
                }
                <meta property="og:description" content={t('site_description') as string} />
                <meta property="description" content={t('site_description') as string} />
            </Head>
            <AboutSection/>
            <ServicesSection services={services}/>
            <ActivitiesSection  activities={activities} />
            <PortfolioSection customers={customers} />
            <ContactFormSection />
        </>
    )
}

export default Home;
