import en from "@/lang/en.json";
import fr from "@/lang/fr.json";
import nl_NL from "@/lang/nl-NL.json";
import "select2/dist/css/select2.min.css";

import ToastContainerConfig from "@/components/ToastContainer";
import MainLayout from "@/components/layouts/main";
import { AuthProvider } from "@/contexts/AuthContext";
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
import { asyncGetMFWTestCustomers } from "@/services/product/product.service";
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
                title="Media Firewall"
                titleTemplate="Media Firewall | %s"
                defaultTitle="Media Firewall"
                description="Media Firewall is a powerful AI-based content moderation tool that helps online communities keep their platforms safe and free from harmful content."
                // canonical="https://example.com"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    // url: "https://example.com",
                    site_name: "Media Firewall",
                }}
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
