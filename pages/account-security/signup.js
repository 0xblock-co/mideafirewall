import Router from "next/router";
import { NextSeo } from "next-seo";
import { Fragment, useEffect, useState } from "react";

import RegisterBlock from "@/components/Auth/Layout/register-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import Loader from "@/components/Loader";
import { useAuth } from "@/contexts/AuthContext";
import { asyncSignUpService } from "@/services/auth/auth.service";
import { checkAuthRoute } from "@/utils/globalFunctions";

const SignupScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    const { isActive, route } = checkAuthRoute();
    if (isActive) {
      Router.push(route);
      return;
    }
  }, []);

  const handleSubmitSingUp = async (data) => {
    setIsLoading(true);

    delete data.passwordConfirmation;
    const response = await asyncSignUpService({ ...data, active: true });
    setIsLoading(false);
    if (response && response.isSuccess && response.data) {
      const { user, userToken } = response.data;
      login({ ...user, ...userToken });
      if (user.isSurveyDone) {
        Router.push("/network-blog");
      } else {
        Router.push("/survey");
      }
    }
  };

  return (
    <Fragment>
      <NextSeo title="Create Account" />
      <BoxContainerWithFilterIconWrapper lg={12} xl={7} xxl={6}>
        <RegisterBlock handleSubmitSingUp={handleSubmitSingUp} />
      </BoxContainerWithFilterIconWrapper>
      <Loader isLoading={isLoading} />
    </Fragment>
  );
};

export default SignupScreen;
