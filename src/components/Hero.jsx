import  { useState, useEffect } from 'react'

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
      // Fade out
      setIsVisible(false)
      
      // Wait for fade out to complete, then change text and fade in
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setIsVisible(true)
      }, 600) // Match fade out duration
    }, 4000) // Total cycle: 4 seconds

    return () => clearInterval(interval)
  }, [phrases.length])

  return (
    <section className="relative flex items-center justify-center min-h-[85vh] sm:min-h-[90vh]">
      {/* Decorative gradient blob */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 opacity-20 blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Headline: scale from ~1.8 -> 1.0 (controlled by parent `shrink`) */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] flex items-center justify-center px-2"
          style={{
            transform: `scale(${1 + 0.5 * (1 - shrink)})`,
            transition: 'transform 300ms cubic-bezier(.2,.9,.2,1)'
          }}
        >
          <span
            className="inline-block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'opacity 600ms ease-in-out, transform 600ms ease-in-out'
            }}
          >
            {phrases[currentPhrase]}
          </span>
        </h1>

        {/* Description/buttons reveal after scroll starts */}
        <div
          style={{
            opacity: shrink > 0.1 ? 1 : 0,
            transform: shrink > 0.1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 400ms ease, transform 400ms ease',
            pointerEvents: shrink > 0.1 ? 'auto' : 'none'
          }}
        >
          <p className="mt-3 sm:mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base px-4">{t('hero.description')}</p>

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center px-4">
            <button 
              onClick={onContact} 
              aria-label="Contact us to start your project"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 text-white px-5 py-2.5 rounded-md shadow-lg transform hover:-translate-y-0.5 transition text-sm sm:text-base"
            >
              {t('hero.contact_us')}
            </button>
            <a 
              href="#work" 
              aria-label="View our work portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-100 px-5 py-2.5 rounded-md hover:bg-slate-700/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 text-sm sm:text-base"
            >
              {t('hero.our_work')}
            </a>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto px-4">
            <div className="flex items-start gap-3 text-left p-4 sm:p-0">
              <div className="p-2 bg-slate-700/40 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base">{t('features.custom_web_apps')}</h4>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">Modern React and server-driven apps focused on performance.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left p-4 sm:p-0">
              <div className="p-2 bg-slate-700/40 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base">{t('features.cloud_devops')}</h4>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">CI/CD, infrastructure automation, and reliable deployments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
