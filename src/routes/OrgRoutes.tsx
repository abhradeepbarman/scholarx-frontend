import { RootState } from "@/app/store";
import { UserRole } from "@/config/constants";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OrgRoutes({ children }: { children: React.ReactNode }) {
    const { access_token, role } = useSelector(
        (state: RootState) => state.auth
    );

    console.log(role, access_token);

    if (!access_token) {
        return <Navigate to={"/auth/login"} />;
    }

    return role === UserRole.ORGANIZATION ? (
        <>{children}</>
    ) : (
        <Navigate to={location.pathname} replace={true} />
    );
}

export default OrgRoutes;
