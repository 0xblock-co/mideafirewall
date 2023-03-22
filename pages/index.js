import Header from "@/components/layouts/header";
import Banner from "@/components/Home/Banner";
import Moderation from "@/components/Home/Moderation";
import Feature from "@/components/Home/Features";
import OfferBlock from "@/components/Home/Offer";
import Footer from "@/components/layouts/footer";

export default function LandingScreen() {
  return (
    <div>
      <Header />
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
