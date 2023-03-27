import Api from "@/services/Api";

const api = new Api();

export const asyncGetProducts = async () => {
  try {
    const response = await api.get("/getProducts").then(async (res) => {
      if (res && res?.isSuccess) {
        return res;
      }
    });
    return response;
  } catch (e) {
    return e.message;
  }
};
