import { NextSeo } from "next-seo";
import { Fragment } from "react";

import ForgotPasswordBlock from "@/components/Auth/forgot-password-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";

const ForgotPasswordScreen = () => {
  return (
    <Fragment>
      <NextSeo title="Forgot Password" />
      <BoxContainerWithFilterIconWrapper lg={12} xl={7} xxl={6}>
        <ForgotPasswordBlock />
      </BoxContainerWithFilterIconWrapper>
    </Fragment>
  );
};

export default ForgotPasswordScreen;
