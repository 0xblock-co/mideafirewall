/* eslint-disable @next/next/inline-script-id */
import en from "@/lang/en.json";
import fr from "@/lang/fr.json";
import nl_NL from "@/lang/nl-NL.json";
import "react-circular-progressbar/dist/styles.css";
import "select2/dist/css/select2.min.css";

import ToastContainerConfig from "@/components/ToastContainer";
import MainLayout from "@/components/layouts/main";
import AuthProviderV3 from "@/contexts-v2/auth.context";
import { asyncUserSatisfactionMetrics } from "@/services/product/product.service";
import { wrapper } from "@/store";
import { getGeoLocationData, setGeoLocationData, setPartnersData, setSatisfactionMetricsCount, setSupportedMediaTypes } from "@/store/defaultConfig.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import "@/styles/module-style.scss";
import "@/styles/pricing.scss";
import { DefaultSeo } from "next-seo";
import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
// import Script from "next/script";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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
                console.error("Error While Fetching geo data")
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
                console.error("Error While Fetching Partners data")
            });
    };

    const getSupportedMediaType = () => {
        axios
            .get("https://mediafirewall.millionvisions.ai/media/mediaSupport")
            .then((response) => {
                let data = response.data;
                if (data && data?.length > 0) {
                    dispatch(setSupportedMediaTypes(data));
                }
            })
            .catch((error) => {
                console.error("Error While Fetching Partners data");
            });
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
            <DefaultSeo
                titleTemplate="%s - Media Firewall & AI"
                defaultTitle="Media Firewall & AI"
                description="Discover the forefront of online safety with Media Firewall & AI. Explore AI content moderation tools ensuring community safety. Safeguard your platform effortlessly, eliminating harmful content for a secure digital environment. Enhance user well-being and elevate platform safety with intelligent content moderation. Dive into our comprehensive guide for insights on the synergy of Media Firewall and AI in fortifying online platforms. Click now for a cutting-edge approach to digital safety. Ensuring Online Community Safety: A Comprehensive Guide to AI Content Moderation and Harmful Content Prevention."
                canonical="https://mediafirewall.ai/"
                openGraph={{
                    type: "website",
                    author: "",
                    locale: "en_US",
                    author: "https://www.themillionvisions.com/",
                    url: "https://mediafirewall.ai/",
                    title: "Media Firewall & AI: Elevating Platform Safety with Smart Content Moderation",
                    description:
                        "Discover the forefront of online safety with Media Firewall & AI. Explore AI content moderation tools ensuring community safety. Safeguard your platform effortlessly, eliminating harmful content for a secure digital environment. Enhance user well-being and elevate platform safety with intelligent content moderation. Dive into our comprehensive guide for insights on the synergy of Media Firewall and AI in fortifying online platforms. Click now for a cutting-edge approach to digital safety.",
                    site_name: "Media Firewall & AI",
                }}
                // twitter={{
                //     cardType: "summary_large_image",
                //     handle: "@yourTwitterHandle", // Replace with your Twitter handle
                //     site: "@yourTwitterHandle", // Replace with your Twitter handle
                // }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "AI Content Moderation, Media Firewall Technology, Online Community Safety, Digital Well-being Solutions, Harmful Content Prevention, Platform Security Innovations, User Safety Technology, Intelligent Content Moderation, Online Platform Protection, Digital Safety Measures",
                    },
                ]}
            />
            <GoogleAnalytics measurementId="G-D02YEPWK17" />

            <Helmet>
                <html lang="en" />
                <Head>
                    {/* lazysizes  */}
                    <script src="/vendor/lazysizes.min.js" strategy="lazyOnload" type="text/javascript" defer />
                    <script src="/vendor/ls.unveilhooks.min.js" strategy="lazyOnload" type="text/javascript" defer />
                </Head>
            </Helmet>
            <IntlProvider locale={locale} messages={messages[locale]}>
                <>
                    <>
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
                    </>
                </>
            </IntlProvider>
        </div>
    );
}

export default wrapper.withRedux(App);
