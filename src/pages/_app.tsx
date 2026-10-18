import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Layout} from "../components/layout";
import Head from 'next/head'
import {Urbanist} from "next/font/google";
import {useEffect} from "react";
import { init } from "@socialgouv/matomo-next";

// Same typeface as the tabularis website.
export const urbanist = Urbanist({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL;

function MyApp({Component, pageProps}: AppProps) {

    useEffect(() => {
        if (process.env.NODE_ENV === 'production' && matomoUrl ) {
            init({
                url: matomoUrl,
                siteId: "1"
            });
        }
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}

export default MyApp
