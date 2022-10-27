import React from "react";
import Link from "next/link";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {useRouter} from "next/router";

export const Button: React.FC<{ url: string, title: string, icon: string, className?: string, svgClassName?: string, openSelf?: boolean }> = ({
                                                                                                                                                  url,
                                                                                                                                                  title,
                                                                                                                                                  icon,
                                                                                                                                                  className,
                                                                                                                                                  svgClassName,
                                                                                                                                                  openSelf

                                                                                                                                              }) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);

    return (
        (<Link
            href={url}
            locale={g11nLocale}
            target={openSelf ? "_self" : "_blank"}
            className={
                className || 'ml-2 bg-white text-gray-800 hover:bg-slate-500 hover:text-white hover:border hover:border-white font-bold py-2 px-4 rounded inline-flex items-center'
            }
            rel="noreferrer">

            <svg xmlns="http://www.w3.org/2000/svg" className={svgClassName || `fill-current w-4 h-4 mr-2`}
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d={icon}/>
            </svg>
            <span>
                {title}
           </span>

        </Link>)
    );
}

export default Button;
