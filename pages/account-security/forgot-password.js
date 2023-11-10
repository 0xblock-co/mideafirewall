import { NextSeo } from "next-seo";
import { Fragment, useState } from "react";

import ForgotPasswordBlock from "@/components/Auth/forgot-password-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { asyncForgotPassword } from "@/services/auth/auth.service";
import Loader from "@/components/Loader";

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
            <NextSeo title="Forgot Password" />
            <BoxContainerWithFilterIconWrapper lg={12} xl={7} xxl={6}>
                <ForgotPasswordBlock handleForgotPasswordSubmit={handleForgotPasswordSubmit} />
            </BoxContainerWithFilterIconWrapper>
            <Loader isLoading={isLoading} />
        </Fragment>
    );
};

export default ForgotPasswordScreen;
