import Header from "@/components/layouts/header";
import { NextSeo } from "next-seo";

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
