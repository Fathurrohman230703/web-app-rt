import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";

const agendaData = [
  {
    id: 1,
    judul: "Kerja Bakti Lingkungan",
    tanggal: "2026-10-12",
    waktuMulai: "07:00",
    waktuSelesai: "10:00",
    lokasi: "Lingkungan RT 10 / RW 06",
    kategori: "LINGKUNGAN",
    deskripsi:
      "Kegiatan kerja bakti bersama seluruh warga untuk menjaga kebersihan dan kenyamanan lingkungan RT 10 / RW 06 Sukaleueur Dalam.",
  },
  {
    id: 2,
    judul: "Rapat Warga RT 10",
    tanggal: "2026-10-19",
    waktuMulai: "19:30",
    waktuSelesai: "21:00",
    lokasi: "Balai Warga RT 10",
    kategori: "RAPAT",
    deskripsi:
      "Rapat warga untuk membahas kegiatan, kebutuhan lingkungan, serta berbagai hal yang berkaitan dengan kepentingan bersama.",
  },
  {
    id: 3,
    judul: "Kegiatan Silaturahmi Warga",
    tanggal: "2026-10-05",
    waktuMulai: "16:00",
    waktuSelesai: "22:00",
    lokasi: "Balai Warga RT 10",
    kategori: "SOSIAL",
    deskripsi:
      "Kegiatan silaturahmi untuk mempererat hubungan dan kebersamaan antarwarga RT 10 / RW 06 Sukaleueur Dalam.",
  },
  {
    id: 4,
    judul: "Pertemuan Pengurus RT",
    tanggal: "2026-10-28",
    waktuMulai: "20:00",
    waktuSelesai: "21:30",
    lokasi: "Rumah Ketua RT",
    kategori: "RAPAT",
    deskripsi:
      "Pertemuan pengurus RT untuk melakukan evaluasi kegiatan dan persiapan program berikutnya.",
  },
  {
    id: 5,
    judul: "Kegiatan Bulanan Warga",
    tanggal: "2026-11-02",
    waktuMulai: "08:00",
    waktuSelesai: "11:00",
    lokasi: "Lingkungan RT 10",
    kategori: "KEGIATAN",
    deskripsi:
      "Kegiatan rutin bulanan yang melibatkan warga RT 10 untuk mempererat kebersamaan dan kepedulian terhadap lingkungan.",
  },
];

