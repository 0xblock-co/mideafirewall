import crypto from "crypto";
import querystring from "querystring";
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URL;

const LINKEDIN_AUTHORIZATION_URL = "https://www.linkedin.com/oauth/v2/authorization";

export default async function handler(req, res) {
    const params = {
        response_type: "code",
        client_id: LINKEDIN_CLIENT_ID,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        state: crypto.randomBytes(16).toString("hex"),
        scope: "r_liteprofile",
    };

    const authorizationUrl = `${LINKEDIN_AUTHORIZATION_URL}?${querystring.stringify(params)}`;

    res.redirect(authorizationUrl);
}
