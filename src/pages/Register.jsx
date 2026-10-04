import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          nama_lengkap: formData.namaLengkap,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      setSuccessMsg('Succesfully.');
      setFormData({ namaLengkap: '', email: '', password: '' });
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
       {/* Header Logo / Badge */}
        <div style={styles.header}>
        <img 
            src="erte10.png" 
            alt="Logo RT" 
            style={styles.logoImage} 
        />
        <h1 style={styles.title}>Sistem Informasi RT</h1>
        <p style={styles.subtitle}>Daftar akun warga RT10 untuk mengakses layanan </p>
        </div>
        {/* Notifikasi Pesan */}
        {errorMsg && <div style={styles.errorBanner}>{errorMsg}</div>}
        {successMsg && <div style={styles.successBanner}>{successMsg}</div>}

        {/* Form Pendaftaran */}
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nama Lengkap</label>
            <input
              type="text"
              required
              style={styles.input}
              placeholder="username"
              value={formData.namaLengkap}
              onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              required
              style={styles.input}
              placeholder="warga@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              required
              minLength={6}
              style={styles.input}
              placeholder="Minimal 6 karakter"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>

        <div style={styles.footer}>
        <span>Sudah punya akun? </span>
        <Link to="/login" style={styles.link}>Masuk di sini</Link>
        </div>
      </div>
    </div>
  );
}

// Styling Modern & Clean
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
    padding: '32px 28px',
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  logoImage: {
    display: 'block',        // Memastikan elemen diperlakukan sebagai block
    margin: '0 auto 12px',   // Mengatur margin kiri-kanan otomatis agar ke tengah
    width: '80px',        // Sesuaikan ukuran lebar logo
    height: 'auto',        // Agar rasio tinggi proporsional
    marginBottom: '12px',  // Jarak antara logo dan judul
    objectFit: 'contain',
  },
  title: {
    margin: '0',
    fontSize: '22px',
    fontWeight: '700',
    color: '#1f2937',
  },
  iconContainer: {
    fontSize: '38px',
    marginBottom: '8px',
  },
  title: {
    margin: '0',
    fontSize: '22px',
    fontWeight: '700',
    color: '#1f2937',
  },
  subtitle: {
    margin: '6px 0 0',
    fontSize: '13px',
    color: '#6b7280',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  },
  button: {
    marginTop: '6px',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  errorBanner: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    border: '1px solid #fecaca',
    marginBottom: '18px',
    textAlign: 'center',
  },
  successBanner: {
    backgroundColor: '#f0fdf4',
    color: '#16a34a',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    border: '1px solid #bbf7d0',
    marginBottom: '18px',
    textAlign: 'center',
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '13px',
    color: '#6b7280',
  },
  link: {
    color: '#2563eb',
    fontWeight: '600',
    textDecoration: 'none',
  },
};