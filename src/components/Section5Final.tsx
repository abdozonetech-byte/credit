import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

export default function Section5Final() {
  const { t, lang, dir } = useLanguage()
  const scrollToForm = () => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      {/* Final CTA */}
      <section className="py-14 md:py-18 bg-gradient-to-br from-navy-800 via-navy-700 to-navy-800 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-72 h-72 rounded-full bg-white/[0.04] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-64 h-64 rounded-full bg-white/[0.04] pointer-events-none" />

        <div className="container-page max-w-lg relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">{t('s5.title')}</h2>
            <p className="text-sm md:text-base text-white/70 mb-5 leading-relaxed">{t('s5.text')}</p>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={scrollToForm}
              className="inline-flex items-center justify-center h-12 px-7 rounded-xl bg-gradient-to-br from-gold-500 to-gold-400 text-white text-sm font-bold shadow-lg shadow-gold-500/25 hover:shadow-xl hover:shadow-gold-500/35 transition-all"
            >
              {t('s5.cta')}
              <ArrowLeft size={16} className={dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 bg-navy-800 border-t border-white/5">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-navy-600 flex items-center justify-center text-white font-bold text-xs">
                  م
                </div>
                <span className="text-sm font-bold text-white/90">{t('header.logo')}</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed max-w-[220px]">{t('footer.tagline')}</p>
            </div>

            {/* Area */}
            <div>
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                {lang === 'ar' ? 'منطقة الخدمة' : 'Zone de service'}
              </h4>
              <p className="text-sm text-white/80 font-semibold">{t('footer.area')}</p>
            </div>

            {/* Language */}
            <div>
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                {lang === 'ar' ? 'اللغة' : 'Langue'}
              </h4>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${lang === 'ar' ? 'bg-white/10 text-white' : 'text-white/40'}`}>🇲🇦 AR</span>
                <span className="text-white/20">|</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${lang === 'fr' ? 'bg-white/10 text-white' : 'text-white/40'}`}>🇫🇷 FR</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-white/[0.06] mb-4" />

          {/* Disclaimer + Copyright */}
          <p className="text-[11px] text-white/30 leading-relaxed mb-4 text-center md:text-left">
            {t('footer.disclaimer')}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-white/20">
              &copy; {new Date().getFullYear()} {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
