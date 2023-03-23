import { Fragment } from "react";

import Banner from "@/components/Home/Banner";
import Feature from "@/components/Home/Features";
import Moderation from "@/components/Home/Moderation";
import OfferBlock from "@/components/Home/Offer";

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
