import React from "react";
import {ServiceItem} from "../../../interfaces/props";

export const ServiceBox : React.FC<{ service: ServiceItem, key: number }> = ({service, key}) => {
    return (
        <div key={key} className="col-span-1 flex flex-col p-6">
            <div
                className="py-5 relative z-10 -ml-10 col-span-3 bg-secondary-color rounded-xl shadow-lg xl:ml-0 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10">
                <div className="p-4">
                    <div className="text-xl font-bold font-roboto text-center">{service.name}</div>
                </div>
                <div className="flex flex-1 justify-center space-x-2 px-2">
                    {service.skills.map((skill, key) => (
                        <span
                            key={key}
                            className="px-4 py-2 mt-1 rounded-full text-gray-500 bg-gray-200 font-roboto font-semibold text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                            {skill}
                          </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ServiceBox;
