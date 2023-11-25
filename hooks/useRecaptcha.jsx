import getConfig from "next/config";
import { useState } from "react";
import { verifyRecaptcha } from "../services/recaptcha-v3/recaptcha";
import { ToastMessage } from "../utils/toastMessage.utils";

const useRecaptcha = () => {
    const [captchaToken, setCaptchaToken] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const { publicRuntimeConfig } = getConfig();

    const executeRecaptcha = async () => {
        try {
            const token = await grecaptcha.execute(publicRuntimeConfig.reCaptchaSiteKey, { action: "submit" });
            setCaptchaToken(token);
        } catch (error) {
            // console.error('An error occurred during reCAPTCHA execution:', error);
            ToastMessage.error("reCAPTCHA execution failed. Please try again.");
        }
    };

    const verifyCaptcha = async () => {
        try {
            const captchaVerified = await verifyRecaptcha(captchaToken);
            setCaptchaVerified(captchaVerified);
            if (!captchaVerified) {
                ToastMessage.error("reCAPTCHA execution failed. Please try again.");
            }
        } catch (error) {
            // console.error('An error occurred during reCAPTCHA verification:', error);
            ToastMessage.error("reCAPTCHA verification failed. Please try again.");
        }
    };

    return {
        captchaToken,
        captchaVerified,
        executeRecaptcha,
        verifyCaptcha,
    };
};

export default useRecaptcha;
