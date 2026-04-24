import { useEffect, useState } from 'react';
import { siteContent } from '../../data/content';

const zone = siteContent.zones.find(z => z.id === 'retail');

export default function RetailSlide({ active }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(active), active ? 80 : 0);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className="slide" id="slide-retail" aria-label="Retail & Luxury" style={styles.slide}>
      {/* BG with gold tones */}
      <div style={styles.bg} aria-hidden="true" />
      <div style={styles.overlay} aria-hidden="true" />

      <div className="slide-inner" style={styles.innerOverride}>
        {/* Left visual */}
        <div style={{ ...styles.visual, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-40px)', transition: 'all 0.85s ease 0.1s' }}>
          <div className="video-frame" style={styles.imageFrame}>
            <video src="/3226114-hd_1920_1080_25fps.mp4" autoPlay muted loop playsInline />
            <div style={styles.imgOverlay} />
            <div className="glass-card" style={styles.badge}>
              <span style={styles.badgeVal} className="gold-text">520+</span>
              <span style={styles.badgeLabel}>Premium Brands</span>
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div style={{ ...styles.content, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(40px)', transition: 'all 0.85s ease 0.25s' }}>
          <p style={styles.eyebrow}><span style={styles.dot} />{zone.eyebrow}</p>
          <h2 style={styles.h2}>{zone.title}</h2>
          <p style={styles.body}>{zone.body}</p>

          <div style={styles.highlights}>
            {zone.highlights.map(h => (
              <div key={h} className="glass-card" style={styles.highlight}>
                <span style={styles.checkMark}>✓</span>
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div style={styles.actions}>
            <a href="#slide-connect" style={styles.cta} id="retail-cta-btn">Inquire About Retail Space →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  slide: { background: 'linear-gradient(135deg,#0f0b04 0%,#080808 100%)', justifyContent: 'center' },
  bg: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)', pointerEvents: 'none' },
  overlay: { position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,8,8,0) 0%, rgba(8,8,8,0.4) 100%)', pointerEvents: 'none' },
  innerOverride: {
    position: 'relative', zIndex: 1,
  },
  visual: {},
  imageFrame: {
    position: 'relative', aspectRatio: '4/3.5',
    border: '1px solid rgba(201,168,76,0.1)', borderRadius: '12px', overflow: 'hidden',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  video: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  imgOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 60%,rgba(15,11,4,0.7) 100%)' },
  badge: {
    position: 'absolute', bottom: '20px', right: '20px',
    padding: '12px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
  },
  badgeVal: { fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, lineHeight: 1 },
  badgeLabel: { fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' },
  content: { display: 'flex', flexDirection: 'column', gap: '20px' },
  eyebrow: { display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a84c' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', background: '#c9a84c', flexShrink: 0, display: 'inline-block' },
  h2: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 400, lineHeight: 1.12, color: '#fff' },
  body: { fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.85rem,1.2vw,0.97rem)', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.58)' },
  highlights: { display: 'flex', flexDirection: 'column', gap: '10px' },
  highlight: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' },
  checkMark: { color: '#c9a84c', fontSize: '0.75rem', flexShrink: 0 },
  actions: { marginTop: '8px' },
  cta: { fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#080808', background: 'linear-gradient(135deg,#c9a84c,#e8c97a)', padding: '12px 24px', borderRadius: '4px', display: 'inline-block' },
};
