import Header from "@/components/layouts/header";
import { NextSeo } from "next-seo";

const LoginScreen = () => {
  return (
    <>
      <NextSeo title="Login" />
      <div>
        <Header />
      </div>
    </>
  );
}

export default LoginScreen;