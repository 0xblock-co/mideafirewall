import axios from "axios";
export const verifyRecaptcha = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.post("/api/recaptcha-verify", { token });
        return response.data.success;
    } catch (error) {
        console.error("reCAPTCHA verification failed:", error);
        return false;
    }
};
