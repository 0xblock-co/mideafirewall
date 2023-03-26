import { Fragment } from "react";
import PricingBanner from "@/components/Pricing/banner";
import PricingBlock from "@/components/Pricing/pricing-block";
export default function LandingScreen() {
  return (
    <Fragment> 
        <PricingBanner/> 
        <PricingBlock/> 
    </Fragment>
  );
}
