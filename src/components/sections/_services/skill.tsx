import React from "react";

export const ServiceBoxSkill: React.FC<{ skill: string }> = ({skill}) => {
    return (

        <span
            className="px-4 py-2 mt-2 block rounded-full text-gray-500 hover:text-gray-200
            bg-gray-200 hover:bg-gray-500 font-roboto font-semibold text-xs align-center w-max cursor-pointer
            active:bg-gray-300 transition duration-300 ease-in-out hover:scale-125 select-none
            ">
                            {skill}
                          </span>
    )
}

export default ServiceBoxSkill;
