import type {NextPage} from 'next'
import AboutSection from "../components/sections/about";
import ServicesSection from "../components/sections/services";
import fs from 'fs';
import {DataProps} from "../interfaces/props";
import {ContactFormSection} from "../components/sections/contact";
import PortfolioSection from "../components/sections/portfolio";
import path from "path";
import {SERVICES} from "../data/services";
import Head from "next/head";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../i18n/dictionary";

const getCustomersLogo = () => {
    return fs.readdirSync(process.cwd() + '/public/images/customers')
        .filter(el => path.extname(el) === '.jpg')
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
}

export async function getStaticProps() {

    return {
        props: {
            services: SERVICES,
            customersLogo : getCustomersLogo()
        }
    }
}



const Home: NextPage<DataProps> = ({services, customersLogo} ) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    return (
        <>
            <Head>
                <title>{t('site_title') as string}</title>
                <meta property="og:title" content={t('site_title') as string} />
            </Head>
            <AboutSection/>
            <ServicesSection services={services}/>
            <PortfolioSection customersLogo={customersLogo} />
            <ContactFormSection />
        </>
    )
}

export default Home;
