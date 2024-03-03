"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// console.log(URL);

// console.log("cookies ", cookies);
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["todo"],

  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 60,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({}),
});
