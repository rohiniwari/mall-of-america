import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 40, suffix: 'M+', label: 'Annual Visitors', icon: '◎', desc: 'More than 40 million guests per year' },
  { value: 520, suffix: '+', label: 'Premier Brands', icon: '◈', desc: 'From luxury boutiques to flagship stores' },
  { value: 5.6, suffix: 'M', label: 'Sq Ft Retail Space', icon: '◧', desc: 'Largest enclosed mall in the Americas' },
  { value: 100, suffix: '+', label: 'Dining Concepts', icon: '◉', desc: 'From fast-casual to Michelin-starred' },
  { value: 2, suffix: '.87B', label: 'Annual Revenue', icon: '◐', desc: '$2.87B in total annual sales' },
  { value: 14, suffix: 'K+', label: 'Employees', icon: '◑', desc: 'Across retail, dining & entertainment' },
];

function useCountUp(target, decimals = 0, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = null;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(parseFloat((eased * target).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(step);
            else setValue(target);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimals, duration]);

  return [value, ref];
}

function StatCard({ stat, index }) {
  const isDecimal = !Number.isInteger(stat.value);
  const [count, ref] = useCountUp(stat.value, isDecimal ? 2 : 0);

  return (
    <div ref={ref} style={styles.card} className="glass-card stat-card">
      <span style={styles.icon} aria-hidden="true">{stat.icon}</span>
      <div style={styles.metric}>
        <span style={styles.number} className="gold-text">
          {count}{stat.suffix}
        </span>
        <span style={styles.label}>{stat.label}</span>
      </div>
      <p style={styles.desc}>{stat.desc}</p>
      <div style={styles.cardBorder} />
    </div>
  );
}

export default function StatsBar() {
  return (
    <section id="metrics" style={styles.section} aria-label="Key Performance Metrics">
      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <p className="section-label">By the Numbers</p>
          <h2 style={styles.h2}>
            A Scale That<br />
            <span className="gold-text">Speaks for Itself</span>
          </h2>
          <p style={styles.subtext}>
            Unmatched foot traffic, retail diversity, and consistent revenue performance
            make MOA the most compelling leasing opportunity in North America.
          </p>
        </div>

        {/* Stats grid */}
        <div style={styles.grid}>
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Source footnote */}
        <p style={styles.footnote}>
          ¹ Data sourced from MOA Annual Report 2024 and ICSC retail benchmarks.
        </p>
      </div>

      {/* Decorative gold line */}
      <div style={styles.decorLine} aria-hidden="true" />
    </section>
  );
}

const styles = {
  section: {
    position: 'relative',
    padding: 'clamp(80px, 10vw, 140px) 0',
    background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 100%)',
    overflow: 'hidden',
  },
  inner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 80px)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 'clamp(48px, 6vw, 80px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  h2: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
    fontWeight: 400,
    lineHeight: 1.15,
    color: '#fff',
    textAlign: 'center',
  },
  subtext: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(0.88rem, 1.4vw, 1rem)',
    fontWeight: 300,
    lineHeight: 1.75,
    color: 'rgba(255,255,255,0.55)',
    maxWidth: '560px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '36px',
  },
  card: {
    position: 'relative',
    padding: '36px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflow: 'hidden',
    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
    cursor: 'default',
  },
  cardBorder: {
    position: 'absolute',
    bottom: 0, left: '28px',
    width: '40px', height: '2px',
    background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
    borderRadius: '2px',
    transition: 'width 0.4s ease',
  },
  icon: {
    fontSize: '1.6rem',
    color: '#c9a84c',
    opacity: 0.7,
    lineHeight: 1,
  },
  metric: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  number: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#b8bcc8',
  },
  desc: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 300,
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.4)',
  },
  footnote: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.25)',
    textAlign: 'center',
  },
  decorLine: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)',
  },
};
