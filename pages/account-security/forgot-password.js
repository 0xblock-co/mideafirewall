import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const BoxContainerWithFilterIconWrapper = dynamic(() =>
  import("@/components/BoxContainerWithFilterIcon")
);
const ForgotPasswordBlock = dynamic(() =>
  import("@/components/Auth/Layout/forgot-password-block")
);

const ForgotPasswordScreen = () => {
  return (
    <Fragment>
      <NextSeo title="Forgot Password" />
      <BoxContainerWithFilterIconWrapper lg={8} xl={6}>
        <ForgotPasswordBlock />
      </BoxContainerWithFilterIconWrapper>
    </Fragment>
  );
};

export default ForgotPasswordScreen;
