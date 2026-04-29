import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '12+', label: 'Tahun Berkarya' },
  { value: '50+', label: 'Aroma Eksklusif' },
  { value: '100%', label: 'Buatan Tangan' },
  { value: 'Nusantara', label: 'Warisan Lokal' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const elements = section.querySelectorAll('.animate-in')
    const statElements = section.querySelectorAll('.stat-item')

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

    tl.from(
      statElements,
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
      },
      '-=0.4'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
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
            TENTANG KAMI
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
            margin: 0,
            maxWidth: '700px',
          }}
        >
          Warisan Aroma, Sentuhan Modern
        </h2>

        {/* Body Text */}
        <div
          className="animate-in"
          style={{
            marginTop: '32px',
            maxWidth: '680px',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: '0.01em',
              color: '#a3a3a3',
              marginBottom: '20px',
            }}
          >
            Parfum Nizar lahir dari kecintaan mendalam akan warisan ketimuran dan
            keinginan untuk membawakannya ke era modern. Setiap aroma yang kami
            ciptakan adalah hasil dari perjalanan panjang — mulai dari pemilihan
            bahan-bahan terbaik dari seluruh penjuru Nusantara, proses blending
            yang dilakukan dengan tangan oleh para perfumer berpengalaman, hingga
            kemasan yang mencerminkan kemewahan dan keanggunan.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: '0.01em',
              color: '#a3a3a3',
            }}
          >
            Kami percaya bahwa parfum bukan sekadar wewangian. Ia adalah ekspresi,
            memori yang tertangkap dalam botol, dan cara paling intim untuk
            menceritakan siapa diri Anda kepada dunia.
          </p>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '48px',
            marginTop: '80px',
            maxWidth: '800px',
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item"
              style={{
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: '#c9a45c',
                  marginBottom: '8px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 300,
                  color: '#737373',
                  letterSpacing: '0.01em',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
