import Document, {Head, Html, Main, NextScript} from 'next/document'
import Script from "next/script";
import React from "react";
import {roboto} from "./_app";

class MyDocument extends Document {

    render() {
        const cookieBotDomainId = process.env.NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID;

        return (
            <Html className="scroll-smooth">
                <Head>
                    {
                        process.env.NODE_ENV === 'production' && cookieBotDomainId && (
                            <Script strategy="afterInteractive" data-blockingmode={"auto"} id="Cookiebot" src="https://consent.cookiebot.com/uc.js"
                                    data-cbid={cookieBotDomainId} type="text/javascript"></Script>
                        )
                    }

                </Head>
                <body className={`${roboto.variable} bg-white dark:bg-semi-dark`}>
                <Main />

                <NextScript />


                <Script strategy="afterInteractive"
                        src="https://app.emailchef.com/signup/form.js/7o22666s726q5s6964223n2234353634227q/en/api"/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
