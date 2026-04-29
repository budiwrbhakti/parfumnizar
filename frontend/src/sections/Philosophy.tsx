import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    title: 'Bahan Terbaik',
    description:
      'Kami memilih hanya bahan-bahan dengan kualitas terbaik — dari bunga melati Jawa hingga gaharu Kalimantan.',
    image: '/ingredient-1.jpg',
  },
  {
    title: 'Proses Artisanal',
    description:
      'Setiap botol parfum dibuat dengan tangan oleh perfumer berpengalaman, tidak ada produksi massal.',
    image: '/ingredient-2.jpg',
  },
  {
    title: 'Keberlanjutan',
    description:
      'Kami berkomitmen pada praktik berkelanjutan — dari sourcing bahan hingga kemasan yang ramah lingkungan.',
    image: '/ingredient-3.jpg',
  },
]

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.pillar-card')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    tl.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.15,
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 4vw, 80px)',
        background: '#0a0a0a',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Section Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '1px',
              background: '#c9a45c',
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#c9a45c',
              textTransform: 'uppercase',
            }}
          >
            FILOSOFI KAMI
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#f5f5f5',
            margin: '0 0 48px 0',
            maxWidth: '700px',
          }}
        >
          Tiga Pilar Keanggunan
        </h2>

        {/* Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="pillar-card"
              style={{
                background: '#1a1a1a',
                border: '1px solid #262626',
                borderRadius: '16px',
                padding: '32px',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-4px)'
                el.style.borderColor = '#c9a45c'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.borderColor = '#262626'
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '24px',
                }}
              >
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  loading="lazy"
                />
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  lineHeight: 1.3,
                  color: '#f5f5f5',
                  margin: '0 0 12px 0',
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#a3a3a3',
                  margin: 0,
                }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
