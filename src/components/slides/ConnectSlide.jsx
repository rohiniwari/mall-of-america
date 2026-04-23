import { useState } from 'react';

export default function ConnectSlide({ active }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="slide" id="slide-connect" aria-label="Contact & Connect" style={styles.slide}>
      <div style={styles.bgGlow} aria-hidden="true" />
      <div style={styles.bgRight} aria-hidden="true" />

      <div style={styles.inner}>
        {/* Left: branding */}
        <div style={styles.left}>
          <div>
            <p className="section-label" style={{ marginBottom: '24px' }}>Partner With Us</p>
            <h2 style={styles.h2}>
              Secure Your Place at<br />
              <span className="gold-text">The World's Premier Address</span>
            </h2>
            <p style={styles.sub}>
              Join a curated collection of global icons. Speak with our leasing directors
              about flagship opportunities and bespoke retail environments.
            </p>
          </div>

          <div style={styles.contactBoxes}>
            {[
              { label: 'Global Leasing', info: '60 East Broadway, Bloomington, MN 55425' },
              { label: 'Inquiries', info: 'leasing@moa.destination' },
              { label: 'Direct Line', info: '+1 (952) 883-8800' },
            ].map(c => (
              <div key={c.label} style={styles.contactBox}>
                <span style={styles.contactLabel}>{c.label}</span>
                <span style={styles.contactInfo}>{c.info}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="glass-card" style={styles.formCard}>
          {submitted ? (
            <div style={styles.success}>
              <div style={styles.successIcon}>◈</div>
              <h3 style={styles.successTitle}>Inquiry Received</h3>
              <p style={styles.successText}>Our leasing team will reach out within 24 hours to schedule a private consultation.</p>
              <button onClick={() => setSubmitted(false)} style={styles.resetBtn}>Send Another →</button>
            </div>
          ) : (
            <form style={styles.form} onSubmit={e => { e.preventDefault(); setSubmitted(true); }} id="connect-form">
              <h3 style={styles.formTitle}>Begin the Conversation</h3>

              <div style={styles.row}>
                <div style={styles.field}>
                  <label htmlFor="c-name" style={styles.label}>Full Name</label>
                  <input type="text" id="c-name" required placeholder="Alexander Sterling" style={styles.input} />
                </div>
                <div style={styles.field}>
                  <label htmlFor="c-email" style={styles.label}>Corporate Email</label>
                  <input type="email" id="c-email" required placeholder="alex@brand.com" style={styles.input} />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.field}>
                  <label htmlFor="c-brand" style={styles.label}>Brand / Organization</label>
                  <input type="text" id="c-brand" required placeholder="Luxe Global Group" style={styles.input} />
                </div>
                <div style={styles.field}>
                  <label htmlFor="c-interest" style={styles.label}>Area of Interest</label>
                  <select id="c-interest" style={styles.input}>
                    <option>Luxury Retail Flagship</option>
                    <option>Fine Dining Integration</option>
                    <option>Entertainment Partnership</option>
                    <option>Brand Activation / Events</option>
                    <option>Sponsorship & Media Rights</option>
                  </select>
                </div>
              </div>

              <div style={styles.field}>
                <label htmlFor="c-msg" style={styles.label}>Additional Requirements</label>
                <textarea id="c-msg" rows={3} placeholder="Tell us about your brand's vision..." style={styles.input} />
              </div>

              <button type="submit" style={styles.submit} id="connect-submit-btn">
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const styles = {
  slide: { background: '#0a0a0a', justifyContent: 'center' },
  bgGlow: { position: 'absolute', top: '50%', left: '-5%', transform: 'translateY(-50%)', width: '400px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(201,168,76,0.07) 0%,transparent 70%)', pointerEvents: 'none' },
  bgRight: { position: 'absolute', top: 0, right: 0, bottom: 0, width: '55%', background: 'radial-gradient(ellipse at right,rgba(201,168,76,0.03) 0%,transparent 70%)', pointerEvents: 'none' },
  inner: {
    maxWidth: '1280px', width: '100%', margin: '0 auto',
    padding: '0 clamp(20px,5vw,80px)',
    display: 'grid', gridTemplateColumns: '2fr 3fr',
    gap: 'clamp(32px,5vw,60px)', alignItems: 'center', position: 'relative', zIndex: 1,
  },
  left: { display: 'flex', flexDirection: 'column', gap: '32px' },
  h2: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 400, lineHeight: 1.2, color: '#fff', marginBottom: '16px' },
  sub: { fontFamily: "'Inter',sans-serif", fontSize: 'clamp(0.82rem,1.2vw,0.93rem)', fontWeight: 300, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' },
  contactBoxes: { display: 'flex', flexDirection: 'column', gap: '12px' },
  contactBox: { display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  contactLabel: { fontFamily: "'Inter',sans-serif", fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c' },
  contactInfo: { fontFamily: "'Inter',sans-serif", fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,0.65)' },
  formCard: { padding: 'clamp(24px,3vw,40px)' },
  formTitle: { fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', fontWeight: 400, color: '#fff', marginBottom: '24px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontFamily: "'Inter',sans-serif", fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c' },
  input: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '12px 14px', color: '#fff', fontFamily: "'Inter',sans-serif", fontSize: '0.88rem', outline: 'none', width: '100%', boxSizing: 'border-box' },
  submit: { fontFamily: "'Inter',sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0a0a0a', background: 'linear-gradient(135deg,#c9a84c 0%,#e8c97a 50%,#c9a84c 100%)', padding: '14px', borderRadius: '4px', cursor: 'pointer', marginTop: '8px' },
  success: { textAlign: 'center', padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' },
  successIcon: { fontSize: '2.5rem', color: '#c9a84c', animation: 'goldPulse 2s ease-in-out infinite' },
  successTitle: { fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', color: '#fff' },
  successText: { fontFamily: "'Inter',sans-serif", fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', maxWidth: '320px', lineHeight: 1.6 },
  resetBtn: { fontFamily: "'Inter',sans-serif", fontSize: '0.75rem', color: '#c9a84c', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none' },
};
