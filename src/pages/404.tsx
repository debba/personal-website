import Link from 'next/link'
import Head from "next/head";
import {useRouter} from "next/router";
import {getLocale, useG11n} from "next-g11n";
import {DICTIONARY} from "../i18n/dictionary";

export default function FourOhFour() {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const router = useRouter();
    const g11nLocale = getLocale(router);
    return (
        <>
            <Head>
                <title>{`404 - ${t('not_found_title')}`}</title>
            </Head>
            <section aria-labelledby="not-found-title" className="tile my-6 flex min-h-[60vh] flex-col items-center justify-center p-8 text-center md:my-10">
                <p className="tile-label">404</p>
                <h1 id="not-found-title" className="page-title mt-2">{t('not_found_title') as string}</h1>
                <p className="page-desc mx-auto">{t('not_found_desc') as string}</p>
                <Link href="/" locale={g11nLocale} className="btn-primary mt-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    {t('footer_back_home') as string}
                </Link>
            </section>
        </>
    );
}
