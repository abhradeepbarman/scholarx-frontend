import { LoginInput, LoginResponse } from "@/@types/auth/login.types";
import { apiSlice } from "@/app/api/apiSlice";

export const userLoginApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userLogin: builder.mutation<LoginResponse, LoginInput>({
            query: (credentials) => ({
                url: "/api/v1/auth/login",
                method: "POST",
                body: { ...credentials },
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useUserLoginMutation } = userLoginApiSlice;
