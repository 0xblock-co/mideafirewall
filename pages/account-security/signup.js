import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const BoxContainerWithFilterIconWrapper = dynamic(() =>
  import("@/components/BoxContainerWithFilterIcon")
);
const RegisterBlock = dynamic(() =>
  import("@/components/Auth/Layout/register-block")
);

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
