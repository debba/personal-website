import Logo from "./logo";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../i18n/dictionary";
import Image from "next/image";
import React from "react";
import {SOCIALS} from "../data/socials";

const ContactLine: React.FC<{ viewBox: string, path: string, stroke?: boolean, children: React.ReactNode }> = ({viewBox, path, stroke, children}) => (
    <li className="flex items-start gap-3 text-sm text-muted">
        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox={viewBox} aria-hidden="true"
             fill={stroke ? "none" : "currentColor"} stroke={stroke ? "currentColor" : undefined} strokeWidth={stroke ? 2 : undefined}>
            <path strokeLinecap="round" strokeLinejoin="round" d={path}/>
        </svg>
        <span>{children}</span>
    </li>
);

export const Footer = () => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    return (
        <>
            <footer className="mt-8 border-t border-line pb-24 md:pb-0">
                <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-[1.2fr_1fr]">
                    <div>
                        <Logo/>
                        <h2 className="sr-only">{t('footer_contacts_label') as string}</h2>
                        <ul role="list" className="mt-6 space-y-3">
                            <ContactLine viewBox="0 0 24 24" path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke>
                                DEBBAWEB di Debernardi Andrea<br/>
                                {t('footer_vat_number') as string}: 01719480095
                            </ContactLine>
                            <ContactLine viewBox="0 0 576 512" path="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z">
                                Via Monte Tabor, 56/6 · Celle Ligure ({t('country_italy') as string})
                            </ContactLine>
                            <ContactLine viewBox="0 0 512 512" path="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z">
                                <a className="hover:text-accent hover:underline" href="mailto:andrea@debbaweb.it">andrea@debbaweb.it</a>
                            </ContactLine>
                            <ContactLine viewBox="0 0 512 512" path="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z">
                                <a className="hover:text-accent hover:underline" href="tel:+393489008544">+39 348 900 8544</a>
                            </ContactLine>
                        </ul>
                    </div>
                    <div>
                        <h2 className="tile-label">
                            {t('footer_social_label') as string}
                        </h2>
                        <p className="mt-3 text-sm text-muted">{t('footer_socialnetwork_connect') as string}</p>
                        <ul role="list" className="mt-4 flex gap-2">
                            {SOCIALS.map(social => (
                                <li key={social.name}>
                                    <a href={social.url} target="_blank" rel="noopener noreferrer"
                                       className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-fg hover:text-fg">
                                        <svg className="h-4 w-4" viewBox={social.viewBox} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" d={social.path}/>
                                        </svg>
                                        <span className="sr-only">{social.name} {t('opens_new_tab') as string}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="border-t border-line">
                    <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted md:flex-row md:px-6">
                        <p>© {new Date().getFullYear()} Andrea Debernardi</p>
                        <p>
                            {t('footer_project_opensource') as string}{' '}
                            <a className="font-medium text-accent hover:underline" href="https://github.com/debba/personal-website" target="_blank" rel="noopener noreferrer">
                                {t('github_repo') as string}<span className="sr-only"> {t('opens_new_tab') as string}</span>
                            </a>
                        </p>
                        <a href="https://github.com/debba/personal-website" className="flex gap-2">
                            <Image loading={"lazy"} unoptimized src={"https://img.shields.io/github/stars/debba/personal-website?style=social"}
                                   alt={`${t('project_stars')} GitHub`} width={82} height={20}/>
                            <Image loading={"lazy"} unoptimized src={"https://img.shields.io/github/last-commit/debba/personal-website"}
                                   alt={t('github_last_commit') as string} width={140} height={20}/>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}
