import Api from "@/services/Api";

const api = new Api();

export const asyncGetProducts = async () => {
  try {
    const response = await api
      .get("/customerCategories?activate=true&pageNumber=0&pageSize=10")
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

export const asyncGetQuestions = async () => {
  try {
    const response = await api
      .get("/Questionnaire/?activate=true&pageNumber=0&pageSize=10")
      .then(async (res) => {
        if (res && res?.isSuccess) {
          return res;
        }
      });
    return response;
  } catch (e) {
    console.log("e :>> ", e);
    return e.message;
  }
};
