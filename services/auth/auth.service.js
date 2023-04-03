import Api from "@/services/api";
const api = new Api();
export const asyncSignUpService = async (payload) => {
  try {
    const response = await api.post("/users/", payload).then(async (res) => {
      return res;
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const asyncLoginService = async (payload) => {
  try {
    const response = await api
      .post("/users/form", payload)
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (error) {
    return error;
  }
};

export const asyncSurveySubmitAnswers = async (payload) => {
  try {
    const response = await api
      .post("/mfw/web/Questionnaire/answers/users/beta", payload)
      .then(async (res) => {
        console.log("res: ", res);
        return res;
      });
    return response;
  } catch (error) {
    return error;
  }
};
