import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profil from './pages/Profil';
import Statistik from './pages/Statistik';

function App() {
  return (
    <Router>
      <Routes>

        {/* Halaman awal */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Beranda */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Profil */}
        <Route
          path="/profil"
          element={<Profil />}
        />

        {/* Statistik */}
        <Route
          path="/statistik"
          element={<Statistik />}
        />

      </Routes>
    </Router>
  );
}

export default App;