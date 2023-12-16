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
import { setSatisfactionMetricsCount } from "@/store/defaultConfig.slice";
import { useAppDispatch } from "@/store/hooks";
import "@/styles/module-style.scss";
import "@/styles/pricing.scss";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IntlProvider } from "react-intl";
import LoadingBar from "react-top-loading-bar";

const messages = {
    en,
    fr,
    "nl-NL": nl_NL,
};

export function App({ Component, pageProps }) {
    const { locale } = useRouter();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
    useEffect(() => {
        // START VALUE - WHEN LOADING WILL START
        router.events.on("routeChangeStart", (url) => {
            setProgress(40);
        });

        // COMPLETE VALUE - WHEN LOADING IS FINISHED
        router.events.on("routeChangeComplete", (url) => {
            setProgress(100);
        });

        router.events.on("routeChangeError", (url) => {
            setProgress(100);
        });
    }, [router]);

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.min.js");
        async function getMFWSatisfactionMetrics() {
            const result = await asyncUserSatisfactionMetrics();
            if (result && result?.isSuccess) {
                dispatch(setSatisfactionMetricsCount(result.data));
            }
        }
        getMFWSatisfactionMetrics();
    }, []);

    return (
        <Fragment>
            <DefaultSeo
                title="Ensuring Online Community Safety: A Comprehensive Guide to AI Content Moderation and Harmful Content Prevention"
                titleTemplate="Media Firewall & AI | %s"
                defaultTitle="Media Firewall & AI"
                description="Safeguard online spaces with Media Firewall, a robust AI content moderation tool. Ensure platform safety and eliminate harmful content effortlessly in your online communities."
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://mediafirewall.ai/",
                    title: "Media Firewall & AI: Elevating Platform Safety with Smart Content Moderation",
                    description:
                        "Discover the cutting-edge synergy of Media Firewall and AI, fortifying online platforms with intelligent content moderation. Enhance user well-being and digital safety effortlessly.",
                    siteName: "Media Firewall & AI",
                }}
                canonical="https://mediafirewall.ai/"
            />
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
        </Fragment>
    );
}

export default wrapper.withRedux(App);
