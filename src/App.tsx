import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LanguageProvider } from './context/LanguageContext'
import { useLanguage } from './hooks/useLanguage'
import Header from './components/Header'
import Section1Hero from './components/Section1Hero'
import Section2Problem from './components/Section2Problem'
import Section3How from './components/Section3How'
import Section4Eligibility from './components/Section4Eligibility'
import Section5Final from './components/Section5Final'

function AppContent() {
  const { lang, dir } = useLanguage()
  const fontClass = lang === 'ar' ? 'font-cairo' : 'font-manrope'

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir

    const titles: Record<string, string> = {
      ar: 'حلول ذكية لتنظيم القروض لموظفي القطاع العام بالمغرب',
      fr: 'Solutions intelligentes pour organiser les crédits du secteur public au Maroc',
    }
    const descriptions: Record<string, string> = {
      ar: 'استشارة مجانية لموظفي القطاع العام بالمغرب لفهم الحلول الممكنة لتنظيم الأقساط الشهرية.',
      fr: 'Consultation gratuite pour les employés du secteur public au Maroc afin de mieux organiser les mensualités.',
    }

    document.title = titles[lang]
    setMeta('description', descriptions[lang])
    setMeta('og:title', titles[lang])
    setMeta('og:description', descriptions[lang])
  }, [lang, dir])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        dir={dir}
        lang={lang}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={fontClass}
      >
        <Header />
        <Section1Hero />
        <Section2Problem />
        <Section3How />
        <Section4Eligibility />
        <Section5Final />
      </motion.div>
    </AnimatePresence>
  )
}

function setMeta(name: string, content: string) {
  const attr = name.startsWith('og:') ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.content = content
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
