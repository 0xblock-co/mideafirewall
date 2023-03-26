import { NextSeo } from "next-seo";
import { Fragment } from "react";

import ForgotPasswordBlock from "@/components/Auth/Layout/forgot-password-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";

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
