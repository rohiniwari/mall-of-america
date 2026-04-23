import { useEffect, useState } from 'react';
import { siteContent } from '../../data/content';

const zone = siteContent.zones.find(z => z.id === 'events');

const platforms = [
  { icon: '🎵', title: 'Live Concerts', desc: 'Grammy-winning artists, 12K capacity standing-room atrium' },
  { icon: '🎮', title: 'Esports Events', desc: 'Championship gaming spectacles with broadcast-ready AV' },
  { icon: '✨', title: 'Brand Activations', desc: 'Immersive 360° brand experiences at the heart of the mall' },
  { icon: '🎄', title: 'Seasonal Spectaculars', desc: 'Holiday markets, light shows, and pop-culture IPs' },
];

export default function EventsSlide({ active }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (active) { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }
    else setVis(false);
  }, [active]);

  return (
    <section className="slide" id="slide-events" aria-label="Events & Platform" style={styles.slide}>
      <div style={styles.bgGlow} aria-hidden="true" />

      <div style={styles.inner}>
        {/* Left: content */}
        <div style={{ ...styles.content, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-40px)', transition: 'all 0.85s ease 0.1s' }}>
          <p style={styles.eyebrow}><span style={{ ...styles.dot, background: zone.accent }} />{zone.eyebrow}</p>
          <h2 style={styles.h2}>{zone.title}</h2>
          <p style={styles.body}>{zone.body}</p>

          <div style={styles.highlights}>
            {zone.highlights.map(h => (
              <div key={h} className="glass-card" style={styles.highlight}>
                <span style={{ color: zone.accent }}>✓</span> {h}
              </div>
            ))}
          </div>

          <a href="#slide-connect" style={{ ...styles.cta, background: zone.accent }} id="events-cta-btn">
            Event Sponsorship Packages →
          </a>
        </div>

        {/* Right: platform cards */}
        <div style={{ ...styles.right, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(40px)', transition: 'all 0.85s ease 0.25s' }}>
          <div style={styles.imageFrame}>
            <video src="/15586754_2160_3840_30fps.mp4" autoPlay muted loop playsInline style={styles.video} />
            <div style={styles.imgOverlay} />
            <div style={styles.statRow}>
              {[{ v: '200+', l: 'Events / Yr' }, { v: '12K', l: 'Capacity' }, { v: '+18%', l: 'Footfall' }].map(s => (
                <div key={s.l} style={styles.miniStat}>
                  <span style={{ ...styles.miniVal, color: zone.accent }}>{s.v}</span>
                  <span style={styles.miniLabel}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.platformGrid}>
            {platforms.map(p => (
              <div key={p.title} className="glass-card" style={styles.platformCard}>
                <span style={styles.platIcon}>{p.icon}</span>
                <div style={styles.platTitle}>{p.title}</div>
                <div style={styles.platDesc}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  slide: { background: 'linear-gradient(135deg,#100808 0%,#080808 100%)', justifyContent: 'center' },
  bgGlow: { position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(232,93,74,0.07) 0%,transparent 70%)', pointerEvents: 'none' },
  inner: {
    maxWidth: '1280px', width: '100%', margin: '0 auto',
    padding: '0 clamp(20px,5vw,80px)',
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: 'clamp(32px,5vw,80px)', alignItems: 'center', position: 'relative', zIndex: 1,
  },
  content: { display: 'flex', flexDirection: 'column', gap: '20px' },
  eyebrow: { display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Inter',sans-serif", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e85d4a' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, display: 'inline-block' },
  h2: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 400, lineHeight: 1.12, color: '#fff' },
  body: { fontFamily: "'Inter',sans-serif", fontSize: 'clamp(0.85rem,1.2vw,0.97rem)', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.58)' },
  highlights: { display: 'flex', flexDirection: 'column', gap: '8px' },
  highlight: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' },
  cta: { fontFamily: "'Inter',sans-serif", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', padding: '12px 24px', borderRadius: '4px', display: 'inline-block', alignSelf: 'flex-start' },
  right: { display: 'flex', flexDirection: 'column', gap: '16px' },
  imageFrame: { position: 'relative', border: '1px solid rgba(232,93,74,0.1)', borderRadius: '12px', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  video: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  img: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  imgOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 60%,rgba(15,5,5,0.7) 100%)' },
  statRow: { display: 'flex', justifyContent: 'space-around', padding: '16px 0' },
  miniStat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  miniVal: { fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', fontWeight: 700 },
  miniLabel: { fontFamily: "'Inter',sans-serif", fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' },
  platformGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  platformCard: { padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' },
  platIcon: { fontSize: '1.3rem' },
  platTitle: { fontFamily: "'Inter',sans-serif", fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', color: '#fff' },
  platDesc: { fontFamily: "'Inter',sans-serif", fontSize: '0.72rem', fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 },
};
