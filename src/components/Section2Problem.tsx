import { motion } from 'motion/react'
import { BarChart3, TrendingUp, Compass } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const icons = [BarChart3, TrendingUp, Compass]
const keys = ['s2.card1', 's2.card2', 's2.card3']

export default function Section2Problem() {
  const { t } = useLanguage()

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-page max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-[1.5rem] font-bold text-navy-800 text-center mb-2 leading-snug">
            {t('s2.title')}
          </h2>
          <p className="text-sm md:text-base text-navy-500 text-center mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed">
            {t('s2.text')}
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[0, 1, 2].map((i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={keys[i]}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -2 }}
                className="flex flex-col items-center text-center p-4 md:p-5 rounded-xl bg-surface border border-navy-100/40 hover:bg-white hover:border-navy-200/50 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/10 to-navy-600/10 flex items-center justify-center mb-2.5">
                  <Icon size={18} className="text-teal-500" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-navy-700 leading-snug">
                  {t(keys[i])}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
