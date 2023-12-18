import axios from "axios";

export default async function handler(req, res) {
    const { token } = req.body;

    try {
        const response = await axios.get(`https://recaptcha.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`);
        const { success } = response.data;
        if (success) {
            return res.status(200).send({ success });
        }
        return res.status(500).json({ success: false });
    } catch (error) {
        return res.status(500).json({ success: false });
    }
}
