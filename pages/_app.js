import "@/styles/module-style.scss";
import { useEffect } from "react";
import { DefaultSeo } from "next-seo";
import { Helmet } from "react-helmet";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);

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
      <Component {...pageProps} />
    </>
  );
}
