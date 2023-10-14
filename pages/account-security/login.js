import { Fragment, useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { useAppDispatch } from "@/store/hooks";
import LoginBlock from "@/components/Auth/login-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import Loader from "@/components/Loader";
import {
  asyncLoginWithEmail,
  asyncSocialAuth,
} from "@/services/auth/auth.service";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLogin, checkAuthRouteV2 } = useAuth();

  useEffect(() => {
    const { isActive, route } = checkAuthRouteV2();
    if (isLogin && !isActive) {
      router.push(route);
      return;
    }
  }, []);

  useEffect(() => {
    if ("value" in router.query && router.query?.value !== "") {
      dispatch(
        asyncSocialAuth({
          authType: "google",
          idToken: router.query?.value,
        })
      )
        .unwrap()
        .then((response) => {
          if (!response.surveyAnswered) {
            router.push("/survey");
          }
          router.push("/network-blog");
        });
    }
  }, [router.query]);

  const handleLoginSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const response = await dispatch(
        asyncLoginWithEmail({
          email: formData.email,
          passWord: formData.password || "",
          recaptchaResponse: formData.gReCaptchaToken,
          authType: formData?.authType,
        })
      );
      setIsLoading(false);
      if (response?.payload?.isSuccess) {
        const { surveyAnswered, emailVerified } = response?.payload;
        if (!emailVerified) {
          await newInfoAlert(
            "Email Verification Required",
            "Please check your email and verify it before attempting to log in.",
            "OK",
            "error"
          );
        } else if (!surveyAnswered) {
          router.push("/survey");
        } else {
          router.push("/network-blog");
        }
      }
    } catch (error) {
      setIsLoading(false);
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
