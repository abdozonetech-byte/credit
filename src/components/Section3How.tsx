import { motion } from 'motion/react'
import { FileText, Search, Phone } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const steps = [
  { icon: FileText, key: 's3.step1' },
  { icon: Search, key: 's3.step2' },
  { icon: Phone, key: 's3.step3' },
]

export default function Section3How() {
  const { t } = useLanguage()

  return (
    <section className="py-12 md:py-16 bg-surface-alt">
      <div className="container-page max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-[1.5rem] font-bold text-navy-800 text-center mb-8 md:mb-10">
            {t('s3.title')}
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:flex items-start justify-between gap-6 relative">
          {/* Connector line */}
          <div className="absolute top-7 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-teal-200 via-teal-300 to-navy-200 rounded-full" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="flex flex-col items-center text-center relative z-10 flex-1"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-md border-2 border-teal-100 flex items-center justify-center mb-3">
                  <Icon size={22} className="text-teal-500" />
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-navy-600 text-white flex items-center justify-center text-xs font-bold absolute -top-1 left-1/2 -translate-x-1/2 shadow-sm border-2 border-white">
                  {i + 1}
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-1">{t(`${step.key}.title`)}</h3>
                <p className="text-xs text-navy-500 leading-relaxed max-w-[160px]">{t(`${step.key}.desc`)}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: vertical steps */}
        <div className="md:hidden space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-navy-100/40 shadow-sm"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/10 to-navy-600/10 flex items-center justify-center">
                    <Icon size={18} className="text-teal-500" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-teal-500 to-navy-600 text-white flex items-center justify-center text-[10px] font-bold border border-white">
                    {i + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy-800">{t(`${step.key}.title`)}</h3>
                  <p className="text-xs text-navy-500">{t(`${step.key}.desc`)}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
