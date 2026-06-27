import { createContext, useState, useCallback, type ReactNode } from 'react'
import type { Language } from '../i18n/translations'

interface LanguageContextType {
  lang: Language
  toggleLanguage: () => void
  dir: 'rtl' | 'ltr'
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  toggleLanguage: () => {},
  dir: 'rtl',
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ar')

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'fr' : 'ar'))
  }, [])

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}
