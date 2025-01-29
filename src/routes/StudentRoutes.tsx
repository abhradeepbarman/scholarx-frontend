import { RootState } from "@/app/store";
import { UserRole } from "@/config/constants";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function StudentRoutes({ children }: { children: React.ReactNode }) {
    const { access_token, role } = useSelector(
        (state: RootState) => state.auth
    );

    if (!access_token) {
        return <Navigate to={"/auth/login"} />;
    }

    return role === UserRole.STUDENT ? (
        <>{children}</>
    ) : (
        <Navigate to={location.pathname} />
    );
}

export default StudentRoutes;
