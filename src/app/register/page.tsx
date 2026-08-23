'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        router.push('/login');
      } else {
        let message = 'Registration failed';
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
          <a href="https://bio.prasanit.org" target="_blank" rel="noopener noreferrer">About Us</a>
        </nav>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/login" className="btn-secondary" style={{ padding: '8px 24px', fontSize: '0.9rem', color: 'var(--primary)', borderColor: 'var(--primary)' }}>Login</Link>
          <Link href="/register" className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Register</Link>
        </div>
      </header>

      {/* Main Form Area */}
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--secondary)' }}>Register for Mesh Connect</h2>
          {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isSubmitting} />
            <input type="password" placeholder="Password (min 6 characters)" value={password} onChange={e => setPassword(e.target.value)} required disabled={isSubmitting} />
            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link href="/login" style={{ color: 'var(--primary)' }}>Already have an account? Login</Link>
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
