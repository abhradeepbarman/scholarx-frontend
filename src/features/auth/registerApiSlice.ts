import { RegisterInput, RegisterResponse } from "@/@types/auth/register.types";
import { apiSlice } from "@/app/api/apiSlice";

export const userRegisterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userRegister: builder.mutation<RegisterResponse, RegisterInput>({
            query: (credentials) => ({
                url: "/api/v1/auth/register",
                method: "POST",
                body: { ...credentials },
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useUserRegisterMutation } = userRegisterApiSlice;
