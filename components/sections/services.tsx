import {ServiceItem} from "../../interfaces/props";
import React from "react";
import ServiceBox from "./_services/box";

export const ServicesSection : React.FC<{ services: ServiceItem[] }> = ({services}) => {
    return (
        <section id="services" className="my-1 md:my-[100px]">
            <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl text-white mb-4 leading-normal break-words tracking-tight">Services</h2>



            <div className="p-5 md:p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">

                {services.map((service,  key) => (
                    <ServiceBox service={service} key={key}/>
                ))}


            </div>

        </section>
    )
}

export default ServicesSection;
