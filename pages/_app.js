import en from "@/lang/en.json";
import fr from "@/lang/fr.json";
import nl_NL from "@/lang/nl-NL.json";
import "select2/dist/css/select2.min.css";

import "@/styles/pricing.scss";
import "@/styles/module-style.scss";
import { IntlProvider } from "react-intl";
import MainLayout from "@/components/layouts/main";
import { AuthProvider } from "@/contexts/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Helmet } from "react-helmet";
import { getAllHeaderDataOptions } from "@/store/defaultConfig.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ToastContainerConfig from "@/components/ToastContainer";
import { asyncGetAllHeaderData } from "@/services/shared/defaultConfig.service";
import getConfig from "next/config";
import { wrapper } from "@/store";
import Head from "next/head";
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

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    if (headerData && headerData?.length == 0) {
      getProducts();
    }
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
          <script
            src="/vendor/lazysizes.min.js"
            strategy="lazyOnload"
            type="text/javascript"
            defer
          />
          <script
            src="/vendor/ls.unveilhooks.min.js"
            strategy="lazyOnload"
            type="text/javascript"
            defer
          />
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
