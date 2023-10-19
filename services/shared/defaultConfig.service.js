import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../RTK/axiosAPI.handler";
import CommonUtility from "@/utils/common.utils";

const api = Api.getInstance();

export const asyncGetAllHeaderData = createAsyncThunk(
  "GET_ALL_HEADER_DATA_OPTIONS",
  async (payload, thunkAPI) => {
    try {
      const queryStringData = CommonUtility.objectToParams({
        activate: true,
        pageNumber: 0,
        pageSize: 100,
      });
      const response = api
        .get(
          `https://mediafirewall.themillionvisions.com/mfw/web/customerCategories?${queryStringData}`,
          {},
          false,
          false
        )
        .then(async (res) => {
          console.log("res: ", res);
          if (res && res?.isSuccess) {
            console.log("res.data: 1", res.data);
            let updatedData = [];
            if (res.data && CommonUtility.isValidArray(res.data.items)) {
              const existingData = res.data.items;
              // Helper function to check for duplicate features
              const isDuplicateFeature = (features, feature) =>
                features.some(
                  (existingFeature) =>
                    existingFeature.featureId === feature.featureId &&
                    existingFeature.name === feature.name
                );

              // Extract all features from existing objects while avoiding duplicates
              const allFeatures = existingData.reduce((features, current) => {
                return current.features.reduce((result, feature) => {
                  if (!isDuplicateFeature(result, feature)) {
                    result.push(feature);
                  }
                  return result;
                }, features);
              }, []);

              const newObject = {
                id: "0",
                name: "All",
                // Copy all other properties from the first existing object (assuming there's at least one object)
                ...(existingData.length > 0 && {
                  description: existingData[0].description,
                }),
                active: true,
                features: allFeatures,
                examples: [], // You can set this to an empty array or copy it from an existing object
              };
              updatedData = [newObject, ...existingData];
            }
            console.log("11 ---", { ...res.data, updatedData });
            return thunkAPI.fulfillWithValue({ ...res.data, updatedData });
          }
          return thunkAPI.rejectWithValue(res);
        });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
