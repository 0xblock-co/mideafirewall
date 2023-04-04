import Router from "next/router";
import { NextSeo } from "next-seo";
import { Fragment, useEffect } from "react";

import RegisterBlock from "@/components/Auth/Layout/register-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { checkIsAuth } from "@/utils/globalFunctions";

const SignupScreen = () => {
  useEffect(() => {
    if (checkIsAuth()) {
      Router.push("/network-blog");
      return;
    }
  }, []);
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
