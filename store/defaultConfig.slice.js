import { asyncGetAllHeaderData } from "@/services/shared/defaultConfig.service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    languageList: [
        { code: "zh", name: "Chinese" },
        { code: "en", name: "English" },
        { code: "fr", name: "French" },
        { code: "de", name: "German" },
        { code: "pt", name: "Portuguese" },
        { code: "es", name: "Spanish" },
    ],
    headerData: [],
    supportedMediaTypes: [],
    selectedPricingPlan: null,
    satisfactionMetricsCount: 20,
    allMediaContents: null,
    geoLocationData: null,
    partnersData: [
        {
            partnerId: "AWS",
            name: "Amazon Web Services",
            types: ["INVESTOR", "TECHNOLOGY_PARTNER", "STRATEGIC_PARTNER"],
            contactInformation: "https://aws.amazon.com/",
            description: "Description of AWS",
            logoUrl: "https://dsf360-web-media-bucket.s3.ap-south-1.amazonaws.com/partners/AWS/aws.png",
            active: true,
        },
        {
            partnerId: "INTEL",
            name: "Intel Corporation",
            types: ["INVESTOR", "TECHNOLOGY_PARTNER", "STRATEGIC_PARTNER"],
            contactInformation: "https://www.intel.com/",
            description: "Description of Intel",
            logoUrl: "https://dsf360-web-media-bucket.s3.ap-south-1.amazonaws.com/partners/INTEL/intel.png",
            active: true,
        },
        {
            partnerId: "MICROSOFT",
            name: "Microsoft Corporation",
            types: ["INVESTOR", "STRATEGIC_PARTNER", "TECHNOLOGY_PARTNER"],
            contactInformation: "https://www.microsoft.com/",
            description: "Description of Microsoft",
            logoUrl: "https://dsf360-web-media-bucket.s3.ap-south-1.amazonaws.com/partners/MICROSOFT/Microsoft.png",
            active: true,
        },
        {
            partnerId: "NVIDIA",
            name: "Nvidia Corporation",
            types: ["INVESTOR", "TECHNOLOGY_PARTNER", "STRATEGIC_PARTNER"],
            contactInformation: "https://www.nvidia.com/",
            description: "Description of Nvidia",
            logoUrl: "https://dsf360-web-media-bucket.s3.ap-south-1.amazonaws.com/partners/NVIDIA/nvidia.png",
            active: true,
        },
    ],
    // mfwTestCustomers: [],
    allHeaderDataList: {
        currentRequestId: "",
        isLoading: false,
        error: null,
        data: null,
    },
};

const defaultConfigSlice = createSlice({
    name: "defaultConfigSlice",
    initialState: initialState,
    reducers: {
        setPageTitle(state, { payload }) {
            document.title = `${payload} | weckoffice`;
        },
        setHeaderDataOptions(state, { payload }) {
            state.headerData = payload;
        },
        setSelectedPricingPlan(state, { payload }) {
            state.selectedPricingPlan = payload;
        },
        setGeoLocationData(state, { payload }) {
            state.geoLocationData = payload;
        },
        setMfwTestCustomers(state, { payload }) {
            state.mfwTestCustomers = payload;
        },
        setSatisfactionMetricsCount(state, { payload }) {
            state.satisfactionMetricsCount = payload;
        },
        setAllMediaContents(state, { payload }) {
            state.allMediaContents = payload;
        },
        setPartnersData(state, { payload }) {
            state.partnersData = payload;
        },
        setSupportedMediaTypes(state, { payload }) {
            state.supportedMediaTypes = payload;
        },
    },
    extraReducers: {
        [asyncGetAllHeaderData.pending.type]: (state, _action) => {
            const { requestId } = _action.meta;
            state.allHeaderDataList.isLoading = true;
            state.allHeaderDataList.currentRequestId = requestId;
        },
        [asyncGetAllHeaderData.fulfilled.type]: (state, _action) => {
            const { requestId } = _action.meta;
            if (state.allHeaderDataList.isLoading && state.allHeaderDataList.currentRequestId === requestId) {
                state.allHeaderDataList.isLoading = false;
                state.allHeaderDataList.data = _action.payload;
                state.allHeaderDataList.currentRequestId = undefined;
                state.allHeaderDataList.error = null;
            }
        },
        [asyncGetAllHeaderData.rejected.type]: (state, _action) => {
            const { requestId } = _action.meta;
            if (state.allHeaderDataList.isLoading && state.allHeaderDataList.currentRequestId === requestId) {
                state.allHeaderDataList.isLoading = false;
                state.allHeaderDataList.error = _action.error;
                state.allHeaderDataList.currentRequestId = undefined;
            }
        },
    },
});
// Actions
export const {
    setPageTitle,
    setHeaderDataOptions,
    setSelectedPricingPlan,
    setMfwTestCustomers,
    setSatisfactionMetricsCount,
    setGeoLocationData,
    setAllMediaContents,
    setPartnersData,
    setSupportedMediaTypes,
} = defaultConfigSlice.actions;

// Selectors
export const getAllHeaderDataOptions = (state) => state.defaultConfig.allHeaderDataList?.data?.items || [];

export const getAllHeaderDataOptionsUpdated = (state) => {
    return state.defaultConfig.allHeaderDataList?.data?.updatedData || [];
};

export const getAllPricingPlanSelector = (state) => state.defaultConfig?.allPricingPlanList?.data?.items || [];
export const getSelectedPlan = (state) => state.defaultConfig?.selectedPricingPlan || null;
export const getGeoLocationData = (state) => state.defaultConfig?.geoLocationData || null;
export const getMFWSatisfactionMetricsCount = (state) => state.defaultConfig?.satisfactionMetricsCount || null;
export const getMFWMediaContents = (state) => state.defaultConfig?.allMediaContents || null;
export const getPartnersData = (state) => state.defaultConfig?.partnersData;
export const getSupportedMediaTypes = (state) => state.defaultConfig?.supportedMediaTypes;

export const getMfwTestCustomersSelector = (state) => state.defaultConfig?.mfwTestCustomers || null;

// Reducer
export default defaultConfigSlice.reducer;
