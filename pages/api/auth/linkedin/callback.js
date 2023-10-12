import querystring from "querystring";
import axios from "axios";

export const LINKEDIN_ACCESS_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
export const LINKEDIN_PROFILE_URL = "https://api.linkedin.com/v2/me";

export async function callbackHandler(req, res) {
  const { code } = req.query;
  // Verify the state parameter to prevent CSRF attacks
  const payload = {
    code,
    grant_type: "authorization_code",
    redirect_uri: process.env.LINKEDIN_REDIRECT_URL,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  };

  const payloadString = querystring.stringify(payload);
  const tokenResponse = await axios.post(
    LINKEDIN_ACCESS_TOKEN_URL,
    payloadString
  );
  const { access_token } = tokenResponse.data;
  const profileResponse = await axios.get(LINKEDIN_PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const profileData = profileResponse.data;
  console.log("profileData: ", profileData);
  // TODO:: Need to call backend url
  // Forward the LinkedIn response to the main API
  // try {
  //   const mainAPIResponse = await axios.post(
  //     "https://example.com/api/linkedin",
  //     {
  //       linkedinData: profileData,
  //     }
  //   );

  //   // Handle the response from the main API here

  //   // Redirect the client to the appropriate page
  //   res.redirect("/");
  // } catch (error) {
  //   // Handle error from the main API

  //   // Redirect the client to an error page or display an error message
  //   res.redirect("/error");
  // }
  // Redirect the client to the home page with the success parameter
  res.redirect("/?success=true");
}

export default callbackHandler;
