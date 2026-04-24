import { useEffect, useState, useRef } from 'react';
import { siteContent } from '../../data/content';

const c = siteContent.overview;
const stats = siteContent.stats;

function CountUp({ target, suffix, decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1600, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(parseFloat((eased * target).toFixed(decimals)));
        if (p < 1) requestAnimationFrame(step);
        else setVal(target);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, decimals]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function WhyMOASlide({ active }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(active), active ? 80 : 0);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className="slide" id="slide-why-moa" aria-label="Why MOA" style={styles.slide}>
      <div style={styles.bgGlow} aria-hidden="true" />

      <div className="slide-inner" style={styles.innerOverride}>
        {/* Left: editorial */}
        <div style={{ ...styles.left, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-32px)', transition: 'all 0.8s ease 0.1s' }}>
          <p className="section-label">Demographics & Scale</p>
          <h2 style={styles.h2}>
            {c.title}<br />
            <span className="gold-text">{c.titleAccent}</span>
          </h2>
          {c.body.map((p, i) => (
            <p key={i} style={styles.body}>{p}</p>
          ))}
          <div style={styles.quoteBlock}>
            <span style={styles.quoteMark}>"</span>
            <blockquote style={styles.quote}>{c.quote}</blockquote>
            <cite style={styles.cite}>{c.quoteCite}</cite>
          </div>
        </div>

        {/* Right: stats grid */}
        <div style={{ ...styles.right, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(32px)', transition: 'all 0.8s ease 0.25s' }}>
          <div className="responsive-grid-2" style={styles.statsGrid}>
            {stats.map((s, i) => (
              <div key={s.label} className="glass-card" style={{ ...styles.statCard, animationDelay: `${i * 0.1}s` }}>
                <span style={styles.statIcon}>{s.icon}</span>
                <div style={styles.statNum} className="gold-text">
                  {active ? <CountUp target={s.value} suffix={s.suffix} decimals={Number.isInteger(s.value) ? 0 : 2} /> : `0${s.suffix}`}
                </div>
                <div style={styles.statLabel}>{s.label}</div>
                <div style={styles.statDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
          <p style={styles.footnote}>¹ MOA Annual Report 2024 · ICSC Benchmarks</p>
        </div>
      </div>
    </section>
  );
}

const styles = {
  slide: { background: '#080808', justifyContent: 'center' },
  bgGlow: {
    position: 'absolute', top: '-20%', right: '-10%',
    width: '600px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  innerOverride: {
    position: 'relative', zIndex: 1,
  },
  left: { display: 'flex', flexDirection: 'column', gap: '20px' },
  h2: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem,4vw,3.4rem)', fontWeight: 400, lineHeight: 1.15, color: '#fff',
  },
  body: {
    fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.85rem,1.2vw,0.97rem)',
    fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.58)',
  },
  quoteBlock: {
    padding: '24px 0', borderTop: '1px solid rgba(201,168,76,0.15)',
    display: 'flex', flexDirection: 'column', gap: '8px',
  },
  quoteMark: { fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: 'rgba(201,168,76,0.2)', lineHeight: 0.5 },
  quote: {
    fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem,1.8vw,1.25rem)',
    fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.5,
  },
  cite: { fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: '#c9a84c', fontStyle: 'normal' },
  right: { display: 'flex', flexDirection: 'column', gap: '16px' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  statCard: { padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: '8px' },
  statIcon: { fontSize: '1.2rem', color: '#c9a84c', opacity: 0.6 },
  statNum: {
    fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,2.8vw,2.2rem)',
    fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em',
  },
  statLabel: { fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b8bcc8' },
  statDesc: { fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 },
  footnote: { fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', textAlign: 'right' },
};
