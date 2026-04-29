import { useState } from 'react'

const navLinks = [
  { label: 'TENTANG', href: '#about' },
  { label: 'KOLEKSI', href: '#collections' },
  { label: 'KONTAK', href: '#contact' },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (href: string) => {
    setMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '24px clamp(20px, 4vw, 80px)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
        }}
      >
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
            letterSpacing: '0.15em',
            color: '#f5f5f5',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          PARFUM NIZAR
        </a>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(link.href)
              }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#a3a3a3',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = '#f5f5f5'
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = '#a3a3a3'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }}
          aria-label="Toggle menu"
        >
          <div
            style={{
              width: '24px',
              height: '1px',
              background: '#f5f5f5',
              marginBottom: '6px',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none',
            }}
          />
          <div
            style={{
              width: '24px',
              height: '1px',
              background: '#f5f5f5',
              transition: 'opacity 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              width: '24px',
              height: '1px',
              background: '#f5f5f5',
              marginTop: '6px',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: '#141414',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(link.href)
              }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                color: '#f5f5f5',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
