'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserDashboard() {
  const router = useRouter();
  const meshConnectLink = "https://mesh.prasanit.org/";
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.user) {
          router.push('/login');
        } else if (data.user.role === 'ADMIN') {
          router.push('/admin/dashboard');
        }
      })
      .catch(() => router.push('/login'))
      .finally(() => setAuthLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (authLoading) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--secondary)' }}>Client Dashboard</h1>
        <button onClick={handleLogout} className="btn-secondary" style={{ color: 'black', borderColor: '#ccc' }}>Logout</button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '4rem 2rem', borderRadius: '8px', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Welcome to your IT Portal</h2>
        <p style={{ marginBottom: '3rem', color: '#64748b' }}>Access your secure remote management tools below.</p>

        <a href={meshConnectLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '1.25rem', padding: '16px 32px' }}>
          ACCESS MESH CONNECT
        </a>
      </div>
    </div>
  );
}
