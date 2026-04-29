import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const collections = [
  {
    name: 'Nizar Heritage',
    description:
      'Koleksi yang menghormati warisan rempah dan bunga klasik Nusantara. Aroma dalam, hangat, dan penuh cerita.',
    image: '/collection-1.jpg',
  },
  {
    name: 'Nizar Essence',
    description:
      'Perpaduan sempurna antara ketimuran dan barat. Koleksi modern untuk jiwa yang berani.',
    image: '/collection-2.jpg',
  },
  {
    name: 'Nizar Noir',
    description:
      'Misterius dan memikat. Koleksi malam hari dengan aroma woody dan amber yang intens.',
    image: '/collection-3.jpg',
  },
]

const carouselImages = [
  '/collection-1.jpg',
  '/collection-2.jpg',
  '/collection-3.jpg',
  '/collection-4.jpg',
  '/collection-5.jpg',
  '/collection-6.jpg',
  '/collection-7.jpg',
]

// CSS custom properties for each card
const cardConfigs = [
  { b0: 0.4, b1: 1.0, z: 120, r0: 12, r1: -8 },
  { b0: 0.4, b1: 1.0, z: 100, r0: 10, r1: -10 },
  { b0: 0.4, b1: 1.0, z: 80, r0: 8, r1: -12 },
  { b0: 0.4, b1: 1.0, z: 60, r0: 6, r1: -14 },
  { b0: 0.4, b1: 1.0, z: 40, r0: 4, r1: -16 },
  { b0: 0.4, b1: 1.0, z: 20, r0: 2, r1: -18 },
  { b0: 0.4, b1: 1.0, z: 0, r0: 0, r1: -20 },
]

export default function Collections() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const cards = track.querySelectorAll<HTMLElement>('.img-card')

    // Set initial CSS variables
    cards.forEach((card, i) => {
      const config = cardConfigs[i]
      card.style.setProperty('--b0', String(config.b0))
      card.style.setProperty('--b1', String(config.b1))
      card.style.setProperty('--z', String(config.z))
      card.style.setProperty('--r0', String(config.r0))
      card.style.setProperty('--r1', String(config.r1))
    })

    // Main scroll-driven animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          // Update active index based on scroll progress
          const progress = self.progress
          const newIndex = Math.min(
            Math.floor(progress * collections.length),
            collections.length - 1
          )
          setActiveIndex(newIndex)
        },
      },
    })

    // Animate track rotation and scale
    tl.to(
      track,
      {
        rotateY: -120,
        scale: 1.0,
        ease: 'none',
      },
      0
    )

    // Animate individual cards
    cards.forEach((card) => {
      const b0 = parseFloat(card.style.getPropertyValue('--b0'))
      const b1 = parseFloat(card.style.getPropertyValue('--b1'))
      const z = parseFloat(card.style.getPropertyValue('--z'))
      const r0 = parseFloat(card.style.getPropertyValue('--r0'))
      const r1 = parseFloat(card.style.getPropertyValue('--r1'))

      tl.fromTo(
        card,
        {
          filter: `brightness(${b0}) contrast(1.1)`,
          z: 0,
          rotateY: r0,
        },
        {
          filter: `brightness(${b1}) contrast(1.1)`,
          z: z,
          rotateY: r1,
          ease: 'none',
        },
        0
      )
    })

    // Animate overlay cards
    overlayRefs.current.forEach((overlay, i) => {
      if (!overlay) return
      const startProgress = i / collections.length
      const endProgress = (i + 1) / collections.length

      tl.fromTo(
        overlay,
        {
          opacity: 0,
          y: 20,
          visibility: 'hidden',
        },
        {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          ease: 'none',
        },
        startProgress * tl.duration()
      )

      if (i < collections.length - 1) {
        tl.to(
          overlay,
          {
            opacity: 0,
            y: -20,
            visibility: 'hidden',
            ease: 'none',
          },
          endProgress * tl.duration()
        )
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  const snapToIndex = (index: number) => {
    const section = sectionRef.current
    if (!section) return
    const maxScroll =
      section.scrollHeight - document.documentElement.clientHeight
    const targetScroll = (index / (collections.length - 1)) * maxScroll
    gsap.to(window, {
      scrollTo: { y: targetScroll },
      duration: 0.8,
      ease: 'power2.inOut',
    })
  }

  return (
    <div
      ref={sectionRef}
      id="collections"
      style={{
        position: 'relative',
        height: '300vh',
        background: '#0a0a0a',
        overflow: 'visible',
      }}
    >
      {/* Sticky Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          perspective: '2500px',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(20px, 4vw, 80px)',
            left: 'clamp(20px, 4vw, 80px)',
            zIndex: 100,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px',
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
              KOLEKSI SIGNATURE
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#f5f5f5',
              margin: 0,
            }}
          >
            Tiga Kisah, Tiga Aroma
          </h2>
        </div>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateZ(-200px)',
            transformStyle: 'preserve-3d',
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {carouselImages.map((src, i) => (
            <div
              key={i}
              className="img-card"
              style={{
                width: 'clamp(200px, 22vw, 320px)',
                aspectRatio: '0.75',
                borderRadius: '40px',
                overflow: 'hidden',
                flexShrink: 0,
                transformOrigin: 'center',
                backfaceVisibility: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={src}
                alt={`Collection ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(10,10,10,0.2)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Overlay Cards */}
        {collections.map((collection, i) => (
          <div
            key={i}
            ref={(el) => {
              overlayRefs.current[i] = el
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 50,
              width: 'clamp(320px, 30vw, 400px)',
              background: 'rgba(20, 20, 20, 0.7)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '32px',
              visibility: 'hidden',
              opacity: 0,
              pointerEvents: 'none',
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                lineHeight: 1.3,
                color: '#f5f5f5',
                margin: '0 0 12px 0',
              }}
            >
              {collection.name}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                fontWeight: 300,
                lineHeight: 1.7,
                color: '#a3a3a3',
                margin: '0 0 20px 0',
              }}
            >
              {collection.description}
            </p>
            <a
              href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 400,
                color: '#c9a45c',
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              Lihat Detail →
            </a>
          </div>
        ))}

        {/* Pagination */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '12px',
            zIndex: 100,
          }}
        >
          {collections.map((_, i) => (
            <button
              key={i}
              onClick={() => snapToIndex(i)}
              style={{
                width: activeIndex === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: activeIndex === i ? '#c9a45c' : '#737373',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Go to collection ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
