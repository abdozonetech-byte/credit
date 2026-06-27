import { motion } from 'motion/react'
import { Building2, CheckCircle2, Shield, Phone } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const trustIcons = [CheckCircle2, Shield, CheckCircle2, Phone]
const trustKeys = ['s4.trust1', 's4.trust2', 's4.trust3', 's4.trust4']

export default function Section4Eligibility() {
  const { t } = useLanguage()

  return (
    <section id="eligibility" className="py-12 md:py-16 bg-white">
      <div className="container-page max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500/10 to-navy-600/10 flex items-center justify-center mx-auto mb-3">
              <Building2 size={22} className="text-teal-500" />
            </div>
            <h2 className="text-xl md:text-[1.5rem] font-bold text-navy-800 mb-2">{t('s4.title')}</h2>
            <p className="text-sm md:text-base text-navy-500 leading-relaxed max-w-xl mx-auto">{t('s4.text')}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => {
            const Icon = trustIcons[i]
            return (
              <motion.div
                key={trustKeys[i]}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex flex-col items-center text-center p-3.5 md:p-4 rounded-xl bg-surface border border-navy-100/30 hover:bg-white hover:border-navy-200/50 hover:shadow-sm transition-all"
              >
                <Icon size={18} className="text-teal-500 mb-2" />
                <span className="text-xs md:text-sm font-semibold text-navy-700 leading-snug">
                  {t(trustKeys[i])}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
