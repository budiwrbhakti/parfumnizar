import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const elements = section.querySelectorAll('.animate-in')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.from(elements, {
      y: 40,
      opacity: 0,
      duration: 0.8,
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
      id="contact"
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 4vw, 80px)',
        background: '#141414',
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
          className="animate-in"
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
            HUBUNGI KAMI
          </span>
        </div>

        {/* Headline */}
        <h2
          className="animate-in"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#f5f5f5',
            margin: '0 0 48px 0',
            maxWidth: '700px',
          }}
        >
          Temukan Aroma Anda
        </h2>

        {/* Contact Info Grid */}
        <div
          className="animate-in"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#737373',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Email
            </div>
            <a
              href="mailto:hello@parfumnizar.com"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                fontWeight: 300,
                color: '#f5f5f5',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = '#c9a45c'
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = '#f5f5f5'
              }}
            >
              hello@parfumnizar.com
            </a>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#737373',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Instagram
            </div>
            <a
              href="https://instagram.com/parfumnizar"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                fontWeight: 300,
                color: '#f5f5f5',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = '#c9a45c'
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = '#f5f5f5'
              }}
            >
              @parfumnizar
            </a>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#737373',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Lokasi
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                fontWeight: 300,
                color: '#f5f5f5',
              }}
            >
              Jakarta, Indonesia
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-in">
          <a
            href="#"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: '#c9a45c',
              color: '#0a0a0a',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.3s ease-out',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#d4b76a'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#c9a45c'
            }}
          >
            Kunjungi Butik
          </a>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '120px',
            paddingTop: '32px',
            borderTop: '1px solid #1f1f1f',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#737373',
            }}
          >
            © 2025 Parfum Nizar. All rights reserved.
          </span>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#737373',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLElement).style.color = '#c9a45c'
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLElement).style.color = '#737373'
            }}
          >
            Kembali ke Atas
          </a>
        </div>
      </div>
    </section>
  )
}
