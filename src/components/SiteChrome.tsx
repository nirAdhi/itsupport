import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
      <Link href="/"><Image src="/logo.png" alt="Prasan IT Logo" width={160} height={50} style={{ objectFit: 'contain' }} priority /></Link>
      <nav style={{ display: 'flex', gap: '2rem', fontWeight: 600, color: 'var(--secondary)' }}>
        <Link href="/">Home</Link>
        <Link href="/#services">Services</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/login" className="btn-secondary" style={{ padding: '8px 24px', fontSize: '0.9rem', color: 'var(--primary)', borderColor: 'var(--primary)' }}>Login</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer style={{ padding: '3rem 2rem', background: '#060e1f', borderTop: '1px solid rgba(0,168,150,0.1)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <Image src="/logo.png" alt="Prasan IT" width={140} height={40} style={{ objectFit: 'contain', filter: 'brightness(1.2)' }} />
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>Trusted IT Support &amp; Solutions</p>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#8892b0', fontSize: '0.9rem' }}>Home</Link>
          <Link href="/about" style={{ color: '#8892b0', fontSize: '0.9rem' }}>About</Link>
          <Link href="/#services" style={{ color: '#8892b0', fontSize: '0.9rem' }}>Services</Link>
          <Link href="/contact" style={{ color: '#8892b0', fontSize: '0.9rem' }}>Contact</Link>
          <Link href="/privacy" style={{ color: '#8892b0', fontSize: '0.9rem' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: '#8892b0', fontSize: '0.9rem' }}>Terms of Service</Link>
          <Link href="/login" style={{ color: '#8892b0', fontSize: '0.9rem' }}>Login</Link>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>&copy; {new Date().getFullYear()} prasanit.org. All rights reserved.</p>
      </div>
    </footer>
  );
}
