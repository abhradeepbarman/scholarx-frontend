import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/common/DashboardLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import { Dashboard as OrgDashboard } from "./pages/Organization/Dashboard/Dashboard";
import { AuthenticateRoutes, OrgRoutes, StudentRoutes } from "./routes";
import AddScholarship from "./pages/Organization/Scholarships/AddScholarship";
import ViewScholarships from "./pages/Organization/Scholarships/ViewScholarships";
import ViewApplications from "./pages/Organization/Applications/ViewApplications";

function App() {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="auth">
                <Route
                    path="login"
                    element={
                        <AuthenticateRoutes>
                            <Login />
                        </AuthenticateRoutes>
                    }
                />
                <Route
                    path="register"
                    element={
                        <AuthenticateRoutes>
                            <Register />
                        </AuthenticateRoutes>
                    }
                />
            </Route>

            {/* Student Routes  */}
            <Route path="student">
                <Route
                    path="dashboard"
                    element={
                        <StudentRoutes>
                            <DashboardLayout />
                        </StudentRoutes>
                    }
                >
                    {/* <Route path="" element={<StudentDashboard />} /> */}
                </Route>
            </Route>

            {/* Org Routes  */}
            <Route
                path="org"
                element={
                    <OrgRoutes>
                        <DashboardLayout />
                    </OrgRoutes>
                }
            >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<OrgDashboard />} />
                <Route path="scholarships/add" element={<AddScholarship />} />
                <Route
                    path="scholarships/view"
                    element={<ViewScholarships />}
                />
                <Route path="applications" element={<ViewApplications />} />
            </Route>
        </Routes>
    );
}

export default App;
