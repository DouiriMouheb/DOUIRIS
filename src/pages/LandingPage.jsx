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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      {/* Sticky header with glass morphism */}
      <header
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md"
        style={{
          // hide header until user scrolls a little
          opacity: shrink > 0 ? 1 : 0,
          transform: shrink > 0 ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: shrink > 0 ? 'auto' : 'none',
          background: shrink > 0.3 ? 'rgba(15, 23, 42, 0.8)' : 'transparent',
          borderBottom: shrink > 0.3 ? '1px solid rgba(148, 163, 184, 0.1)' : '1px solid transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-indigo-500 text-white font-bold px-2 sm:px-3 py-1 rounded text-sm sm:text-base">{t('company')}</div>
            <nav className="hidden md:flex gap-4 lg:gap-6 text-sm text-slate-200/90">
              <a className="hover:text-white transition-colors" href="#services">{t('nav.services')}</a>
              <a className="hover:text-white transition-colors" href="#work">{t('nav.work')}</a>
              <a className="hover:text-white transition-colors" href="#contact">{t('nav.contact')}</a>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => i18n.changeLanguage(l.code)}
                  aria-pressed={lang === l.code}
                  className={`px-2 py-1 rounded text-xs transition-all ${lang === l.code ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-300 hover:bg-slate-700/30'}`}>
                  {l.label}
                </button>
              ))}
              <button onClick={() => setShowEmailModal(true)} className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm transition-all transform hover:-translate-y-0.5">{t('nav.get_in_touch')}</button>
            </div>
            <button 
              onClick={() => setShowEmailModal(true)}
              className="md:hidden p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <Mail className="w-5 h-5 text-slate-100" />
            </button>
          </div>
        </div>
      </header>

      {/* Scroll indicator - shows when shrink === 0 */}
      <div
        className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce"
        style={{
          opacity: shrink === 0 ? 1 : 0,
          transition: 'opacity 400ms ease',
          pointerEvents: 'none'
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-slate-400 text-xs sm:text-sm">Scroll</span>
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-0 pb-12">
        <Hero t={t} shrink={shrink} onContact={() => setShowEmailModal(true)} />

        <section
          id="services"
          className="mt-16 sm:mt-20 md:mt-24 pt-12 sm:pt-14 md:pt-16"
          style={{
            opacity: shrink > 0 ? 1 : 0,
            transform: shrink > 0 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 420ms ease, transform 420ms ease'
          }}
        >
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{t('services_title')}</h2>
            <p className="mt-2 sm:mt-3 text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">End-to-end product delivery: design, engineering, and operations — tailored to your team.</p>
          </div>

          <ServicesGrid t={t} />
        </section>

        <section
          id="contact"
          className="mt-16 sm:mt-20 md:mt-24 pt-12 sm:pt-14 md:pt-16"
          style={{
            opacity: shrink > 0 ? 1 : 0,
            transform: shrink > 0 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 420ms ease, transform 420ms ease'
          }}
        >
          <div className="text-center mb-6 sm:mb-8 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{t('contact_title')}</h2>
            <p className="mt-2 sm:mt-3 text-slate-300 text-base sm:text-lg">Reach out to start a conversation about your project.</p>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4">
            <a href={`tel:${t('phone')}`} className="flex items-center justify-center gap-2 bg-slate-700/30 hover:bg-slate-700/50 px-5 sm:px-6 py-4 rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-lg">
              <Phone className="w-5 h-5 text-indigo-300 flex-shrink-0" /> <span className="font-medium text-sm sm:text-base">{t('phone')}</span>
            </a>
            <a href={`mailto:${t('email')}`} className="flex items-center justify-center gap-2 bg-slate-700/30 hover:bg-slate-700/50 px-5 sm:px-6 py-4 rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-lg">
              <Mail className="w-5 h-5 text-indigo-300 flex-shrink-0" /> <span className="font-medium text-sm sm:text-base">{t('email')}</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-700/30 mt-16 sm:mt-20 md:mt-24 py-6 sm:py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">{t('footer', { year: new Date().getFullYear() })}</div>
          <div className="flex items-center gap-4 sm:gap-6 text-slate-300 text-xs sm:text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">© {t('company')}</a>
          </div>
        </div>
      </footer>
      <EmailModal open={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  )
}
