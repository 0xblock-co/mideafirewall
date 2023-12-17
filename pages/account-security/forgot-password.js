import { NextSeo } from "next-seo";
import { Fragment, useState } from "react";

import ForgotPasswordBlock from "@/components/Auth/forgot-password-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import Loader from "@/components/Loader";
import { asyncForgotPassword } from "@/services/auth/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useRouter } from "next/router";

const ForgotPasswordScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleForgotPasswordSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const response = await dispatch(
                asyncForgotPassword({
                    email: formData.email,
                })
            );
            setIsLoading(false);
            if (response?.payload?.isSuccess) {
                newInfoAlert("Password Reset Request Submitted", "Please check your email for further instructions on resetting your password.", "OK", "success").then(() => {
                    router.push("/account-security/login");
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Forgot password request failed:", error);
        }
    };

    return (
        <Fragment>
            <NextSeo
                title="Forgot Password"
                description="Recover your MediaFirewall account password quickly. Use the Forgot Password feature to reset your password securely. Follow the simple steps to regain access to your account. Experience hassle-free password recovery with MediaFirewall."
                canonical="https://mediafirewall.ai/account-security/forgot-password"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://mediafirewall.ai/account-security/forgot-password",
                    title: "Forgot Password",
                    description:
                        "Recover your MediaFirewall account password quickly. Use the Forgot Password feature to reset your password securely. Follow the simple steps to regain access to your account. Experience hassle-free password recovery with MediaFirewall.",
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
                        content: "Forgot Password, Password Recovery, Media Firewall, Account Access, Secure Password Reset, Hassle-Free Recovery, Password Forgot, Media Firewall & AI",
                    },
                ]}
            />
            {/* <NextSeo title="Forgot Password" /> */}
            <BoxContainerWithFilterIconWrapper lg={12} xl={7} xxl={6}>
                <ForgotPasswordBlock handleForgotPasswordSubmit={handleForgotPasswordSubmit} />
            </BoxContainerWithFilterIconWrapper>
            <Loader isLoading={isLoading} />
        </Fragment>
    );
};

export default ForgotPasswordScreen;
