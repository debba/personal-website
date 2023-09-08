import React from "react";
import ServiceBoxSkill from "./skill";
import {ServiceItem} from "../../../interfaces/data";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../../i18n/dictionary";

export const ServiceBox : React.FC<{ service: ServiceItem}> = ({service}) => {

    const { translate : t } = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    const serviceName = t(service.name  as 'service_frontend_development_title' ) as string;
    const serviceDesc = t(service.description  as 'service_frontend_development_desc' ) as string;

    return (

        <div className="w-full lg:max-w-full lg:flex">
            <div
                className="bg-secondary-color rounded-xl shadow-lg xl:ml-0 dark:shadow-none dark:ring-1 w-full dark:ring-inset dark:ring-white/10 flex flex-col justify-between leading-normal">
                <div className="p-4">
                    <h3 className="text-xl font-bold font-roboto text-center">{serviceName}</h3>
                    <p className="py-2 text-sm font-normal font-roboto">{serviceDesc}</p>
                </div>
                <div className="flex flex-wrap justify-center space-x-2 p-2 mb-2 w-full">
                    {service.skills.map((skill, key) => (
                        <ServiceBoxSkill skill={skill} key={key}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ServiceBox;
