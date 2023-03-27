import Api from "@/services/Api";
const api = new Api();
export const asyncSignUpService = async (payload) => {
  try {
    const response = await api.post("/users/", payload).then(async (res) => {
      console.log("res :>> ", res);
      return res;
    });
    return response;
  } catch (error) {
    console.log("error :>> ", error);
    error.message;
  }
};
