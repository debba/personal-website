import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import ArrowCircle from "../atoms/arrow-circle";

// Teaser for the about page.
export const AboutTile: React.FC<{ className?: string }> = ({className = ''}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);

    return (
        <Link href="/about" locale={g11nLocale} className={`tile group flex flex-col p-7 md:p-9 ${className}`}>
            <span className="tile-label">{t('menu_aboutme') as string}</span>
            <span className="tile-title mt-2 block text-2xl">{t('about_role') as string}</span>
            <span className="tile-text mt-3 line-clamp-4 flex-1">{t('about_teaser') as string}</span>
            <span className="mt-6 flex items-center gap-3 font-semibold text-fg">
                <ArrowCircle/>
                {t('about_read_more') as string}
            </span>
        </Link>
    );
}

export default AboutTile;
