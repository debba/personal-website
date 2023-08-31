import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Layout} from "../components/layout";
import Head from 'next/head'
import {ThemeProvider} from "next-themes"

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <ThemeProvider attribute="class">
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    )
}

export default MyApp
