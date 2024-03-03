"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

let middleware = [apiSlice.middleware];

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});
