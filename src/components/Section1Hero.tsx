import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Sparkles, Shield, CreditCard, CalendarDays, CheckCircle2, Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { submitLead, trackMetaLead } from '../services/leadService'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Select } from './ui/select'

interface FormData {
  fullName: string; phone: string; city: string; publicSector: string
  creditsCount: string; pressureLevel: string; consent: boolean
}
const initialForm: FormData = {
  fullName: '', phone: '', city: '', publicSector: '',
  creditsCount: '', pressureLevel: '', consent: false,
}
type FormErrors = Partial<Record<keyof FormData, string>>

export default function Section1Hero() {
  const { t, lang, dir } = useLanguage()
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showPublicMessage, setShowPublicMessage] = useState(false)

  const update = <K extends keyof FormData>(f: K, v: FormData[K]) => {
    setForm(p => ({ ...p, [f]: v }))
    if (errors[f]) setErrors(p => { const n = { ...p }; delete n[f]; return n })
    if (f === 'publicSector') setShowPublicMessage(v === 'no')
  }

  const validate = () => {
    const e: FormErrors = {}
    if (!form.fullName.trim()) e.fullName = lang === 'ar' ? 'مطلوب' : 'Requis'
    if (!form.phone.trim()) e.phone = lang === 'ar' ? 'مطلوب' : 'Requis'
    else if (!/^(?:(?:\+212|0)(?:[5-7]\d{8}))$/.test(form.phone.replace(/\s+/g, '')))
      e.phone = t('form.phone.error')
    if (!form.city.trim()) e.city = lang === 'ar' ? 'مطلوب' : 'Requis'
    if (form.publicSector !== 'yes') e.publicSector = lang === 'ar' ? 'مطلوب' : 'Requis'
    if (!form.consent) e.consent = lang === 'ar' ? 'مطلوب' : 'Requis'
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSubmitError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      const ok = await submitLead({
        fullName: form.fullName.trim(), phone: form.phone.trim(), city: form.city.trim(),
        publicSectorConfirmed: form.publicSector === 'yes', creditsCount: form.creditsCount,
        pressureLevel: form.pressureLevel, language: lang,
      })
      if (ok) { setSuccess(true); trackMetaLead() } else setSubmitError(t('form.error'))
    } catch { setSubmitError(t('form.error')) }
    finally { setSubmitting(false) }
  }

  const cards = [
    { icon: CreditCard, label: lang === 'ar' ? 'قسط شهري' : 'Mensualité', sub: lang === 'ar' ? 'قرض' : 'Crédit', top: '6%', start: '5%', delay: 0 },
    { icon: CalendarDays, label: lang === 'ar' ? 'الراتب' : 'Salaire', sub: lang === 'ar' ? 'نهاية الشهر' : 'Fin de mois', top: '28%', end: '5%', delay: 0.15 },
    { icon: Sparkles, label: lang === 'ar' ? 'خطة ذكية' : 'Plan sur mesure', sub: lang === 'ar' ? 'حسب حالتك' : 'Selon profil', top: '52%', start: '10%', delay: 0.3, dark: true },
    { icon: CheckCircle2, label: lang === 'ar' ? 'استشارة مجانية' : 'Consultation gratuite', sub: lang === 'ar' ? 'بدون التزام' : 'Sans engagement', top: '72%', end: '8%', delay: 0.45, gold: true },
  ]

  if (success) {
    return (
      <section className="relative min-h-[80vh] md:min-h-screen bg-gradient-to-br from-surface via-surface-alt to-surface pt-24 md:pt-28 flex items-center">
        <div className="container-page max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
            <div className="p-8 md:p-10 rounded-2xl bg-white border border-navy-100/30 shadow-sm text-center">
              <CheckCircle size={48} className="text-teal-500 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-navy-800 mb-2">{t('form.success')}</h3>
              <p className="text-sm text-navy-500">{lang === 'ar' ? 'غادي يتاصل بك المستشار قريباً.' : 'Un conseiller vous contactera prochainement.'}</p>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden bg-gradient-to-br from-surface via-surface-alt to-surface pt-20 md:pt-24">
      {/* Animated bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-[25%] -right-[15%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-teal-500/8 to-navy-500/5 blur-3xl" />
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -bottom-[20%] -left-[15%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-gold-500/5 to-teal-500/4 blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start min-h-[80vh] pt-2 md:pt-4">
          {/* Hero text */}
          <div className="order-1">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <Badge variant="navy" className="mb-3 md:mb-4">{t('hero.badge')}</Badge>

              <h1 className="text-2xl sm:text-3xl md:text-[2.4rem] lg:text-[2.8rem] font-extrabold leading-[1.1] mb-1.5 text-navy-800">
                {t('hero.title.line1')}
              </h1>
              <h1 className="text-2xl sm:text-3xl md:text-[2.4rem] lg:text-[2.8rem] font-extrabold leading-[1.1] mb-3 md:mb-4 text-gold-500">
                {t('hero.title.line2')}
              </h1>

              <p className="text-sm md:text-base text-navy-600/80 leading-relaxed mb-4 md:mb-5 max-w-lg">
                {t('hero.subtitle')}
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-gradient-to-br from-navy-700 to-navy-600 text-white text-sm font-bold shadow-lg shadow-navy-700/20 hover:shadow-xl hover:shadow-navy-700/30 transition-all mb-5 md:mb-0"
              >
                {t('hero.cta')}
                <ArrowLeft size={16} className={dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'} />
              </motion.button>
            </motion.div>

            {/* Floating cards - visible on desktop only */}
            <div className="hidden md:block relative h-[340px] mt-4">
              {cards.map((c, i) => {
                const Icon = c.icon
                const style: Record<string, string> = {
                  position: 'absolute', top: c.top, width: '155px', height: '85px',
                  borderRadius: '16px', padding: '14px', display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center', zIndex: '3',
                }
                style[dir === 'rtl' ? c.start ? 'right' : 'left' : c.start ? 'left' : 'right'] = c.start || c.end || '5%'
                return (
                  <motion.div
                    key={i} initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + c.delay }}
                    className={`absolute rounded-2xl flex flex-col items-center justify-center shadow-lg border backdrop-blur-sm ${
                      c.gold ? 'bg-gradient-to-br from-gold-500 to-gold-400 text-white border-white/10'
                        : c.dark ? 'bg-gradient-to-br from-navy-700 to-navy-600 text-white border-white/10'
                        : 'bg-white/80 backdrop-blur-md text-navy-700 border-white/80'
                    }`}
                    style={style}
                  >
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }} className="flex flex-col items-center">
                      <Icon size={20} className={`mb-0.5 ${c.dark || c.gold ? 'text-white/90' : 'text-teal-500'}`} />
                      <span className={`text-[11px] font-bold ${c.dark || c.gold ? 'text-white' : 'text-navy-700'}`}>{c.label}</span>
                      <span className={`text-[10px] ${c.dark || c.gold ? 'text-white/70' : 'text-navy-400'}`}>{c.sub}</span>
                    </motion.div>
                  </motion.div>
                )
              })}
              <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.2 }} className="absolute top-[38%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white/90 shadow-lg border border-white/70 flex items-center justify-center z-10">
                <Shield size={28} className="text-teal-500" />
              </motion.div>
            </div>
          </div>

          {/* Form */}
          <div id="lead-form" className="order-2 md:sticky md:top-24">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="p-5 md:p-6 rounded-2xl bg-white/80 backdrop-blur-lg border border-white/90 shadow-md">
                <h2 className="text-base md:text-lg font-bold text-navy-800 text-center mb-1">{t('form.title')}</h2>
                <p className="text-xs md:text-sm text-navy-500 text-center mb-4 leading-relaxed">{t('form.subtitle')}</p>

                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <div className="space-y-1">
                    <Label htmlFor="fn">{t('form.name')}</Label>
                    <Input id="fn" value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder={t('form.name')} autoComplete="name" />
                    {errors.fullName && <p className="text-[11px] text-red-500">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="ph">{t('form.phone')}</Label>
                    <Input id="ph" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="06XXXXXXXX" autoComplete="tel" dir="ltr" className={lang === 'ar' ? 'text-right' : 'text-left'} />
                    {errors.phone && <p className="text-[11px] text-red-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="ci">{t('form.city')}</Label>
                    <Input id="ci" value={form.city} onChange={e => update('city', e.target.value)} placeholder={t('form.city')} autoComplete="address-level2" />
                    {errors.city && <p className="text-[11px] text-red-500">{errors.city}</p>}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="ps">{t('form.public.label')}</Label>
                    <Select id="ps" value={form.publicSector} onChange={e => update('publicSector', e.target.value)} placeholder={lang === 'ar' ? 'اختر' : 'Sélectionnez'} options={[
                      { value: 'yes', label: t('form.public.yes') }, { value: 'no', label: t('form.public.no') },
                    ]} />
                    {errors.publicSector && <p className="text-[11px] text-red-500">{errors.publicSector}</p>}
                  </div>

                  <AnimatePresence>
                    {showPublicMessage && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-start gap-2 p-2.5 rounded-xl bg-navy-50 border border-navy-100">
                        <AlertCircle size={13} className="text-navy-500 mt-0.5 flex-shrink-0" />
                        <p className="text-[11px] text-navy-600 leading-relaxed">{t('form.public.message')}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-1">
                    <Label htmlFor="cr">{t('form.credits.label')}</Label>
                    <Select id="cr" value={form.creditsCount} onChange={e => update('creditsCount', e.target.value)} placeholder={lang === 'ar' ? 'اختر' : 'Sélectionnez'} options={[
                      { value: '1', label: t('form.credits.1') }, { value: '2', label: t('form.credits.2') }, { value: '3+', label: t('form.credits.3') },
                    ]} />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="pr">{t('form.pressure.label')}</Label>
                    <Select id="pr" value={form.pressureLevel} onChange={e => update('pressureLevel', e.target.value)} placeholder={lang === 'ar' ? 'اختر' : 'Sélectionnez'} options={[
                      { value: 'medium', label: t('form.pressure.medium') }, { value: 'high', label: t('form.pressure.high') }, { value: 'very_high', label: t('form.pressure.veryhigh') },
                    ]} />
                  </div>

                  <div className="space-y-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <Checkbox checked={form.consent} onChange={e => update('consent', e.target.checked)} className="mt-0.5" />
                      <span className="text-[11px] md:text-xs text-navy-600 leading-relaxed">{t('form.consent')}</span>
                    </label>
                    {errors.consent && <p className="text-[11px] text-red-500">{errors.consent}</p>}
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-red-50 border border-red-100">
                      <AlertCircle size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[11px] text-red-600">{submitError}</p>
                    </div>
                  )}

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <button type="submit" disabled={submitting || showPublicMessage}
                      className="w-full h-11 rounded-xl bg-gradient-to-br from-navy-700 to-navy-600 text-white text-sm font-bold shadow-md shadow-navy-700/15 hover:shadow-lg hover:shadow-navy-700/25 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                      {submitting ? <Loader2 size={16} className="animate-spin" /> : <>{t('form.submit')}<Send size={14} className={lang === 'ar' ? 'mr-1.5' : 'ml-1.5'} /></>}
                    </button>
                  </motion.div>

                  <p className="text-[11px] text-navy-400 text-center mt-2">
                    {t('form.trust')}
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
