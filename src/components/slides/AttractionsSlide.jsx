import { useEffect, useState } from 'react';
import { siteContent } from '../../data/content';

const zone = siteContent.zones.find(z => z.id === 'entertainment');

const attractions = [
  { name: 'Roller Coasters', count: '7', icon: '🎢', desc: 'Including the legendary Kärnan drop coaster' },
  { name: 'Indoor Ferris Wheel', count: '1', icon: '🎡', desc: '72ft tall, visible throughout the park' },
  { name: 'Total Attractions', count: '27', icon: '⭐', desc: 'Rides, games, and live shows' },
  { name: 'Sq Ft of Adventure', count: '7A', icon: '🗺', desc: '7 acres of pure excitement' },
];

export default function AttractionsSlide({ active }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (active) { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }
    else setVis(false);
  }, [active]);

  return (
    <section className="slide" id="slide-attractions" aria-label="Attractions & Theme Park" style={styles.slide}>
      <div style={styles.bgGlow} aria-hidden="true" />

      <div style={styles.inner}>
        {/* Left: SVG park illustration */}
        <div style={{ ...styles.visual, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-40px)', transition: 'all 0.85s ease 0.1s' }}>
          <div style={styles.imageFrame}>
            <video src="/20441628-uhd_3840_2160_50fps.mp4" autoPlay muted loop playsInline style={styles.video} />
            <div style={styles.imgOverlay} />
            <div className="glass-card" style={{ ...styles.badge, borderColor: zone.accent }}>
              <span style={{ ...styles.badgeVal, color: zone.accent }}>4M+</span>
              <span style={styles.badgeLabel}>Riders Per Year</span>
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div style={{ ...styles.content, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(40px)', transition: 'all 0.85s ease 0.25s' }}>
          <p style={styles.eyebrow}><span style={{ ...styles.dot, background: zone.accent }} />{zone.eyebrow}</p>
          <h2 style={styles.h2}>{zone.title}</h2>
          <p style={styles.body}>{zone.body}</p>

          <div style={styles.attractionGrid}>
            {attractions.map(a => (
              <div key={a.name} className="glass-card" style={styles.attractionCard}>
                <span style={styles.attrIcon}>{a.icon}</span>
                <div style={{ ...styles.attrCount, color: zone.accent }}>{a.count}</div>
                <div style={styles.attrName}>{a.name}</div>
                <div style={styles.attrDesc}>{a.desc}</div>
              </div>
            ))}
          </div>

          <a href="#slide-connect" style={{ ...styles.cta, background: zone.accent }} id="attractions-cta-btn">
            Entertainment Partnerships →
          </a>
        </div>
      </div>
    </section>
  );
}

const styles = {
  slide: { background: 'linear-gradient(135deg,#070512 0%,#080808 100%)', justifyContent: 'center' },
  bgGlow: { position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,110,247,0.08) 0%,transparent 70%)', pointerEvents: 'none' },
  inner: {
    maxWidth: '1280px', width: '100%', margin: '0 auto',
    padding: '0 clamp(20px,5vw,80px)',
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: 'clamp(32px,5vw,80px)', alignItems: 'center', position: 'relative', zIndex: 1,
  },
  visual: {},
  imageFrame: { position: 'relative', aspectRatio: '4/3.5', border: '1px solid rgba(124,110,247,0.1)', borderRadius: '12px', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  video: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  img: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  imgOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 60%,rgba(8,8,8,0.7) 100%)' },
  badge: { position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(8,8,8,0.75)', backdropFilter: 'blur(12px)', border: '1px solid', borderRadius: '8px', padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' },
  badgeVal: { fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', fontWeight: 700, lineHeight: 1 },
  badgeLabel: { fontFamily: "'Inter',sans-serif", fontSize: '0.58rem', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' },
  content: { display: 'flex', flexDirection: 'column', gap: '20px' },
  eyebrow: { display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Inter',sans-serif", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7c6ef7' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, display: 'inline-block' },
  h2: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 400, lineHeight: 1.12, color: '#fff' },
  body: { fontFamily: "'Inter',sans-serif", fontSize: 'clamp(0.85rem,1.2vw,0.97rem)', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.58)' },
  attractionGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  attractionCard: { padding: '14px', display: 'flex', flexDirection: 'column', gap: '4px' },
  attrIcon: { fontSize: '1.2rem', lineHeight: 1 },
  attrCount: { fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', fontWeight: 700, lineHeight: 1 },
  attrName: { fontFamily: "'Inter',sans-serif", fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' },
  attrDesc: { fontFamily: "'Inter',sans-serif", fontSize: '0.72rem', fontWeight: 300, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 },
  cta: { fontFamily: "'Inter',sans-serif", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', padding: '12px 24px', borderRadius: '4px', display: 'inline-block', alignSelf: 'flex-start' },
};
