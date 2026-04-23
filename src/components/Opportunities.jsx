import { useEffect, useRef, useState } from 'react';

const opportunities = [
  {
    id: 'flagship',
    icon: '◈',
    title: 'Flagship Retail Spaces',
    size: '2,500 – 25,000 sq ft',
    desc: 'Prime ground-floor storefronts with maximum visibility, soaring ceiling heights, and custom facade possibilities. Ideal for global brands seeking a commanding North American presence.',
    features: ['Corner & anchor positions', 'Custom exterior branding', 'Dedicated valet zones'],
    status: 'Limited Availability',
    statusColor: '#e85d4a',
  },
  {
    id: 'pop-up',
    icon: '◎',
    title: 'Pop-Up & Activation Suites',
    size: '300 – 3,000 sq ft',
    desc: 'Turnkey, furniture-ready activation spaces positioned at high-traffic intersections. Perfect for seasonal campaigns, product launches, and brand immersion experiences.',
    features: ['14-day minimum', 'Full AV & lighting', 'Marketing support included'],
    status: 'Available Now',
    statusColor: '#6dbd7c',
  },
  {
    id: 'dining',
    icon: '◉',
    title: 'Restaurant Integration',
    size: '1,800 – 12,000 sq ft',
    desc: 'From fast-casual pods to full-service Michelin-contender environments. Hood & duct infrastructure in place, premium liquor licensing pathways, and adjacency to entertainment anchors.',
    features: ['Full kitchen infrastructure', 'Patio/atrium seating', 'Liquor license support'],
    status: 'Select Spaces Available',
    statusColor: '#c9a84c',
  },
  {
    id: 'event',
    icon: '◐',
    title: 'Event & Sponsorship',
    size: 'Custom Configurations',
    desc: 'Exclusive naming rights, stage sponsorships, LED display takeovers, and immersive brand activations across 200+ annual events reaching 40M+ visitors.',
    features: ['Naming rights packages', 'Digital signage network', 'VIP hospitality suites'],
    status: 'Open for Proposals',
    statusColor: '#7c6ef7',
  },
];

function OpportunityCard({ opp, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={`opportunity-${opp.id}`}
      style={{
        ...styles.card,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 0.12}s`,
      }}
      className="glass-card"
    >
      {/* Status tag */}
      <span style={{ ...styles.statusTag, color: opp.statusColor, borderColor: opp.statusColor }}>
        <span style={{ ...styles.statusDot, background: opp.statusColor }} />
        {opp.status}
      </span>

      {/* Icon */}
      <span style={styles.icon}>{opp.icon}</span>

      {/* Title */}
      <h3 style={styles.cardTitle}>{opp.title}</h3>
      <span style={styles.size}>{opp.size}</span>

      {/* Description */}
      <p style={styles.cardDesc}>{opp.desc}</p>

      {/* Features */}
      <ul style={styles.features}>
        {opp.features.map(f => (
          <li key={f} style={styles.feature}>
            <span style={styles.featureCheck}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="#contact" style={styles.cardCta} id={`opp-cta-${opp.id}`}>
        Request Details →
      </a>

      {/* Decorative bottom line */}
      <div style={{ ...styles.bottomLine, background: opp.statusColor }} />
    </div>
  );
}

export default function Opportunities() {
  return (
    <section id="opportunities" style={styles.section} aria-label="Leasing Opportunities">
      <div style={styles.inner}>
        <div style={styles.header}>
          <p className="section-label">Opportunities</p>
          <h2 style={styles.h2}>
            Spaces Designed for<br />
            <span className="gold-text">Exceptional Brands</span>
          </h2>
          <p style={styles.subtext}>
            From iconic flagship stores to immersive pop-up experiences,
            we offer bespoke environments tailored to your brand's ambition.
          </p>
        </div>

        <div style={styles.grid}>
          {opportunities.map((opp, i) => (
            <OpportunityCard key={opp.id} opp={opp} index={i} />
          ))}
        </div>
      </div>

      {/* Top decorative line */}
      <div style={styles.topLine} aria-hidden="true" />
    </section>
  );
}

const styles = {
  section: {
    padding: 'clamp(80px, 10vw, 140px) 0',
    background: 'linear-gradient(180deg, #080808 0%, #0e0e0e 50%, #080808 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  topLine: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
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
  },
  subtext: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(0.88rem, 1.4vw, 1rem)',
    fontWeight: 300,
    lineHeight: 1.75,
    color: 'rgba(255,255,255,0.5)',
    maxWidth: '520px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    position: 'relative',
    padding: '36px 28px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    overflow: 'hidden',
    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
  },
  statusTag: {
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: '6px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    border: '1px solid',
    borderRadius: '20px',
    padding: '4px 12px',
  },
  statusDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  icon: {
    fontSize: '1.8rem',
    color: '#c9a84c',
    opacity: 0.5,
    lineHeight: 1,
    marginTop: '8px',
  },
  cardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.2,
    color: '#fff',
  },
  size: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 400,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#c9a84c',
    opacity: 0.7,
  },
  cardDesc: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.55)',
  },
  features: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '4px',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.65)',
  },
  featureCheck: {
    color: '#c9a84c',
    fontSize: '0.7rem',
    flexShrink: 0,
  },
  cardCta: {
    display: 'inline-block',
    marginTop: 'auto',
    paddingTop: '16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#c9a84c',
    transition: 'opacity 0.3s ease',
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0, left: 0,
    width: '60px',
    height: '2px',
    borderRadius: '2px',
    transition: 'width 0.4s ease',
  },
};
