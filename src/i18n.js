import i18n from 'i18next'
import en from './locales/en/translation.json'
import fr from './locales/fr/translation.json'
import it from './locales/it/translation.json'
import ar from './locales/ar/translation.json'

// Detect user's language from browser/region
const getUserLanguage = () => {
  // Get browser language (e.g., 'en-US', 'fr-FR', 'it-IT')
  const browserLang = navigator.language || navigator.userLanguage
  
  // Extract the language code (e.g., 'en', 'fr', 'it')
  const langCode = browserLang.split('-')[0].toLowerCase()
  
  // Supported languages
  const supportedLanguages = ['en', 'fr', 'it', 'ar']
  
  // Return the language if supported, otherwise fallback to English
  return supportedLanguages.includes(langCode) ? langCode : 'en'
}

// initialize i18next with the JSON resources already present in the repo
i18n.init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    it: { translation: it },
    ar: { translation: ar }
  },
  lng: getUserLanguage(), // Auto-detect user's language
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
