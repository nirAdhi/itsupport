'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a896" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

export default function HomePage() {
  const [formData, setFormData] = useState({ name: '', email: '', issue: '', date: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          issue: formData.issue,
          scheduledDate: formData.date || null
        })
      });
      if (res.ok) {
        setStatus('Ticket submitted successfully! We will contact you soon.');
        setFormData({ name: '', email: '', issue: '', date: '' });
      } else {
        setStatus('Failed to submit ticket. Please try again.');
      }
    } catch {
      setStatus('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
      {/* Navigation */}
      <header className={`mainNav ${scrolled ? 'scrolled' : ''}`}>
        <a href="/"><Image src="/logo.png" alt="Prasan IT" width={160} height={50} style={{ objectFit: 'contain' }} priority /></a>
        <nav className="navLinks" style={{ marginLeft: 'auto', marginRight: '2rem' }}>
          <a href="/">Home</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="https://bio.prasanit.org" target="_blank" rel="noreferrer">About Us</a>
        </nav>
        <a href="/login" className="navBtn">Client Login</a>
      </header>

      {/* Hero */}
      <section style={{ display: 'flex', width: '100%', minHeight: '100vh', paddingTop: '80px' }}>
        <div style={{ flex: '1', background: 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #0a192f 100%)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 4rem 4rem 8%', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '20%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,168,150,0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
          <div style={{ position: 'relative', zIndex: 2, animation: 'fadeInUp 1s ease-out' }}>
            <p style={{ color: '#00a896', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Trusted IT Support & Solutions</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', color: '#e6f1ff', letterSpacing: '-0.5px' }}>
              INTEGRATED<br />TECHNOLOGY.<br /><span style={{ color: '#00a896' }}>UNIFIED</span> SUCCESS.
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#8892b0', marginBottom: '3rem', maxWidth: '480px', lineHeight: 1.7 }}>
              Your Dedicated Partners for Seamless, High-Performance IT and Secure Infrastructure.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn-primary" style={{ background: '#00a896', boxShadow: '0 8px 24px rgba(0,168,150,0.3)' }}>
                SCHEDULE YOUR FREE IT AUDIT <ArrowRight />
              </a>
              <a href="https://mesh.prasanit.org/" target="_blank" rel="noreferrer" className="btn-secondary">MESH CONNECT</a>
            </div>
          </div>
        </div>
        <div style={{ flex: '1', backgroundImage: 'url(/hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', minHeight: '600px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,25,47,0.8) 0%, rgba(10,25,47,0.3) 50%, transparent 100%)' }} />
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#00a896', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>What We Offer</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0a192f', marginBottom: '1rem' }}>OUR COMPREHENSIVE SERVICES</h2>
            <p style={{ color: '#8892b0', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>End-to-end IT solutions tailored to your business needs</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', title: 'Managed IT Support', desc: 'Proactive network monitoring, maintenance, and 24/7 helpdesk support to keep your systems running smoothly.' },
              { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4', title: 'Cybersecurity', desc: 'Advanced threat detection, firewall management, and comprehensive security assessments to protect your data.' },
              { icon: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z', title: 'Cloud Services', desc: 'Seamless cloud migration, storage optimization, and scalable infrastructure management.' },
              { icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', title: 'IT Consulting', desc: 'Strategic technology planning, digital transformation, and compliance guidance for growth.' }
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid rgba(0,168,150,0.15)', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer', position: 'relative', overflow: 'hidden' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,168,150,0.15)'; e.currentTarget.style.borderColor = 'rgba(0,168,150,0.4)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(0,168,150,0.15)'; }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,168,150,0.1) 0%, rgba(0,168,150,0.05) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00a896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.75rem' }}>{s.title}</h3>
                <p style={{ color: '#8892b0', lineHeight: 1.7, fontSize: '0.95rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#00a896', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>Flexible Plans</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0a192f', marginBottom: '1rem' }}>SERVICE PLAN TIERS</h2>
            <p style={{ color: '#8892b0', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Choose the perfect plan for your business needs</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              { name: 'Core', price: '299', features: ['Proactive network monitoring', 'Helpdesk support (business hours)', 'Monthly maintenance reports', 'Email & phone support', 'Basic security monitoring'] },
              { name: 'Pro', price: '599', popular: true, features: ['Everything in Core, plus:', '24/7 priority support', 'Quarterly IT strategy reviews', 'Advanced security suite', 'Cloud backup management', 'Vendor management'] },
              { name: 'Premium', price: '999', features: ['Everything in Pro, plus:', 'Dedicated account manager', 'On-site support included', 'Full cybersecurity audit', 'Disaster recovery planning', 'Custom integrations', 'SLA guarantees'] }
            ].map((plan, idx) => (
              <div key={idx} style={{ background: plan.popular ? 'linear-gradient(135deg, #0a192f 0%, #112240 100%)' : 'white', color: plan.popular ? 'white' : '#0a192f', borderRadius: '20px', padding: '2.5rem', border: plan.popular ? '2px solid #00a896' : '1px solid #e2e8f0', position: 'relative', transition: 'all 0.4s ease', boxShadow: plan.popular ? '0 20px 40px rgba(10,25,47,0.2)' : '0 4px 12px rgba(0,0,0,0.05)' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = plan.popular ? '0 30px 60px rgba(10,25,47,0.3)' : '0 12px 24px rgba(0,0,0,0.1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = plan.popular ? '0 20px 40px rgba(10,25,47,0.2)' : '0 4px 12px rgba(0,0,0,0.05)'; }}>
                {plan.popular && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#00a896', color: 'white', padding: '4px 20px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px' }}>MOST POPULAR</div>}
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: plan.popular ? 'white' : '#0a192f' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: plan.popular ? '#00a896' : '#0a192f' }}>€{plan.price}</span>
                  <span style={{ color: plan.popular ? '#8892b0' : '#8892b0', fontSize: '0.95rem', marginLeft: '4px' }}>/month</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                  {plan.features.map((f, fi) => (
                    <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: plan.popular ? '#ccd6f6' : '#64748b', fontSize: '0.9rem' }}><CheckIcon />{f}</li>
                  ))}
                </ul>
                <a href="#contact" style={{ display: 'block', width: '100%', textAlign: 'center', padding: '14px', borderRadius: '10px', fontWeight: 600, fontSize: '0.9rem', background: plan.popular ? '#00a896' : 'transparent', color: plan.popular ? 'white' : '#0a192f', border: plan.popular ? 'none' : '2px solid #e2e8f0', transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseEnter={e => { e.currentTarget.style.background = plan.popular ? '#007a7a' : '#0a192f'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#0a192f'; }} onMouseLeave={e => { e.currentTarget.style.background = plan.popular ? '#00a896' : 'transparent'; e.currentTarget.style.color = plan.popular ? 'white' : '#0a192f'; e.currentTarget.style.borderColor = plan.popular ? 'none' : '#e2e8f0'; }}>Get Started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#00a896', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>How We Work</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0a192f', marginBottom: '1rem' }}>OUR INNOVATION PROCESS</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem' }}>
            {['Discovery', 'Analysis', 'Implementation', 'Optimization', 'Proactive Management'].map((step, i) => (
              <div key={i} style={{ textAlign: 'center', flex: '1', minWidth: '160px', maxWidth: '200px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #00a896 0%, #007a7a 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem', fontWeight: 700, boxShadow: '0 8px 24px rgba(0,168,150,0.3)' }}>{i + 1}</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p style={{ color: '#00a896', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>Get In Touch</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#e6f1ff', marginBottom: '1.5rem' }}>LET'S START A CONVERSATION</h2>
            <p style={{ color: '#8892b0', marginBottom: '2rem', lineHeight: 1.7 }}>Ready to transform your IT infrastructure? Our team is here to help you every step of the way.</p>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: '#ccd6f6' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00a896" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+353 894734870</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: '#ccd6f6' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00a896" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>info@prasanit.org</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#ccd6f6' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00a896" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Dublin, Ireland</span>
              </div>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={isSubmitting} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              <input type="email" placeholder="Your Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={isSubmitting} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              <textarea placeholder="How can we help you?" rows={4} required value={formData.issue} onChange={e => setFormData({...formData, issue: e.target.value})} disabled={isSubmitting} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', background: '#00a896' }} disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'SEND MESSAGE'}</button>
              {status && <p style={{ marginTop: '1rem', color: '#00a896', textAlign: 'center', fontSize: '0.95rem' }}>{status}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 2rem', background: '#060e1f', borderTop: '1px solid rgba(0,168,150,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <Image src="/logo.png" alt="Prasan IT" width={140} height={40} style={{ objectFit: 'contain', filter: 'brightness(1.2)' }} />
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>Trusted IT Support & Solutions</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="/" style={{ color: '#8892b0', fontSize: '0.9rem', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#00a896'} onMouseLeave={e => e.currentTarget.style.color = '#8892b0'}>Home</a>
            <a href="#services" style={{ color: '#8892b0', fontSize: '0.9rem', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#00a896'} onMouseLeave={e => e.currentTarget.style.color = '#8892b0'}>Services</a>
            <a href="#pricing" style={{ color: '#8892b0', fontSize: '0.9rem', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#00a896'} onMouseLeave={e => e.currentTarget.style.color = '#8892b0'}>Pricing</a>
            <a href="/login" style={{ color: '#8892b0', fontSize: '0.9rem', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#00a896'} onMouseLeave={e => e.currentTarget.style.color = '#8892b0'}>Login</a>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>© {new Date().getFullYear()} prasanit.org. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
