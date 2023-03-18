import Header from "@/components/layouts/header";
import { NextSeo } from "next-seo";

const ForgotPasswordScreen = () => {
  return (
    <>
      <NextSeo title="Request New Password" />
      <div>
        <Header />
      </div>
    </>
  );
}

export default ForgotPasswordScreen;
