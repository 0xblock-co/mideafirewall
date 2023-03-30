import { Fragment } from "react";
import { useQuery } from "react-query";

import Loader from "@/components/Loader";
import PricingBanner from "@/components/Pricing/banner";
import CalculateSaving from "@/components/Pricing/calculate-saving";
import PricingModerate from "@/components/Pricing/moderate";
import PricingBlock from "@/components/Pricing/pricing-block";
import PricingFaqs from "@/components/Pricing/pricing-faqs";
import { asyncGetAllPricingData } from "@/services/product/product.service";
export default function Pricing() {
  const { isLoading, data } = useQuery("pricing", asyncGetAllPricingData);

  return isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <Fragment>
      <PricingBanner />
      {data && data.isSuccess && data.data && (
        <PricingBlock priceData={data.data.items} />
      )}
      <CalculateSaving />
      <PricingModerate />
      <PricingFaqs />
    </Fragment>
  );
}
