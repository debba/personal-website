import React from "react";
import Link from "next/link";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {useRouter} from "next/router";

export const Button: React.FC<{ url: string, title: string, icon: string, className?: string, filledIcon?: boolean, openSelf?: boolean }> = ({
    url,
    title,
    icon,
    className,
    filledIcon,
    openSelf
}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);

    if (!url) return null;

    return <Link
        href={url}
        locale={g11nLocale}
        target={openSelf ? undefined : "_blank"}
        rel={openSelf ? undefined : "noopener noreferrer"}
        className={className || 'btn-primary'}>

        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true"
             fill={filledIcon ? "currentColor" : "none"} viewBox="0 0 24 24"
             stroke={filledIcon ? "none" : "currentColor"} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={icon}/>
        </svg>
        <span>{title}</span>
        {!openSelf && <span className="sr-only">{t('opens_new_tab') as string}</span>}
    </Link>;
}

export default Button;
