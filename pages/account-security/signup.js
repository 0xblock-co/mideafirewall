import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import RegisterBlock from "@/components/Auth//register-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import GoogleCaptchaWrapper from "@/components/GoogleCaptchaWrapper";
import Loader from "@/components/Loader";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import OnlyForAuthRoute from "@/contexts-v2/onlyForAuth";
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
            router.replace("/features-list");
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
                        router.push("/features-list");
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
        <>
            <NextSeo
                title="Create Account"
                description="Create a new MediaFirewall account effortlessly. Sign up using your email and password or opt for a quicker registration with Google, Microsoft, or LinkedIn. Enjoy a seamless onboarding experience with secure and efficient authentication methods."
                canonical="https://mediafirewall.ai/account-security/signup"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://mediafirewall.ai/account-security/signup",
                    title: "Signup",
                    description:
                        "Create a new MediaFirewall account effortlessly. Sign up using your email and password or opt for a quicker registration with Google, Microsoft, or LinkedIn. Enjoy a seamless onboarding experience with secure and efficient authentication methods.",
                    site_name: "Media Firewall & AI",
                }}
                // twitter={{
                //     cardType: "summary_large_image",
                //     handle: "@yourTwitterHandle", // Replace with your Twitter handle
                //     site: "@yourTwitterHandle", // Replace with your Twitter handle
                // }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "Signup, Media Firewall, Create Account, Email and Password, Google Signup, Microsoft Signup, LinkedIn Signup, Registration, Onboarding, Authentication, Media Firewall & AI",
                    },
                ]}
            />
            <GoogleCaptchaWrapper>
                {/* <NextSeo title="Create Account" /> */}
                <BoxContainerWithFilterIconWrapper lg={12} xl={7} xxl={6}>
                    <RegisterBlock handleSubmitSingUp={handleSubmitSignUp} />
                </BoxContainerWithFilterIconWrapper>
                <Loader isLoading={isLoading} />
            </GoogleCaptchaWrapper>
        </>
    );
};

export default OnlyForAuthRoute(SignupScreen);
