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

// const baseQueryWithRefresh = async (args: any, api: any, extraOptions: any) => {
//     let result = await baseQuery(args, api, extraOptions);

//     if (result.error && result.error.status === 401) {
//         // Attempt to refresh token
//         const refreshResult = await baseQuery(
//             { url: "/auth/refresh", method: "POST" },
//             api,
//             extraOptions
//         );

//         if (refreshResult.data) {
//             // Store the new access token
//             api.dispatch({
//                 type: "auth/setAccessToken",
//                 payload: refreshResult.data.access_token,
//             });

//             // Retry the original request with the new token
//             result = await baseQuery(args, api, extraOptions);
//         }
//     }

//     return result;
// };

export const apiSlice = createApi({
    baseQuery,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ["User"],
    endpoints: () => ({}),
});
