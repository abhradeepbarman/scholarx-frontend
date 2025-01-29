import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import { AuthenticateRoutes, OrgRoutes, StudentRoutes } from "./routes";
import DashboardLayout from "./layout/DashboardLayout";
import { Dashboard as StudentDashboard } from "./pages/Student/Dashboard/Dashboard";
import { Dashboard as OrgDashboard } from "./pages/Organization/Dashboard/Dashboard";

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
                    <Route path="" element={<StudentDashboard />} />
                </Route>
            </Route>

            {/* Org Routes  */}
            <Route path="org">
                <Route
                    path="dashboard"
                    element={
                        <OrgRoutes>
                            <DashboardLayout />
                        </OrgRoutes>
                    }
                >
                    <Route path="" element={<OrgDashboard />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
