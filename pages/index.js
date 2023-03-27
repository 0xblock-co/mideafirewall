import dynamic from "next/dynamic";
import { Fragment, useEffect } from "react";

import { asyncGetProducts } from "@/services/product/product.service";

const Banner = dynamic(() => import("@/components/Home/Banner"));
const Feature = dynamic(() => import("@/components/Home/Features"));
const Moderation = dynamic(() => import("@/components/Home/Moderation"));
const OfferBlock = dynamic(() => import("@/components/Home/Offer"));

export default function LandingScreen() {
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await asyncGetProducts();
    console.log("response :>> ", response);
  };

  return (
    <Fragment>
      <Banner />
      <Moderation />
      <Feature />
      <OfferBlock />
    </Fragment>
  );
}

// export async function getServerSideProps() {
//   const response = await asyncGetProducts();

//   console.log("response :>> ", response);
//   return {
//     props: { data: response },
//   };
// }
