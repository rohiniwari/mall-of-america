import { useEffect, useCallback, useState } from 'react';

const SLIDE_LABELS = [
  { id: 'intro', label: 'Introduction' },
  { id: 'why-moa', label: 'Why MOA' },
  { id: 'retail', label: 'Retail & Luxury' },
  { id: 'dining', label: 'Dining' },
  { id: 'attractions', label: 'Attractions' },
  { id: 'events', label: 'Events & Platform' },
  { id: 'connect', label: 'Connect' },
];

export default function SlideController({ current, total, onNext, onPrev, onGoTo }) {
  const [labelVisible, setLabelVisible] = useState(true);

  useEffect(() => {
    setLabelVisible(false);
    const t = setTimeout(() => setLabelVisible(true), 50);
    return () => clearTimeout(t);
  }, [current]);


  const slideLabel = SLIDE_LABELS[current]?.label || '';

  return (
    <>
      {/* Left: dot progress */}
      <nav className="deck-progress" aria-label="Slide navigation">
        {SLIDE_LABELS.map((s, i) => (
          <button
            key={s.id}
            className={`progress-dot${i === current ? ' active' : ''}`}
            onClick={() => onGoTo(i)}
            aria-label={`Go to ${s.label}`}
            aria-current={i === current ? 'step' : undefined}
            title={s.label}
          />
        ))}
      </nav>

      {/* Bottom-right: slide label + prev/next */}
      <div className="slide-controls" aria-label="Navigation controls">
        <div style={styles.slideInfo}>
          <span
            style={{
              ...styles.slideLabel,
              opacity: labelVisible ? 1 : 0,
              transform: labelVisible ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {String(current + 1).padStart(2, '0')} — {slideLabel}
          </span>
          <span style={styles.slideTotal}>/ {String(total).padStart(2, '0')}</span>
        </div>

        <button
          className="control-btn"
          onClick={onPrev}
          disabled={current === 0}
          id="nav-prev-btn"
          aria-label="Previous slide"
        >
          ↑
        </button>
        <button
          className="control-btn"
          onClick={onNext}
          disabled={current === total - 1}
          id="nav-next-btn"
          aria-label="Next slide"
        >
          ↓
        </button>
      </div>
    </>
  );
}

const styles = {
  slideInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: '8px',
  },
  slideLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 400,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#c9a84c',
  },
  slideTotal: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.64rem',
    fontWeight: 300,
    letterSpacing: '0.08em',
    color: 'rgba(255,255,255,0.25)',
  },
};
