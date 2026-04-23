import { useEffect, useRef } from 'react';

export default function Hero() {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      },
      { threshold: 0.1 }
    );
    const el = titleRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section id="hero" style={styles.section} aria-label="Hero Section">
      {/* Background image */}
      <div style={styles.bg} />
      {/* Gradient overlay */}
      <div style={styles.overlay} />
      {/* Animated particle dots */}
      <div style={styles.particles} aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={particleStyle(i)} />
        ))}
      </div>

      <div ref={titleRef} style={styles.content}>
        {/* Eyebrow */}
        <p style={styles.eyebrow} className="animate-fade-up">
          <span style={styles.eyebrowLine} />
          World-Class Retail Destination
          <span style={styles.eyebrowLine} />
        </p>

        {/* Main headline */}
        <h1 style={styles.h1} className="animate-fade-up delay-1">
          Where Luxury<br />
          <em style={styles.italic}>Meets Experience</em>
        </h1>

        {/* Subline */}
        <p style={styles.sub} className="animate-fade-up delay-2">
          Over 40 million annual visitors. 520+ premier brands. One address that defines
          the future of retail and entertainment.
        </p>

        {/* CTA row */}
        <div style={styles.ctaRow} className="animate-fade-up delay-3">
          <a href="#experience" style={styles.btnPrimary} id="hero-explore-btn">
            Explore the Destination
          </a>
          <a href="#contact" style={styles.btnSecondary} id="hero-inquire-btn">
            Leasing Inquiries
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={styles.scrollIndicator} className="animate-fade-up delay-4" aria-hidden="true">
          <div style={styles.scrollLine} />
          <span style={styles.scrollText}>Scroll to discover</span>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={styles.bottomFade} />
    </section>
  );
}

function particleStyle(i) {
  const sizes = [2, 3, 4, 2, 3, 2, 4, 3, 2, 3, 4, 2, 3, 2, 4, 3, 2, 3];
  const opacities = [0.3, 0.5, 0.25, 0.4, 0.3, 0.55, 0.2, 0.35, 0.45, 0.3, 0.25, 0.4, 0.5, 0.3, 0.35, 0.2, 0.45, 0.3];
  const lefts = [8, 15, 22, 30, 38, 48, 55, 62, 70, 75, 80, 88, 12, 40, 65, 82, 35, 58];
  const tops  = [15, 70, 25, 85, 40, 20, 65, 35, 80, 10, 55, 30, 90, 50, 45, 75, 60, 88];
  const delays = [0, 1.5, 3, 0.5, 2, 4, 1, 2.5, 0.8, 3.5, 1.2, 2.8, 0.3, 1.8, 3.2, 0.9, 2.2, 4.1];
  const s = sizes[i];
  return {
    position: 'absolute',
    width: s, height: s,
    borderRadius: '50%',
    background: '#c9a84c',
    opacity: opacities[i],
    left: `${lefts[i]}%`,
    top: `${tops[i]}%`,
    animation: `float ${3 + (i % 3)}s ease-in-out ${delays[i]}s infinite`,
    pointerEvents: 'none',
  };
}

const styles = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(/hero.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    backgroundRepeat: 'no-repeat',
    transform: 'scale(1.06)',
    transition: 'transform 8s ease-out',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(160deg, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.82) 100%)',
    zIndex: 1,
  },
  particles: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 3,
    textAlign: 'center',
    maxWidth: '820px',
    padding: '0 28px',
  },
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 500,
    letterSpacing: '0.36em',
    textTransform: 'uppercase',
    color: '#c9a84c',
    marginBottom: '24px',
  },
  eyebrowLine: {
    display: 'inline-block',
    width: '40px',
    height: '1px',
    background: 'linear-gradient(135deg,#c9a84c,#e8c97a)',
  },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(3rem, 7vw, 6.5rem)',
    fontWeight: 400,
    lineHeight: 1.08,
    letterSpacing: '-0.01em',
    color: '#fff',
    marginBottom: '28px',
  },
  italic: {
    fontStyle: 'italic',
    background: 'linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  sub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
    fontWeight: 300,
    lineHeight: 1.75,
    color: 'rgba(255,255,255,0.7)',
    maxWidth: '580px',
    margin: '0 auto 44px',
  },
  ctaRow: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '64px',
  },
  btnPrimary: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#080808',
    background: 'linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)',
    backgroundSize: '200% 100%',
    padding: '16px 36px',
    borderRadius: '4px',
    display: 'inline-block',
    animation: 'goldPulse 3s ease-in-out infinite',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  },
  btnSecondary: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#fff',
    background: 'transparent',
    border: '1px solid rgba(201,168,76,0.5)',
    padding: '16px 36px',
    borderRadius: '4px',
    display: 'inline-block',
    transition: 'border-color 0.3s ease, background 0.3s ease',
    backdropFilter: 'blur(8px)',
  },
  scrollIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  scrollLine: {
    width: '1px',
    height: '52px',
    background: 'linear-gradient(to bottom, rgba(201,168,76,0), rgba(201,168,76,0.8))',
    animation: 'float 2s ease-in-out infinite',
  },
  scrollText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.62rem',
    fontWeight: 400,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'rgba(201,168,76,0.7)',
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '180px',
    background: 'linear-gradient(to bottom, transparent, #080808)',
    zIndex: 4,
    pointerEvents: 'none',
  },
};
