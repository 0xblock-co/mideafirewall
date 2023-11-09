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
        const payload = response.payload;

        if (payload.emailVerified === false) {
          newInfoAlert(
            "Email Verification Required",
            "Please check your email and verify it before attempting to log in.",
            "OK",
            "error"
          ).then(() => {
            // Handle the case when email is not verified
          });
        } else if (payload.surveyAnswered === false) {
          router.push("/survey");
        } else {
          if (response?.payload?.api_secret === "") {
            router.push("/pricing");
            // newInfoAlert(
            //   "Free quota exceeded",
            //   "Unlock additional features by subscribing to access extended operations beyond the current limit.",
            //   "OK",
            //   "warning",
            //   true
            // )
            //   .then(() => {
            //     router.push("/pricing");
            //   })
            //   .catch(() => {
            //     router.push("/network-blog");
            //   });
          } else {
            router.push("/network-blog");
          }
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
