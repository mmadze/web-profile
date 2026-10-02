import { useState, useRef, useEffect } from 'react'
import avatarImg from './avatar.png'

const BORDER = '3px solid #0a0a0a'
const SHADOW = '5px 5px 0px #0a0a0a'
const SHADOW_LG = '8px 8px 0px #0a0a0a'

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    platform: 'ICONSCOUT',
    title: 'Lottie Animation',
    description:
      'Sebagai mahasiswa Sistem Informasi, proyek ini merupakan media eksplorasi saya dalam mempelajari pembuatan animasi mikro berbasis Lottie (JSON) dan optimasi ukuran file untuk antarmuka web.',
    tags: ['Lottie', 'After Effects', 'JSON'],
    bg: '#f5e642',
    accent: '#0a0a0a',
    link: 'https://iconscout.com/contributors/mad-lan',
  },
]

// Custom Hook untuk mendeteksi elemen saat di-scroll
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (ref.current) observer.unobserve(ref.current) // Hanya trigger 1 kali
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [threshold])

  return { ref, inView }
}

function PortfolioCard({ item }: { item: typeof PORTFOLIO_ITEMS[0] }) {
  const [pressed, setPressed] = useState(false)
  const isLight = item.bg === '#f5e642' || item.bg === '#00e5a0'
  const fg = isLight ? '#0a0a0a' : item.accent

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative h-full block no-underline"
      style={{ transform: pressed ? 'translate(4px,4px)' : 'translate(0,0)', transition: 'transform 0.1s ease' }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      <div
        className="h-full flex flex-col justify-between"
        style={{
          background: item.bg,
          border: BORDER,
          boxShadow: pressed ? 'none' : SHADOW_LG,
          padding: '28px',
          cursor: 'pointer',
        }}
      >
        <div>
          {/* Top row */}
          <div className="flex items-start justify-between mb-6">
            <span
              className="text-xs font-bold tracking-[0.18em] px-3 py-1.5"
              style={{
                background: isLight ? '#0a0a0a' : '#ffffff',
                color: isLight ? '#ffffff' : '#0a0a0a',
                fontFamily: 'var(--font-mono)',
                border: BORDER,
              }}
            >
              {item.platform}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-2xl font-bold mb-4 leading-tight"
            style={{ color: fg, fontFamily: 'var(--font-display)' }}
          >
            {item.title}
          </h3>

          {/* Divider */}
          <div style={{ height: '3px', background: fg, opacity: 0.2, marginBottom: '16px' }} />

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: fg, opacity: 0.75 }}>
            {item.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold px-2.5 py-1"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: fg,
                  border: `2px solid ${fg}`,
                  opacity: 0.7,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div className="flex justify-end">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{ border: `2.5px solid ${fg}`, color: fg }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13 L13 3 M13 3 H6 M13 3 V10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function App() {
  const portfolioRef = useRef<HTMLDivElement>(null)
  
  // Custom hook untuk layer 2
  const { ref: layer2Ref, inView: layer2InView } = useInView(0.1)

  return (
    <div style={{ background: 'var(--background)', fontFamily: 'var(--font-body)' }}>

      {/* Global CSS animation tanpa flicker/kedip */}
      <style>{`
        .smooth-fade-up {
          opacity: 0;
          transform: translateY(35px);
          animation: smoothRise 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .scroll-fade-up {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes smoothRise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* ─── LAYER 1: HERO (Muncul Pelan Saat Load) ──────────────────── */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

          {/* LEFT: Avatar block */}
          <div
            className="relative flex items-end justify-center p-0 overflow-hidden"
            style={{ background: 'var(--background)' }}
          >
            <img 
              src={avatarImg} 
              alt="Avatar" 
              className="h-[60vh] md:h-[80vh] max-h-[900px] w-auto object-contain object-bottom drop-shadow-xl block smooth-fade-up" 
              style={{ animationDelay: '100ms' }}
            />
          </div>

          {/* RIGHT: Text block */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-12" style={{ background: 'var(--background)' }}>

            {/* Name */}
            <h1
              className="font-bold leading-[0.9] mb-2 smooth-fade-up"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(52px, 8.5vw, 110px)',
                letterSpacing: '-0.03em',
                animationDelay: '300ms',
              }}
            >
              Muhammad
            </h1>
            <h1
              className="font-bold leading-[0.9] mb-8 smooth-fade-up"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(52px, 8.5vw, 110px)',
                letterSpacing: '-0.03em',
                color: 'transparent',
                WebkitTextStroke: '3.5px #0a0a0a',
                animationDelay: '500ms',
              }}
            >
              Maulana
            </h1>

            {/* Bio */}
            <p 
              className="text-base md:text-xl leading-relaxed text-left md:text-justify w-full md:pr-4 smooth-fade-up" 
              style={{ 
                color: 'var(--muted-foreground)',
                animationDelay: '700ms',
              }}
            >
              Saya adalah mahasiswa Sistem Informasi yang bersemangat dalam merancang solusi digital.
              Minat saya mencakup pengembangan web modern, desain antarmuka, animasi gerak, serta
              teknologi Internet of Things memadukan estetika desain dengan logika rekayasa perangkat lunak.
            </p>

          </div>
        </div>
      </section>

      {/* ─── LAYER 2: PORTFOLIO (Hanya Muncul Saat Di-Scroll) ───────── */}
      <section ref={portfolioRef} style={{ borderTop: BORDER }}>
        <div ref={layer2Ref}>
          {/* Centered Single Card Layout */}
          <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div
                key={item.id}
                className={`scroll-fade-up ${layer2InView ? 'visible' : ''}`}
                style={{
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <PortfolioCard item={item} />
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div
            className={`flex items-center justify-center px-8 py-8 scroll-fade-up ${layer2InView ? 'visible' : ''}`}
            style={{ 
              borderTop: BORDER, 
              background: '#ffffff',
              transitionDelay: '600ms',
            }}
          >
            <a
              href="mailto:madlannn24@gmail.com?subject=Pesan%20dari%20Portofolio%20Web"
              className="px-8 py-4 font-bold text-sm transition-all"
              style={{
                fontFamily: 'var(--font-mono)',
                background: '#ff5c2b',
                color: '#ffffff',
                border: BORDER,
                boxShadow: SHADOW,
                letterSpacing: '0.1em',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = SHADOW_LG }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = SHADOW }}
            >
              KIRIM PESAN →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="flex items-center justify-between px-8 py-4 text-xs font-bold tracking-widest"
        style={{ borderTop: BORDER, fontFamily: 'var(--font-mono)', background: '#0a0a0a', color: '#f2f0e8' }}
      >
      </footer>
    </div>
  )
} 