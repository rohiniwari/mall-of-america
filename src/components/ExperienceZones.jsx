import { useState, useEffect, useRef } from 'react';

const zones = [
  {
    id: 'retail',
    label: 'Luxury Retail',
    eyebrow: 'Premium Shopping',
    title: 'The Corridor of Icons',
    body: `Over 520 world-class brands concentrated under one roof — from flagship Chanel and Louis Vuitton boutiques to the most coveted streetwear drops. Our luxury retail corridor is architected for maximum dwell time, with soaring atrium ceilings, white Carrara marble floors, and bespoke brand environments that command premium spend.`,
    highlights: ['520+ Brands', 'Avg. $285 Transaction', '18% YoY Revenue Growth'],
    bg: 'linear-gradient(135deg, #1a1008 0%, #0f0a04 50%, #080808 100%)',
    accent: '#c9a84c',
    imageBg: 'linear-gradient(160deg, #1a1208 0%, #2d1f08 40%, #0f0a04 100%)',
    icon: '◈',
    stat: { value: '520+', label: 'Luxury Brands' },
  },
  {
    id: 'entertainment',
    label: 'Theme Park',
    eyebrow: 'Thrill & Adventure',
    title: 'Nickelodeon Universe',
    body: `America's largest indoor theme park lives inside MOA — 7 acres of gravity-defying roller coasters, a towering indoor Ferris wheel, log flume rides, and 27 distinct attractions drawing thrill-seekers and families year-round. No outdoor weather dependency, guaranteed footfall, maximum tenant adjacency.`,
    highlights: ['27 Attractions', '4M Riders / Year', 'Open 365 Days'],
    bg: 'linear-gradient(135deg, #0a0818 0%, #080612 50%, #080808 100%)',
    accent: '#7c6ef7',
    imageBg: 'linear-gradient(160deg, #12083a 0%, #1e0f50 40%, #080808 100%)',
    icon: '◎',
    stat: { value: '4M+', label: 'Riders / Year' },
  },
  {
    id: 'events',
    label: 'Events & Concerts',
    eyebrow: 'Live Entertainment',
    title: 'The Grand Atrium Stage',
    body: `Our central rotunda transforms into a world-class live venue — hosting Grammy-winning artists, brand activation spectacles, championship esports events, and seasonal spectaculars. With 12,000+ standing capacity, full rigging infrastructure, and broadcast-ready AV, MOA's event program drives 18% incremental footfall on event days.`,
    highlights: ['12,000 Capacity', '200+ Events / Year', '+18% Footfall on Event Days'],
    bg: 'linear-gradient(135deg, #0d0808 0%, #160808 50%, #080808 100%)',
    accent: '#e85d4a',
    imageBg: 'linear-gradient(160deg, #2a0808 0%, #400e0e 40%, #0f0505 100%)',
    icon: '◉',
    stat: { value: '200+', label: 'Events Per Year' },
  },
  {
    id: 'dining',
    label: 'Fine Dining',
    eyebrow: 'Culinary Excellence',
    title: 'A World of Flavor',
    body: `From rooftop-view Michelin-starred tasting menus to artisanal market halls buzzing with energy — our 100+ dining concepts generate 22% of total mall revenue. The dining floor draws guests independently of retail intent, extending average visit duration by 47 minutes and driving multi-daypart traffic from morning through late evening.`,
    highlights: ['100+ Concepts', '+47 Min Avg Visit', '22% of Total Revenue'],
    bg: 'linear-gradient(135deg, #080d08 0%, #081208 50%, #080808 100%)',
    accent: '#6dbd7c',
    imageBg: 'linear-gradient(160deg, #081a08 0%, #0d2810 40%, #080808 100%)',
    icon: '◑',
    stat: { value: '100+', label: 'Dining Concepts' },
    image: '/dining.jpg',
  },
];

