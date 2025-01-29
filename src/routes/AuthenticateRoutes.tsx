import { RootState } from "@/app/store";
import { UserRole } from "@/config/constants";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthenticateRoutes({ children }: { children: React.ReactNode }) {
    const { access_token, role } = useSelector(
        (state: RootState) => state.auth
    );

    if (access_token) {
        return role === UserRole.STUDENT ? (
            <Navigate to="/student/dashboard" />
        ) : (
            <Navigate to="/org/dashboard" />
        );
    }

    return <React.Fragment>{children}</React.Fragment>;
}

export default AuthenticateRoutes;
