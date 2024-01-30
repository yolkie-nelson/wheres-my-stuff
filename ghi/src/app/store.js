import { configureStore } from "@reduxjs/toolkit";
import { WMSApi } from "./apiSlice.js";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
    reducer: {
        [WMSApi.reducerPath]: WMSApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(WMSApi.middleware),
});

setupListeners(store.dispatch);