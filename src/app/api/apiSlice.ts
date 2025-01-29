import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { config } from "@/config/config";

const baseQuery = fetchBaseQuery({
    baseUrl: config.API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.access_token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ["User"],
    endpoints: () => ({}),
});
