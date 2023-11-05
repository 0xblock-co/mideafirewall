import { Fragment, useEffect, useRef, useState } from "react";

import Loader from "@/components/Loader";
import PricingBanner from "@/components/Pricing/banner";
import PricingBlock from "@/components/Pricing/pricing-block";
import PricingFaqs from "@/components/Pricing/pricing-faqs";
import { asyncGetAllPricingData } from "@/services/product/product.service";
import { useRouter } from "next/router";
export default function Pricing() {
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpgrade, setIsUpgrade] = useState(false);
  const dataFetchedRef = useRef(false);

  const router = useRouter();

  // const priceData  = useAppSelector(getAllPricingPlanSelector)
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    getPrices();
  }, []);

  useEffect(() => {
    if (router.query?.isUpgrade) {
      setIsUpgrade(true);
      // router.replace("/pricing");
    }
  }, [router]);

  const getPrices = async () => {
    setIsLoading(true);
    try {
      const response = await asyncGetAllPricingData();
      console.log("response: ", response);
      if (response && response.isSuccess && response.data) {
        setPriceData(response.data.items);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <PricingBanner />
      {priceData && priceData.length > 0 && (
        <PricingBlock
          priceData={priceData}
          setIsLoading={setIsLoading}
          isUpgrade={isUpgrade}
        />
      )}
      {/* <CalculateSaving /> */}
      {/* <PricingModerate /> */}
      <PricingFaqs />
      <Loader isLoading={isLoading} />
    </Fragment>
  );
}
