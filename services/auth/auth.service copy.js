import Api from "../RTK/axiosAPI.handler";

const api = Api.getInstance();
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

export const asyncSurveySubmitAnswers = (payload, user) => {
    try {
        const response = api.post(`https://mediafirewall.themillionvisions.com/mfw/web/Questionnaire/answers/users/${user?.userId || user?.id}`, payload).then(async (res) => {
            return res;
        });
        return response;
    } catch (error) {
        return error;
    }
};
