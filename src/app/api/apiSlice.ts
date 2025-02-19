import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { config } from "@/config/config";
import { deleteCredentials, setCredentials } from "@/features/auth/authSlice";

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

const baseQueryWithRefresh: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Attempt to refresh token
        const refreshResult = await baseQuery(
            { url: "/auth/refresh", method: "POST" },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data));

            // Retry the original request with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            deleteCredentials();
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithRefresh,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ["User"],
    endpoints: () => ({}),
});
