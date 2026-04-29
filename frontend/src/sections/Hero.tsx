import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AmberParticles from '../components/AmberParticles'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bottleRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    // Hero exit animation on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '20% top',
        scrub: true,
      },
    })

    tl.to(content, {
      y: -80,
      opacity: 0,
      ease: 'none',
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100dvh',
        minHeight: '600px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <AmberParticles />

      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 clamp(20px, 4vw, 80px)',
        }}
      >
        {/* Floating Bottle */}
        <img
          ref={bottleRef}
          src="/hero-bottle.png"
          alt="Parfum Nizar"
          style={{
            width: 'clamp(200px, 35vw, 450px)',
            height: 'auto',
            filter: 'drop-shadow(0 20px 80px rgba(201, 164, 92, 0.3))',
            animation: 'float 4s ease-in-out infinite alternate',
            marginBottom: '40px',
          }}
        />

        {/* Eyebrow */}
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
            PARFUM ARTISANAL INDONESIA
          </span>
          <div
            style={{
              width: '24px',
              height: '1px',
              background: '#c9a45c',
            }}
          />
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#f5f5f5',
            maxWidth: '800px',
            margin: 0,
          }}
        >
          Aroma yang Menceritakan Kisah Anda
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
            fontWeight: 300,
            lineHeight: 1.7,
            letterSpacing: '0.01em',
            color: '#a3a3a3',
            maxWidth: '560px',
            marginTop: '24px',
          }}
        >
          Setiap tetes parfum adalah perjalanan sensorial — memadukan warisan
          rempah Nusantara dengan kehalusan modern.
        </p>

        {/* CTA Button */}
        <a
          href="#collections"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' })
          }}
          style={{
            display: 'inline-block',
            marginTop: '40px',
            padding: '14px 32px',
            border: '1px solid #c9a45c',
            background: 'transparent',
            color: '#c9a45c',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.3s ease-out',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.background = '#c9a45c'
            el.style.color = '#0a0a0a'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = 'transparent'
            el.style.color = '#c9a45c'
          }}
        >
          Jelajahi Koleksi
        </a>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          animation: 'scrollBounce 1.5s ease-in-out infinite',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#737373"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(10px); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  )
}
