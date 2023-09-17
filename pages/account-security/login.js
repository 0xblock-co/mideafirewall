import Router from "next/router";
import { NextSeo } from "next-seo";
import { Fragment, useEffect, useState } from "react";

import LoginBlock from "@/components/Auth/Layout/login-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import Loader from "@/components/Loader";
import { useAuth } from "@/contexts/AuthContext";
import { asyncLoginService } from "@/services/auth/auth.service";
import { checkAuthRoute } from "@/utils/globalFunctions";

const LoginScreen = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { isActive, route } = checkAuthRoute();
    if (isActive) {
      Router.push(route);
      return;
    }
  }, []);

  const handleLoginSubmit = async (formData) => {
    setIsLoading(true);

    const params = {
      email: formData.email,
      passWord: formData.password,
      recaptchaResponse: formData.gReCaptchaToken,
      authType: formData?.authType || "",
    };
    const response = await asyncLoginService(params);
    setIsLoading(false);
    if (response && response.isSuccess && response.data) {
      const { user, userToken } = response.data;
      if (user.survey) {
        Router.push("/network-blog");
      } else {
        Router.push("/survey");
      }
      login({ ...user, ...userToken });
    }
  };

  return (
    <Fragment>
      <NextSeo title="Login" />
      <BoxContainerWithFilterIconWrapper lg={12} xl={7} xxl={6}>
        <LoginBlock handleLoginSubmit={handleLoginSubmit} />
      </BoxContainerWithFilterIconWrapper>
      <Loader isLoading={isLoading} />
    </Fragment>
  );
};

export default LoginScreen;
