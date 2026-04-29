import { useState, useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pages = [
  {
    id: 1,
    name: 'Nizar Heritage',
    subtitle: 'Koleksi 01',
    description: 'Koleksi yang menghormati warisan rempah dan bunga klasik Nusantara. Aroma dalam, hangat, dan penuh cerita.',
    image: '/collection-1.jpg',
    accent: '#c9a45c',
  },
  {
    id: 2,
    name: 'Nizar Essence',
    subtitle: 'Koleksi 02',
    description: 'Perpaduan sempurna antara ketimuran dan barat. Koleksi modern untuk jiwa yang berani.',
    image: '/collection-2.jpg',
    accent: '#d4b76a',
  },
  {
    id: 3,
    name: 'Nizar Noir',
    subtitle: 'Koleksi 03',
    description: 'Misterius dan memikat. Koleksi malam hari dengan aroma woody dan amber yang intens.',
    image: '/collection-3.jpg',
    accent: '#b8945a',
  },
  {
    id: 4,
    name: 'Nizar Bloom',
    subtitle: 'Koleksi 04',
    description: 'Semerbak bunga segar yang mengingatkan pagi hari yang cerah. Ringan namun berkesan.',
    image: '/collection-4.jpg',
    accent: '#c9a45c',
  },
  {
    id: 5,
    name: 'Nizar Spice',
    subtitle: 'Koleksi 05',
    description: 'Kehangatan rempah-rempah pilihan dari kepulauan Nusantara. Tegas, berani, dan penuh karakter.',
    image: '/collection-5.jpg',
    accent: '#d4b76a',
  },
  {
    id: 6,
    name: 'Nizar Dusk',
    subtitle: 'Koleksi 06',
    description: 'Aroma senja yang hangat berpadu dengan woody musk. Elegan untuk setiap momen.',
    image: '/collection-6.jpg',
    accent: '#b8945a',
  },
  {
    id: 7,
    name: 'Nizar Mystique',
    subtitle: 'Koleksi 07',
    description: 'Misteri dalam sebotol parfum. Kombinasi oud dan amber yang tak terlupakan.',
    image: '/collection-7.jpg',
    accent: '#c9a45c',
  },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return isMobile
}

export default function Collections() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const goTo = useCallback(
    (index: number, dir: 'next' | 'prev') => {
      if (isAnimating || index === current) return
      setIsAnimating(true)

      const img = imageRef.current
      const text = textRef.current
      if (!img || !text) return

      const fromX = dir === 'next' ? '100%' : '-100%'
      const toX = dir === 'next' ? '-6%' : '6%'

      gsap.to(img, { x: toX, duration: 0.55, ease: 'power2.inOut' })
      gsap.to(text, { opacity: 0, y: dir === 'next' ? -16 : 16, duration: 0.3, ease: 'power2.in' })

      setTimeout(() => {
        setCurrent(index)
        gsap.set(img, { x: fromX })
        gsap.set(text, { y: dir === 'next' ? 24 : -24, opacity: 0 })
        gsap.to(img, { x: '0%', duration: 0.55, ease: 'power2.out' })
        gsap.to(text, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.1 })
        setTimeout(() => setIsAnimating(false), 600)
      }, 360)
    },
    [current, isAnimating]
  )

  const next = useCallback(() => goTo((current + 1) % pages.length, 'next'), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + pages.length) % pages.length, 'prev'), [current, goTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    gsap.from(header, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  const page = pages[current]

  return (
    <section
      id="collections"
      style={{
        background: '#0a0a0a',
        padding: isMobile ? '72px 0 48px' : 'clamp(80px, 10vh, 120px) 0 clamp(60px, 8vh, 100px)',
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          padding: isMobile ? '0 20px 24px' : '0 clamp(20px, 4vw, 80px) clamp(32px, 5vw, 56px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{ width: '24px', height: '1px', background: '#c9a45c' }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.12em',
            color: '#c9a45c',
            textTransform: 'uppercase' as const,
          }}>
            KOLEKSI SIGNATURE
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' as const, gap: '8px' }}>
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: '#f5f5f5',
            margin: 0,
          }}>
            Tiga Kisah, Tiga Aroma
          </h2>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#737373' }}>
            {String(current + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Gallery */}
      {isMobile ? (
        /* ── MOBILE LAYOUT ── */
        <div>
          {/* Image */}
          <div style={{ position: 'relative', width: '100%', height: '60vw', minHeight: '260px', overflow: 'hidden', background: '#111' }}>
            <div ref={imageRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
              <img
                key={page.id}
                src={page.image}
                alt={page.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)',
              }} />
            </div>

            {/* Mobile arrows */}
            <button onClick={prev} aria-label="Previous" style={mobileArrowStyle}>←</button>
            <button onClick={next} aria-label="Next" style={{ ...mobileArrowStyle, right: '12px', left: 'auto' }}>→</button>
          </div>

          {/* Info panel */}
          <div ref={textRef} style={{ padding: '24px 20px 32px', background: '#0f0f0f', borderTop: '1px solid #1a1a1a' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', letterSpacing: '0.12em', color: page.accent, textTransform: 'uppercase' as const, marginBottom: '8px' }}>
              {page.subtitle}
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#f5f5f5', letterSpacing: '-0.01em', margin: '0 0 10px 0', lineHeight: 1.2 }}>
              {page.name}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.7, color: '#a3a3a3', margin: '0 0 20px 0' }}>
              {page.description}
            </p>
            <a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: page.accent, textDecoration: 'none', letterSpacing: '0.04em' }}>
              Lihat Detail →
            </a>
          </div>

          {/* Mobile pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '16px 0' }}>
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                aria-label={`Halaman ${i + 1}`}
                style={{
                  width: current === i ? '24px' : '7px',
                  height: '7px',
                  borderRadius: '4px',
                  background: current === i ? '#c9a45c' : 'rgba(255,255,255,0.25)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        /* ── DESKTOP LAYOUT ── */
        <div style={{ display: 'flex', height: 'clamp(480px, 60vh, 700px)', overflow: 'hidden' }}>
          {/* Main image */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#111' }}>
            <div ref={imageRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
              <img
                key={page.id}
                src={page.image}
                alt={page.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, transparent 55%, rgba(10,10,10,0.95) 100%), linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 40%)',
              }} />
            </div>

            {/* Desktop arrows */}
            <button onClick={prev} aria-label="Previous collection" style={desktopArrowStyle('left')}
              onMouseEnter={e => arrowHover(e.currentTarget, true)}
              onMouseLeave={e => arrowHover(e.currentTarget, false)}>←</button>
            <button onClick={next} aria-label="Next collection" style={desktopArrowStyle('right')}
              onMouseEnter={e => arrowHover(e.currentTarget, true)}
              onMouseLeave={e => arrowHover(e.currentTarget, false)}>→</button>

            {/* Desktop dots */}
            <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
              {pages.map((_, i) => (
                <button key={i} onClick={() => goTo(i, i > current ? 'next' : 'prev')} aria-label={`Halaman ${i + 1}`}
                  style={{
                    width: current === i ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: current === i ? '#c9a45c' : 'rgba(255,255,255,0.3)',
                    border: 'none', padding: 0, cursor: 'pointer',
                    transition: 'all 0.35s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div style={{
            width: 'clamp(280px, 30vw, 400px)',
            background: '#0f0f0f',
            borderLeft: '1px solid #1a1a1a',
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 56px)',
            overflowY: 'auto' as const,
          }}>
            {/* Thumbnail strip */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px', marginBottom: '40px' }}>
              {pages.map((p, i) => (
                <button key={p.id} onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  aria-label={`Lihat ${p.name}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    background: 'none', border: 'none', padding: '4px 0',
                    cursor: 'pointer', opacity: current === i ? 1 : 0.4,
                    transition: 'opacity 0.25s ease', textAlign: 'left' as const,
                  }}
                  onMouseEnter={e => { if (current !== i) (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                  onMouseLeave={e => { if (current !== i) (e.currentTarget as HTMLElement).style.opacity = '0.4' }}
                >
                  <div style={{
                    width: '52px', height: '38px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0,
                    border: current === i ? `1.5px solid ${p.accent}` : '1.5px solid transparent',
                    transition: 'border-color 0.3s ease',
                  }}>
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: current === i ? 500 : 300,
                    color: current === i ? '#f5f5f5' : '#737373',
                    transition: 'color 0.25s ease',
                    letterSpacing: '0.02em',
                  }}>
                    {p.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Active info */}
            <div ref={textRef}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                color: page.accent,
                textTransform: 'uppercase' as const,
                marginBottom: '10px',
              }}>
                {page.subtitle}
              </div>
              <h3 style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', color: '#f5f5f5', letterSpacing: '-0.01em', margin: '0 0 14px 0', lineHeight: 1.2 }}>
                {page.name}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.75, color: '#a3a3a3', margin: '0 0 24px 0' }}>
                {page.description}
              </p>
              <a href="#"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: page.accent, textDecoration: 'none', letterSpacing: '0.04em', transition: 'gap 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '14px'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '8px'}
              >
                Lihat Detail <span>→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// Shared arrow styles
const mobileArrowStyle: React.CSSProperties = {
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: 'rgba(10,10,10,0.6)',
  backdropFilter: 'blur(6px)',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#f5f5f5',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  lineHeight: 1,
}

function desktopArrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    [side]: '24px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'rgba(10,10,10,0.5)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#f5f5f5',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    lineHeight: 1,
    transition: 'all 0.25s ease',
  }
}

function arrowHover(el: HTMLElement, entering: boolean) {
  el.style.background = entering ? 'rgba(201,164,92,0.2)' : 'rgba(10,10,10,0.5)'
  el.style.borderColor = entering ? '#c9a45c' : 'rgba(255,255,255,0.2)'
  el.style.color = entering ? '#c9a45c' : '#f5f5f5'
}
