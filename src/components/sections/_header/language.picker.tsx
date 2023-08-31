import React, {useEffect, useRef, useState} from "react";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../../../i18n/dictionary";
import {useRouter} from "next/router";
import Link from "next/link";

const LanguagePicker: React.FC<{onCloseLanguagePicker: Function, navOpened: boolean}> = ({onCloseLanguagePicker, navOpened}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter()
    const g11nLocale = getLocale(router);

    const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);
    const { asPath } = useRouter();

    const flag: Record<string, string> = {
        "en": "gb",
        "it": "it"
    };

    const languagePicker = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isLanguagePickerOpen) return;
        function handleClick(event: MouseEvent) {

            const target = event.target as HTMLDivElement;

            if (languagePicker.current && !languagePicker.current.contains(target) || target.classList.contains('language-menu-item')) {
                setIsLanguagePickerOpen(false);
                onCloseLanguagePicker();
            }
        }
        window.addEventListener("click", handleClick);

        return () => window.removeEventListener("click", handleClick);
    }, [isLanguagePickerOpen, onCloseLanguagePicker]);

    return (
        <div className="md:relative md:inline-block text-left mt-4 md:mt-0"
             ref={languagePicker}>
            <div>
                <button type="button" onClick={() => setIsLanguagePickerOpen((prev) => !prev)}
                        className={`
                        inline-flex md:justify-center w-full rounded-md md:border md:border-secondary-color shadow-sm md:px-4 md:py-2 ${!navOpened ? ' text-white bg-secondary-color' : 'text-secondary-color dark:text-white' } 
                        dark:bg-semi-dark font-semibold font-roboto uppercase md:focus:outline-none 
                        md:focus:ring-2 md:focus:ring-offset-2 md:focus:ring-offset-gray-100 md:focus:ring-indigo-500
                        `}
                        id="menu-button" aria-expanded="true" aria-haspopup="true">
                    <p>
                        {t('menu_languagepicker_label') as string} <span
                        className={"fi fi-" + flag[g11nLocale || 'en']}></span>
                    </p>
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </div>

            {
                isLanguagePickerOpen && (
                    <div
                        className="md:origin-top-right md:absolute md:border md:border-secondary-color bg-white md:right-0 mt-2 md:w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-semibold font-roboto text-secondary-color dark:text-white uppercase dark:bg-semi-dark "
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className="py-1" role="none">

                            {
                                router.locales?.map(
                                    (locale, key) => (
                                        (<Link
                                            key={key}
                                            href={asPath}
                                            locale={locale}
                                            className="block px-4 py-2 hover:text-white hover:bg-secondary-color dark:hover:bg-secondary-color language-menu-item"
                                            role="menuitem"
                                            tabIndex={-1}>
                                            <span
                                                className={"fi fi-" + flag[locale]}></span> {t(`lang_${locale}_label`) as string}

                                        </Link>)
                                    )
                                )
                            }

                        </div>
                    </div>
                )
            }


        </div>
    );
}

export default LanguagePicker;
