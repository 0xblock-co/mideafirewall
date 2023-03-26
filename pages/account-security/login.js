import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const BoxContainerWithFilterIconWrapper = dynamic(() =>
  import("@/components/BoxContainerWithFilterIcon")
);
const LoginBlock = dynamic(() =>
  import("@/components/Auth/Layout/login-block")
);

const LoginScreen = () => {
  return (
    <Fragment>
      <NextSeo title="Login" />
      <BoxContainerWithFilterIconWrapper lg={8} xl={6}>
        <LoginBlock />
      </BoxContainerWithFilterIconWrapper>
    </Fragment>
  );
};

export default LoginScreen;
