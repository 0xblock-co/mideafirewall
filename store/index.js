import commonServiceApi from "@/services/shared/common.service";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import defaultConfigSlice from "./defaultConfig.slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./auth.slice";
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = (reducer) => persistReducer(persistConfig, reducer);

const rootReducer = combineReducers({
  defaultConfig: defaultConfigSlice,
  auth: authSlice,
  [commonServiceApi.reducerPath]: commonServiceApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer(rootReducer),
    middleware: (gDM) => gDM().concat(commonServiceApi.middleware),
  });
export const wrapper = createWrapper(makeStore, { debug: true });
