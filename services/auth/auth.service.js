import { localStorageKeys } from "@/constants/global.constants";
import { setCookieWithJwtExp } from "@/utils/cookieCreator";
import { getUserBadgeByUserName, setCookieWithExpiration } from "@/utils/globalFunctions";
import { ToastMessage, newInfoAlert } from "@/utils/toastMessage.utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../RTK/axiosAPI.handler";
const baseApi = process.env.NEXT_PUBLIC_API_PATH;

const api = Api.getInstance();

export const asyncLoginWithEmail = createAsyncThunk("LOGIN_WITH_EMAIL", async (payload, thunkAPI) => {
    try {
        const response = api.post(`/user/signIn/form`, payload, {}, true, false).then(async (res) => {
            if (res && res?.isSuccess) {
                if (res.data && res.data.tokens) {
                    setCookieWithExpiration(localStorageKeys.userRefreshToken, res.data.tokens.refreshToken);
                    setCookieWithExpiration(localStorageKeys.userAccessToken, res.data.tokens.accessToken);
                    setCookieWithJwtExp(localStorageKeys.userEmail, res.data.userDetails.email, res.data.tokens.accessToken);
                }
                if (res.data?.emailVerified == false) {
                    newInfoAlert("Email Verification Required", "Please check your email and verify it before attempting to log in.", "OK", "error").then(() => {
                        return thunkAPI.rejectWithValue(res);
                    });
                    return;
                }

                ToastMessage.success("Logged in successfully.");
                res.data.userDetails.profileInfo = getUserBadgeByUserName(res.data.userDetails.firstName, res.data.userDetails.lastName);
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
});

export const asyncSignUpWithEmail = createAsyncThunk("SIGN_UP_WITH_EMAIL", async (payload, thunkAPI) => {
    try {
        const response = api.post(`/user/signUp/form`, payload, {}, true, false).then(async (res) => {
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
});

export const asyncSocialAuth = createAsyncThunk("SOCIAL_AUTH", async (payload, thunkAPI) => {
    try {
        const response = api.post(`${baseApi}/user/social/signIn`, payload, {}, true, false).then(async (res) => {
            if (res && res?.isSuccess) {
                if (res && res?.isSuccess) {
                    if (res.data && res.data.tokens) {
                        setCookieWithExpiration(localStorageKeys.userRefreshToken, res.data.tokens.refreshToken);
                        setCookieWithExpiration(localStorageKeys.userAccessToken, res.data.tokens.accessToken);
                        setCookieWithJwtExp(localStorageKeys.userEmail, res.data.userDetails.email, res.data.tokens.accessToken);
                    }
                    res.data.userDetails.profileInfo = getUserBadgeByUserName(res.data.userDetails.firstName, res.data.userDetails.lastName);
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
});

export const asyncForgotPassword = createAsyncThunk("asyncForgotPassword", async (payload, thunkAPI) => {
    try {
        const response = api.post(`${baseApi}/user/reset/password/${payload.email}?userId=${payload.email}`, payload, {}, true, false).then(async (res) => {
            if (res && res?.isSuccess) {
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
});

export const asyncRestPassword = createAsyncThunk("asyncRestPassword", async (payload, thunkAPI) => {
    try {
        const response = api.put(`${baseApi}/user/reset/password/${payload.userId}?password=${payload.password}&token=${payload.token}`, payload, {}, true, false).then(async (res) => {
            if (res && res?.isSuccess) {
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
});

export const asyncGetSignedUpSurveyQuestionsV2 = createAsyncThunk("GET_SIGNED_UP_SURVEY_QUESTIONS", async (payload, thunkAPI) => {
    try {
        const response = api.get(`${baseApi}/mfw/web/Questionnaire/mfw_customer_v2`, {}, true, false).then(async (res) => {
            // const response = api.get(`${baseApi}/mfw/web/Questionnaire/mfw_customer`, {}, true, false).then(async (res) => {
            if (res && res?.isSuccess) {
                return thunkAPI.fulfillWithValue({
                    data: res.data,
                    isSuccess: res.isSuccess,
                });
            }
            return thunkAPI.rejectWithValue(res);
        });
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const asyncPostSignedUpSurveySubmitAnswersV2 = createAsyncThunk("SUBMIT_SURVEY_ANSWERS", async (payload, thunkAPI) => {
    try {
        const response = api.post(`${baseApi}/mfw/web/Questionnaire/answers/users/${payload?.userEmail}/${payload?.surveyType}`, payload.answers, {}, true, false).then(async (res) => {
            if (res && res?.isSuccess) {
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
});

// export const asyncPostSignedUpSurveySubmitAnswers = (payload, user, surveyType) => {
//     try {
//         const response = api
//             .post(`${baseApi}/mfw/web/Questionnaire/answers/users/${user?.userDetails?.email}/${surveyType}`, payload, {}, true, false)
//             .then(async (res) => {
//                 return res;
//             });
//         return response;
//     } catch (error) {
//         return error;
//     }
// };
