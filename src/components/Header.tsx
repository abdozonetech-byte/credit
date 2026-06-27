import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../hooks/useLanguage'

export default function Header() {
  const { lang, toggleLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToForm = () => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-navy-100/40'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-18">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-navy-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            م
          </div>
          <span className="text-sm md:text-base font-bold text-navy-800 hidden sm:block">
            {t('header.logo')}
          </span>
        </a>

        <div className="flex items-center gap-3">
          {/* Language switcher with flags */}
          <div className="flex items-center bg-navy-50 rounded-xl p-0.5 gap-0.5 border border-navy-100/50">
            <button
              onClick={lang === 'fr' ? toggleLanguage : undefined}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] text-xs font-bold transition-all duration-200 ${
                lang === 'ar'
                  ? 'bg-white shadow-sm text-navy-800 border border-navy-100/50'
                  : 'text-navy-400 hover:text-navy-600'
              }`}
            >
              <span className="text-base leading-none">🇲🇦</span>
              <span>AR</span>
            </button>
            <button
              onClick={lang === 'ar' ? toggleLanguage : undefined}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] text-xs font-bold transition-all duration-200 ${
                lang === 'fr'
                  ? 'bg-white shadow-sm text-navy-800 border border-navy-100/50'
                  : 'text-navy-400 hover:text-navy-600'
              }`}
            >
              <span className="text-base leading-none">🇫🇷</span>
              <span>FR</span>
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToForm}
            className="hidden md:inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gradient-to-br from-navy-700 to-navy-600 text-white text-sm font-bold shadow-md shadow-navy-700/15 hover:shadow-lg hover:shadow-navy-700/25 transition-all"
          >
            {t('header.cta')}
          </motion.button>
        </div>
      </div>
    </header>
  )
}
