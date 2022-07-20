import React from "react";

export const Button: React.FC<{ url: string, title: string, icon: string }> = ({url, title, icon}) => {
    return (
        <a href={url} target={"_blank"}
           className={`bg-white text-gray-800 hover:bg-slate-500 hover:text-white hover:border hover:border-white font-bold py-2 px-4 rounded inline-flex items-center`}
           rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" className={`fill-current w-4 h-4 mr-2`}
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d={icon}/>
            </svg>
            <span>
                    {title}
               </span>
        </a>
    )
}

export default Button;
