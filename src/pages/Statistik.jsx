import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import StatCards from '../components/dashboard/StatCards';
import GenderChart from '../components/dashboard/GenderChart';
import UsiaChart from '../components/dashboard/UsiaChart';

export default function Statistik() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [statsData, setStatsData] = useState({
    totalKK: 0,
    totalWarga: 0,
    totalPria: 0,
    totalWanita: 0,
    totalProjek: 0,
  });

  const [genderChartData, setGenderChartData] = useState([]);
  const [usiaChartData, setUsiaChartData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStatistikData();
  }, []);

  // =========================
  // AMBIL DATA STATISTIK
  // =========================
  const fetchStatistikData = async () => {
    try {
      setLoading(true);

      // =========================
      // CEK USER LOGIN
      // =========================
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate('/login');
        return;
      }

      // =========================
      // AMBIL PROFILE
      // =========================
      const {
        data: userProfile,
        error: profileError,
      } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error(
          'Gagal mengambil profile:',
          profileError
        );
      }

      if (userProfile) {
        setProfile(userProfile);
      }

      // ==================================================
      // DATA DUMMY SEMENTARA
      // ==================================================

      // Statistik Card
      setStatsData({
        totalKK: 46,
        totalWarga: 408,
        totalPria: 213,
        totalWanita: 195,
        totalProjek: 3,
      });

      // Grafik Gender
      setGenderChartData([
        {
          gender: 'Pria',
          total: 213,
          fill: '#f97316',
        },
        {
          gender: 'Wanita',
          total: 195,
          fill: '#06b6d4',
        },
      ]);

      // Grafik Usia
      setUsiaChartData([
        {
          kategori: 'Anak-anak',
          jumlah: 28,
          fill: '#3b82f6',
        },
        {
          kategori: 'Remaja',
          jumlah: 31,
          fill: '#f59e0b',
        },
        {
          kategori: 'Dewasa',
          jumlah: 72,
          fill: '#10b981',
        },
        {
          kategori: 'Lansia',
          jumlah: 25,
          fill: '#8b5cf6',
        },
      ]);

    } catch (err) {
      console.error(
        'Gagal mengambil data statistik:',
        err
      );
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
        Memuat statistik RT 10...
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
          KONTEN STATISTIK
      ========================= */}
      <main className="min-h-[calc(100vh-73px)] flex flex-col justify-center mx-auto max-w-6xl w-full px-3 sm:px-6 py-6">

        {/* =========================
            JUDUL
        ========================= */}
        <div className="text-center mb-5 sm:mb-6">

          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Data Kependudukan
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
            Statistik RT 10 / RW 06
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Sukaleueur Dalam
          </p>

        </div>

        {/* =========================
            STAT CARDS
        ========================= */}
        <div className="mb-5">
          <StatCards
            statsData={statsData}
          />
        </div>

        {/* =========================
            GRAFIK
        ========================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <GenderChart
            genderChartData={genderChartData}
            statsData={statsData}
          />

          <UsiaChart
            usiaChartData={usiaChartData}
          />

        </div>

      </main>

    </div>
  );
}