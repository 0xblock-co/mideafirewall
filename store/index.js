import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commonServiceApi from "@/services/shared/common.service";
import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import defaultConfigSlice from "./defaultConfig.slice";
import authSlice from "./auth.slice";

export let persistor = null;

const allReducers = combineReducers({
    defaultConfig: defaultConfigSlice,
    auth: authSlice,
    [commonServiceApi.reducerPath]: commonServiceApi.reducer,
});

const rootReducers = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    }
    return allReducers(state, action);
};

export const makeStore = () => {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return configureStore({
            reducer: rootReducers,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: false,
                }).concat(commonServiceApi.middleware),
        });
    }
    const persistConfig = {
        key: "mfw-root",
        storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducers);
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(commonServiceApi.middleware),
        devTools: true,
    });
    persistor = persistStore(store);
    return store;
};
export const wrapper = createWrapper(makeStore, { debug: true });
