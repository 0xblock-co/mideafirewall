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
                    {/* <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
                        integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                    /> */}
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                        integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw=="
                        crossorigin="anonymous"
                        referrerpolicy="no-referrer"
                    />
                    <link rel="manifest" href="/meta/site.webmanifest" />
                    <meta
                        name="keywords"
                        content="World's best content moderation, image moderation, image moderation api, video moderation, video moderation api, automatic content moderation, content moderation online, content moderation, content moderation service, photo moderation, porn detection, nudity detection, api, violence detection, video moderation, nudity detector, content detection, most accurate content moderation, mfiafirewall, MediaFirewall, Media Firewall, cost effective content moderation, AI Content Moderation, Harmful Content Prevention, Platform Security Innovations, AI-Based Content Moderation, mediafirewall.ai, mediafirewall,Moderation services, Online content filtering, World's best accurate content moderation platform, World's best social media content moderation"
                    />
                    <meta name="google-site-verification" content="M8IQA2B1cpI0vz31uwakUXZfdc8FdEgI3LfyIGJ3Suc" />
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
