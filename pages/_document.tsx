import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono:wght@200;400;600;700&display=swap" rel="stylesheet" />
                    <title>Andrea Debernardi | Full stack web developer in Genoa. PHP, Python, Node JS, Angular ans so much more.</title>
                    <meta property="og:title" content="Full stack web developer in Genoa. PHP, Python, Node JS, Angular ans so much more." />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                </Head>
                <body className="bg-semi-dark">
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
