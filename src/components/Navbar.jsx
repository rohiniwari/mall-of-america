import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#experience', label: 'Experience' },
  { href: '#metrics', label: 'By the Numbers' },
  { href: '#opportunities', label: 'Opportunities' },
  { href: '#contact', label: 'Connect' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={styles.nav(scrolled)} aria-label="Main navigation">
      <a href="#" style={styles.logo}>
        <span style={styles.logoIcon}>◈</span>
        <span>MOA</span>
        <span style={styles.logoDivider}>|</span>
        <span style={styles.logoSub}>The Premier Destination</span>
      </a>

      {/* Desktop links */}
      <ul style={styles.linkList} role="list">
        {navLinks.map(link => (
          <li key={link.href}>
            <a href={link.href} style={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" style={styles.cta} id="nav-cta-btn">
        Inquire Now
      </a>

      {/* Mobile hamburger */}
      <button
        style={styles.hamburger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        id="mobile-menu-btn"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" style={styles.mobileCta} onClick={() => setMenuOpen(false)}>
            Inquire Now
          </a>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: (scrolled) => ({
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    padding: scrolled ? '14px 48px' : '22px 48px',
    background: scrolled
      ? 'rgba(8,8,8,0.92)'
      : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
    transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
  }),
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.15rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    color: '#fff',
    marginRight: 'auto',
  },
  logoIcon: {
    color: '#c9a84c',
    fontSize: '1.4rem',
  },
  logoDivider: {
    color: '#c9a84c',
    opacity: 0.5,
    margin: '0 4px',
  },
  logoSub: {
    fontSize: '0.65rem',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#b8bcc8',
  },
  linkList: {
    display: 'flex',
    gap: '36px',
    listStyle: 'none',
    '@media(maxWidth:900px)': { display: 'none' },
  },
  link: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 400,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#b8bcc8',
    transition: 'color 0.3s ease',
    position: 'relative',
    padding: '4px 0',
  },
  cta: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#080808',
    background: 'linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)',
    padding: '10px 24px',
    borderRadius: '4px',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    whiteSpace: 'nowrap',
  },
  hamburger: {
    display: 'none',
    fontSize: '1.4rem',
    color: '#c9a84c',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  mobileMenu: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(8,8,8,0.97)',
    backdropFilter: 'blur(20px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '28px',
    zIndex: 999,
  },
  mobileLink: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.6rem',
    fontWeight: 400,
    color: '#fff',
    letterSpacing: '0.05em',
  },
  mobileCta: {
    marginTop: '16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#080808',
    background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
    padding: '14px 36px',
    borderRadius: '4px',
  },
};
