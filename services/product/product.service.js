import CommonUtility from "@/utils/common.utils";
import Api from "../RTK/axiosAPI.handler";

const api = Api.getInstance();
// NEW API START
export const asyncUploadContentByUrl = async (userEmail, queryPayload) => {
  try {
    const queryString = CommonUtility.objectToParams(queryPayload);
    const response = api
      .post(`/mfw/media/${userEmail}/url/filters?${queryString}`)
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (e) {
    return e.message;
  }
};

export const asyncGetContentEventLogs = async (
  userEmail,
  contentId,
  apiKey
) => {
  try {
    const response = api
      .get(`/mfw/model/config/${userEmail}/${contentId}?apikey=${apiKey}`)
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (e) {
    return e.message;
  }
};
export const asyncUploadFileContent = async (
  bodyPayload,
  userEmail,
  queryFilters
) => {
  try {
    const queryString = CommonUtility.objectToParams(queryFilters);

    const response = api
      .post(`/mfw/media/${userEmail}/filters?${queryString}`, bodyPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        console.log("res: ", res);
        return res;
      });
    return response;
  } catch (e) {
    return e.message;
  }
};
export const asyncGenerateProofsByEmail = async (apiKey, payload) => {
  try {
    const response = api
      .post(`/media/mfw/event/proofs/update?apikey=${apiKey}`, payload)
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (e) {
    return e.message;
  }
};

export const asyncGetHeaderData = async () => {
  try {
    const response = api
      .get(
        "https://mediafirewall.themillionvisions.com/mfw/web/customerCategories?activate=true&pageNumber=0&pageSize=100"
      )
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (e) {
    return e.message;
  }
};

// NEW API END
export const asyncGetQuestions = async () => {
  try {
    const response = api
      .get("/Questionnaire/mfw_customer")
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

export const asyncGetPricingQuestions = async () => {
  try {
    const response = api.get("/Questionnaire/mfw_pricing").then(async (res) => {
      if (res && res?.isSuccess) {
        return res;
      }
    });
    return response;
  } catch (e) {
    return e.message;
  }
};

export const asyncGetAllPricingData = async () => {
  try {
    const response = api
      .get(
        "https://mediafirewall.themillionvisions.com/mfw/web/tiers/?active=true&pageNumber=0&pageSize=10",
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
    return e;
  }
};

export const asyncGetDefaultMeeting = async () => {
  try {
    const response = api.get("/meetings/default").then(async (res) => {
      if (res && res?.isSuccess) {
        return res;
      }
    });
    return response;
  } catch (e) {
    return e.message;
  }
};

export const asyncCreateMeeting = async (payload, user) => {
  try {
    const response = api
      .post(`/meetings/${user?.userId}`, payload)
      .then(async (res) => {
        return res;
      });
    return response;
  } catch (error) {
    return error;
  }
};
