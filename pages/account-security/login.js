/* eslint-disable @next/next/no-sync-scripts */
import LoginBlock from "@/components/Auth/login-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import GoogleCaptchaWrapper from "@/components/GoogleCaptchaWrapper";
import Loader from "@/components/Loader";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import { asyncLoginWithEmail, asyncSocialAuth } from "@/services/auth/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { isLogin, user } = useAuthV3();
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if (isLogin) {
    //         if (user && CommonUtility.isNotEmptyObject(user)) {
    //             if (!user?.surveyAnswered) {
    //                 router.replace("/survey");
    //             } else {
    //                 router.replace("/features-list");
    //             }
    //         }
    //     }
    // }, [isLogin]);

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

    const handleLoginSubmit = async (formData) => {
        setIsLoading(true);

        try {
            dispatch(
                asyncLoginWithEmail({
                    email: formData.email,
                    passWord: formData.password || "",
                    recaptchaResponse: formData.gReCaptchaToken,
                    authType: formData?.authType,
                })
            )
                .unwrap()
                .then((response) => {
                    setIsLoading(false);
                    if (response?.isSuccess) {
                        if (response.surveyAnswered == false) {
                            router.replace("/survey");
                            return;
                        }
                        if (!response.surveyAnswered) {
                            router.push("/survey");
                        } else {
                            router.push("/features-list");
                        }
                    }
                });
        } catch (error) {
            console.error("Login Error:", error);
            setIsLoading(false);
        } finally {
            await setIsLoading(false);
        }
    };

    return (
        <>
            <NextSeo
                title="Login"
                description="Access your MediaFirewall account with ease. Login securely with your email and password or choose a faster option with Google, Microsoft, or LinkedIn. Experience convenient and reliable authentication for your MediaFirewall account."
                canonical="https://mediafirewall.ai/account-security/login"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://mediafirewall.ai/account-security/login",
                    title: "Login",
                    description:
                        "Access your MediaFirewall account with ease. Login securely with your email and password or choose a faster option with Google, Microsoft, or LinkedIn. Experience convenient and reliable authentication for your MediaFirewall account.",
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
                        content: "Login, Media Firewall, Secure Login, Email and Password, Google Login, Microsoft Login, LinkedIn Login, Authentication, User Access, Media Firewall & AI",
                    },
                ]}
            />

            <GoogleCaptchaWrapper>
                <NextSeo title="Login" />
                <BoxContainerWithFilterIconWrapper lg={12} xl={7} xxl={6}>
                    <LoginBlock handleLoginSubmit={handleLoginSubmit} />
                </BoxContainerWithFilterIconWrapper>
                <Loader isLoading={isLoading} />
            </GoogleCaptchaWrapper>
        </>
    );
};

export default LoginScreen;
