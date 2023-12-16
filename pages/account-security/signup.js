import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import RegisterBlock from "@/components/Auth//register-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import GoogleCaptchaWrapper from "@/components/GoogleCaptchaWrapper";
import Loader from "@/components/Loader";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import { asyncSignUpWithEmail, asyncSocialAuth } from "@/services/auth/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { newInfoAlert } from "@/utils/toastMessage.utils";

const SignupScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { isLogin } = useAuthV3();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isLogin) {
            router.replace("/network-blog");
        }
    }, [isLogin]);

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
                await newInfoAlert("Sign-Up Complete", "Your sign-up is complete! Please check your email for account verification before logging in.", "Continue", "success");
                router.push("/account-security/login");
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <GoogleCaptchaWrapper>
            <NextSeo title="Create Account" />
            <BoxContainerWithFilterIconWrapper lg={12} xl={7} xxl={6}>
                <RegisterBlock handleSubmitSingUp={handleSubmitSignUp} />
            </BoxContainerWithFilterIconWrapper>
            <Loader isLoading={isLoading} />
        </GoogleCaptchaWrapper>
    );
};

export default SignupScreen;
