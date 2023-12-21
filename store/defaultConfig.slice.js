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
    selectedPricingPlan: null,
    satisfactionMetricsCount: 20,
    allMediaContents: null,
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
        // setMfwTestCustomers(state, { payload }) {
        //     state.mfwTestCustomers = payload;
        // },
        setSatisfactionMetricsCount(state, { payload }) {
            state.satisfactionMetricsCount = payload;
        },
        setAllMediaContents(state, { payload }) {
            state.allMediaContents = payload;
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
    // setMfwTestCustomers,
    setSatisfactionMetricsCount,
    setAllMediaContents,
} = defaultConfigSlice.actions;

// Selectors
export const getAllHeaderDataOptions = (state) => state.defaultConfig.allHeaderDataList?.data?.items || [];

export const getAllHeaderDataOptionsUpdated = (state) => {
    return state.defaultConfig.allHeaderDataList?.data?.updatedData || [];
};

export const getAllPricingPlanSelector = (state) => state.defaultConfig?.allPricingPlanList?.data?.items || [];
export const getSelectedPlan = (state) => state.defaultConfig?.selectedPricingPlan || null;
export const getMFWSatisfactionMetricsCount = (state) => state.defaultConfig?.satisfactionMetricsCount || null;
export const getMFWMediaContents = (state) => state.defaultConfig?.allMediaContents || null;

// export const getMfwTestCustomersSelector = (state) => state.defaultConfig?.mfwTestCustomers || null;

// Reducer
export default defaultConfigSlice.reducer;
