"use client";
import getConfig from "next/config";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
export default function GoogleCaptchaWrapper({ children }) {
    const { publicRuntimeConfig } = getConfig();
    const recaptchaKey = publicRuntimeConfig.reCaptchaSiteKey;
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined,
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}
