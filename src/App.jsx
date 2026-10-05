import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profil from "./pages/Profil";
import Statistik from "./pages/Statistik";

import Pengumuman from "./pages/Pengumuman";
import Agenda from "./pages/Agenda";

function App() {
  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profil"
          element={<Profil />}
        />

        <Route
          path="/statistik"
          element={<Statistik />}
        />

        {/* =========================
            PENGUMUMAN
        ========================= */}
        <Route
          path="/pengumuman"
          element={<Pengumuman />}
        />

        {/* =========================
            AGENDA
        ========================= */}
        <Route
          path="/agenda"
          element={<Agenda />}
        />

      </Routes>
    </Router>
  );
}

export default App;