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
          console.log("res: asyncGetAllHeaderData", res);
          if (res && res?.isSuccess) {
            return thunkAPI.fulfillWithValue(res.data);
          }
          return thunkAPI.rejectWithValue(res);
        });
      return response;
    } catch (error) {
      console.log("error: ", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
