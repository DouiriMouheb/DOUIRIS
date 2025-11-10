import React, { useEffect, useState } from 'react'
import { Menu, Phone, Mail, CheckCircle } from 'lucide-react'
import i18n from '../i18n'
import EmailModal from '../components/EmailModal'
import Hero from '../components/Hero'
import ServicesGrid from '../components/ServicesGrid'
import ContactCard from '../components/ContactCard'

export default function LandingPage() {
  const [lang, setLang] = useState(i18n.language || 'en')

  useEffect(() => {
    const handler = (lng) => setLang(lng)
    i18n.on('languageChanged', handler)
    return () => i18n.off('languageChanged', handler)
  }, [])

  const t = (k, opts) => i18n.t(k, opts)

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'it', label: 'IT' },
    
  ]

  const [showEmailModal, setShowEmailModal] = useState(false)
  // scroll-driven shrink state (0 = initial full-hero, 1 = scrolled)
  const [shrink, setShrink] = useState(0)

  useEffect(() => {
    let raf = null
    const maxScroll = 200 // px after which we consider the hero collapsed

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset || 0
        const progress = Math.max(0, Math.min(scrollY / maxScroll, 1))
        setShrink(progress)
        raf = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // initialise
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#BB8400] focus:text-white focus:rounded focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Minimal header */}
      <header
        className="fixed top-0 left-0 right-0 z-40"
        role="banner"
        style={{
          opacity: shrink > 0 ? 1 : 0,
          transform: shrink > 0 ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'all 300ms ease',
          pointerEvents: shrink > 0 ? 'auto' : 'none',
          background: shrink > 0.3 ? 'rgba(0, 0, 0, 0.98)' : 'transparent',
          borderBottom: shrink > 0.3 ? '1px solid rgba(187, 132, 0, 0.1)' : '1px solid transparent'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-6 flex items-center justify-between">
          <div className="text-xl font-light tracking-wider text-[#BB8400]">{t('company')}</div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-8 text-sm" aria-label="Main navigation">
              <a className="text-white/70 hover:text-[#BB8400] transition-colors" href="#services">{t('nav.services')}</a>
              <a className="text-white/70 hover:text-[#BB8400] transition-colors" href="#contact">{t('nav.contact')}</a>
            </nav>
            <div className="flex items-center gap-3">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => i18n.changeLanguage(l.code)}
                  className={`text-xs tracking-wider transition-colors ${lang === l.code ? 'text-[#BB8400]' : 'text-white/50 hover:text-white/70'}`}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Scroll indicator */}
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
        style={{
          opacity: shrink === 0 ? 1 : 0,
          transition: 'opacity 400ms ease',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#BB8400]/50 to-transparent" />
      </div>

      <main id="main-content" className="max-w-6xl mx-auto px-6 sm:px-8">
        <Hero t={t} shrink={shrink} onContact={() => setShowEmailModal(true)} />

        <section
          id="services"
          className="py-32"
          style={{
            opacity: shrink > 0 ? 1 : 0,
            transform: shrink > 0 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 600ms ease, transform 600ms ease'
          }}
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-white">{t('services_title')}</h2>
            <div className="w-16 h-px bg-[#BB8400] mx-auto" />
          </div>

          <ServicesGrid t={t} />
        </section>

        <section
          id="contact"
          className="py-32 border-t border-white/5"
          style={{
            opacity: shrink > 0 ? 1 : 0,
            transform: shrink > 0 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 600ms ease, transform 600ms ease'
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-white">{t('contact_title')}</h2>
            <div className="w-16 h-px bg-[#BB8400] mx-auto mb-8" />
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Let's create something exceptional together</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-2xl mx-auto">
            <a 
              href={`tel:${t('phone')}`} 
              className="group flex items-center gap-3 text-white/70 hover:text-[#BB8400] transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-light">{t('phone')}</span>
            </a>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <a 
              href={`mailto:${t('email')}`} 
              className="group flex items-center gap-3 text-white/70 hover:text-[#BB8400] transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-light">{t('email')}</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8" role="contentinfo">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/40 font-light">{t('footer', { year: new Date().getFullYear() })}</div>
          <div className="text-sm text-white/40">© {t('company')}</div>
        </div>
      </footer>
      <EmailModal open={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  )
}
