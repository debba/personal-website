import Document, {Head, Html, Main, NextScript} from 'next/document'
import Script from "next/script";
import React from "react";
import {urbanist} from "./_app";
import {themeBootstrapScript} from "../lib/theme";

class MyDocument extends Document {

    render() {
        const cookieBotDomainId = process.env.NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID;
        const emailchefSignupKey = process.env.NEXT_PUBLIC_EMAILCHEF_SIGNUP_KEY;

        return (
            <Html data-theme="auto" suppressHydrationWarning>
                <Head>
                    <script dangerouslySetInnerHTML={{__html: themeBootstrapScript}}/>
                    <meta name="color-scheme" content="light dark"/>
                    <link rel="icon" href="/favicon.ico" sizes="32x32"/>
                    <link rel="icon" href="/icon.svg" type="image/svg+xml"/>
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
                    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff"/>
                    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#030712"/>
                    {
                        process.env.NODE_ENV === 'production' && cookieBotDomainId && (
                            <Script strategy="afterInteractive" data-blockingmode={"auto"} id="Cookiebot" src="https://consent.cookiebot.com/uc.js"
                                    data-cbid={cookieBotDomainId} type="text/javascript"></Script>
                        )
                    }

                </Head>
                <body className={urbanist.variable}>
                <Main />

                <NextScript />


                <Script strategy="afterInteractive"
                        src={`https://app.emailchef.com/signup/form.js/${emailchefSignupKey}/en/api`}/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
