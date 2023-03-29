import "@/styles/module-style.scss";

import { DefaultSeo } from "next-seo";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";

import MainLayout from "@/components/layouts/main";
import ToastContainerConfig from "@/components/ToastContainer";
import { asyncGetProducts } from "@/services/product/product.service";
import { QueryClientWrapper } from "@/services/QueryClientWrapper";
export default function App({ Component, pageProps }) {
  const [headerData, setHeaderData] = useState([]);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await asyncGetProducts();

    if (response && response.isSuccess && response.data) {
      setHeaderData(response.data.items);
    }
  };

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
      <MainLayout headerData={headerData}>
        <QueryClientWrapper>
          <Component {...pageProps} />
          <ToastContainerConfig />
        </QueryClientWrapper>
      </MainLayout>
    </>
  );
}
