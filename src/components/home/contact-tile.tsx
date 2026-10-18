import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

export const ContactTile: React.FC<{ className?: string }> = ({className = ''}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);

    return (
        <section aria-labelledby="contact-tile-title" className={`tile flex flex-col p-6 ${className}`}>
            <h2 id="contact-tile-title" className="tile-title text-2xl">
                {t('contact_tile_title') as string} <span aria-hidden="true">👋</span>
            </h2>
            <p className="tile-text mt-2 flex-1">{t('contact_tile_desc') as string}</p>
            <div className="mt-5 flex flex-col gap-2">
                <Link href="/contacts" locale={g11nLocale} className="btn-primary">
                    {t('contact_tile_cta') as string}
                </Link>
                <a href="mailto:andrea@debbaweb.it" className="btn-secondary">
                    andrea@debbaweb.it
                </a>
            </div>
        </section>
    );
}

export default ContactTile;
