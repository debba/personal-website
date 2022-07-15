import type {NextPage} from 'next'
import AboutSection from "../components/sections/about";
import ServicesSection from "../components/sections/services";
import fs from 'fs';
import {DataProps, ServiceItem} from "../interfaces/props";
import {ContactFormSection} from "../components/sections/contact";
import PortfolioSection from "../components/sections/portfolio";
import path from "path";


const getServices = () => {
    const data = fs.readFileSync(process.cwd() + '/data/services.json', 'utf8');
    return JSON.parse(data) as ServiceItem[];
}

const getCustomersLogo = () => {


    const files = fs.readdirSync(process.cwd() + '/public/images/customers');
    return files.filter(el => path.extname(el) === '.jpg').sort((a, b) => {
        return a.localeCompare(b);
    });
}

export async function getStaticProps() {

    return {
        props: {
            services: getServices(),
            customersLogo : getCustomersLogo()
        }
    }
}



const Home: NextPage<DataProps> = ({services, customersLogo} ) => {
    console.log({customersLogo});
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
