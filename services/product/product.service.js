import Api from "@/services/api";

const api = new Api();

export const asyncGetProducts = async () => {
  try {
    const response = await api
      .get("/customerCategories?activate=true&pageNumber=0&pageSize=10")
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (e) {
    return e.message;
  }
};

export const asyncGetQuestions = async () => {
  try {
    const response = await api
      .get("/Questionnaire/mfw_customer")
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

export const asyncGetPricingQuestions = async () => {
  try {
    const response = await api
      .get("/Questionnaire/mfw_pricing")
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

export const asyncGetAllPricingData = async () => {
  try {
    const response = await api
      .get("/tiers/?active=true&pageNumber=0&pageSize=10")
      .then(async (res) => {
        if (res && res?.isSuccess) {
          return res;
        }
      });
    return response;
  } catch (e) {
    console.log("e :>> ", e);
    return e;
  }
};

export const asyncGetDefaultMeeting = async () => {
  try {
    const response = await api.get("/meetings/default").then(async (res) => {
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

export const asyncCreateMeeting = async (payload, user) => {
  try {
    const response = await api
      .post(`/meetings/${user?.userId}`, payload)
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (error) {
    return error;
  }
};
