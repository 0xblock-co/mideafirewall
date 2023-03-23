import { NextSeo } from "next-seo";

import Header from "@/components/layouts/header";

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
