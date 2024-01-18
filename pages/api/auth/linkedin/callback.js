import axios from "axios";
import querystring from "querystring";

export const LINKEDIN_ACCESS_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
// export const LINKEDIN_PROFILE_URL = "https://api.linkedin.com/v2/userinfo";

export async function callbackHandler(req, res) {
    // Verify the state parameter to prevent CSRF attacks
    const { code } = req.query;
    const payload = {
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.LINKEDIN_REDIRECT_URL,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    };
    const payloadString = querystring.stringify(payload);
    try {
        const tokenResponse = await axios.post(LINKEDIN_ACCESS_TOKEN_URL, payloadString);
        const { access_token } = tokenResponse.data;
        console.log("access_token: ", access_token);
        if ("access_token" in tokenResponse.data) {
            res.redirect(`/account-security/login?authType=linkedin&success=true&value=${access_token}`);
        } else {
            res.redirect(`/account-security/login?authType=linkedin&success=false&value=`);
        }
    } catch (e) {
        console.error("Error during LinkedIn API request:", e);
        res.redirect("/");
    }
}

export default callbackHandler;
