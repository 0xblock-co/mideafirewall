import dynamic from "next/dynamic";
import { Fragment } from "react";

const Banner = dynamic(() => import("@/components/Home/Banner"));
const Feature = dynamic(() => import("@/components/Home/Features"));
const Moderation = dynamic(() => import("@/components/Home/Moderation"));
const OfferBlock = dynamic(() => import("@/components/Home/Offer"));

export default function LandingScreen() {
  return (
    <Fragment>
      <Banner />
      <Moderation />
      <Feature />
      <OfferBlock />
    </Fragment>
  );
}
