import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'About Us | Prasan IT',
  description: 'Prasan IT is a Dublin-based managed IT services provider delivering support, cybersecurity, cloud, and consulting for growing businesses.',
};

const values = [
  { title: 'Reliability', desc: 'Proactive monitoring and rapid response so problems get fixed before they slow your team down.' },
  { title: 'Security-first', desc: 'Every engagement starts with protecting your data, your systems, and your customers.' },
  { title: 'Straight talk', desc: 'Clear, jargon-free advice so you always know what we’re doing and why.' },
];

export default function AboutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <SiteHeader />

      <main style={{ flex: 1 }}>
        <section style={{ padding: '5rem 2rem', background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)', color: 'white' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: '#00a896', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>About Prasan IT</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1.5rem' }}>Your Dedicated IT Partner in Dublin</h1>
            <p style={{ color: '#8892b0', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Prasan IT was founded to give small and mid-sized businesses the kind of responsive, senior-level IT support
              that&apos;s usually reserved for large enterprises. We manage the day-to-day so you can focus on running your business.
            </p>
          </div>
        </section>

        <section style={{ padding: '5rem 2rem', background: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0a192f', marginBottom: '1.5rem' }}>What We Do</h2>
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '2rem' }}>
              We provide managed IT support, cybersecurity, cloud services, and IT consulting for businesses across Ireland.
              Whether you need a fully outsourced IT department or extra hands alongside your existing team, we tailor our
              support plans to fit how you actually work.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              {values.map((v, i) => (
                <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>{v.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
