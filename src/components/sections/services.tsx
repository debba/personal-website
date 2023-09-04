import React from "react";
import ServiceBox from "./_services/box";
import {ServiceItem} from "../../interfaces/data";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

export const ServicesSection : React.FC<{ services: ServiceItem[] }> = ({services}) => {

    const { translate : t } = useG11n<typeof DICTIONARY>(DICTIONARY, false)

    return (
        <section id="services" className="py-3 md:py-[100px] max-lg:landscape:py-3">
            <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl mb-4 leading-normal break-words tracking-tight">
                { t('section_services') as string }
            </h2>

            <div className="md:p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">

                {services.map((service,  key) => (
                    <ServiceBox service={service} key={key}/>
                ))}


            </div>

        </section>
    )
}

export default ServicesSection;
