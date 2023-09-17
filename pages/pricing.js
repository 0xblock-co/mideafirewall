import { Fragment, useEffect, useRef, useState } from "react";

import Loader from "@/components/Loader";
import PricingBanner from "@/components/Pricing/banner";
import PricingModerate from "@/components/Pricing/moderate";
import PricingBlock from "@/components/Pricing/pricing-block";
import PricingFaqs from "@/components/Pricing/pricing-faqs";
import { asyncGetAllPricingData } from "@/services/product/product.service";
export default function Pricing() {
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getPrices();
  }, []);

  const getPrices = async () => {
    setIsLoading(true);
    const response = await asyncGetAllPricingData();
    setIsLoading(false);

    if (response && response.isSuccess && response.data) {
      setPriceData(response.data.items);
    }
  };

  return (
    <Fragment>
      <PricingBanner />
      {priceData && priceData.length > 0 && (
        <PricingBlock priceData={priceData} />
      )}
      {/* <CalculateSaving /> */}
      <PricingModerate />
      <PricingFaqs />
      <Loader isLoading={isLoading} />
    </Fragment>
  );
}
