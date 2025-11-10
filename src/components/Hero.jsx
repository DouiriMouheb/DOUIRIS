import { useState, useEffect } from 'react'

export default function Hero({ t, shrink = 0, onContact }) {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const phrases = [
    t('hero.headline'),
    t('hero.headline_custom'),
    t('hero.headline_cloud'),
    t('hero.headline_payment'),
    t('hero.headline_ai'),
    t('hero.headline_digital')
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setIsVisible(true)
      }, 800)
    }, 5000)
    return () => clearInterval(interval)
  }, [phrases.length])

  return (
    <section className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BB8400]/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-4 sm:px-6">
        {/* Main headline */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-8 sm:mb-12"
          style={{
            transform: `scale(${1 + 0.1 * (1 - shrink)})`,
            transition: 'transform 600ms ease'
          }}
        >
          <span
            className="block text-white"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'opacity 800ms ease, transform 800ms ease'
            }}
          >
            {phrases[currentPhrase]}
          </span>
        </h1>

        {/* Divider */}
        <div className="w-24 h-px bg-[#BB8400] mx-auto mb-12" 
          style={{
            opacity: 1 - shrink * 0.5,
            transition: 'opacity 600ms ease'
          }}
        />

        {/* Subtitle */}
        <p 
          className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 sm:mb-16 font-light leading-relaxed px-4"
          style={{
            opacity: 1 - shrink * 0.3,
            transition: 'opacity 600ms ease'
          }}
        >
          {t('hero.description')}
        </p>

        {/* CTA */}
        <a 
          href={`tel:${t('phone')}`}
          className="group inline-flex items-center gap-3 px-8 sm:px-12 py-3 sm:py-4 border border-[#BB8400]/30 hover:border-[#BB8400] text-white hover:text-[#BB8400] transition-all duration-500 font-light tracking-wider text-xs sm:text-sm"
          style={{
            opacity: 1 - shrink * 0.5,
            transition: 'opacity 600ms ease'
          }}
        >
          <span>{t('hero.contact_us')}</span>
          <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-500" />
        </a>
      </div>
    </section>
  )
}
