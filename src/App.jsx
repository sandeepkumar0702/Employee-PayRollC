import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Component/Login/Login";
import Dashboard from "./Component/Dashboard/Dashboard";
import PayrollForm from "./Component/PayrollForm/PayrollForm"; // Import PayrollForm
import Header from "./Component/Header/Header";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("googleUser");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <>
                <Dashboard />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/payroll-form"
          element={
            isAuthenticated ? (
              <>
                <PayrollForm />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
