import { apiSlice } from "@/app/api/apiSlice";

export const LogoutApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userLogout: builder.mutation<void, void>({
            query: () => ({
                url: "/api/v1/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useUserLogoutMutation } = LogoutApiSlice;
