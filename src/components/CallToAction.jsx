import { useState } from 'react';

export default function CallToAction() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" style={styles.section} aria-label="Contact Section">
      <div style={styles.bgOverlay} />
      <div style={styles.inner}>
        <div style={styles.formCard} className="glass-card animate-fade-up">
          <div style={styles.header}>
            <p className="section-label">Partner With Us</p>
            <h2 style={styles.h2}>Secure Your Place at<br /><span className="gold-text">The World's Premier Address</span></h2>
            <p style={styles.subtext}>
              Join a curated collection of global icons. Speak with our leasing directors
              about flagship opportunities and bespoke retail environments.
            </p>
          </div>

          {submitted ? (
            <div style={styles.successMessage} className="animate-fade-in">
              <span style={styles.successIcon}>✓</span>
              <h3 style={styles.successTitle}>Inquiry Received</h3>
              <p style={styles.successText}>
                Our leasing team has been notified. A representative will reach out to you within 24 hours to schedule a private tour.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                style={styles.resetBtn}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form style={styles.form} onSubmit={handleSubmit} id="leasing-form">
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label htmlFor="name" style={styles.label}>Full Name</label>
                  <input type="text" id="name" required placeholder="Alexander Sterling" style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="email" style={styles.label}>Corporate Email</label>
                  <input type="email" id="email" required placeholder="alex@luxury-retail.com" style={styles.input} />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label htmlFor="brand" style={styles.label}>Brand / Organization</label>
                  <input type="text" id="brand" required placeholder="Luxe Global Group" style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label htmlFor="interest" style={styles.label}>Area of Interest</label>
                  <select id="interest" style={styles.input}>
                    <option>Luxury Retail Flagship</option>
                    <option>Fine Dining Integration</option>
                    <option>Entertainment Partnership</option>
                    <option>Brand Activation Atrium</option>
                    <option>Sponsorship & Media</option>
                  </select>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="message" style={styles.label}>Additional Requirements</label>
                <textarea id="message" rows="4" placeholder="Tell us about your brand vision..." style={styles.input}></textarea>
              </div>

              <button type="submit" style={styles.submitBtn} id="submit-inquiry-btn">
                Send Inquiry
              </button>
            </form>
          )}
        </div>

        <div style={styles.contactInfo}>
          <div style={styles.infoBlock}>
            <h4 style={styles.infoTitle}>Global Leasing Office</h4>
            <p style={styles.infoText}>60 East Broadway, Bloomington, MN 55425</p>
          </div>
          <div style={styles.infoBlock}>
            <h4 style={styles.infoTitle}>Inquiries</h4>
            <p style={styles.infoText}>leasing@moa.destination | +1 (952) 883-8800</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: 'clamp(80px, 10vw, 140px) 0',
    background: '#0a0a0a',
    position: 'relative',
    overflow: 'hidden',
  },
  bgOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(201,168,76,0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  inner: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 20px',
    position: 'relative',
    zIndex: 1,
  },
  formCard: {
    padding: 'clamp(40px, 6vw, 80px)',
    marginBottom: '48px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  h2: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    fontWeight: 400,
    lineHeight: 1.2,
    color: '#fff',
  },
  subtext: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.5)',
    maxWidth: '600px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#c9a84c',
  },
  input: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px',
    padding: '16px',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, background 0.3s ease',
  },
  submitBtn: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#0a0a0a',
    background: 'linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)',
    padding: '18px',
    borderRadius: '4px',
    marginTop: '12px',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  },
  contactInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '48px',
    justifyContent: 'center',
    textAlign: 'center',
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  infoTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.4)',
  },
  infoText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.7)',
  },
  successMessage: {
    textAlign: 'center',
    padding: '40px 0',
  },
  successIcon: {
    fontSize: '3rem',
    color: '#c9a84c',
    display: 'block',
    marginBottom: '20px',
  },
  successTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    color: '#fff',
    marginBottom: '16px',
  },
  successText: {
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '450px',
    margin: '0 auto 32px',
    lineHeight: 1.6,
  },
  resetBtn: {
    color: '#c9a84c',
    textDecoration: 'underline',
    fontSize: '0.8rem',
    letterSpacing: '0.05em',
  }
};
