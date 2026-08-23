import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Terms of Service | Prasan IT',
  description: 'The terms that govern use of the Prasan IT website and client services.',
};

export default function TermsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <SiteHeader />

      <main style={{ flex: 1, padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '3rem', boxShadow: 'var(--shadow)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0a192f', marginBottom: '0.5rem' }}>Terms of Service</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Last updated: 23 August 2026</p>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>1. Acceptance of terms</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>
              By using prasanit.org or engaging Prasan IT for services, you agree to these terms. If you do not agree,
              please do not use this site or our services.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>2. Use of the site</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>
              You agree to provide accurate information when submitting support requests or registering an account, and
              not to use the site for any unlawful purpose or to attempt to disrupt or gain unauthorized access to our systems.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>3. Services</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>
              Specific service scope, pricing, and service-level commitments for managed IT support are agreed separately
              in a signed service agreement. Information on this website is for general reference only and does not
              itself constitute a binding service contract.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>4. Limitation of liability</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>
              To the fullest extent permitted by law, Prasan IT is not liable for indirect or consequential losses arising
              from use of this website. Liability relating to contracted services is governed by the applicable service
              agreement.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>5. Contact</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>
              Questions about these terms can be sent to <a href="mailto:info@prasanit.org" style={{ color: 'var(--primary)' }}>info@prasanit.org</a>.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
