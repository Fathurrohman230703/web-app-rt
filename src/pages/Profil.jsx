import { useEffect, useState } from 'react';
import { UserCheck, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

export default function Profil() {
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

      const { data: userProfile, error } = await supabase
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
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
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
        Memuat profil RT 10...
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

      {/* =========================
          KONTEN PROFIL
      ========================= */}
      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-6 sm:px-6">

        <div className="w-full max-w-6xl">

          {/* =========================
              JUDUL
          ========================= */}
          <div className="text-center mb-6 sm:mb-8">

            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Profil Lingkungan
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
              RT 10 / RW 06
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 mt-1">
              Sukaleueur Dalam
            </p>

          </div>

          {/* =========================
              KONTEN UTAMA
          ========================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* =========================
                TENTANG RT
            ========================= */}
            <div className="lg:col-span-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg">

              <div className="flex items-center gap-3 mb-5">

                <div className="bg-white/20 p-2.5 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold">
                  Tentang Lingkungan
                </h2>

              </div>

              <p className="text-sm sm:text-base leading-relaxed text-orange-50">
                RT 10 / RW 06 Sukaleueur Dalam bertekad menciptakan
                lingkungan yang rukun, aman, bersih, dan nyaman bagi
                seluruh warga.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-orange-50 mt-4">
                Melalui sistem informasi ini, pelayanan administrasi,
                informasi kegiatan, serta transparansi pengelolaan
                lingkungan dapat disampaikan secara lebih cepat,
                mudah, dan terbuka kepada masyarakat.
              </p>

              {/* INFORMASI WILAYAH */}
              <div className="grid grid-cols-2 gap-3 mt-7">

                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-orange-100 text-xs">
                    Wilayah
                  </p>

                  <p className="font-bold mt-1">
                    RT 10 / RW 06
                  </p>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-orange-100 text-xs">
                    Kelurahan
                  </p>

                  <p className="font-bold mt-1">
                    Sukaleueur Dalam
                  </p>
                </div>

              </div>

            </div>

            {/* =========================
                PENGURUS RT
            ========================= */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <div className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-5 pb-3 border-b">

                <UserCheck className="w-5 h-5 text-orange-500" />

                <span>
                  Pengurus RT 10
                </span>

              </div>

              <div className="space-y-4">

                {/* KETUA RT */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">

                  <span className="text-orange-600 font-bold text-xs">
                    KETUA RT
                  </span>

                  <strong className="text-slate-800 text-base block mt-1">
                    Bpk. Tata Taryana
                  </strong>

                  <span className="text-slate-400 text-xs">
                    Ketua RT 10
                  </span>

                </div>

                {/* SEKRETARIS */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">

                  <span className="text-orange-600 font-bold text-xs">
                    SEKRETARIS
                  </span>

                  <strong className="text-slate-800 text-base block mt-1">
                    Ibu. Reni Rosliawati
                  </strong>

                  <span className="text-slate-400 text-xs">
                    Sekretaris RT 10
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              VISI LINGKUNGAN
          ========================= */}
          <div className="mt-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm text-center">

            <Users className="w-7 h-7 text-orange-500 mx-auto mb-2" />

            <h2 className="font-bold text-slate-800 text-lg">
              Visi Lingkungan
            </h2>

            <p className="text-sm text-slate-500 mt-2 italic">
              “Ngamumule Gotong Royong, Ngawangun Warga anu Sauyunan”
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}