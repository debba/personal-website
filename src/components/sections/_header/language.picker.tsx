import React, {useRef} from "react";
import {getLocale, useG11n} from "next-g11n";
import {useRouter} from "next/router";
import Link from "next/link";
import {DICTIONARY} from "../../../i18n/dictionary";

const FLAGS: Record<string, string> = {
    en: "gb",
    it: "it"
};

// Names are written in their own language so they are recognizable to speakers of that language.
const NATIVE_NAMES: Record<string, string> = {
    en: "English",
    it: "Italiano"
};

const LanguagePicker: React.FC = () => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);
    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <div role="group" aria-label={(t('menu_languagepicker_label') as string).replace(/[:\s]+$/, '')}
             className="segmented">
            {router.locales?.map((locale) => {
                const current = g11nLocale === locale;
                return (
                    <Link
                        key={locale}
                        href={router.asPath}
                        locale={locale}
                        hrefLang={locale}
                        lang={locale}
                        aria-current={current ? 'true' : undefined}
                        onClick={() => audioRef.current?.play().catch(() => {})}
                        className={`segmented-item uppercase ${current ? "bg-accent text-on-accent hover:text-on-accent" : ""}`}>
                        <span className={`fi fi-${FLAGS[locale]} rounded-sm`} aria-hidden="true"></span>
                        <abbr title={NATIVE_NAMES[locale]} className="no-underline">{locale}</abbr>
                    </Link>
                );
            })}
            <audio ref={audioRef} src="/audio/switch.mp3" preload="none"/>
        </div>
    );
}

export default LanguagePicker;
