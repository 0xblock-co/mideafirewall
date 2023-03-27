import { Fragment } from "react";
import PricingBanner from "@/components/Pricing/banner";
import PricingBlock from "@/components/Pricing/pricing-block";
import CalculateSaving from "@/components/Pricing/calculate-saving";
import PricingModerate from "@/components/Pricing/moderate";
import PricingFaqs from "@/components/Pricing/pricing-faqs";
export default function LandingScreen() {
  return (
    <Fragment>
      <PricingBanner />
      <PricingBlock />
      <CalculateSaving />
      <PricingModerate />
      <PricingFaqs />
    </Fragment>
  );
}
