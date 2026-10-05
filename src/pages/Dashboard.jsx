import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Megaphone,
  Users,
  Home,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import WelcomeCard from "../components/dashboard/WelcomeCard";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================
  // AMBIL DATA PROFILE
  // =========================
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Kalau belum login
      if (!user) {
        navigate("/login");
        return;
      }

      const { data: userProfile, error } = await supabase
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
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 font-medium text-orange-600">
        Memuat beranda RT 10...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50/50 text-slate-900 overflow-x-hidden">

      {/* =========================
          NAVBAR
      ========================= */}
      <Navbar profile={profile} onLogout={handleLogout} />

      {/* =========================
          CONTENT
      ========================= */}
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-20">

        {/* =========================
            WELCOME
        ========================= */}
        <section>
          <WelcomeCard
            nama={profile?.full_name || profile?.nama || profile?.name}
            role={profile?.role}
          />
        </section>

        {/* =========================
            INFORMATION SECTION
        ========================= */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-10 sm:py-12">

          {/* =========================
              PENGUMUMAN
          ========================= */}
          <div className="lg:col-span-3">

            {/* HEADER */}
            <div className="flex items-end justify-between mb-5">
              <div>
                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                    <Megaphone className="w-4 h-4 text-orange-500" />
                  </div>

                  <h2 className="text-lg font-semibold text-slate-900">
                    Pengumuman Terbaru
                  </h2>

                </div>

                <p className="text-sm text-slate-400 mt-1 ml-10">
                  Informasi terbaru untuk warga
                </p>
              </div>

              <Link
                to="/pengumuman"
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-colors"
              >
                Lihat semua
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* LIST PENGUMUMAN */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">

              {/* =========================
                  PENGUMUMAN 1
              ========================= */}
              <Link
                to="/pengumuman/1"
                className="group block p-5 border-b border-slate-200 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex gap-4">

                  {/* ICON */}
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                      <Megaphone className="w-4 h-4 text-orange-500" />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-2 flex-wrap">

                      <h3 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                        Kerja Bakti Lingkungan
                      </h3>

                      <Badge className="bg-orange-500 hover:bg-orange-500 text-[10px] px-2 py-0.5">
                        PENTING
                      </Badge>

                    </div>

                    <div className="flex items-center gap-2 mt-1.5">

                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" />

                      <span className="text-xs text-slate-400">
                        12 Oktober 2026
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mt-3">
                      Mari bersama menjaga kebersihan dan kenyamanan lingkungan
                      RT 10 / RW 06.
                    </p>

                  </div>

                  {/* ARROW */}
                  <div className="flex-shrink-0 self-center">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-orange-50 transition-colors">

                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors" />

                    </div>

                  </div>

                </div>
              </Link>

              {/* =========================
                  PENGUMUMAN 2
              ========================= */}
              <Link
                to="/pengumuman/2"
                className="group block p-5 border-b border-slate-200 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex gap-4">

                  {/* ICON */}
                  <div className="flex-shrink-0">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50">

                      <Megaphone className="w-4 h-4 text-slate-500" />

                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-2 flex-wrap">

                      <h3 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                        Rapat Warga RT 10
                      </h3>

                      <Badge
                        variant="outline"
                        className="text-blue-600 border-blue-200 text-[10px] px-2 py-0.5"
                      >
                        INFO
                      </Badge>

                    </div>

                    <div className="flex items-center gap-2 mt-1.5">

                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" />

                      <span className="text-xs text-slate-400">
                        19 Oktober 2026
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mt-3">
                      Pembahasan kegiatan dan kebutuhan lingkungan warga RT 10.
                    </p>

                  </div>

                  {/* ARROW */}
                  <div className="flex-shrink-0 self-center">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-orange-50 transition-colors">

                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors" />

                    </div>

                  </div>

                </div>
              </Link>

              {/* =========================
                  PENGUMUMAN 3
              ========================= */}
              <Link
                to="/pengumuman/3"
                className="group block p-5 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex gap-4">

                  {/* ICON */}
                  <div className="flex-shrink-0">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50">

                      <Megaphone className="w-4 h-4 text-slate-500" />

                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-2 flex-wrap">

                      <h3 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                        Informasi Kegiatan Warga
                      </h3>

                      <Badge
                        variant="outline"
                        className="text-emerald-600 border-emerald-200 text-[10px] px-2 py-0.5"
                      >
                        KEGIATAN
                      </Badge>

                    </div>

                    <div className="flex items-center gap-2 mt-1.5">

                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" />

                      <span className="text-xs text-slate-400">
                        25 Oktober 2026
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mt-3">
                      Informasi mengenai kegiatan masyarakat dan kebersamaan
                      warga RT 10.
                    </p>

                  </div>

                  {/* ARROW */}
                  <div className="flex-shrink-0 self-center">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-orange-50 transition-colors">

                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors" />

                    </div>

                  </div>

                </div>
              </Link>

            </div>
          </div>

          {/* =========================
              AGENDA
          ========================= */}
          <div className="lg:col-span-2">

            <div className="flex items-center justify-between mb-5">

              <div>

                <div className="flex items-center gap-2">

                  <CalendarDays className="w-4 h-4 text-orange-500" />

                  <h2 className="text-lg font-semibold text-slate-900">
                    Agenda
                  </h2>

                </div>

                <p className="text-sm text-slate-400 mt-1">
                  Kegiatan mendatang
                </p>

              </div>

              <Link
                to="/agenda"
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-colors"
              >
                Semua
                <ArrowUpRight className="w-4 h-4" />
              </Link>

            </div>

            {/* AGENDA CARD */}
            <Card className="border-slate-200 shadow-none bg-white">

              <CardContent className="p-0">

                {/* =========================
                    AGENDA 1
                ========================= */}
                <Link
                  to="/agenda/1"
                  className="group flex items-center gap-4 p-4 border-b border-slate-200 hover:bg-slate-50/70 transition-colors"
                >

                  <div className="flex-shrink-0 w-12 text-center">

                    <p className="text-[10px] font-semibold uppercase text-orange-500">
                      Okt
                    </p>

                    <p className="text-2xl font-semibold text-slate-800">
                      12
                    </p>

                  </div>

                  <div className="h-10 w-px bg-slate-200" />

                  <div className="min-w-0 flex-1">

                    <h3 className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">
                      Kerja Bakti
                    </h3>

                    <div className="flex items-center gap-2 mt-1">

                      <Clock3 className="w-3.5 h-3.5 text-slate-400" />

                      <p className="text-xs text-slate-400">
                        07.00 WIB
                      </p>

                    </div>

                  </div>

                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors" />

                </Link>

                {/* =========================
                    AGENDA 2
                ========================= */}
                <Link
                  to="/agenda/2"
                  className="group flex items-center gap-4 p-4 border-b border-slate-200 hover:bg-slate-50/70 transition-colors"
                >

                  <div className="flex-shrink-0 w-12 text-center">

                    <p className="text-[10px] font-semibold uppercase text-orange-500">
                      Okt
                    </p>

                    <p className="text-2xl font-semibold text-slate-800">
                      19
                    </p>

                  </div>

                  <div className="h-10 w-px bg-slate-200" />

                  <div className="min-w-0 flex-1">

                    <h3 className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">
                      Rapat Warga
                    </h3>

                    <div className="flex items-center gap-2 mt-1">

                      <Clock3 className="w-3.5 h-3.5 text-slate-400" />

                      <p className="text-xs text-slate-400">
                        19.30 WIB
                      </p>

                    </div>

                  </div>

                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors" />

                </Link>

                {/* =========================
                    AGENDA 3
                ========================= */}
                <Link
                  to="/agenda/3"
                  className="group flex items-center gap-4 p-4 hover:bg-slate-50/70 transition-colors"
                >

                  <div className="flex-shrink-0 w-12 text-center">

                    <p className="text-[10px] font-semibold uppercase text-orange-500">
                      Okt
                    </p>

                    <p className="text-2xl font-semibold text-slate-800">
                      25
                    </p>

                  </div>

                  <div className="h-10 w-px bg-slate-200" />

                  <div className="min-w-0 flex-1">

                    <h3 className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">
                      Kegiatan Warga
                    </h3>

                    <div className="flex items-center gap-2 mt-1">

                      <Clock3 className="w-3.5 h-3.5 text-slate-400" />

                      <p className="text-xs text-slate-400">
                        16.00 WIB
                      </p>

                    </div>

                  </div>

                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors" />

                </Link>

              </CardContent>

            </Card>
          </div>
        </section>

        {/* =========================
            OVERVIEW
        ========================= */}
        <section className="pb-12">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-900">
              Ringkasan Lingkungan
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Gambaran singkat RT 10 / RW 06
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 border border-slate-200 bg-white">

            {/* WARGA */}
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-slate-200">

              <div className="flex items-center justify-between">

                <Users className="w-5 h-5 text-orange-500" />

                <span className="text-xs text-slate-400">
                  WARGA
                </span>

              </div>

              <p className="text-3xl font-semibold text-slate-900 mt-5">
                408
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Jumlah warga
              </p>

            </div>

            {/* KK */}
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-slate-200">

              <div className="flex items-center justify-between">

                <Home className="w-5 h-5 text-orange-500" />

                <span className="text-xs text-slate-400">
                  KELUARGA
                </span>

              </div>

              <p className="text-3xl font-semibold text-slate-900 mt-5">
                46
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Kepala keluarga
              </p>

            </div>

            {/* WILAYAH */}
            <div className="p-6">

              <div className="flex items-center justify-between">

                <MapPin className="w-5 h-5 text-orange-500" />

                <span className="text-xs text-slate-400">
                  WILAYAH
                </span>

              </div>

              <p className="text-2xl font-semibold text-slate-900 mt-5">
                RT 10
              </p>

              <p className="text-sm text-slate-500 mt-1">
                RW 06 · Sukaleueur Dalam
              </p>

            </div>

          </div>
        </section>

        {/* =========================
            FOOTER QUOTE
        ========================= */}
        <section className="border-t border-slate-200 py-10 sm:py-14 text-center">

          <p className="text-sm font-medium text-orange-500">
            RT 10 / RW 06
          </p>

          <p className="mt-3 text-lg sm:text-xl font-medium tracking-tight text-slate-700">
            “Ngamumule Gotong Royong, Ngawangun Warga anu Sauyunan”
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Sukaleueur Dalam
          </p>

        </section>

      </main>
    </div>
  );
}