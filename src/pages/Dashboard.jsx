import { useEffect, useState } from 'react';
import {
  CalendarDays,
  Megaphone,
  Users,
  Home,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';

import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import WelcomeCard from '../components/dashboard/WelcomeCard';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
        navigate('/login');
        return;
      }

      const {
        data: userProfile,
        error,
      } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Gagal mengambil profile:', error);
      }

      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (err) {
      console.error('Terjadi kesalahan:', err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
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
      <Navbar
        profile={profile}
        onLogout={handleLogout}
      />

      {/* =========================
          CONTENT
      ========================= */}
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-20">

        {/* =========================
            WELCOME
        ========================= */}
        <section>
          <WelcomeCard
            nama={
              profile?.full_name ||
              profile?.nama ||
              profile?.name
            }
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

            <div className="flex items-center justify-between mb-5">

              <div>
                <div className="flex items-center gap-2">

                  <Megaphone className="w-4 h-4 text-orange-500" />

                  <h2 className="text-lg font-semibold text-slate-900">
                    Pengumuman Terbaru
                  </h2>

                </div>

                <p className="text-sm text-slate-400 mt-1">
                  Informasi terbaru untuk warga
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                Lihat semua
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>

            </div>


            {/* LIST PENGUMUMAN */}
            <div className="border-t border-slate-200">

              {/* ITEM 1 */}
              <div className="group flex gap-4 py-5 border-b border-slate-200">

                <div className="flex-shrink-0 mt-1.5">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                </div>

                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-2 mb-1 flex-wrap">

                    <h3 className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">
                      Kerja Bakti Lingkungan
                    </h3>

                    <Badge className="bg-orange-500 hover:bg-orange-500 text-[10px]">
                      PENTING
                    </Badge>

                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    Mari bersama menjaga kebersihan dan kenyamanan
                    lingkungan RT 10.
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    2 jam yang lalu
                  </p>

                </div>

                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors mt-1 flex-shrink-0" />

              </div>


              {/* ITEM 2 */}
              <div className="group flex gap-4 py-5 border-b border-slate-200">

                <div className="flex-shrink-0 mt-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </div>

                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-2 mb-1 flex-wrap">

                    <h3 className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">
                      Rapat Warga RT 10
                    </h3>

                    <Badge
                      variant="outline"
                      className="text-blue-600 border-blue-200 text-[10px]"
                    >
                      INFO
                    </Badge>

                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    Pembahasan kegiatan dan kebutuhan lingkungan warga.
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    Kemarin
                  </p>

                </div>

                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors mt-1 flex-shrink-0" />

              </div>


              {/* ITEM 3 */}
              <div className="group flex gap-4 py-5">

                <div className="flex-shrink-0 mt-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </div>

                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-2 mb-1">

                    <h3 className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">
                      Informasi Kegiatan Warga
                    </h3>

                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    Informasi mengenai kegiatan masyarakat RT 10.
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    3 hari yang lalu
                  </p>

                </div>

                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors mt-1 flex-shrink-0" />

              </div>

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

              <Button
                variant="ghost"
                size="sm"
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                Semua
              </Button>

            </div>


            {/* AGENDA */}
            <Card className="border-slate-200 shadow-none bg-white">
              <CardContent className="p-0">

                {/* AGENDA 1 */}
                <div className="flex items-center gap-4 p-4 border-b border-slate-200">

                  <div className="flex-shrink-0 w-12 text-center">

                    <p className="text-[10px] font-semibold uppercase text-orange-500">
                      Okt
                    </p>

                    <p className="text-2xl font-semibold text-slate-800">
                      12
                    </p>

                  </div>

                  <div className="h-10 w-px bg-slate-200" />

                  <div className="min-w-0">

                    <h3 className="font-medium text-slate-800">
                      Kerja Bakti
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Minggu · 07.00 WIB
                    </p>

                  </div>

                </div>


                {/* AGENDA 2 */}
                <div className="flex items-center gap-4 p-4 border-b border-slate-200">

                  <div className="flex-shrink-0 w-12 text-center">

                    <p className="text-[10px] font-semibold uppercase text-orange-500">
                      Okt
                    </p>

                    <p className="text-2xl font-semibold text-slate-800">
                      19
                    </p>

                  </div>

                  <div className="h-10 w-px bg-slate-200" />

                  <div className="min-w-0">

                    <h3 className="font-medium text-slate-800">
                      Rapat Warga
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Minggu · 19.30 WIB
                    </p>

                  </div>

                </div>


                {/* AGENDA 3 */}
                <div className="flex items-center gap-4 p-4">

                  <div className="flex-shrink-0 w-12 text-center">

                    <p className="text-[10px] font-semibold uppercase text-orange-500">
                      Okt
                    </p>

                    <p className="text-2xl font-semibold text-slate-800">
                      25
                    </p>

                  </div>

                  <div className="h-10 w-px bg-slate-200" />

                  <div className="min-w-0">

                    <h3 className="font-medium text-slate-800">
                      Kegiatan Warga
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Sabtu · 08.00 WIB
                    </p>

                  </div>

                </div>

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
                156
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
                48
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
            “Ngamumule Gotong Royong,
            Ngawangun Warga anu Sauyunan”
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Sukaleueur Dalam
          </p>

        </section>

      </main>

    </div>
  );
}