import type {NextPage} from 'next'
import Head from "next/head";
import React from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../i18n/dictionary";
import {SOCIALS} from "../data/socials";
import Breadcrumb from "../components/atoms/breadcrumb";
import {ContactForm} from "../components/sections/contact-form";

const Contacts: NextPage = () => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    return (
        <>
            <Head>
                <title>{t('site_title_contacts') as string}</title>
                <meta property="og:title" content={t('site_title_contacts') as string}/>
                <meta name="description" content={t('section_contactme_desc') as string}/>
                <meta property="og:description" content={t('section_contactme_desc') as string}/>
            </Head>

            <div className="py-6 md:py-10">
                <Breadcrumb items={[{label: t('menu_contacts') as string}]}/>

                <div className="tile mt-6 p-7 md:p-9">
                    <h1 className="page-title">{t('section_contactme') as string} <span aria-hidden="true">👋</span></h1>
                    <p className="page-desc">{t('section_contactme_desc') as string}</p>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                    <section aria-labelledby="contacts-info-title" className="tile flex flex-col p-7">
                        <h2 id="contacts-info-title" className="tile-label">{t('contacts_info_title') as string}</h2>
                        <dl className="mt-5 space-y-5">
                            <div>
                                <dt className="tile-text">{t('section_contactme_email') as string}</dt>
                                <dd><a href="mailto:andrea@debbaweb.it" className="text-lg font-semibold text-fg hover:text-accent">andrea@debbaweb.it</a></dd>
                            </div>
                            <div>
                                <dt className="tile-text">{t('section_contactme_phone') as string}</dt>
                                <dd><a href="tel:+393489008544" className="text-lg font-semibold text-fg hover:text-accent">+39 348 900 8544</a></dd>
                            </div>
                            <div>
                                <dt className="tile-text">{t('contacts_address') as string}</dt>
                                <dd className="text-fg">Via Monte Tabor, 56/6<br/>17015 Celle Ligure (SV), {t('country_italy') as string}</dd>
                            </div>
                            <div>
                                <dt className="tile-text">{t('footer_vat_number') as string}</dt>
                                <dd className="text-fg">DEBBAWEB di Debernardi Andrea · 01719480095</dd>
                            </div>
                        </dl>
                        <ul role="list" aria-label={t('footer_social_label') as string} className="mt-auto flex gap-2 pt-8">
                            {SOCIALS.map(social => (
                                <li key={social.name}>
                                    <a href={social.url} target="_blank" rel="noopener noreferrer"
                                       className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg text-muted transition-colors hover:border-fg hover:text-fg">
                                        <svg className="h-4 w-4" viewBox={social.viewBox} aria-hidden="true">
                                            <path fill="currentColor" d={social.path}/>
                                        </svg>
                                        <span className="sr-only">{social.name} {t('opens_new_tab') as string}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="contacts" aria-labelledby="contacts-form-title" className="tile p-7 lg:col-span-2 md:p-9">
                        <h2 id="contacts-form-title" className="tile-label mb-6">{t('contacts_form_title') as string}</h2>
                        <ContactForm/>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Contacts;
