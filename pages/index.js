import Banner from "@/components/Home/Banner";
import Moderation from "@/components/Home/Moderation";
import Feature from "@/components/Home/Features";
import OfferBlock from "@/components/Home/Offer";
import { Fragment } from "react";

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
