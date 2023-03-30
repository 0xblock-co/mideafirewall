import Api from "@/services/Api";
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
    const response = await api.post("/user", payload).then(async (res) => {
      return res;
    });
    return response;
  } catch (error) {
    return error;
  }
};
