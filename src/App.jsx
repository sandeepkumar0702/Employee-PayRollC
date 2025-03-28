// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './Component/Login';
// import Dashboard from './Component/Dashboard';
// import Registration from './Component/Registration';

// const isAuthenticated = () => !!localStorage.getItem('userName');

// const ProtectedRoute = ({ element }) => {
//   return isAuthenticated() ? element : <Navigate to="/" />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />
//         <Route path="/registration" element={<ProtectedRoute element={<Registration />} />} />
//         <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import Registration from './Component/Registration';

const isAuthenticated = () => !!localStorage.getItem('userName');

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/registration" /> : <Login />
          }
        />
        <Route path="/registration" element={<ProtectedRoute element={<Registration />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;