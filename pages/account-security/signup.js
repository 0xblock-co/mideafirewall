import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import RegisterBlock from "@/components/Auth//register-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import Loader from "@/components/Loader";
import { asyncSignUpWithEmail } from "@/services/auth/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useAuth } from "@/contexts/AuthContext";

const SignupScreen = () => {
  const router = useRouter();
  const { isLogin, checkAuthRouteV2 } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const { isActive, route } = checkAuthRouteV2();
    if (isLogin && !isActive) {
      router.push(route);
      return;
    }
  }, []);

  const dispatch = useAppDispatch();
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
