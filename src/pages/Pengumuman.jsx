import { useEffect, useState } from "react";
import {
  CalendarDays,
  Megaphone,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";

const pengumumanData = [
  {
    id: 1,
    judul: "Kerja Bakti Lingkungan",
    kategori: "PENTING",
    tanggal: "12 Oktober 2026",
    isi:
      "Mari bersama menjaga kebersihan dan kenyamanan lingkungan RT 10 / RW 06. Kegiatan kerja bakti akan dilaksanakan bersama seluruh warga.",
  },
  {
    id: 2,
    judul: "Rapat Warga RT 10",
    kategori: "INFO",
    tanggal: "19 Oktober 2026",
    isi:
      "Pembahasan kegiatan dan kebutuhan lingkungan warga RT 10 serta beberapa hal yang berkaitan dengan kepentingan bersama.",
  },
  {
    id: 3,
    judul: "Informasi Kegiatan Warga",
    kategori: "KEGIATAN",
    tanggal: "25 Oktober 2026",
    isi:
      "Informasi mengenai kegiatan masyarakat dan kebersamaan warga RT 10 / RW 06 Sukaleueur Dalam.",
  },
  {
    id: 4,
    judul: "Jadwal Kebersihan Lingkungan",
    kategori: "INFO",
    tanggal: "28 Oktober 2026",
    isi:
      "Pembagian jadwal kebersihan lingkungan untuk setiap wilayah RT 10.",
  },
  {
    id: 5,
    judul: "Persiapan Kegiatan Bulanan",
    kategori: "KEGIATAN",
    tanggal: "2 November 2026",
    isi:
      "Persiapan kegiatan rutin bulanan warga RT 10.",
  },
];

export default function Pengumuman() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Menyimpan ID pengumuman yang sedang dibuka
  const [expandedId, setExpandedId] = useState(null);

  // Filter pengumuman
  const [filter, setFilter] = useState("semua");

  const navigate = useNavigate();

  // =========================
  // AMBIL PROFILE
  // =========================
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const {
        data: userProfile,
        error,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Gagal mengambil profile:", error);
      }

      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // =========================
  // BUKA / TUTUP DETAIL
  // =========================
  const togglePengumuman = (id) => {
    setExpandedId((currentId) =>
      currentId === id ? null : id
    );
  };

  // =========================
  // FILTER DATA
  // =========================
  const filteredPengumuman =
    filter === "terbaru"
      ? [...pengumumanData].sort(
          (a, b) => b.id - a.id
        )
      : pengumumanData;

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 font-medium text-orange-600">
        Memuat pengumuman...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50/50 text-slate-900">

      {/* NAVBAR */}
      <Navbar
        profile={profile}
        onLogout={handleLogout}
      />

      <main className="mx-auto w-full max-w-4xl px-4 sm:px-6 pt-24 pb-16">

        {/* =========================
            HEADER
        ========================= */}
        <section className="mb-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
              <Megaphone className="h-5 w-5 text-orange-500" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Pengumuman
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Informasi terbaru untuk warga RT 10 / RW 06
              </p>
            </div>

          </div>

        </section>

        {/* =========================
            FILTER
        ========================= */}
        <div className="flex items-center gap-2 mb-6">

          <button
            type="button"
            onClick={() => setFilter("semua")}
            className={`
              px-3 py-1.5 rounded-lg
              text-xs font-medium
              transition-colors
              ${
                filter === "semua"
                  ? "bg-orange-500 text-white"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-orange-200 hover:text-orange-600"
              }
            `}
          >
            Semua
          </button>

          <button
            type="button"
            onClick={() => setFilter("terbaru")}
            className={`
              px-3 py-1.5 rounded-lg
              text-xs font-medium
              transition-colors
              ${
                filter === "terbaru"
                  ? "bg-orange-500 text-white"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-orange-200 hover:text-orange-600"
              }
            `}
          >
            Terbaru
          </button>

        </div>

        {/* =========================
            LIST
        ========================= */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">

          {filteredPengumuman.map((item, index) => {

            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={
                  index !== filteredPengumuman.length - 1
                    ? "border-b border-slate-200"
                    : ""
                }
              >

                {/* =========================
                    PENGUMUMAN UTAMA
                ========================= */}
                <button
                  type="button"
                  onClick={() => togglePengumuman(item.id)}
                  className="group w-full text-left block p-5 sm:p-6 hover:bg-slate-50/70 transition-colors"
                >

                  <div className="flex gap-4">

                    {/* ICON */}
                    <div className="flex-shrink-0">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                        <Megaphone className="h-4 w-4 text-orange-500" />
                      </div>

                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">

                      {/* TITLE + CATEGORY */}
                      <div className="flex items-center gap-2 flex-wrap">

                        <h2 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                          {item.judul}
                        </h2>

                        <span
                          className={`
                            text-[10px] font-semibold
                            px-2 py-0.5 rounded-full
                            ${
                              item.kategori === "PENTING"
                                ? "bg-orange-100 text-orange-600"
                                : item.kategori === "KEGIATAN"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-blue-50 text-blue-600"
                            }
                          `}
                        >
                          {item.kategori}
                        </span>

                      </div>

                      {/* DATE */}
                      <div className="flex items-center gap-2 mt-2">

                        <CalendarDays className="h-3.5 w-3.5 text-slate-400" />

                        <span className="text-xs text-slate-400">
                          {item.tanggal}
                        </span>

                      </div>

                      {/* SHORT DESCRIPTION */}
                      <p className="text-sm text-slate-500 leading-relaxed mt-3 line-clamp-2">
                        {item.isi}
                      </p>

                      {/* TOGGLE */}
                      <div className="flex items-center gap-1 mt-4 text-xs font-medium text-orange-600">

                        {isExpanded
                          ? "Tutup detail"
                          : "Baca selengkapnya"}

                        <ChevronDown
                          className={`
                            h-3.5 w-3.5
                            transition-transform duration-200
                            ${isExpanded ? "rotate-180" : ""}
                          `}
                        />

                      </div>

                    </div>

                  </div>

                </button>

                {/* =========================
                    DETAIL TERBUKA
                ========================= */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6">

                    <div className="ml-[56px] rounded-xl border border-orange-100 bg-orange-50/40 p-5">

                      <h3 className="text-sm font-semibold text-slate-800">
                        Detail Pengumuman
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.isi}
                      </p>

                      <div className="mt-5">

                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Tanggal Pengumuman
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {item.tanggal}
                        </p>

                      </div>

                    </div>

                  </div>
                )}

              </div>
            );
          })}

        </div>

        {/* =========================
            BACK
        ========================= */}
        <div className="mt-8">

          <Link
            to="/dashboard"
            className="text-sm text-slate-400 hover:text-orange-600 transition-colors"
          >
            ← Kembali ke Beranda
          </Link>

        </div>

      </main>

    </div>
  );
}