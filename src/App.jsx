import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Component/Login/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import Registration from './Component/Register/Registration';
import Callback from './Component/Login/Callback';

const isAuthenticated = () => !!localStorage.getItem('userName');

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path='/' element={<Login/>}></Route>
    //     <Route path='/dashboard' element={<Dashboard/>}></Route>
    //     <Route path='/registration' element={<Registration/>}></Route>
    //     <Route path='/callback' element={<Callback/>}></Route>

    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />
          }
        />
        <Route path='/callback' element={<Callback/>}></Route>
        <Route path="/registration" element={<ProtectedRoute element={<Registration />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;