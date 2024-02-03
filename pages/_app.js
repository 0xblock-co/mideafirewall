/* eslint-disable @next/next/inline-script-id */
import en from "@/lang/en.json";
import fr from "@/lang/fr.json";
import nl_NL from "@/lang/nl-NL.json";
import "react-circular-progressbar/dist/styles.css";
import "select2/dist/css/select2.min.css";

import ToastContainerConfig from "@/components/ToastContainer";
import MainLayout from "@/components/layouts/main";
import AuthProviderV3 from "@/contexts-v2/auth.context";
import ServiceStatusProvider from "@/contexts-v2/serviceStatusContext";
import { asyncUserSatisfactionMetrics } from "@/services/product/product.service";
import { wrapper } from "@/store";
import { getGeoLocationData, setGeoLocationData, setPartnersData, setSatisfactionMetricsCount, setSupportedMediaTypes } from "@/store/defaultConfig.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import "@/styles/module-style.scss";
import "@/styles/pricing.scss";
import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
// import Script from "next/script";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import axios from "axios";
import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import LoadingBar from "react-top-loading-bar";
const isProduction = process.env.NODE_ENV === "production";

const messages = {
    en,
    fr,
    "nl-NL": nl_NL,
};
export const GTM_ID = "GTM-528HKWB4";

export function App({ Component, pageProps }) {
    const { locale } = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const geoInfo1 = useAppSelector(getGeoLocationData);

    const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
    // useEffect(() => {
    //     if (!window.GA_INITIALIZED) {
    //         initGA(GTM_ID);
    //         window.GA_INITIALIZED = true;
    //     }
    //     logPageView();
    // }, [router.pathname]);

    useEffect(() => {
        // const handleRouteChange = (url) => {
        //     if (isProduction) gtag.pageview(url);
        // };
        // START VALUE - WHEN LOADING WILL START
        router.events.on("routeChangeStart", (url) => {
            setProgress(40);
        });

        // COMPLETE VALUE - WHEN LOADING IS FINISHED
        router.events.on("routeChangeComplete", (url) => {
            setProgress(100);
            // handleRouteChange(url);
        });

        router.events.on("routeChangeError", (url) => {
            setProgress(100);
        });

        return () => {
            // router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router]);

    const getGeoInfo = () => {
        axios
            .get("https://ipapi.co/json/")
            .then((response) => {
                let data = response.data;
                dispatch(setGeoLocationData(data));
            })
            .catch((error) => {
                
            });
    };

    const getPartnersData = () => {
        axios
            .get("https://drivesafe360.millionvisions.ai/driveSafe/partners/?active=true&descend=true&pageNumber=0&pageSize=10")
            .then((response) => {
                let data = response.data;
                if (data?.empty == false && data?.items?.length > 0) {
                    dispatch(setPartnersData(data.items));
                }
            })
            .catch((error) => {
                
            });
    };

    const getSupportedMediaType = () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_PATH_V2;
        axios
            .get(`${baseUrl}/media/mediaSupport`)
            .then((response) => {
                let data = response.data;
                if (data && data?.length > 0) {
                    dispatch(setSupportedMediaTypes(data));
                }
            })
            .catch((error) => {});
    };

    useEffect(() => {
        if (geoInfo1 == null) {
            getGeoInfo();
        }
        getPartnersData();
        getSupportedMediaType();
    }, []);
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.min.js");
        // ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, { debug: true });

        // ReactGA.pageview(window.location.pathname + window.location.search);
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "zsiqscript";
        script.innerHTML = `
            var $zoho = $zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
                widgetcode: "${publicRuntimeConfig.zohoSalesIq}",
                values: {},
                ready: function () {}
            };
            var d = document;
            var s = d.createElement("script");
            s.type = "text/javascript";
            s.id = "zsiqscript";
            s.defer = true;
            s.src = "https://salesiq.zohopublic.in/widget";
            var t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s, t);
        `;
        document.head.appendChild(script);

        async function getMFWSatisfactionMetrics() {
            const result = await asyncUserSatisfactionMetrics();
            if (result && result?.isSuccess) {
                dispatch(setSatisfactionMetricsCount(result.data));
            }
        }
        getMFWSatisfactionMetrics();
    }, []);

    return (
        <div>
            {/* <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

            <Script strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script> */}

            {/* <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content="Best automatic content moderation API. MediaFirewall is designed to automatically detect and filter specific contents, with an unprecedented accuracy"
                />
                <meta
                    name="keywords"
                    content="World's best content moderation, image moderation, image moderation api, video moderation, video moderation api, automatic content moderation, content moderation online, content moderation, content moderation service, photo moderation, porn detection, nudity detection, api, violence detection, video moderation, nudity detector, content detection, most accurate content moderation, mfiafirewall, MediaFirewall, Media Firewall, cost effective content moderation, AI Content Moderation, Harmful Content Prevention, Platform Security Innovations, AI-Based Content Moderation, mediafirewall.ai, mediafirewall,Moderation services, Online content filtering, World's best accurate content moderation platform, World's best social media content moderation"
                />
                <link rel="canonical" href="https://mediafirewall.ai/" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="MediaFirewall" />
                <meta property="og:title" content="MediaFirewall - World's best Content moderation API" />
                <meta
                    property="og:description"
                    content="Discover the forefront of online safety with MediaFirewall. Explore AI content moderation tools ensuring community safety. Safeguard your platform effortlessly, eliminating harmful content for a secure digital environment. Enhance user well-being and elevate platform safety with the world's most accurate, cost-effective, and world's best content moderation - an intelligent AI-based approach. Dive into our comprehensive guide for insights on the synergy of MediaFirewall and AI in fortifying online platforms. Click now for a cutting-edge approach to digital safety."
                />
                <meta property="og:url" content="https://mediafirewall.ai/" />
            </Head> */}

            <GoogleAnalytics measurementId="G-D02YEPWK17" />

            <Head>
                {/* lazysizes  */}
                <script src="/vendor/lazysizes.min.js" strategy="lazyOnload" type="text/javascript" defer />
                <script src="/vendor/ls.unveilhooks.min.js" strategy="lazyOnload" type="text/javascript" defer />
            </Head>
            <IntlProvider locale={locale} messages={messages[locale]}>
                <>
                    <ServiceStatusProvider>
                        <AuthProviderV3>
                            {getLayout(
                                <>
                                    <LoadingBar
                                        color="#7b5b9e"
                                        progress={progress}
                                        waitingTime={400}
                                        onLoaderFinished={() => {
                                            setProgress(0);
                                        }}
                                    />
                                    <Component {...pageProps} />
                                    <ToastContainerConfig />
                                </>
                            )}
                        </AuthProviderV3>
                    </ServiceStatusProvider>
                </>
            </IntlProvider>
        </div>
    );
}

export default wrapper.withRedux(App);
