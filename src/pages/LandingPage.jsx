import React, { useEffect, useState } from 'react'
import { Phone, Mail } from 'lucide-react'
import i18n from '../i18n'
import EmailModal from '../components/EmailModal'
import ServicesGrid from '../components/ServicesGrid'

export default function LandingPage() {
  const [lang, setLang] = useState(i18n.language || 'en')

  useEffect(() => {
    const handler = (lng) => {
      setLang(lng)
      // Update HTML lang attribute for SEO
      document.documentElement.lang = lng
    }
    i18n.on('languageChanged', handler)
    
    // Set initial lang attribute
    document.documentElement.lang = i18n.language
    
    return () => i18n.off('languageChanged', handler)
  }, [])

  const t = (k, opts) => i18n.t(k, opts)

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'it', label: 'IT' },
  ]

  const [showEmailModal, setShowEmailModal] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-[#BB8400]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-between gap-3">
          <div className="text-xl sm:text-2xl md:text-3xl font-light tracking-wider text-[#BB8400] drop-shadow-[0_0_8px_rgba(187,132,0,0.5)]">{t('company')}</div>
          <div className="flex items-center gap-3 sm:gap-8 flex-shrink-0">
            <nav className="hidden md:flex gap-4 lg:gap-8 text-sm" aria-label="Main navigation">
              <a className="text-white/70 hover:text-[#BB8400] transition-colors whitespace-nowrap" href="#services">{t('nav.services')}</a>
              <a className="text-white/70 hover:text-[#BB8400] transition-colors whitespace-nowrap" href="#contact">{t('nav.contact')}</a>
            </nav>
            <div className="flex items-center gap-2 sm:gap-3">
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

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden pt-24 sm:pt-32">
        {/* Company Introduction */}
        <section className="py-16 sm:py-24 text-center relative">
          {/* Glowing heartbeat effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-64 h-64 sm:w-96 sm:h-96 bg-gray-400 rounded-full blur-3xl opacity-20 animate-heartbeat" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 tracking-wide">
              {t('company')}
            </h1>
            <div className="w-24 h-px bg-[#BB8400] mx-auto mb-8" />
            <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
              {t('hero.description')}
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-24">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-white">{t('services_title')}</h2>
            <div className="w-16 h-px bg-[#BB8400] mx-auto" />
          </div>

          <ServicesGrid t={t} />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-24 border-t border-white/5">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-white">{t('contact_title')}</h2>
            <div className="w-16 h-px bg-[#BB8400] mx-auto mb-8" />
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light">Let's create something exceptional together</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 max-w-2xl mx-auto">
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

      <footer className="border-t border-white/5 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/40 font-light">{t('footer', { year: new Date().getFullYear() })}</div>
          <div className="text-sm text-white/40">© {t('company')}</div>
        </div>
      </footer>
      
      <EmailModal open={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  )
}
