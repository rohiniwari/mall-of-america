import { useState, useCallback, useEffect, useRef } from 'react';
import './index.css';

import SlideController from './components/SlideController';
import IntroSlide      from './components/slides/IntroSlide';
import WhyMOASlide     from './components/slides/WhyMOASlide';
import RetailSlide     from './components/slides/RetailSlide';
import DiningSlide     from './components/slides/DiningSlide';
import AttractionsSlide from './components/slides/AttractionsSlide';
import EventsSlide     from './components/slides/EventsSlide';
import ConnectSlide    from './components/slides/ConnectSlide';

const TOTAL_SLIDES = 7;

export default function App() {
  const [current, setCurrent] = useState(0);
  const scrolling = useRef(false);
  const deckRef = useRef(null);

  const goTo = useCallback((i) => {
    const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, i));
    setCurrent(clamped);
    // Reset scroll position of the slide we are entering
    setTimeout(() => {
      if (deckRef.current?.children[clamped]) {
        deckRef.current.children[clamped].scrollTop = 0;
      }
    }, 400);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* Wheel / trackpad navigation with boundary detection */
  useEffect(() => {
    const onWheel = (e) => {
      if (scrolling.current) return;

      const activeSlide = deckRef.current?.children[current];
      if (!activeSlide) return;

      const isAtTop = activeSlide.scrollTop <= 0;
      const isAtBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 2;

      if (e.deltaY > 30 && isAtBottom) {
        if (current < TOTAL_SLIDES - 1) {
          scrolling.current = true;
          next();
          setTimeout(() => { scrolling.current = false; }, 1000);
        }
      } else if (e.deltaY < -30 && isAtTop) {
        if (current > 0) {
          scrolling.current = true;
          prev();
          setTimeout(() => { scrolling.current = false; }, 1000);
        }
      }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [next, prev, current]);

  /* Touch swipe with boundary detection */
  useEffect(() => {
    let startY = null;
    const onTouchStart = (e) => { startY = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (startY === null) return;
      
      const activeSlide = deckRef.current?.children[current];
      if (!activeSlide) return;

      const diff = startY - e.changedTouches[0].clientY;
      const isAtTop = activeSlide.scrollTop <= 0;
      const isAtBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 2;

      if (Math.abs(diff) > 60) {
        if (diff > 0 && isAtBottom && current < TOTAL_SLIDES - 1) {
          next();
        } else if (diff < 0 && isAtTop && current > 0) {
          prev();
        }
      }
      startY = null;
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [next, prev, current]);

  /* Keyboard navigation with boundary detection */
  useEffect(() => {
    const onKey = (e) => {
      const activeSlide = deckRef.current?.children[current];
      if (!activeSlide) return;

      const isAtTop = activeSlide.scrollTop <= 0;
      const isAtBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 2;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (isAtBottom || e.key === 'ArrowRight') next();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (isAtTop || e.key === 'ArrowLeft') prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, current]);

  return (
    <>
      {/* Fixed UI chrome */}
      <header style={styles.logo} aria-label="MOA Sales Deck branding">
        <span style={styles.logoIcon}>◈</span>
        <span style={styles.logoText}>MOA</span>
        <span style={styles.logoDivider}>|</span>
        <span style={styles.logoSub}>The Premier Destination</span>
      </header>

      <SlideController
        current={current}
        total={TOTAL_SLIDES}
        onNext={next}
        onPrev={prev}
        onGoTo={goTo}
      />

      {/* Slide stack — transforms vertically */}
      <div
        className="deck-container"
        ref={deckRef}
        style={{
          transform: `translateY(calc(-${current} * 100vh))`,
          height: `${TOTAL_SLIDES * 100}vh`,
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        <IntroSlide      onNext={next} />
        <WhyMOASlide     active={current === 1} />
        <RetailSlide     active={current === 2} />
        <DiningSlide     active={current === 3} />
        <AttractionsSlide active={current === 4} />
        <EventsSlide     active={current === 5} />
        <ConnectSlide    active={current === 6} />
      </div>
    </>
  );
}

const styles = {
  logo: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '20px 48px',
    background: 'linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, transparent 100%)',
    pointerEvents: 'none',
  },
  logoIcon: { color: '#c9a84c', fontSize: '1.3rem' },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.1rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    color: '#fff',
  },
  logoDivider: { color: 'rgba(201,168,76,0.4)', margin: '0 4px' },
  logoSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 300,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'rgba(184,188,200,0.7)',
  },
};
