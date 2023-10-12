import commonServiceApi from "@/services/shared/common.service";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import defaultConfigSlice from "./defaultConfig.slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["defaultConfig"],
};

const persistedReducer = (reducer) => persistReducer(persistConfig, reducer);

const rootReducer = combineReducers({
  defaultConfig: defaultConfigSlice,
  [commonServiceApi.reducerPath]: commonServiceApi.reducer,
});

export const makeStore = () =>
  configureStore({
    // reducer: rootReducer,
    reducer: persistedReducer(rootReducer),
    middleware: (gDM) => gDM().concat(commonServiceApi.middleware),
  });
export const wrapper = createWrapper(makeStore, { debug: true });
