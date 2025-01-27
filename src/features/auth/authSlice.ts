import { AuthState } from "@/@types/features/authSlice";
import { createSlice } from "@reduxjs/toolkit";

const isExist = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

const initialState: AuthState = {
    user_id: isExist ? isExist?.id : null,
    role: isExist ? isExist?.role : null,
    access_token: isExist ? isExist?.access_token : null,
};

export const authSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setCredentials: (state: AuthState, action) => {
            const payload = action.payload;
            state.user_id = payload.id;
            state.role = payload.role;
            state.access_token = payload.access_token;
            localStorage.setItem("user", JSON.stringify(payload));
        },
        logout: (state: AuthState) => {
            state.user_id = null;
            state.role = null;
            state.access_token = null;
            localStorage.removeItem("user");
        },
        updateCredentials: (state: AuthState, action) => {
            const payload = action.payload;
            state.user_id = payload.id;
            state.role = payload.role;
            state.access_token = payload.access_token;
            localStorage.setItem("user", JSON.stringify(payload));
        },
    },
});

export const { setCredentials, logout, updateCredentials } = authSlice.actions;
export default authSlice.reducer;
