import { useState, useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pages = [
  {
    id: 1,
    name: 'Nizar Heritage',
    subtitle: 'Koleksi 01',
    description:
      'Koleksi yang menghormati warisan rempah dan bunga klasik Nusantara. Aroma dalam, hangat, dan penuh cerita.',
    image: '/collection-1.jpg',
    accent: '#c9a45c',
  },
  {
    id: 2,
    name: 'Nizar Essence',
    subtitle: 'Koleksi 02',
    description:
      'Perpaduan sempurna antara ketimuran dan barat. Koleksi modern untuk jiwa yang berani.',
    image: '/collection-2.jpg',
    accent: '#d4b76a',
  },
  {
    id: 3,
    name: 'Nizar Noir',
    subtitle: 'Koleksi 03',
    description:
      'Misterius dan memikat. Koleksi malam hari dengan aroma woody dan amber yang intens.',
    image: '/collection-3.jpg',
    accent: '#b8945a',
  },
  {
    id: 4,
    name: 'Nizar Bloom',
    subtitle: 'Koleksi 04',
    description:
      'Semerbak bunga segar yang mengingatkan pagi hari yang cerah. Ringan namun berkesan.',
    image: '/collection-4.jpg',
    accent: '#c9a45c',
  },
  {
    id: 5,
    name: 'Nizar Spice',
    subtitle: 'Koleksi 05',
    description:
      'Kehangatan rempah-rempah pilihan dari kepulauan Nusantara. Tegas, berani, dan penuh karakter.',
    image: '/collection-5.jpg',
    accent: '#d4b76a',
  },
  {
    id: 6,
    name: 'Nizar Dusk',
    subtitle: 'Koleksi 06',
    description:
      'Aroma senja yang hangat berpadu dengan woody musk. Elegan untuk setiap momen.',
    image: '/collection-6.jpg',
    accent: '#b8945a',
  },
  {
    id: 7,
    name: 'Nizar Mystique',
    subtitle: 'Koleksi 07',
    description:
      'Misteri dalam sebotol parfum. Kombinasi oud dan amber yang tak terlupakan.',
    image: '/collection-7.jpg',
    accent: '#c9a45c',
  },
]

export default function Collections() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [, setDirection] = useState<'next' | 'prev'>('next')
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isFirstMount = useRef(true)

  const goTo = useCallback(
    (index: number, dir: 'next' | 'prev') => {
      if (isAnimating || index === current) return
      setIsAnimating(true)
      setDirection(dir)

      const slide = slideRef.current
      const text = textRef.current
      if (!slide || !text) return

      const fromX = dir === 'next' ? '100%' : '-100%'
      const toX = dir === 'next' ? '-8%' : '8%'

      // Exit old
      gsap.to(slide, { x: toX, duration: 0.6, ease: 'power2.inOut' })
      gsap.to(text, { opacity: 0, y: dir === 'next' ? -20 : 20, duration: 0.35, ease: 'power2.in' })

      setTimeout(() => {
        setCurrent(index)
        // Prepare new position
        gsap.set(slide, { x: fromX })
        gsap.set(text, { y: dir === 'next' ? 30 : -30, opacity: 0 })

        // Enter new
        gsap.to(slide, { x: '0%', duration: 0.65, ease: 'power2.out' })
        gsap.to(text, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.15 })

        setTimeout(() => setIsAnimating(false), 700)
      }, 400)
    },
    [current, isAnimating]
  )

  const next = useCallback(() => {
    goTo((current + 1) % pages.length, 'next')
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + pages.length) % pages.length, 'prev')
  }, [current, goTo])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Header scroll-in animation
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

  // Initial text animation
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      const text = textRef.current
      if (!text) return
      gsap.from(text, { opacity: 0, y: 40, duration: 0.9, ease: 'power2.out', delay: 0.3 })
    }
  }, [])

  const page = pages[current]

  return (
    <section
      id="collections"
      style={{
        background: '#0a0a0a',
        padding: 'clamp(80px, 10vh, 120px) 0 clamp(60px, 8vh, 100px)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        style={{
          padding: '0 clamp(20px, 4vw, 80px)',
          marginBottom: 'clamp(32px, 5vw, 56px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '24px', height: '1px', background: '#c9a45c' }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.12em',
              color: '#c9a45c',
              textTransform: 'uppercase',
            }}
          >
            KOLEKSI SIGNATURE
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: '#f5f5f5',
              margin: 0,
            }}
          >
            Tiga Kisah, Tiga Aroma
          </h2>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              color: '#737373',
              letterSpacing: '0.05em',
            }}
          >
            {String(current + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Gallery Layout */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr clamp(280px, 30vw, 400px)',
          gap: '0',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Main Image */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#111',
          }}
        >
          <div
            ref={slideRef}
            style={{
              position: 'absolute',
              inset: 0,
              willChange: 'transform',
            }}
          >
            <img
              key={page.id}
              src={page.image}
              alt={page.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(10,10,10,0.0) 60%, rgba(10,10,10,0.95) 100%), linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 40%)',
              }}
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            aria-label="Previous collection"
            style={{
              position: 'absolute',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '48px',
              height: '48px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              background: 'rgba(10,10,10,0.5)',
              backdropFilter: 'blur(8px)',
              color: '#f5f5f5',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              transition: 'all 0.25s ease',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(201,164,92,0.2)'
              el.style.borderColor = '#c9a45c'
              el.style.color = '#c9a45c'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(10,10,10,0.5)'
              el.style.borderColor = 'rgba(255,255,255,0.2)'
              el.style.color = '#f5f5f5'
            }}
          >
            ←
          </button>

          <button
            onClick={next}
            aria-label="Next collection"
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '48px',
              height: '48px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              background: 'rgba(10,10,10,0.5)',
              backdropFilter: 'blur(8px)',
              color: '#f5f5f5',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              transition: 'all 0.25s ease',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(201,164,92,0.2)'
              el.style.borderColor = '#c9a45c'
              el.style.color = '#c9a45c'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(10,10,10,0.5)'
              el.style.borderColor = 'rgba(255,255,255,0.2)'
              el.style.color = '#f5f5f5'
            }}
          >
            →
          </button>

          {/* Pagination dots */}
          <div
            style={{
              position: 'absolute',
              bottom: '28px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              zIndex: 10,
            }}
          >
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                aria-label={`Go to page ${i + 1}`}
                style={{
                  width: current === i ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: current === i ? '#c9a45c' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div
          style={{
            background: '#0f0f0f',
            borderLeft: '1px solid #1a1a1a',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 56px)',
            position: 'relative',
          }}
        >
          {/* Thumbnail strip */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '48px',
            }}
          >
            {pages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                aria-label={`View ${p.name}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'none',
                  border: 'none',
                  padding: '6px 0',
                  cursor: 'pointer',
                  transition: 'opacity 0.25s ease',
                  opacity: current === i ? 1 : 0.4,
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => { if (current !== i) (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
                onMouseLeave={(e) => { if (current !== i) (e.currentTarget as HTMLElement).style.opacity = '0.4' }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '40px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: current === i ? `1px solid ${p.accent}` : '1px solid transparent',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: current === i ? 500 : 300,
                    color: current === i ? '#f5f5f5' : '#737373',
                    letterSpacing: '0.02em',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {p.name}
                </span>
              </button>
            ))}
          </div>

          {/* Active collection info */}
          <div ref={textRef}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                color: page.accent,
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              {page.subtitle}
            </div>
            <h3
              style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                color: '#f5f5f5',
                letterSpacing: '-0.01em',
                margin: '0 0 16px 0',
                lineHeight: 1.2,
              }}
            >
              {page.name}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.875rem, 1.1vw, 0.95rem)',
                fontWeight: 300,
                lineHeight: 1.75,
                color: '#a3a3a3',
                margin: '0 0 28px 0',
              }}
            >
              {page.description}
            </p>
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 400,
                color: page.accent,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'gap 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.gap = '14px'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.gap = '8px'
              }}
            >
              Lihat Detail <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile layout styles */}
      <style>{`
        @media (max-width: 768px) {
          #collections {
            padding: 80px 0 60px !important;
          }
          #collections > div:first-child {
            margin-bottom: 24px !important;
          }
          #collections > div:last-child {
            grid-template-columns: 1fr !important;
            grid-template-rows: 50vh auto !important;
            min-height: auto !important;
          }
          #collections > div:last-child > div:last-child {
            border-left: none !important;
            border-top: 1px solid #1a1a1a;
            padding: 32px 24px !important;
          }
          /* Hide thumbnail strip on mobile to save space */
          #collections > div:last-child > div:last-child > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
