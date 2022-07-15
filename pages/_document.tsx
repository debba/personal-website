import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL;

        return (
            <Html className="scroll-smooth">
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono:wght@200;400;600;700&display=swap" rel="stylesheet" />
                    <title>Andrea Debernardi | Full stack web developer in Genoa. PHP, Python, Node JS, Angular ans so much more.</title>
                    <meta property="og:title" content="Full stack web developer in Genoa. PHP, Python, Node JS, Angular ans so much more." />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                </Head>
                <body className="bg-semi-dark">
                <Main />
                <NextScript />
                {
                    process.env.NODE_ENV === 'production' && matomoUrl && (
                        <script dangerouslySetInnerHTML={{
                            __html: `
                    var _paq = window._paq = window._paq || [];
                    _paq.push(['trackPageView']);
                    _paq.push(['enableLinkTracking']);
                    (function() {
                    var u="//${process.env.NEXT_PUBLIC_MATOMO_URL}/";
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
