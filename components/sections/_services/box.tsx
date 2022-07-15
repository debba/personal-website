import React from "react";
import ServiceBoxSkill from "./skill";
import {ServiceItem} from "../../../interfaces/data";

export const ServiceBox : React.FC<{ service: ServiceItem}> = ({service}) => {
    return (

        <div className="w-full lg:max-w-full lg:flex">
            <div
                className="bg-secondary-color rounded-xl shadow-lg xl:ml-0 dark:shadow-none dark:ring-1 w-full dark:ring-inset dark:ring-white/10 flex flex-col justify-between leading-normal">
                <div className="p-4">
                    <h3 className="text-xl font-bold font-roboto text-center">{service.name}</h3>
                    <p className="py-2 text-sm font-normal font-roboto">{service.description}</p>
                </div>
                <div className="flex flex-wrap justify-center space-x-2 p-2 w-full">
                    {service.skills.map((skill, key) => (
                        <ServiceBoxSkill skill={skill} key={key}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ServiceBox;
