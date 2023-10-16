/* eslint-disable import/no-anonymous-default-export */

export default async (req, res) => {
  const { code } = req.query;

  const tokenUrl = "https://login.microsoftonline.com/common/oauth2/v2.0/token";

  const tokenRequestData = {
    client_id: process.env.MICROSOFT_CLIENT_ID,
    scope: "openid profile User.Read", // Same scopes as in the authorization request
    tenantId: process.env.MICROSOFT_TENANT_ID,
    code,
    redirect_uri: process.env.MICROSOFT_REDIRECT_URI,
    grant_type: "authorization_code",
    client_secret: process.env.MICROSOFT_CLIENT_SECRET,
  };

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(tokenRequestData).toString(),
    });

    const tokenData = await tokenResponse.json();
    if(tokenData && "id_token" in tokenData){
      res.redirect(
        `/account-security/login?authType="microsoft"&success=true&value=${tokenData.id_token}`
      );
    }else{
      res.redirect(
        `/account-security/login?authType="microsoft"&success=false&value=`
      );
    }
  } catch (error) {
    console.error("Error authenticating with Microsoft:", error);
    res.redirect("/error"); // Handle the error accordingly
  }
};
