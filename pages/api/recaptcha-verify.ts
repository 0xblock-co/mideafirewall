import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body;

    try {
        const response = await axios.get(`https://recaptcha.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`);
        // console.log('response: ', response);
        const { success } = response.data;
        if (success) {
            return res.status(200).send({ success });
        }
        return res.status(500).json({ success: false });
    } catch (error) {
        console.error("An error occurred during reCAPTCHA verification:", error);
        return res.status(500).json({ success: false });
    }
}
