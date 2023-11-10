import Api from "./axiosAPI.handler";

const apiInstance = Api.getInstance();
export const customBaseQuery = async (args: any) => {
    const { url, method, body, conf = {}, isErrorHandle = true, isSuccessHandle = true } = args;
    try {
        const response = await apiInstance.makeCustomRequestBaseQuery(method, url, body, conf, isErrorHandle, isSuccessHandle);
        return { data: response };
    } catch (error) {
        return { error };
    }
};
