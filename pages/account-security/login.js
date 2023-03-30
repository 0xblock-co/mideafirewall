import Router from "next/router";
import { NextSeo } from "next-seo";
import { Fragment, useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import LoginBlock from "@/components/Auth/Layout/login-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { captchaKey } from "@/utils/constants";
import { checkIsAuth } from "@/utils/globalFunctions";

const LoginScreen = () => {
  useEffect(() => {
    if (checkIsAuth()) {
      Router.push("/demo");
      return;
    }
  }, []);
  return (
    <Fragment>
      <NextSeo title="Login" />
      <BoxContainerWithFilterIconWrapper lg={8} xl={6}>
        <GoogleReCaptchaProvider reCaptchaKey={captchaKey.siteKey || ""}>
          <LoginBlock />
        </GoogleReCaptchaProvider>
      </BoxContainerWithFilterIconWrapper>
    </Fragment>
  );
};

export default LoginScreen;
