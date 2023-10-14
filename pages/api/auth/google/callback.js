/* eslint-disable import/no-anonymous-default-export */
import { google } from "googleapis";

export default async (req, res) => {
  const { code } = req.query;
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    const { id_token } = tokens;
    res.redirect(
      `/account-security/login?authType="google"&success=true&value=${id_token}`
    );
  } catch (error) {
    console.error("Error authenticating with Google:", error);
    res.redirect("/error");
  }
};
