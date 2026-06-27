import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import { t } from '../i18n/translations'

export function useLanguage() {
  const { lang, toggleLanguage, dir } = useContext(LanguageContext)
  return { lang, toggleLanguage, dir, t: (key: string) => t(lang, key) }
}
