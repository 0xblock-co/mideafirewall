import { localStorageKeys } from "@/constants/global.constants";
import { setCookieWithJwtExp } from "@/utils/cookieCreator";
import { setCookieWithExpiration } from "@/utils/globalFunctions";
import { ToastMessage } from "@/utils/toastMessage.utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../RTK/axiosAPI.handler";

const api = Api.getInstance();

// Start New V2
export const asyncLoginWithEmail = createAsyncThunk(
  "LOGIN_WITH_EMAIL",
  async (payload, thunkAPI) => {
    try {
      const response = api
        .post(`/user/signIn/form`, payload, {}, true, false)
        .then(async (res) => {
          if (res && res?.isSuccess) {
            if (res.data && res.data.tokens) {
              setCookieWithExpiration(
                localStorageKeys.userRefreshToken,
                res.data.tokens.refreshToken
              );
              setCookieWithExpiration(
                localStorageKeys.userAccessToken,
                res.data.tokens.accessToken
              );
              setCookieWithJwtExp(
                localStorageKeys.userEmail,
                res.data.userDetails.email,
                res.data.tokens.accessToken
              );
            }
            ToastMessage.success("Logged in successfully.");
            return thunkAPI.fulfillWithValue({
              ...res.data,
              isSuccess: res.isSuccess,
            });
          }
          return thunkAPI.rejectWithValue(res);
        });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const asyncSignUpWithEmail = createAsyncThunk(
  "SIGN_UP_WITH_EMAIL",
  async (payload, thunkAPI) => {
    try {
      const response = api
        .post(`/user/signUp/form`, payload, {}, true, false)
        .then(async (res) => {
          if (res && res?.isSuccess) {
            // if (res.data && res.data.tokens) {
            //   setCookieWithExpiration(
            //     localStorageKeys.userRefreshToken,
            //     res.data.tokens.refreshToken
            //   );
            //   setCookieWithExpiration(
            //     localStorageKeys.userAccessToken,
            //     res.data.tokens.accessToken
            //   );
            //   setCookieWithJwtExp(
            //     localStorageKeys.userEmail,
            //     res.data.userDetails.email,
            //     res.data.tokens.accessToken
            //   );
            // }
            ToastMessage.success("Sign up successfully.");
            return thunkAPI.fulfillWithValue({
              data: {},
              isSuccess: res.isSuccess,
            });
          }
          return thunkAPI.rejectWithValue(res);
        });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const asyncSocialAuth = createAsyncThunk(
  "SOCIAL_AUTH",
  async (payload, thunkAPI) => {
    try {
      const response = api
        .post(
          `https://mediafirewall-ai.themillionvisions.com/user/social/signIn`,
          payload,
          {},
          true,
          false
        )
        .then(async (res) => {
          if (res && res?.isSuccess) {
            if (res && res?.isSuccess) {
              if (res.data && res.data.tokens) {
                setCookieWithExpiration(
                  localStorageKeys.userRefreshToken,
                  res.data.tokens.refreshToken
                );
                setCookieWithExpiration(
                  localStorageKeys.userAccessToken,
                  res.data.tokens.accessToken
                );
                setCookieWithJwtExp(
                  localStorageKeys.userEmail,
                  res.data.userDetails.email,
                  res.data.tokens.accessToken
                );
              }
              return thunkAPI.fulfillWithValue({
                ...res.data,
                isSuccess: res.isSuccess,
              });
            }
          }
          return thunkAPI.rejectWithValue(res);
        });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// End New V2
export const asyncLoginAndSignupService = (payload, idToken) => {
  try {
    const response = api
      .post("/user/signIn/form", payload, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (error) {
    return error;
  }
};

export const asyncGetSignedUpSurveyQuestions = async () => {
  try {
    const response = api
      .get(
        "https://mediafirewall-ai.themillionvisions.com/mfw/web/Questionnaire/mfw_customer",
        {},
        true,
        false
      )
      .then(async (res) => {
        if (res && res?.isSuccess) {
          return res;
        }
      });
    return response;
  } catch (e) {
    return e.message;
  }
};

export const asyncPostSignedUpSurveySubmitAnswers = (payload, user) => {
  try {
    const response = api
      .post(
        `https://mediafirewall-ai.themillionvisions.com/mfw/web/Questionnaire/answers/users/${user?.userDetails?.email}`,
        payload,
        {},
        true,
        false
      )
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (error) {
    return error;
  }
};

export const asyncSurveySubmitAnswers = (payload, user) => {
  try {
    const response = api
      .post(
        `https://mediafirewall-ai.themillionvisions.com/mfw/web/Questionnaire/answers/users/${user?.userDetails?.email}`,
        payload
      )
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (error) {
    return error;
  }
};
