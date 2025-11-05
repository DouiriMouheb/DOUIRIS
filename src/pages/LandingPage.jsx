import React, { useEffect, useState } from 'react'
import { Menu, Phone, Mail, Code, Server, CheckCircle } from 'lucide-react'
import i18n from '../i18n'
import EmailModal from '../components/EmailModal'

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 text-white font-bold px-3 py-1 rounded">{t('company')}</div>
          <nav className="hidden md:flex gap-6 text-sm text-slate-200/90">
            <a className="hover:text-white" href="#services">{t('nav.services')}</a>
            <a className="hover:text-white" href="#work">{t('nav.work')}</a>
            <a className="hover:text-white" href="#contact">{t('nav.contact')}</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => i18n.changeLanguage(l.code)}
                aria-pressed={lang === l.code}
                className={`px-2 py-1 rounded text-xs ${lang === l.code ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-300 hover:bg-slate-700/30'}`}>
                {l.label}
              </button>
            ))}
            <button onClick={() => setShowEmailModal(true)} className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">{t('nav.get_in_touch')}</button>
          </div>
          <button className="md:hidden p-2 rounded-md bg-slate-700/40">
            <Menu className="w-5 h-5 text-slate-100" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{t('hero.headline')}</h1>
            <p className="mt-4 text-slate-300 max-w-xl">{t('hero.description')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setShowEmailModal(true)} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-md shadow">{t('hero.contact_us')}</button>
              <a href="#work" className="inline-flex items-center gap-2 border border-slate-600 text-slate-100 px-4 py-3 rounded-md hover:bg-slate-700/30">{t('hero.our_work')}</a>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-700/40 rounded-lg">
                  <Code className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold">{t('features.custom_web_apps')}</h4>
                  <p className="text-slate-300 text-sm">Modern React and server-driven apps focused on performance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-700/40 rounded-lg">
                  <Server className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold">{t('features.cloud_devops')}</h4>
                  <p className="text-slate-300 text-sm">CI/CD, infrastructure automation, and reliable deployments.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto w-full max-w-lg bg-gradient-to-tr from-indigo-600/20 to-slate-700/40 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{t('start_project.title')}</h3>
                  <p className="text-sm text-slate-300">{t('start_project.desc')}</p>
                </div>
                <div className="text-slate-200/70 text-sm">Est. time: 2-4 weeks</div>
              </div>

              <form className="mt-6 grid grid-cols-1 gap-3">
                <input aria-label="Name" placeholder="Your name" className="w-full px-4 py-3 rounded-md bg-slate-800/60 border border-slate-700 placeholder-slate-400 text-white" />
                <input aria-label="Email" placeholder="Email" className="w-full px-4 py-3 rounded-md bg-slate-800/60 border border-slate-700 placeholder-slate-400 text-white" />
                <textarea aria-label="Message" placeholder="Project description" rows="4" className="w-full px-4 py-3 rounded-md bg-slate-800/60 border border-slate-700 placeholder-slate-400 text-white"></textarea>
                <div className="flex items-center justify-between">
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md">{t('start_project.request_quote')}</button>
                  <div className="text-sm text-slate-300 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> {t('start_project.secure')}</div>
                </div>
              </form>
            </div>

            <div className="hidden md:block absolute -right-8 top-8 w-48 h-48 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 blur-3xl opacity-30"></div>
          </div>
        </section>

        <section id="services" className="mt-16">
          <h2 className="text-2xl font-semibold">{t('services_title')}</h2>
          <p className="mt-2 text-slate-300 max-w-2xl">End-to-end product delivery: design, engineering, and operations — tailored to your team.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded"><Code className="w-5 h-5 text-indigo-300" /></div>
                <div>
                  <h4 className="font-semibold">Front-end</h4>
                  <p className="text-sm text-slate-300">React, performance and accessible interfaces.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded"><Server className="w-5 h-5 text-indigo-300" /></div>
                <div>
                  <h4 className="font-semibold">Back-end</h4>
                  <p className="text-sm text-slate-300">APIs, integrations, and scalable services.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded"><Phone className="w-5 h-5 text-indigo-300" /></div>
                <div>
                  <h4 className="font-semibold">{t('features.support')}</h4>
                  <p className="text-sm text-slate-300">On-call, maintenance and continuous improvements.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded"><Mail className="w-5 h-5 text-indigo-300" /></div>
                <div>
                  <h4 className="font-semibold">{t('features.consulting')}</h4>
                  <p className="text-sm text-slate-300">Architecture reviews and team training.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mt-16">
          <h2 className="text-2xl font-semibold">{t('contact_title')}</h2>
          <p className="mt-2 text-slate-300">Reach out to start a conversation about your project.</p>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href={`tel:${t('phone')}`} className="inline-flex items-center gap-2 bg-slate-700/30 px-4 py-3 rounded-md">
              <Phone className="w-5 h-5 text-indigo-300" /> {t('phone')}
            </a>
            <a href={`mailto:${t('email')}`} className="inline-flex items-center gap-2 bg-slate-700/30 px-4 py-3 rounded-md">
              <Mail className="w-5 h-5 text-indigo-300" /> {t('email')}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-700/30 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-400">{t('footer', { year: new Date().getFullYear() })}</div>
          <div className="flex items-center gap-4 text-slate-300 text-sm">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
      <EmailModal open={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  )
}
