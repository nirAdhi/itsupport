'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.user || data.user.role !== 'ADMIN') {
          router.push('/login');
          return;
        }
        return fetch('/api/tickets');
      })
      .then(res => {
        if (!res) return null;
        if (res.status === 401 || res.status === 403) {
          router.push('/login');
          return null;
        }
        if (!res.ok) {
          setError('Failed to load tickets');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.tickets) {
          setTickets(data.tickets);
        }
      })
      .catch(() => setError('An error occurred while loading tickets.'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--secondary)' }}>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-secondary" style={{ color: 'black', borderColor: '#ccc' }}>Logout</button>
      </div>

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
        <h2 style={{ marginBottom: '1rem' }}>Requested Tickets</h2>
        {tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '1rem' }}>Date</th>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Issue</th>
                <th style={{ padding: '1rem' }}>Scheduled For</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem' }}>{t.name}</td>
                  <td style={{ padding: '1rem' }}>{t.email}</td>
                  <td style={{ padding: '1rem' }}>{t.issue}</td>
                  <td style={{ padding: '1rem' }}>{t.scheduledDate ? new Date(t.scheduledDate).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
