import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthenticateRoutes, OrgRoutes, StudentRoutes } from "./routes";

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
                            <Dashboard />
                        </StudentRoutes>
                    }
                />
            </Route>

            {/* Org Routes  */}
            <Route path="org">
                <Route
                    path="dashboard"
                    element={
                        <OrgRoutes>
                            <Dashboard />
                        </OrgRoutes>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
