import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from '@/locales/en/translation.json'
import esTranslation from '@/locales/es/translation.json'

// Language resources
const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  }
}

// Supported languages
export const SUPPORTED_LANGUAGES = ['en', 'es'] as const
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

// Language display names
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español'
}

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Fallback language
    supportedLngs: SUPPORTED_LANGUAGES,
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'routicket-language'
    },
    
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    // React options
    react: {
      useSuspense: false // Disable suspense for simpler implementation
    }
  })

export default i18n
