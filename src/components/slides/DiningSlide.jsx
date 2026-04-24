import { useEffect, useState } from 'react';
import { siteContent } from '../../data/content';

const zone = siteContent.zones.find(z => z.id === 'dining');

export default function DiningSlide({ active }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(active), active ? 80 : 0);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className="slide" id="slide-dining" aria-label="Fine Dining" style={styles.slide}>
      <div style={styles.bgGlow} aria-hidden="true" />

      <div className="slide-inner reverse" style={styles.innerOverride}>
        {/* Left: content */}
        <div style={{ ...styles.content, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-40px)', transition: 'all 0.85s ease 0.1s' }}>
          <p style={styles.eyebrow}><span style={{ ...styles.dot, background: zone.accent }} />{zone.eyebrow}</p>
          <h2 style={styles.h2}>{zone.title}</h2>
          <p style={styles.body}>{zone.body}</p>

          <div style={styles.highlights}>
            {zone.highlights.map(h => (
              <div key={h} className="glass-card" style={styles.highlight}>
                <span style={{ ...styles.checkMark, color: zone.accent }}>✓</span>
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="responsive-grid-2" style={styles.metricRow}>
            {[
              { v: '+47', u: 'minutes', d: 'Avg. visit duration increase' },
              { v: '22%', u: 'of revenue', d: 'Dining share of total mall sales' },
            ].map(m => (
              <div key={m.u} className="glass-card" style={styles.metric}>
                <span style={{ ...styles.metricVal, color: zone.accent }}>{m.v}</span>
                <span style={styles.metricUnit}>{m.u}</span>
                <span style={styles.metricDesc}>{m.d}</span>
              </div>
            ))}
          </div>

          <a href="#slide-connect" style={{ ...styles.cta, background: zone.accent, color: '#080808' }} id="dining-cta-btn">
            Restaurant Opportunities →
          </a>
        </div>

        {/* Right: real photo */}
        <div style={{ ...styles.visual, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(40px)', transition: 'all 0.85s ease 0.25s' }}>
          <div className="video-frame" style={styles.imageFrame}>
            <video src="/15067115_2560_1440_30fps.mp4" autoPlay muted loop playsInline />
            <div style={styles.imgOverlay} />
            <div className="glass-card" style={{ ...styles.badge, borderColor: zone.accent }}>
              <span style={{ ...styles.badgeVal, color: zone.accent }}>100+</span>
              <span style={styles.badgeLabel}>Dining Concepts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  slide: { background: 'linear-gradient(135deg,#050c05 0%,#080808 100%)', justifyContent: 'center' },
  bgGlow: { position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(109,189,124,0.06) 0%,transparent 70%)', pointerEvents: 'none' },
  innerOverride: {
    position: 'relative', zIndex: 1,
  },
  content: { display: 'flex', flexDirection: 'column', gap: '20px' },
  eyebrow: { display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6dbd7c' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, display: 'inline-block' },
  h2: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 400, lineHeight: 1.12, color: '#fff' },
  body: { fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.85rem,1.2vw,0.97rem)', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.58)' },
  highlights: { display: 'flex', flexDirection: 'column', gap: '8px' },
  highlight: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' },
  checkMark: { fontSize: '0.75rem', flexShrink: 0 },
  metricRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  metric: { padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '4px' },
  metricVal: { fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, lineHeight: 1 },
  metricUnit: { fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' },
  metricDesc: { fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 300, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 },
  cta: { fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '12px 24px', borderRadius: '4px', display: 'inline-block', alignSelf: 'flex-start' },
  visual: {},
  imageFrame: { position: 'relative', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(109,189,124,0.12)' },
  img: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  video: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  img: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  imgOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 60%,rgba(5,12,5,0.7) 100%)' },
  badge: { position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(8,8,8,0.75)', backdropFilter: 'blur(12px)', border: '1px solid', borderRadius: '8px', padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' },
  badgeVal: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, lineHeight: 1 },
  badgeLabel: { fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' },
};
