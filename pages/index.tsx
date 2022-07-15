import type {NextPage} from 'next'
import AboutSection from "../components/sections/about";
import ServicesSection from "../components/sections/services";
import fs from 'fs';
import {DataProps} from "../interfaces/props";
import {ContactFormSection} from "../components/sections/contact";
import PortfolioSection from "../components/sections/portfolio";
import path from "path";
import {ServiceItem} from "../interfaces/data";
import {SERVICES} from "../data/services";

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
    return (
        <>
            <AboutSection/>
            <ServicesSection services={services}/>
            <PortfolioSection customersLogo={customersLogo} />
            <ContactFormSection />
        </>
    )
}

export default Home;
