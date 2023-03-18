import Header from "@/components/layouts/header";
import Banner from "@/components/Home/Banner";
import React, { useState } from "react";
import { NextSeo } from "next-seo";

export default function LandingScreen() {
  return (
    <div>
      <Header />
      <main className="mdf__main_top_fix">
        <Banner />
      </main>
    </div>
  );
}
