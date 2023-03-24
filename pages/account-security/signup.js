import { NextSeo } from "next-seo";

import Header from "@/components/layouts/header";

const SignupScreen = () => {
  return (
    <>
      <NextSeo title="Create Account" />
      <div>
        <Header />
      </div>
    </>
  );
}

export default SignupScreen;
