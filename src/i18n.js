import i18n from 'i18next'
import en from './locales/en/translation.json'
import fr from './locales/fr/translation.json'
import it from './locales/it/translation.json'
import ar from './locales/ar/translation.json'

// initialize i18next with the JSON resources already present in the repo
i18n.init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    it: { translation: it },
    ar: { translation: ar }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

// handle RTL for Arabic automatically
function applyDir(lang) {
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl'
  } else {
    document.documentElement.dir = 'ltr'
  }
}

applyDir(i18n.language)
i18n.on('languageChanged', (lng) => applyDir(lng))

export default i18n
