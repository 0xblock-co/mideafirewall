import en from "@/lang/en.json";
import fr from "@/lang/fr.json";
import nl_NL from "@/lang/nl-NL.json";
import "@/styles/module-style.scss";
import { IntlProvider } from "react-intl";

import ToastContainerConfig from "@/components/ToastContainer";
import MainLayout from "@/components/layouts/main";
import { AuthProvider } from "@/contexts/AuthContext";
import { wrapper } from "@/store";
import { captchaKey } from "@/utils/constants";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_KEY);

const messages = {
  en,
  fr,
  "nl-NL": nl_NL,
};
function getDirection(locale) {
  if (locale === "ar") {
    return "rtl";
  }

  return "ltr";
}

function App({ Component, ...rest }) {
  const [headerData, setHeaderData] = useState([]);
  // const dataFetchedRef = useRef(false);
  const { locale } = useRouter();
  const { store, props } = wrapper.useWrappedStore(rest);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    // if (dataFetchedRef.current) return;
    // dataFetchedRef.current = true;
    // getProducts();
  }, []);

  // const getProducts = async () => {
  //   // const response = await asyncGetProducts();
  //   const response = await asyncGetProducts_v2();
  //   console.log("response_v2: ", response);

  //   if (response && response.isSuccess && response.data) {
  //     setHeaderData(response.data);
  //   }
  // };

  return (
    <>
      <DefaultSeo
        title="Media Firewall"
        titleTemplate="Media Firewall | %s"
        defaultTitle="Media Firewall"
        description="Media Firewall is a powerful AI-based content moderation tool that helps online communities keep their platforms safe and free from harmful content."
        canonical="https://example.com"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://example.com",
          site_name: "Media Firewall",
        }}
      />
      <Helmet>
        <html lang="en" />
      </Helmet>
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <AuthProvider>
            <Elements stripe={stripePromise}>
              <MainLayout headerData={headerData}>
                <GoogleReCaptchaProvider
                  reCaptchaKey={captchaKey.siteKey || ""}
                  scriptProps={{
                    async: false,
                    defer: false,
                    appendTo: "head",
                    nonce: undefined,
                  }}
                >
                  <Component {...props.pageProps} dir={getDirection(locale)} />
                </GoogleReCaptchaProvider>
                <ToastContainerConfig />
              </MainLayout>
            </Elements>
          </AuthProvider>
        </IntlProvider>
      </Provider>
    </>
  );
}
export default wrapper.withRedux(App);
