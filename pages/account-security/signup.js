import { NextSeo } from "next-seo";
import { Fragment } from "react";

import RegisterBlock from "@/components/Auth/Layout/register-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";

const SignupScreen = () => {
  return (
    <Fragment>
      <NextSeo title="Create Account" />
      <BoxContainerWithFilterIconWrapper lg={8} xl={6}>
        <RegisterBlock />
      </BoxContainerWithFilterIconWrapper>
    </Fragment>
  );
};

export default SignupScreen;
