/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
    const params = {
        client_id: process.env.MICROSOFT_CLIENT_ID,
        redirect_uri: process.env.MICROSOFT_REDIRECT_URI,
        response_type: "code",
        scope: "openid profile User.Read",
        state: process.env.SECRET,
    };

    const authorizationUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${new URLSearchParams(params)}`;

    res.redirect(authorizationUrl);
};
