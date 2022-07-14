import React from "react";
import {ServiceItem} from "../../../interfaces/props";

export const ServiceBox : React.FC<{ service: ServiceItem, key: number }> = ({service, key}) => {
    return (
        <div key={key} className="w-full lg:max-w-full lg:flex">
            <div
                className="bg-secondary-color rounded-xl shadow-lg xl:ml-0 dark:shadow-none dark:ring-1 w-full dark:ring-inset dark:ring-white/10 flex flex-col justify-between leading-normal">
                <div className="p-4">
                    <h3 className="text-xl font-bold font-roboto text-center">{service.name}</h3>
                    <p className="py-2 text-sm font-normal font-roboto">{service.description}</p>
                </div>
                <div className="flex flex-wrap justify-center space-x-2 p-2 w-full">
                    {service.skills.map((skill, _key) => (
                        <span
                            key={_key}
                            className="px-4 py-2 mt-2 block rounded-full text-gray-500 bg-gray-200 font-roboto font-semibold text-xs align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                            {skill}
                          </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ServiceBox;
