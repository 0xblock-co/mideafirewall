import en from "@/lang/en.json";
import fr from "@/lang/fr.json";
import nl_NL from "@/lang/nl-NL.json";
import "select2/dist/css/select2.min.css";

import ToastContainerConfig from "@/components/ToastContainer";
import MainLayout from "@/components/layouts/main";
import { AuthProvider } from "@/contexts/AuthContext";
import { asyncGetMFWTestCustomers } from "@/services/product/product.service";
import { asyncGetAllHeaderData } from "@/services/shared/defaultConfig.service";
import { wrapper } from "@/store";
import { getAllHeaderDataOptions, getMfwTestCustomersSelector, setMfwTestCustomers } from "@/store/defaultConfig.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import "@/styles/module-style.scss";
import "@/styles/pricing.scss";
import { DefaultSeo } from "next-seo";
import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Helmet } from "react-helmet";
import { IntlProvider } from "react-intl";
const messages = {
    en,
    fr,
    "nl-NL": nl_NL,
};

export function App({ Component, pageProps }) {
    const { locale } = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const dispatch = useAppDispatch();
    const headerData = useAppSelector(getAllHeaderDataOptions);
    const mfw_customersList = useAppSelector(getMfwTestCustomersSelector);

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.min.js");
        async function getMFWTestCustomers() {
            const result = await asyncGetMFWTestCustomers();
            if (result && result.isSuccess) {
                dispatch(setMfwTestCustomers(result.data));
            }
        }

        if (headerData && headerData?.length == 0) {
            getProducts();
        }
        if (mfw_customersList && mfw_customersList.length === 0) getMFWTestCustomers();
    }, []);

    const getProducts = async () => {
        dispatch(asyncGetAllHeaderData({}));
    };

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
                <AuthProvider>
                    <MainLayout>
                        <GoogleReCaptchaProvider
                            reCaptchaKey={publicRuntimeConfig.reCaptchaSiteKey || ""}
                            scriptProps={{
                                async: false,
                                defer: false,
                                appendTo: "head",
                                nonce: undefined,
                            }}
                        >
                            <Component {...pageProps} />
                        </GoogleReCaptchaProvider>
                        <ToastContainerConfig />
                    </MainLayout>
                </AuthProvider>
            </IntlProvider>
        </Fragment>
    );
}

export default wrapper.withRedux(App);
