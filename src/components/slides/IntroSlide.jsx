import { useEffect, useState } from 'react';
import { siteContent } from '../../data/content';

const c = siteContent.hero;

export default function IntroSlide({ onNext }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section className="slide" id="slide-intro" aria-label="Introduction">
      {/* BG Video */}
      <video src="/10596199-hd_1080_1920_30fps.mp4" autoPlay muted loop playsInline style={styles.bgVideo} />
      <div style={styles.overlay} />

      {/* Floating particles */}
      <div style={styles.particles} aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={particleStyle(i)} />
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        <p style={{ ...styles.eyebrow, opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease 0.1s' }}>
          <span style={styles.eyebrowLine} />
          {c.eyebrow}
          <span style={styles.eyebrowLine} />
        </p>

        <h1 style={{ ...styles.h1, opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease 0.25s' }}>
          {c.title}<br />
          <em style={styles.italic}>{c.titleItalic}</em>
        </h1>

        <p style={{ ...styles.sub, opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease 0.4s' }}>
          {c.sub}
        </p>

        <div style={{ ...styles.ctaRow, opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease 0.55s' }}>
          <button onClick={onNext} style={styles.btnPrimary} id="intro-explore-btn">
            Begin the Experience →
          </button>
          <a href="#slide-connect" style={styles.btnSecondary} id="intro-inquire-btn">
            Leasing Inquiries
          </a>
        </div>
      </div>

      {/* Scroll prompt */}
      <div style={{ ...styles.scrollHint, opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 1.2s' }} aria-hidden="true">
        <div style={styles.scrollLine} />
        <span style={styles.scrollText}>Press ↓ to explore</span>
      </div>

      <div style={styles.bottomFade} />
    </section>
  );
}

function particleStyle(i) {
  const sizes = [2,3,4,2,3,2,4,3,2,3,4,2,3,2,4,3,2,3];
  const opacities = [0.3,0.5,0.25,0.4,0.3,0.55,0.2,0.35,0.45,0.3,0.25,0.4,0.5,0.3,0.35,0.2,0.45,0.3];
  const lefts = [8,15,22,30,38,48,55,62,70,75,80,88,12,40,65,82,35,58];
  const tops = [15,70,25,85,40,20,65,35,80,10,55,30,90,50,45,75,60,88];
  const delays = [0,1.5,3,0.5,2,4,1,2.5,0.8,3.5,1.2,2.8,0.3,1.8,3.2,0.9,2.2,4.1];
  return {
    position: 'absolute', width: sizes[i], height: sizes[i], borderRadius: '50%',
    background: '#c9a84c', opacity: opacities[i],
    left: `${lefts[i]}%`, top: `${tops[i]}%`,
    animation: `float ${3+(i%3)}s ease-in-out ${delays[i]}s infinite`,
    pointerEvents: 'none',
  };
}

const styles = {
  bg: { position:'absolute', inset:0, backgroundImage:'url(/hero.jpg)', backgroundSize:'cover', backgroundPosition:'center 30%', zIndex:0 },
  bgVideo: { position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%', zIndex:0 },
  overlay: { position:'absolute', inset:0, background:'linear-gradient(160deg,rgba(8,8,8,0.6) 0%,rgba(8,8,8,0.88) 100%)', zIndex:1 },
  particles: { position:'absolute', inset:0, zIndex:2 },
  content: {
    position:'relative', zIndex:3, textAlign:'center',
    maxWidth:'820px', margin:'auto', padding:'0 28px',
    display:'flex', flexDirection:'column', alignItems:'center', gap:'28px',
  },
  eyebrow: {
    display:'flex', alignItems:'center', gap:'16px',
    fontFamily:"'Inter', sans-serif", fontSize:'0.68rem', fontWeight:500,
    letterSpacing:'0.36em', textTransform:'uppercase', color:'#c9a84c',
  },
  eyebrowLine: { display:'inline-block', width:'40px', height:'1px', background:'linear-gradient(135deg,#c9a84c,#e8c97a)' },
  h1: {
    fontFamily:"'Playfair Display', serif",
    fontSize:'clamp(3rem,7vw,6rem)', fontWeight:400, lineHeight:1.08,
    letterSpacing:'-0.01em', color:'#fff',
  },
  italic: {
    fontStyle:'italic',
    background:'linear-gradient(135deg,#c9a84c 0%,#e8c97a 50%,#c9a84c 100%)',
    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
  },
  sub: {
    fontFamily:"'Inter', sans-serif", fontSize:'clamp(0.9rem,1.6vw,1.1rem)',
    fontWeight:300, lineHeight:1.75, color:'rgba(255,255,255,0.7)', maxWidth:'560px',
  },
  ctaRow: { display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' },
  btnPrimary: {
    fontFamily:"'Inter', sans-serif", fontSize:'0.75rem', fontWeight:500,
    letterSpacing:'0.18em', textTransform:'uppercase', color:'#080808',
    background:'linear-gradient(135deg,#c9a84c 0%,#e8c97a 50%,#c9a84c 100%)',
    padding:'16px 36px', borderRadius:'4px', cursor:'pointer',
    animation:'goldPulse 3s ease-in-out infinite',
  },
  btnSecondary: {
    fontFamily:"'Inter', sans-serif", fontSize:'0.75rem', fontWeight:500,
    letterSpacing:'0.18em', textTransform:'uppercase', color:'#fff',
    background:'transparent', border:'1px solid rgba(201,168,76,0.5)',
    padding:'16px 36px', borderRadius:'4px', display:'inline-block',
    backdropFilter:'blur(8px)',
  },
  scrollHint: { position:'absolute', bottom:'48px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', zIndex:4 },
  scrollLine: { width:'1px', height:'48px', background:'linear-gradient(to bottom, rgba(201,168,76,0), rgba(201,168,76,0.8))', animation:'float 2s ease-in-out infinite' },
  scrollText: { fontFamily:"'Inter', sans-serif", fontSize:'0.6rem', fontWeight:400, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)' },
  bottomFade: { position:'absolute', bottom:0, left:0, right:0, height:'120px', background:'linear-gradient(to bottom,transparent,#080808)', zIndex:4, pointerEvents:'none' },
};
