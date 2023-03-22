 
// import s from "@/styles/pages/landingscreen.module.scss";
import Header from "@/components/layouts/header"; 
import Banner from "@/components/Home/Banner";
import Moderation from "@/components/Home/Moderation";
import Feature from "@/components/Home/Features";
import OfferBlock from "@/components/Home/Offer";
import Footer from "@/components/layouts/footer";
import React, { useState } from "react"; 

export default function LandingScreen() {
  return (
    <div>
      <Header></Header> 
      <main className="mdf__main_top_fix">
      <Banner/>
      <Moderation/>
      <Feature/>
      <OfferBlock/>
      <Footer/>
      </main>
    </div>
  );
}
 