export default function ExperienceZones() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const switchZone = (i) => {
    if (i === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 280);
  };

  const zone = zones[active];

  return (
    <section id="experience" ref={sectionRef} style={styles.section} aria-label="Experience Zones">
      <div style={styles.inner}>
        {/* Header */}
        <div style={{ ...styles.header, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <p className="section-label">The Destination</p>
          <h2 style={styles.h2}>
            Four Worlds,<br />
            <span className="gold-text">One Address</span>
          </h2>
          <p style={styles.subtext}>
            Each zone is a destination within a destination — purpose-built to maximise dwell time,
            cross-pollinate foot traffic, and deliver unmatched brand adjacency.
          </p>
        </div>

        {/* Tab navigation */}
        <div style={styles.tabBar} role="tablist" aria-label="Experience zones">
          {zones.map((z, i) => (
            <button
              key={z.id}
              id={`tab-${z.id}`}
              role="tab"
              aria-selected={i === active}
              aria-controls={`panel-${z.id}`}
              onClick={() => switchZone(i)}
              style={{
                ...styles.tab,
                ...(i === active ? { ...styles.tabActive, borderBottomColor: z.accent, color: z.accent } : {}),
              }}
            >
              <span style={styles.tabIcon}>{z.icon}</span>
              {z.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          id={`panel-${zone.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${zone.id}`}
          ref={contentRef}
          style={{
            ...styles.panel,
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(12px)' : 'none',
            transition: 'opacity 0.28s ease, transform 0.28s ease',
          }}
        >
          {/* Left: text */}
          <div style={styles.textSide}>
            <p style={{ ...styles.eyebrow, color: zone.accent }}>
              <span style={{ ...styles.eyebrowDot, background: zone.accent }} />
              {zone.eyebrow}
            </p>
            <h3 style={styles.h3}>{zone.title}</h3>
            <p style={styles.body}>{zone.body}</p>

            <ul style={styles.highlights} aria-label="Key highlights">
              {zone.highlights.map(h => (
                <li key={h} style={styles.highlight}>
                  <span style={{ ...styles.highlightDot, background: zone.accent }} />
                  {h}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              id={`zone-cta-${zone.id}`}
              style={{ ...styles.cta, background: zone.accent, color: zone.id === 'entertainment' ? '#fff' : '#080808' }}
            >
              Inquire About This Zone →
            </a>
          </div>

          {/* Right: visual */}
          <div style={styles.visualSide}>
            <div style={{ ...styles.visualCard, background: zone.imageBg }}>
              {/* Real image if available */}
              {zone.image && (
                <img
                  src={zone.image}
                  alt={zone.eyebrow}
                  style={styles.zoneImg}
                  loading="lazy"
                />
              )}

              {/* Overlay scene illustration (gradient SSR-safe fallback) */}
              {!zone.image && (
                <div style={styles.visualAbstract}>
                  <ZoneIllustration zone={zone} />
                </div>
              )}

              {/* Stat badge */}
              <div style={{ ...styles.badge, borderColor: zone.accent }}>
                <span style={{ ...styles.badgeValue, color: zone.accent }}>{zone.stat.value}</span>
                <span style={styles.badgeLabel}>{zone.stat.label}</span>
              </div>

              {/* Corner accent */}
              <div style={{ ...styles.cornerAccent, borderColor: zone.accent }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ZoneIllustration({ zone }) {
  const configs = {
    retail: {
      elements: [
        { type: 'arch', top: '10%', left: '50%', w: 180, h: 280, color: 'rgba(201,168,76,0.15)' },
        { type: 'arch', top: '18%', left: '50%', w: 120, h: 200, color: 'rgba(201,168,76,0.22)' },
        { type: 'box', top: '65%', left: '15%', w: 70, h: 80, color: 'rgba(201,168,76,0.12)' },
        { type: 'box', top: '65%', left: '72%', w: 70, h: 80, color: 'rgba(201,168,76,0.12)' },
        { type: 'line', top: '78%', left: '0', w: '100%', color: 'rgba(201,168,76,0.3)' },
      ],
      label: 'Luxury Retail Corridor',
    },
    entertainment: {
      elements: [
        { type: 'circle', top: '20%', left: '50%', r: 90, color: 'rgba(124,110,247,0.2)', stroke: 'rgba(124,110,247,0.5)' },
        { type: 'circle', top: '20%', left: '50%', r: 60, color: 'rgba(124,110,247,0.1)', stroke: 'rgba(124,110,247,0.4)' },
        { type: 'circle', top: '20%', left: '50%', r: 6, color: 'rgba(124,110,247,0.8)', stroke: 'none' },
        { type: 'coaster', color: 'rgba(124,110,247,0.3)' },
      ],
      label: 'Indoor Theme Park',
    },
    events: {
      elements: [
        { type: 'stage', color: 'rgba(232,93,74,0.2)', accent: 'rgba(232,93,74,0.7)' },
      ],
      label: 'Grand Event Atrium',
    },
    dining: {
      elements: [],
      label: 'Fine Dining Collection',
    },
  };

  const cfg = configs[zone.id] || configs.retail;

  return (
    <div style={styles.illus}>
      <svg width="100%" height="100%" viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {zone.id === 'retail' && <>
          <path d="M200 40 L280 140 L280 340 L120 340 L120 140 Z" stroke="rgba(201,168,76,0.18)" strokeWidth="1.5" fill="rgba(201,168,76,0.04)" />
          <path d="M200 80 L255 155 L255 340 L145 340 L145 155 Z" stroke="rgba(201,168,76,0.28)" strokeWidth="1.5" fill="rgba(201,168,76,0.06)" />
          <line x1="0" y1="340" x2="400" y2="340" stroke="rgba(201,168,76,0.35)" strokeWidth="0.8" />
          <rect x="90" y="250" width="60" height="90" rx="2" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.2)" />
          <rect x="250" y="250" width="60" height="90" rx="2" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.2)" />
          <rect x="160" y="270" width="80" height="70" rx="2" fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.3)" />
          {[0,1,2,3,4,5].map(i => (
            <circle key={i} cx={60 + i*57} cy={355} r="2" fill="rgba(201,168,76,0.4)" />
          ))}
          <text x="200" y="30" textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="9" letterSpacing="4" fontFamily="Inter, sans-serif">LUXURY CORRIDOR</text>
        </>}

        {zone.id === 'entertainment' && <>
          <circle cx="200" cy="165" r="110" stroke="rgba(124,110,247,0.25)" strokeWidth="1.5" fill="none" />
          <circle cx="200" cy="165" r="75" stroke="rgba(124,110,247,0.35)" strokeWidth="1.5" fill="none" />
          <circle cx="200" cy="165" r="40" stroke="rgba(124,110,247,0.5)" strokeWidth="1.5" fill="rgba(124,110,247,0.08)" />
          <circle cx="200" cy="165" r="8" fill="rgba(124,110,247,0.7)" />
          {[0,1,2,3,4,5,6,7].map(i => {
            const angle = (i * 45 * Math.PI) / 180;
            const x = 200 + 110 * Math.cos(angle);
            const y = 165 + 110 * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="3" fill="rgba(124,110,247,0.55)" />;
          })}
          <path d="M200 55 Q270 110 200 165 Q130 110 200 55" stroke="rgba(124,110,247,0.4)" strokeWidth="2" fill="none" />
          <path d="M310 165 Q255 235 200 165 Q255 95 310 165" stroke="rgba(124,110,247,0.4)" strokeWidth="2" fill="none" />
          <text x="200" y="350" textAnchor="middle" fill="rgba(124,110,247,0.5)" fontSize="9" letterSpacing="4" fontFamily="Inter, sans-serif">NICKELODEON UNIVERSE</text>
        </>}

        {zone.id === 'events' && <>
          <polygon points="200,60 340,320 60,320" stroke="rgba(232,93,74,0.3)" strokeWidth="1.5" fill="rgba(232,93,74,0.05)" />
          <rect x="145" y="290" width="110" height="30" rx="2" fill="rgba(232,93,74,0.15)" stroke="rgba(232,93,74,0.4)" />
          {[0,1,2,3,4].map(i => (
            <line key={i} x1="200" y1="60" x2={80 + i*60} y2="290" stroke="rgba(232,93,74,0.12)" strokeWidth="1" />
          ))}
          {[80,130,170,200,230,270,320].map((x,i) => [200,230,260,280].map((y,j) => (
            <rect key={`${i}-${j}`} x={x-6} y={y-4} width="10" height="6" rx="1" fill="rgba(232,93,74,0.2)" />
          )))}
          <circle cx="200" cy="60" r="6" fill="rgba(232,93,74,0.7)" />
          {[-30,-15,0,15,30].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return <line key={i} x1="200" y1="60" x2={200 + Math.sin(rad)*60} y2={60 - Math.cos(rad)*60} stroke="rgba(232,93,74,0.25)" strokeWidth="1" />;
          })}
          <text x="200" y="350" textAnchor="middle" fill="rgba(232,93,74,0.5)" fontSize="9" letterSpacing="4" fontFamily="Inter, sans-serif">GRAND ATRIUM STAGE</text>
        </>}

        {zone.id === 'dining' && <>
          <circle cx="200" cy="170" r="110" stroke="rgba(109,189,124,0.2)" strokeWidth="1" fill="none" />
          {[0,1,2,3,4,5].map(i => {
            const angle = (i * 60 * Math.PI) / 180;
            const x = 200 + 80 * Math.cos(angle);
            const y = 170 + 80 * Math.sin(angle);
            return <g key={i}>
              <circle cx={x} cy={y} r="22" fill="rgba(109,189,124,0.08)" stroke="rgba(109,189,124,0.25)" strokeWidth="1" />
              <circle cx={x} cy={y} r="10" fill="rgba(109,189,124,0.15)" />
            </g>;
          })}
          <circle cx="200" cy="170" r="20" fill="rgba(109,189,124,0.2)" stroke="rgba(109,189,124,0.5)" strokeWidth="1.5" />
          <text x="200" y="350" textAnchor="middle" fill="rgba(109,189,124,0.5)" fontSize="9" letterSpacing="4" fontFamily="Inter, sans-serif">CULINARY COLLECTION</text>
        </>}
      </svg>
      <p style={{ ...styles.illusLabel, color: zone.accent }}>{cfg.label}</p>
    </div>
  );
}

const styles = {
  section: {
    padding: 'clamp(80px, 10vw, 140px) 0',
    background: '#080808',
    position: 'relative',
  },
  inner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 80px)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 'clamp(40px, 5vw, 64px)',
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
  tabBar: {
    display: 'flex',
    gap: '0',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    marginBottom: '48px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 400,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.4)',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    marginBottom: '-1px',
  },
  tabActive: {
    color: '#c9a84c',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
  },
  tabIcon: {
    fontSize: '1rem',
    opacity: 0.8,
  },
  panel: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'clamp(32px, 5vw, 80px)',
    alignItems: 'center',
    minHeight: '480px',
  },
  textSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 500,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
  },
  eyebrowDot: {
    width: '6px', height: '6px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  h3: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
    fontWeight: 400,
    lineHeight: 1.15,
    color: '#fff',
  },
  body: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(0.88rem, 1.2vw, 0.97rem)',
    fontWeight: 300,
    lineHeight: 1.8,
    color: 'rgba(255,255,255,0.6)',
  },
  highlights: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  highlight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.82rem',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: '0.05em',
  },
  highlightDot: {
    width: '5px', height: '5px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: '6px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '12px 24px',
    borderRadius: '4px',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    marginTop: '8px',
  },
  visualSide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualCard: {
    position: 'relative',
    width: '100%',
    maxWidth: '520px',
    aspectRatio: '4/3',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  zoneImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  visualAbstract: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illus: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  illusLabel: {
    position: 'absolute',
    bottom: '16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.62rem',
    fontWeight: 400,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  badge: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(8,8,8,0.75)',
    backdropFilter: 'blur(12px)',
    border: '1px solid',
    borderRadius: '8px',
    padding: '10px 14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  badgeValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.4rem',
    fontWeight: 700,
    lineHeight: 1,
  },
  badgeLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 400,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
  },
  cornerAccent: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    width: '32px',
    height: '32px',
    borderLeft: '2px solid',
    borderBottom: '2px solid',
    borderRadius: '0 0 0 6px',
    opacity: 0.5,
  },
};
