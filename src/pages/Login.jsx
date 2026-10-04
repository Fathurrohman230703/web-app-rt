import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Email atau password salah! Silakan periksa kembali.');
      setLoading(false);
    } else {
      setLoading(false);
      navigate('/dashboard'); // Pindah ke halaman dashboard jika berhasil
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img src="erte10.png" alt="Logo RT" style={styles.logoImage} />
          <h1 style={styles.title}>Masuk Akun Warga</h1>
          <p style={styles.subtitle}>Sistem Informasi & Layanan RT</p>
        </div>

        {errorMsg && <div style={styles.errorBanner}>{errorMsg}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Alamat Email</label>
            <input
              type="email"
              required
              style={styles.input}
              placeholder="email@contoh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              required
              style={styles.input}
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div style={styles.footer}>
          <span>Belum punya akun? </span>
          <Link to="/register" style={styles.link}>Daftar di sini</Link>
        </div>
      </div>
    </div>
  );
}

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
    width: '80px',
    height: 'auto',
    objectFit: 'contain',
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