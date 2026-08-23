'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Login response:', data);
        if (data.role === 'ADMIN') {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        let message = 'Login failed';
        try {
          const data = await res.json();
          message = data.error || message;
        } catch {}
        setError(message);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <header style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/"><Image src="/logo.png" alt="Prasan IT Logo" width={160} height={50} style={{ objectFit: 'contain' }} priority /></Link>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', fontWeight: 600, color: 'var(--secondary)' }}>
          <Link href="/">Home</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#contact">Contact</Link>
          <a href="https://bio.prasanit.org" target="_blank" rel="noreferrer">About Us</a>
        </nav>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/register" className="btn-secondary" style={{ padding: '8px 24px', fontSize: '0.9rem', color: 'var(--primary)', borderColor: 'var(--primary)' }}>Register</Link>
          <Link href="/login" className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Login</Link>
        </div>
      </header>

      {/* Main Form Area */}
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--secondary)' }}>Login</h2>
          {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
            <input type="text" placeholder="Username or Email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isSubmitting} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required disabled={isSubmitting} />
            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link href="/register" style={{ color: 'var(--primary)' }}>Don&apos;t have an account? Register</Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#0a192f', color: '#64748b' }}>
        <p>© {new Date().getFullYear()} prasanit.org. All rights reserved.</p>
      </footer>
    </div>
  );
}
