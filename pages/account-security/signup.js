import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import RegisterBlock from "@/components/Auth//register-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import Loader from "@/components/Loader";
import {
  asyncSignUpWithEmail,
  asyncSocialAuth,
} from "@/services/auth/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useAuth } from "@/contexts/AuthContext";

const SignupScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isLogin, checkAuthRouteV2 } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { isActive, route } = checkAuthRouteV2();
    if (isLogin && !isActive) {
      router.push(route);
    }
  }, [isLogin, router, checkAuthRouteV2]);

  useEffect(() => {
    const { value, authType } = router.query;
    if (value && value !== "" && authType && authType !== "") {
      const decodedAuthType = decodeURIComponent(authType);
      dispatch(asyncSocialAuth({ authType: decodedAuthType, idToken: value }))
        .unwrap()
        .then((response) => {
          if (!response.surveyAnswered) {
            router.push("/survey");
          } else {
            router.push("/network-blog");
          }
        });
    }
  }, [router.query, dispatch]);

  const handleSubmitSignUp = async (formData) => {
    setIsLoading(true);

    try {
      const response = await dispatch(
        asyncSignUpWithEmail({
          ...formData,
        })
      );
      setIsLoading(false);
      if (response?.payload?.isSuccess) {
        await newInfoAlert(
          "Sign-Up Complete",
          "Your sign-up is complete! Please check your email for account verification before logging in.",
          "Continue",
          "success"
        );
        router.push("/account-security/login");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <NextSeo title="Create Account" />
      <BoxContainerWithFilterIconWrapper lg={12} xl={7} xxl={6}>
        <RegisterBlock handleSubmitSingUp={handleSubmitSignUp} />
      </BoxContainerWithFilterIconWrapper>
      <Loader isLoading={isLoading} />
    </Fragment>
  );
};

export default SignupScreen;
