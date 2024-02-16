import CommonUtility from "@/utils/common.utils";
import Api from "../RTK/axiosAPI.handler";

const api = Api.getInstance();
const baseApiV2 = process.env.NEXT_PUBLIC_API_PATH_V2;

// NEW API START
export const asyncUploadContentByUrl = async (userEmail, queryPayload) => {
    try {
        const queryString = CommonUtility.objectToParams(queryPayload);
        const response = await api.post(`/mfw/media/${userEmail}/url/filters?${queryString}`).then(async (res) => {
            return res;
        });
    } catch (e) {
        return e;
    }
};

export const asyncGetContentEventLogs = async (userEmail, contentId, apiKey) => {
    try {
        const response = api.get(`/mfw/model/config/${userEmail}/${contentId}?apikey=${apiKey}`, {}, true, false).then(async (res) => {
            return res;
        });
        return response;
    } catch (e) {
        return e.message;
    }
};

export const asyncUploadFileContent = async (bodyPayload, userEmail, queryFilters) => {
    try {
        const queryString = CommonUtility.objectToParams(queryFilters);

        const response = api
            .post(`/mfw/media/${userEmail}/filters?${queryString}`, bodyPayload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(async (res) => {
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
            .post(`/media/mfw/event/proofs/update?apikey=${apiKey}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
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
        const response = api.get(`${baseApiV2}/mfw/web/customerCategories?activate=true&pageNumber=0&pageSize=100`, {}, true, false).then(async (res) => {
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
        const response = api.get("/mfw/web/Questionnaire/mfw_customer", {}, true, false).then(async (res) => {
            if (res && res?.isSuccess) {
                return res;
            }
        });
        return response;
    } catch (e) {
        return e.message;
    }
};
export const asyncGetMeetingQuestions = async () => {
    try {
        const response = api.get("/mfw/web/Questionnaire/mfw_meeting", {}, true, false).then(async (res) => {
            if (res && res?.isSuccess) {
                return res;
            }
        });
        return response;
    } catch (e) {
        return e.message;
    }
};
export const asyncGetPricingQuoteQuestions = async () => {
    try {
        const response = api.get("/mfw/web/Questionnaire/mfw_pricing_quote", {}, true, false).then(async (res) => {
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
        const response = api.get("/mfw/web/Questionnaire/mfw_pricing", {}, true, false).then(async (res) => {
            if (res && res?.isSuccess) {
                return res;
            }
        });
        return response;
    } catch (e) {
        return e.message;
    }
};

export const asyncGetAllPricingDataV2 = async (currency) => {
    try {
        const response = api.get(`/mfw/web/tiers/currency/${currency}`, {}, true, false).then(async (res) => {
            if (res && res?.isSuccess) {
                return res;
            }
        });
        return response;
    } catch (e) {
        return e;
    }
};
export const asyncGetAllPricingData = async () => {
    try {
        const response = api.get("/mfw/web/tiers/?active=true&pageNumber=0&pageSize=10", {}, true, false).then(async (res) => {
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
        const response = api.post(`/mfw/web/meeting`, payload).then(async (res) => {
            return res;
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const asyncGetCheckoutSessionUrl = async (stripeCustomerId, selectedProductId, currency) => {
    try {
        const response = api.get(`/mfw/checkout/sessions/url?customerId=${stripeCustomerId}&productId=${selectedProductId}&currency=${currency}`, {}, true, false).then(async (res) => {
            return res;
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const asyncGetCustomerSubscriptionData = async () => {
    try {
        const response = api.post(`/mfw/subscription/details`, {}, {}, true, false).then(async (res) => {
            return res;
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const asyncChangeSubscription = async (payload) => {
    try {
        const response = api.post(`/mfw/change/subscription`, payload, {}, true, false).then(async (res) => {
            return res;
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const asyncCancelSubscription = async (payload) => {
    try {
        const response = api.post(`/mfw/cancel/subscription`, payload, {}, true, false).then(async (res) => {
            return res;
        });
        return response;
    } catch (error) {
        return error;
    }
};
export const asyncCreateStripeCustomer = async (payload) => {
    try {
        const response = api.post(`/mfw/create/customer`, payload, {}, true, false).then(async (res) => {
            return res;
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const asyncGetMFWTestCustomers = async () => {
    try {
        const response = api.get(`/mfw/test/customers`, {}, true, false).then(async (res) => {
            return res;
        });
        return response;
    } catch (e) {
        return e.message;
    }
};

export const asyncUserSatisfactionMetrics = async () => {
    try {
        const response = api.get(`/business/metrics`, {}, false, false).then(async (res) => {
            return res;
        });
        return response;
    } catch (e) {
        return e.message;
    }
};

export const asyncCreateMeetingLink = async (payload) => {
    try {
        const response = api.get(`/mfw/web/meeting/${payload.meetingTool}/${payload.meetingFor}`, payload, true, false).then(async (res) => {
            return res;
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const asyncGetAllContents = async (payload) => {
    try {
        const response = api.get(`${baseApiV2}/mfw/web/content/`, {}, true, false).then(async (res) => {
            return res;
        });
        return response;
    } catch (error) {
        return error;
    }
};
