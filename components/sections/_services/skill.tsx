import React from "react";

export const ServiceBoxSkill: React.FC<{ skill: string }> = ({skill}) => {
    return (

        <span
            className="px-4 py-2 mt-2 block rounded-full text-gray-500 bg-gray-200 font-roboto font-semibold text-xs align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                            {skill}
                          </span>
    )
}

export default ServiceBoxSkill;
