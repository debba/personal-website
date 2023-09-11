import Document, {Head, Html, Main, NextScript} from 'next/document'
import Script from "next/script";
import React from "react";
import {roboto} from "./_app";

class MyDocument extends Document {

    render() {
        const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL;
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
                {
                    process.env.NODE_ENV === 'production' && matomoUrl && (
                        <script dangerouslySetInnerHTML={{
                            __html: `
                    var _paq = window._paq = window._paq || [];
                    _paq.push(['trackPageView']);
                    _paq.push(['enableLinkTracking']);
                    (function() {
                    var u="//${matomoUrl}/";
                    _paq.push(['setTrackerUrl', u+'matomo.php']);
                    _paq.push(['setSiteId', '1']);
                    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                    })();
                    `
                        }} />
                    )
                }
                </body>
            </Html>
        )
    }
}

export default MyDocument
