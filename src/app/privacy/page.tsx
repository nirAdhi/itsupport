import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Privacy Policy | Prasan IT',
  description: 'How Prasan IT collects, uses, and protects the personal data submitted through our website and support forms.',
};

export default function PrivacyPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <SiteHeader />

      <main style={{ flex: 1, padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '3rem', boxShadow: 'var(--shadow)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0a192f', marginBottom: '0.5rem' }}>Privacy Policy</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Last updated: 23 August 2026</p>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>1. Who we are</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>
              Prasan IT (&quot;we&quot;, &quot;us&quot;) provides managed IT support services from Dublin, Ireland. This policy explains
              what personal data we collect through prasanit.org and how we use it.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>2. What we collect</h2>
            <ul style={{ color: '#334155', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
              <li>When you submit our contact/support form: your name, email address, description of your issue, and an optional preferred date.</li>
              <li>When you register for a client account: your email address and a securely hashed password.</li>
              <li>Standard technical data such as IP address and browser type, collected by our hosting infrastructure for security and diagnostics.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>3. How we use it</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>
              We use this information to respond to support requests, schedule appointments, manage client accounts, and
              communicate with you about the services you&apos;ve requested. We do not sell your data or use it for advertising.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>4. Storage and retention</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>
              Data is stored in our secure database and retained only as long as needed to provide support and meet our
              legal/accounting obligations. You can request deletion of your data at any time (see Section 6).
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>5. Cookies</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>
              We use a single strictly-necessary cookie to keep you logged in to your client account. We do not use
              advertising or analytics cookies.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: '0.5rem' }}>6. Your rights</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>
              Under GDPR, you have the right to access, correct, or request deletion of your personal data. To exercise
              these rights, contact us at <a href="mailto:info@prasanit.org" style={{ color: 'var(--primary)' }}>info@prasanit.org</a>.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
