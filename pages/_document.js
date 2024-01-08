import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

// export const initializeGTM = () => {
//     (function (w, d, s, l, i) {
//         w[l] = w[l] || [];
//         w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
//         var f = d.getElementsByTagName(s)[0],
//             j = d.createElement(s),
//             dl = l != "dataLayer" ? "&l=" + l : "";
//         j.async = true;
//         j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
//         f.parentNode.insertBefore(j, f);
//     })(window, document, "script", "dataLayer", "GTM-528HKWB4");
// };

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* <script dangerouslySetInnerHTML={{ __html: initializeGTM.toString() }} /> */}
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
                        content="MediaFirewall, World's Most Accurate, Cost Effective, World's Best Content Moderation, AI-Based Content Moderation, AI content moderation, online communities, platform safety, harmful content prevention, content filtering, community well-being, digital safety, moderation tool, content security"
                    />
                    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
                    <Script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js" />
                    {/* <noscript>
                        <iframe src={`https://www.googletagmanager.com/ns.html?id=GTM-528HKWB4`} height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
                    </noscript> */}
                </Head>
                <body>
                    {/* <noscript>
                        <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style="display:none;visibility:hidden"></iframe>
                    </noscript> */}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
