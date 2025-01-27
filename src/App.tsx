import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";

function App() {
    return (
        <Routes>
            <Route path="auth">
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    );
}

export default App;
