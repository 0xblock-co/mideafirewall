import { customBaseQuery } from "@/services/RTK/CustomBaseQueryRTK";
import { createApi } from "@reduxjs/toolkit/query/react";

// Create API
export const commonServiceApi = createApi({
  reducerPath: "commonServiceApi",
  baseQuery: customBaseQuery,
  tagTypes: ["All_Feature_list", "All_Header_list"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === "__NEXT_REDUX_WRAPPER_HYDRATE__") {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAllFeatures: builder.query({
      query: () => {
        return {
          url: `/mfw/feature/ui`,
          method: "GET",
          isSuccessHandle: false,
        };
      },
      providesTags: ["All_Feature_list"],
      transformResponse: (res) => {
        return { response: res.data, isSuccess: res.isSuccess };
      },
    }),
    getHeaderData: builder.query({
      query: () => {
        return {
          url: "https://mediafirewall.themillionvisions.com/mfw/web/customerCategories?activate=true&pageNumber=0&pageSize=100",
          method: "GET",
          isSuccessHandle: false,
        };
      },
      providesTags: ["All_Header_list"],
      transformResponse: (res) => {
        return { response: res.data, isSuccess: res.isSuccess };
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllFeaturesQuery,
  useGetHeaderDataQuery,
  util: { getRunningQueriesThunk },
} = commonServiceApi;

// export endpoints for use in SSR
export const { getAllFeatures, getHeaderData } = commonServiceApi.endpoints;
export default commonServiceApi;
