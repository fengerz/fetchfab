import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,

  prepareHeaders: (headers) => {
    headers.set("X-Requested-With", "XMLHttpRequest");
    return headers;
  },

  credentials: "include",
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQuery,
  tagTypes: ["Product", "Collection", "Comment", "User"],
  endpoints: () => ({
    //injected
  }),
});