// =====================================================
// FORMAT TANGGAL
// =====================================================
const formatTanggal = (tanggal) => {
  const date = new Date(`${tanggal}T00:00:00`);

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// =====================================================
// FORMAT WAKTU
// =====================================================
const formatWaktu = (waktu) => {
  return `${waktu.replace(":", ".")} WIB`;
};

// =====================================================
// CEK STATUS AGENDA
// =====================================================
const getStatusAgenda = (item) => {
  const mulai = new Date(
    `${item.tanggal}T${item.waktuMulai}:00`
  );

  const selesai = new Date(
    `${item.tanggal}T${item.waktuSelesai}:00`
  );

  const sekarang = new Date();

  if (sekarang < mulai) {
    return "akan_datang";
  }

  if (sekarang >= mulai && sekarang <= selesai) {
    return "berlangsung";
  }

  return "selesai";
};

// =====================================================
// LABEL STATUS
// =====================================================
const getStatusLabel = (status) => {
  switch (status) {
    case "akan_datang":
      return "AKAN DATANG";

    case "berlangsung":
      return "SEDANG BERLANGSUNG";

    case "selesai":
      return "SELESAI";

    default:
      return "";
  }
};

// =====================================================
// WARNA STATUS
// =====================================================
const getStatusClass = (status) => {
  switch (status) {
    case "akan_datang":
      return "bg-blue-50 text-blue-600";

    case "berlangsung":
      return "bg-emerald-50 text-emerald-600";

    case "selesai":
      return "bg-slate-100 text-slate-500";

    default:
      return "bg-slate-100 text-slate-500";
  }
};

export default function Agenda() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ID agenda yang sedang dibuka
  const [expandedId, setExpandedId] = useState(null);

  // Filter agenda
  const [filter, setFilter] = useState("semua");

  const navigate = useNavigate();

  // =====================================================
  // AMBIL PROFILE
  // =====================================================
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

  // =====================================================
  // LOGOUT
  // =====================================================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // =====================================================
  // BUKA / TUTUP DETAIL
  // =====================================================
  const toggleAgenda = (id) => {
    setExpandedId((currentId) =>
      currentId === id ? null : id
    );
  };

  // =====================================================
  // FILTER AGENDA
  // =====================================================
  const filteredAgenda = agendaData.filter((item) => {
    const status = getStatusAgenda(item);

    if (filter === "akan_datang") {
      return status === "akan_datang";
    }

    if (filter === "berlangsung") {
      return status === "berlangsung";
    }

    if (filter === "selesai") {
      return status === "selesai";
    }

    return true;
  });

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 font-medium text-orange-600">
        Memuat agenda...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50/50 text-slate-900">

      {/* =================================================
          NAVBAR
      ================================================= */}
      <Navbar
        profile={profile}
        onLogout={handleLogout}
      />

      <main className="mx-auto w-full max-w-4xl px-4 sm:px-6 pt-24 pb-16">

        {/* =================================================
            HEADER
        ================================================= */}
        <section className="mb-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
              <CalendarDays className="h-5 w-5 text-orange-500" />
            </div>

            <div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Agenda Kegiatan
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Jadwal kegiatan warga RT 10 / RW 06
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            FILTER
        ================================================= */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">

          {/* SEMUA */}
          <button
            type="button"
            onClick={() => setFilter("semua")}
            className={`
              px-3 py-1.5 rounded-lg
              text-xs font-medium
              whitespace-nowrap
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

          {/* AKAN DATANG */}
          <button
            type="button"
            onClick={() => setFilter("akan_datang")}
            className={`
              px-3 py-1.5 rounded-lg
              text-xs font-medium
              whitespace-nowrap
              transition-colors
              ${
                filter === "akan_datang"
                  ? "bg-orange-500 text-white"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-orange-200 hover:text-orange-600"
              }
            `}
          >
            Akan Datang
          </button>

          {/* SEDANG BERLANGSUNG */}
          <button
            type="button"
            onClick={() => setFilter("berlangsung")}
            className={`
              px-3 py-1.5 rounded-lg
              text-xs font-medium
              whitespace-nowrap
              transition-colors
              ${
                filter === "berlangsung"
                  ? "bg-orange-500 text-white"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-orange-200 hover:text-orange-600"
              }
            `}
          >
            Sedang Berlangsung
          </button>

          {/* SELESAI */}
          <button
            type="button"
            onClick={() => setFilter("selesai")}
            className={`
              px-3 py-1.5 rounded-lg
              text-xs font-medium
              whitespace-nowrap
              transition-colors
              ${
                filter === "selesai"
                  ? "bg-orange-500 text-white"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-orange-200 hover:text-orange-600"
              }
            `}
          >
            Selesai
          </button>

        </div>

        {/* =================================================
            LIST AGENDA
        ================================================= */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">

          {filteredAgenda.length === 0 ? (

            <div className="px-6 py-12 text-center">

              <CalendarDays className="mx-auto h-8 w-8 text-slate-300" />

              <p className="mt-3 text-sm font-medium text-slate-500">
                Tidak ada agenda
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Belum ada kegiatan dalam kategori ini.
              </p>

            </div>

          ) : (

            filteredAgenda.map((item, index) => {

              const isExpanded = expandedId === item.id;
              const status = getStatusAgenda(item);

              return (
                <div
                  key={item.id}
                  className={
                    index !== filteredAgenda.length - 1
                      ? "border-b border-slate-200"
                      : ""
                  }
                >

                  {/* =================================================
                      AGENDA UTAMA
                  ================================================= */}
                  <button
                    type="button"
                    onClick={() => toggleAgenda(item.id)}
                    className="group w-full text-left block p-5 sm:p-6 hover:bg-slate-50/70 transition-colors"
                  >

                    <div className="flex gap-4">

                      {/* ICON */}
                      <div className="flex-shrink-0">

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50">
                          <CalendarDays className="h-5 w-5 text-orange-500" />
                        </div>

                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 min-w-0">

                        {/* TITLE + CATEGORY + STATUS */}
                        <div className="flex items-center gap-2 flex-wrap">

                          <h2 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                            {item.judul}
                          </h2>

                          {/* KATEGORI */}
                          <span
                            className={`
                              text-[10px] font-semibold
                              px-2 py-0.5 rounded-full
                              ${
                                item.kategori === "LINGKUNGAN"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : item.kategori === "RAPAT"
                                  ? "bg-blue-50 text-blue-600"
                                  : item.kategori === "SOSIAL"
                                  ? "bg-purple-50 text-purple-600"
                                  : "bg-orange-50 text-orange-600"
                              }
                            `}
                          >
                            {item.kategori}
                          </span>

                          {/* STATUS */}
                          <span
                            className={`
                              text-[10px] font-semibold
                              px-2 py-0.5 rounded-full
                              ${getStatusClass(status)}
                            `}
                          >
                            {getStatusLabel(status)}
                          </span>

                        </div>

                        {/* DATE */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">

                          <div className="flex items-center gap-2">

                            <CalendarDays className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-xs text-slate-400">
                              {formatTanggal(item.tanggal)}
                            </span>

                          </div>

                          {/* TIME */}
                          <div className="flex items-center gap-2">

                            <Clock3 className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-xs text-slate-400">
                              {formatWaktu(item.waktuMulai)}
                              {" - "}
                              {formatWaktu(item.waktuSelesai)}
                            </span>

                          </div>

                          {/* LOCATION */}
                          <div className="flex items-center gap-2">

                            <MapPin className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-xs text-slate-400">
                              {item.lokasi}
                            </span>

                          </div>

                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-sm text-slate-500 leading-relaxed mt-3 line-clamp-2">
                          {item.deskripsi}
                        </p>

                        {/* TOGGLE */}
                        <div className="flex items-center gap-1 mt-4 text-xs font-medium text-orange-600">

                          {isExpanded
                            ? "Tutup detail"
                            : "Lihat selengkapnya"}

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

                  {/* =================================================
                      DETAIL TERBUKA
                  ================================================= */}
                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6">

                      <div className="ml-[60px] rounded-xl border border-orange-100 bg-orange-50/40 p-5">

                        <h3 className="text-sm font-semibold text-slate-800">
                          Detail Kegiatan
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.deskripsi}
                        </p>

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">

                          {/* TANGGAL */}
                          <div>

                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Tanggal
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-700">
                              {formatTanggal(item.tanggal)}
                            </p>

                          </div>

                          {/* WAKTU */}
                          <div>

                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Waktu
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-700">
                              {formatWaktu(item.waktuMulai)}
                              {" - "}
                              {formatWaktu(item.waktuSelesai)}
                            </p>

                          </div>

                          {/* LOKASI */}
                          <div>

                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Lokasi
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-700">
                              {item.lokasi}
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>
                  )}

                </div>
              );
            })

          )}

        </div>

        {/* =================================================
            BACK
        ================================================= */}
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