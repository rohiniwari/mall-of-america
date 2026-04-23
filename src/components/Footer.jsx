export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={styles.footer} aria-label="Site Footer">
      <div style={styles.inner}>
        <div style={styles.top}>
          <div style={styles.brandSide}>
            <h2 style={styles.logo}>◈ MOA</h2>
            <p style={styles.brandDesc}>
              Defining the global standard for integrated retail, entertainment, and hospitality.
              A Triple Five Group flagship.
            </p>
          </div>
          
          <div style={styles.linksGrid}>
            <div style={styles.linkCol}>
              <h4 style={styles.colTitle}>Property</h4>
              <a href="#" style={styles.link}>Directories</a>
              <a href="#" style={styles.link}>Guest Services</a>
              <a href="#" style={styles.link}>Accessibility</a>
              <a href="#" style={styles.link}>Sustainability</a>
            </div>
            <div style={styles.linkCol}>
              <h4 style={styles.colTitle}>Leasing</h4>
              <a href="#" style={styles.link}>Available Spaces</a>
              <a href="#" style={styles.link}>Demographics</a>
              <a href="#" style={styles.link}>Tenancy Guild</a>
              <a href="#" style={styles.link}>Retail Partners</a>
            </div>
            <div style={styles.linkCol}>
              <h4 style={styles.colTitle}>Corporate</h4>
              <a href="#" style={styles.link}>Triple Five Group</a>
              <a href="#" style={styles.link}>Press Room</a>
              <a href="#" style={styles.link}>Careers</a>
              <a href="#" style={styles.link}>Investors</a>
            </div>
          </div>
        </div>
        
        <div style={styles.bottom}>
          <p style={styles.copy}>
            © {currentYear} Mall of America. All rights reserved. Cinematic visualization by Antigravity AI.
          </p>
          <div style={styles.legal}>
            <a href="#" style={styles.legalLink}>Privacy Policy</a>
            <a href="#" style={styles.legalLink}>Terms of Service</a>
            <a href="#" style={styles.legalLink}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    padding: '80px 0 40px',
    background: '#050505',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  inner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 40px',
  },
  top: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '60px',
    marginBottom: '80px',
  },
  brandSide: {
    maxWidth: '300px',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    color: '#fff',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  brandDesc: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 300,
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.4)',
  },
  linksGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px 80px',
  },
  linkCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  colTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#c9a84c',
    marginBottom: '8px',
  },
  link: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
    transition: 'color 0.3s ease',
  },
  bottom: {
    paddingTop: '32px',
    borderTop: '1px solid rgba(255,255,255,0.03)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '20px',
    alignItems: 'center',
  },
  copy: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.3)',
  },
  legal: {
    display: 'flex',
    gap: '24px',
  },
  legalLink: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.3)',
    transition: 'color 0.3s ease',
  }
};
