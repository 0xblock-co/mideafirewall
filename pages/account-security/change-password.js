import { NextSeo } from "next-seo";
import { Fragment, useState } from "react";

import ChangePasswordForm from "@/components/Auth/change-password-block";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { asyncRestPassword } from "@/services/auth/auth.service";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import Loader from "@/components/Loader";

const ForgotPasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleResetPasswordSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        asyncRestPassword({
          userId: formData.userId,
          password: formData.password,
        })
      );
      setIsLoading(false);
      if (response?.payload?.isSuccess) {
        newInfoAlert(
          "Password Reset Successful",
          "Your password has been successfully reset. You can now log in using your new password.",
          "OK",
          "success"
        ).then(() => {
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
      <NextSeo title="Change Password" />
      <BoxContainerWithFilterIconWrapper lg={12} xl={7} xxl={6}>
        <ChangePasswordForm
          handleResetPasswordSubmit={handleResetPasswordSubmit}
        />
      </BoxContainerWithFilterIconWrapper>
      <Loader isLoading={isLoading} />
    </Fragment>
  );
};

export default ForgotPasswordScreen;
