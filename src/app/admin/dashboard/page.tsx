'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Ticket {
  id: string;
  name: string;
  email: string;
  issue: string;
  companySize: string | null;
  scheduledDate: string | null;
  status: 'PENDING' | 'RESOLVED';
  createdAt: string;
}

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('ALL');
  const [busyId, setBusyId] = useState<string | null>(null);
  const router = useRouter();

  const loadTickets = () => {
    return fetch('/api/tickets')
      .then(res => {
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
      .catch(() => setError('An error occurred while loading tickets.'));
  };

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.user || data.user.role !== 'ADMIN') {
          router.push('/login');
          return;
        }
        return loadTickets();
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const toggleStatus = async (ticket: Ticket) => {
    const nextStatus = ticket.status === 'PENDING' ? 'RESOLVED' : 'PENDING';
    setBusyId(ticket.id);
    try {
      const res = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        setTickets(prev => prev.map(t => (t.id === ticket.id ? { ...t, status: nextStatus } : t)));
      } else {
        setError('Failed to update ticket status.');
      }
    } finally {
      setBusyId(null);
    }
  };

  const deleteTicket = async (ticket: Ticket) => {
    if (!window.confirm(`Delete the ticket from ${ticket.name}? This cannot be undone.`)) return;
    setBusyId(ticket.id);
    try {
      const res = await fetch(`/api/tickets/${ticket.id}`, { method: 'DELETE' });
      if (res.ok) {
        setTickets(prev => prev.filter(t => t.id !== ticket.id));
      } else {
        setError('Failed to delete ticket.');
      }
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  const visibleTickets = tickets.filter(t => filter === 'ALL' || t.status === filter);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--secondary)' }}>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-secondary" style={{ color: 'black', borderColor: '#ccc' }}>Logout</button>
      </div>

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2>Requested Tickets ({visibleTickets.length})</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(['ALL', 'PENDING', 'RESOLVED'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  background: filter === f ? 'var(--primary, #00a896)' : 'white',
                  color: filter === f ? 'white' : '#0a192f',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        {visibleTickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '1rem' }}>Date</th>
                  <th style={{ padding: '1rem' }}>Name</th>
                  <th style={{ padding: '1rem' }}>Email</th>
                  <th style={{ padding: '1rem' }}>Company Size</th>
                  <th style={{ padding: '1rem' }}>Issue</th>
                  <th style={{ padding: '1rem' }}>Scheduled For</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleTickets.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem' }}>{t.name}</td>
                    <td style={{ padding: '1rem' }}>{t.email}</td>
                    <td style={{ padding: '1rem' }}>{t.companySize || '—'}</td>
                    <td style={{ padding: '1rem', maxWidth: '300px' }}>{t.issue}</td>
                    <td style={{ padding: '1rem' }}>{t.scheduledDate ? new Date(t.scheduledDate).toLocaleString() : 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: t.status === 'RESOLVED' ? '#dcfce7' : '#fef9c3',
                        color: t.status === 'RESOLVED' ? '#166534' : '#854d0e'
                      }}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => toggleStatus(t)}
                        disabled={busyId === t.id}
                        style={{ marginRight: '0.5rem', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        Mark {t.status === 'PENDING' ? 'Resolved' : 'Pending'}
                      </button>
                      <button
                        onClick={() => deleteTicket(t)}
                        disabled={busyId === t.id}
                        style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #fecaca', background: '#fee2e2', color: '#991b1b', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
