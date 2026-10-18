import React from "react";
import Image from "next/image";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

export const ProfileTile: React.FC<{ className?: string }> = ({className = ''}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    return (
        <section aria-labelledby="profile-title" className={`tile flex flex-col p-6 ${className}`}>
            <div className="flex items-center gap-3">
                <Image src="/images/andrea-debernardi.jpg" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-cover"/>
                <div className="min-w-0">
                    <h2 id="profile-title" className="truncate font-semibold text-fg">Andrea Debernardi</h2>
                    <p className="text-sm text-muted">@debba</p>
                </div>
            </div>
            <p className="mt-5 flex-1 text-lg leading-snug text-fg">{t('profile_bio') as string}</p>
            <a href="https://github.com/debba" target="_blank" rel="noopener noreferrer"
               className="btn-secondary mt-5 w-full">
                {t('section_activity_opensource_button_text') as string}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9"/>
                </svg>
                <span className="sr-only">{t('opens_new_tab') as string}</span>
            </a>
        </section>
    );
}

export default ProfileTile;
