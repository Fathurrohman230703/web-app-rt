import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ profile, onLogout }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Cek menu yang sedang aktif
  const isActive = (path) => location.pathname === path;

  // Ambil huruf pertama nama
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "W";
  };

  // Style menu navbar
  const navClass = (path) => `
    px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${
      isActive(path)
        ? "bg-orange-50 text-orange-600 font-semibold"
        : "text-slate-600 hover:text-orange-600 hover:bg-orange-50/50"
    }
  `;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-orange-100 bg-white/95 backdrop-blur-md">

      {/* =========================
          NAVBAR
      ========================= */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">

        {/* =========================
            BRAND + MENU
        ========================= */}
        <div className="flex items-center gap-8">

          {/* BRAND */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5"
          >
            <img
              src="erte10.png"
              alt="Logo RT 10"
              className="h-8 sm:h-10 w-auto object-contain"
            />

            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-800 leading-tight">
              ErteSapuluh
            </span>
          </Link>


          {/* =========================
              MENU DESKTOP
          ========================= */}
          <nav className="hidden md:flex items-center gap-1">

            {/* BERANDA */}
            <Link
              to="/dashboard"
              className={navClass("/dashboard")}
            >
              Beranda
            </Link>

            {/* PROFIL */}
            <Link
              to="/profil"
              className={navClass("/profil")}
            >
              Profil
            </Link>

            {/* STATISTIK */}
            <Link
              to="/statistik"
              className={navClass("/statistik")}
            >
              Statistik
            </Link>

          </nav>

        </div>


        {/* =========================
            USER + LOGOUT + MOBILE
        ========================= */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* USER */}
          <div className="flex items-center gap-2">

            <Avatar className="h-7 w-7 sm:h-8 sm:w-8 bg-orange-500 font-semibold text-white">

              <AvatarFallback className="bg-orange-500 text-white text-xs sm:text-sm">
                {getInitial(profile?.nama_lengkap)}
              </AvatarFallback>

            </Avatar>

            <span className="hidden text-sm font-medium text-slate-700 lg:inline-block">
              {profile?.nama_lengkap || "Warga"}
            </span>

          </div>


          {/* LOGOUT */}
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-red-200 text-xs sm:text-sm text-red-600 hover:bg-red-50 hover:text-red-700 px-2.5 sm:px-3 h-8 sm:h-9"
          >
            Logout
          </Button>


          {/* HAMBURGER MOBILE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex md:hidden items-center justify-center p-1.5 rounded-md text-slate-600 hover:text-orange-600 hover:bg-orange-50 focus:outline-none"
            aria-label="Main menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

        </div>

      </div>


      {/* =========================
          MOBILE MENU
      ========================= */}
      {isOpen && (
        <div className="md:hidden border-t border-orange-100 bg-white px-4 pt-2 pb-3 space-y-1">

          {/* BERANDA */}
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={`block ${navClass("/dashboard")} text-base`}
          >
            Beranda
          </Link>

          {/* PROFIL */}
          <Link
            to="/profil"
            onClick={() => setIsOpen(false)}
            className={`block ${navClass("/profil")} text-base`}
          >
            Profil
          </Link>

          {/* STATISTIK */}
          <Link
            to="/statistik"
            onClick={() => setIsOpen(false)}
            className={`block ${navClass("/statistik")} text-base`}
          >
            Statistik
          </Link>

        </div>
      )}

    </header>
  );
}