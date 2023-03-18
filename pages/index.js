 
// import s from "@/styles/pages/landingscreen.module.scss";
import Header from "@/components/layouts/header"; 
import Banner from "@/components/Home/Banner";
import React, { useState } from "react"; 

export default function LandingScreen() {
  return (
    <div>
      <Header></Header> 
      <main className="mdf__main_top_fix">
      <Banner/>
      </main>
    </div>
  );
}
 