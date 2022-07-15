import type {NextPage} from 'next'
import AboutSection from "../components/sections/about";
import ServicesSection from "../components/sections/services";
import fs from 'fs';
import {DataProps} from "../interfaces/props";
import {ContactFormSection} from "../components/sections/contact";
import PortfolioSection from "../components/sections/portfolio";


export async function getStaticProps() {

    const data = fs.readFileSync(process.cwd() + '/data/services.json', 'utf8');
    const services = JSON.parse(data);

    return {
        props: {
            services
        }
    }
}



const Home: NextPage<DataProps> = ({services} ) => {
    return (
        <>
            <AboutSection/>
            <ServicesSection services={services}/>
            <PortfolioSection />
            <ContactFormSection />
        </>
    )
}

export default Home;
