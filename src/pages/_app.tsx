import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Layout} from "../components/layout";
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
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
