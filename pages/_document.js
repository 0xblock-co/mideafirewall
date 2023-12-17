import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* Define the viewport meta tag */}
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="robots" content="index, follow"></meta>
                    {/* Add your favicon and other meta tags */}
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/meta/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png" />
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
                        integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                    />
                    <link rel="manifest" href="/meta/site.webmanifest" />
                    <meta
                        name="keywords"
                        content="Media Firewall, AI content moderation, online communities, platform safety, harmful content prevention, content filtering, community well-being, digital safety, moderation tool, content security"
                    />
                    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
                    <Script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
