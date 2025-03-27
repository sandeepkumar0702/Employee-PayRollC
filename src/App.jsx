import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate ,useLocation} from "react-router-dom";
import Registration from "./Component/Register/Registration";
import Dashboard from "./Component/Dashboard/Dashboard";
import Login from "./Component/Login/Login";
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("userName");
  return isAuthenticated ? element : <Navigate to="/" replace />;
};
const PublicRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("userName");
  const location = useLocation(); // Get the current location
  console.log(location);
  return isAuthenticated ? <Navigate to={location.state?.from || "/dashboard"} replace /> : element;
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute element={<Login />} />} />
        <Route path="/registration" element={<ProtectedRoute element={<Registration />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}
export default App;
