import { NextSeo } from "next-seo";
import { Fragment } from "react";

import LoginBlock from "@/components/Auth/Layout/login-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";

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
