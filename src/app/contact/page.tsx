'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SiteHeader, SiteFooter } from '@/components/SiteChrome';

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a896" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a896" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a896" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
);

const otherWays = [
  { icon: <MailIcon />, label: 'Email', value: 'info@prasanit.org', href: 'mailto:info@prasanit.org' },
  { icon: <PhoneIcon />, label: 'Phone', value: '+353 89 473 4870', href: 'tel:+353894734870' },
  { icon: <PinIcon />, label: 'Location', value: 'Dublin, Ireland', href: undefined },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus('');
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          issue: formData.message,
        })
      });
      if (res.ok) {
        setStatus('Thanks! Your message has been sent — we’ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send your message. Please try again.');
      }
    } catch {
      setStatus('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <SiteHeader />

      <main style={{ flex: 1, padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0a192f', marginBottom: '0.75rem' }}>Get In Touch</h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '600px', marginBottom: '3rem' }}>
            Have a question or just want to say hi? Send us a message and we&apos;ll get back to you — or reach out directly
            using the details on the right.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0a192f', marginBottom: '1.5rem' }}>Send a Message</h2>
              <form onSubmit={handleSubmit}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', color: '#334155', marginBottom: '0.4rem' }}>Name</label>
                <input type="text" placeholder="Your name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} disabled={isSubmitting} />

                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', color: '#334155', marginBottom: '0.4rem' }}>Email</label>
                <input type="email" placeholder="your@email.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} disabled={isSubmitting} />

                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', color: '#334155', marginBottom: '0.4rem' }}>Message</label>
                <textarea placeholder="Your message..." rows={6} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} disabled={isSubmitting} />

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={isSubmitting}>
                  <SendIcon /> {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {status && <p style={{ marginTop: '1rem', color: 'var(--primary)', fontSize: '0.95rem' }}>{status}</p>}
              </form>
            </div>

            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0a192f', marginBottom: '1.5rem' }}>Other Ways to Connect</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {otherWays.map((item, i) => {
                  const Wrapper = item.href ? 'a' : 'div';
                  return (
                    <Wrapper key={i} {...(item.href ? { href: item.href } : {})} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem 1.25rem' }}>
                      <span style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,168,150,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</span>
                      <span>
                        <span style={{ display: 'block', fontWeight: 700, color: '#0a192f', fontSize: '0.95rem' }}>{item.label}</span>
                        <span style={{ display: 'block', color: '#64748b', fontSize: '0.9rem' }}>{item.value}</span>
                      </span>
                    </Wrapper>
                  );
                })}
              </div>

              <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '12px', background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)' }}>
                <p style={{ color: '#e6f1ff', fontWeight: 700, marginBottom: '0.5rem' }}>Looking for a full IT review instead?</p>
                <p style={{ color: '#8892b0', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.6 }}>Book a free, no-obligation IT audit and get a written summary of what we find.</p>
                <Link href="/#contact" className="btn-primary" style={{ background: '#00a896', fontSize: '0.85rem', padding: '10px 20px' }}>Book Free IT Audit</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
