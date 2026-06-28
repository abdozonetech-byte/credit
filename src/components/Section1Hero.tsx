import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Loader2,
  Search,
  Send,
  Shield,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { submitLead, trackMetaLead } from '../services/leadService'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Select } from './ui/select'

interface FormData {
  fullName: string
  phone: string
  age: string
  city: string
  publicSectorConfirmed: boolean
  currentCreditInstitutions: string[]
  otherSelected: boolean
  otherInstitutionName: string
  creditsCount: string
  pressureLevel: string
}

const initialForm: FormData = {
  fullName: '',
  phone: '',
  age: '',
  city: '',
  publicSectorConfirmed: false,
  currentCreditInstitutions: [],
  otherSelected: false,
  otherInstitutionName: '',
  creditsCount: '',
  pressureLevel: '',
}

const moroccanCities = [
  'Casablanca',
  'Rabat',
  'Salé',
  'Marrakech',
  'Fès',
  'Meknès',
  'Tanger',
  'Agadir',
  'Oujda',
  'Tétouan',
  'Nador',
  'El Jadida',
  'Khouribga',
  'Béni Mellal',
  'Kénitra',
  'Settat',
  'Mohammedia',
  'Taza',
  'Safi',
  'Laâyoune',
  'Dakhla',
  'Autre',
]

type FormErrors = Partial<Record<keyof FormData, string>>

export default function Section1Hero() {
  const { t, lang, dir } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [institutionSelectorOpen, setInstitutionSelectorOpen] = useState(false)
  const [institutionSearch, setInstitutionSearch] = useState('')
  const [draftInstitutions, setDraftInstitutions] = useState<string[]>([])
  const [draftOtherSelected, setDraftOtherSelected] = useState(false)
  const [draftOtherName, setDraftOtherName] = useState('')
  const selectorPanelRef = useRef<HTMLDivElement>(null)
  const selectorTriggerRef = useRef<HTMLButtonElement>(null)
  const institutionSearchRef = useRef<HTMLInputElement>(null)

  const financingInstitutions = [
    'Wafasalaf',
    'Eqdom',
    'Salafin',
    'Sofac',
    'AXA Crédit',
    'Saham Leasing',
  ]

  const banks = [
    'Attijariwafa Bank',
    'CIH Bank',
    'Banque Populaire',
    'Bank of Africa',
    'Crédit Agricole du Maroc',
    'Crédit du Maroc',
    'BMCI',
    'Al Barid Bank',
    'CFG Bank',
    'Saham Bank',
  ]

  const selectedInstitutionLabels = [
    ...form.currentCreditInstitutions,
    ...(form.otherSelected ? [form.otherInstitutionName.trim() || t('form.other')] : []),
  ]
  const selectedInstitutionsCount = selectedInstitutionLabels.length
  const selectedInstitutionsText = selectedInstitutionsCount === 0
    ? lang === 'ar' ? 'اختر مؤسسة أو أكثر' : 'Sélectionnez un ou plusieurs organismes'
    : selectedInstitutionsCount <= 2
      ? selectedInstitutionLabels.map((label) => `✓ ${label}`).join('  ')
      : lang === 'ar'
        ? `تم اختيار ${selectedInstitutionsCount} مؤسسات`
        : `${selectedInstitutionsCount} organismes sélectionnés`
  const normalizedInstitutionSearch = institutionSearch.trim().toLowerCase()
  const filteredFinancingInstitutions = financingInstitutions.filter((institution) => {
    if (!normalizedInstitutionSearch) return true
    return institution.toLowerCase().includes(normalizedInstitutionSearch) || t('form.financingGroup').toLowerCase().includes(normalizedInstitutionSearch)
  })
  const filteredBanks = banks.filter((bank) => {
    if (!normalizedInstitutionSearch) return true
    const bankAliases = `${t('form.banksGroup')} Banque Bank Banks البنوك`.toLowerCase()
    return bank.toLowerCase().includes(normalizedInstitutionSearch) || bankAliases.includes(normalizedInstitutionSearch)
  })
  const showOtherInstitution = !normalizedInstitutionSearch || `${t('form.other')} Autre Other أخرى`.toLowerCase().includes(normalizedInstitutionSearch)
  const hasInstitutionResults = filteredFinancingInstitutions.length > 0 || filteredBanks.length > 0 || showOtherInstitution

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((previous) => ({ ...previous, [field]: value }))
    if (errors[field]) {
      setErrors((previous) => {
        const next = { ...previous }
        delete next[field]
        return next
      })
    }
  }

  const clearInstitutionError = () => {
    if (errors.currentCreditInstitutions) {
      setErrors((previous) => {
        const next = { ...previous }
        delete next.currentCreditInstitutions
        return next
      })
    }
  }

  const openInstitutionSelector = () => {
    setDraftInstitutions(form.currentCreditInstitutions)
    setDraftOtherSelected(form.otherSelected)
    setDraftOtherName(form.otherInstitutionName)
    setInstitutionSearch('')
    setInstitutionSelectorOpen(true)
  }

  const closeInstitutionSelector = () => {
    setInstitutionSelectorOpen(false)
    setInstitutionSearch('')
    window.setTimeout(() => selectorTriggerRef.current?.focus(), 0)
  }

  const confirmInstitutionSelector = () => {
    setForm((previous) => ({
      ...previous,
      currentCreditInstitutions: draftInstitutions,
      otherSelected: draftOtherSelected,
      otherInstitutionName: draftOtherSelected ? draftOtherName : '',
    }))
    clearInstitutionError()
    closeInstitutionSelector()
  }

  const toggleDraftInstitution = (name: string) => {
    setDraftInstitutions((previous) => previous.includes(name)
      ? previous.filter((item) => item !== name)
      : [...previous, name]
    )
  }

  const toggleDraftOther = () => {
    setDraftOtherSelected((previous) => {
      if (previous) setDraftOtherName('')
      return !previous
    })
  }

  useEffect(() => {
    if (!institutionSelectorOpen) return

    window.setTimeout(() => institutionSearchRef.current?.focus(), 0)

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (selectorPanelRef.current?.contains(target) || selectorTriggerRef.current?.contains(target)) return
      closeInstitutionSelector()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeInstitutionSelector()
        return
      }

      if (event.key !== 'Tab' || !selectorPanelRef.current) return

      const focusable = selectorPanelRef.current.querySelectorAll<HTMLElement>(
        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [institutionSelectorOpen])

  const buildCurrentCreditInstitutions = () => {
    const selected = [...form.currentCreditInstitutions]
    if (form.otherSelected) {
      const other = form.otherInstitutionName.trim()
      selected.push(other ? `Autre: ${other}` : 'Autre')
    }
    return selected
  }

  const validate = () => {
    const nextErrors: FormErrors = {}
    const ageNumber = Number(form.age)

    if (!form.fullName.trim()) nextErrors.fullName = lang === 'ar' ? 'مطلوب' : 'Requis'
    if (!form.phone.trim()) nextErrors.phone = lang === 'ar' ? 'مطلوب' : 'Requis'
    else if (!/^(?:(?:\+212|0)(?:[5-7]\d{8}))$/.test(form.phone.replace(/\s+/g, ''))) {
      nextErrors.phone = t('form.phone.error')
    }
    if (!form.age.trim() || !Number.isFinite(ageNumber) || ageNumber < 18 || ageNumber > 65) {
      nextErrors.age = t('form.age.error')
    }
    if (!form.city.trim()) nextErrors.city = lang === 'ar' ? 'مطلوب' : 'Requis'
    if (buildCurrentCreditInstitutions().length === 0) nextErrors.currentCreditInstitutions = t('form.institutions.error')
    if (!form.pressureLevel) nextErrors.pressureLevel = lang === 'ar' ? 'مطلوب' : 'Requis'
    if (!form.creditsCount) nextErrors.creditsCount = lang === 'ar' ? 'مطلوب' : 'Requis'
    if (!form.publicSectorConfirmed) nextErrors.publicSectorConfirmed = t('form.public.required')

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      const ok = await submitLead({
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        age: Number(form.age),
        city: form.city.trim(),
        currentCreditInstitutions: buildCurrentCreditInstitutions(),
        publicSectorConfirmed: form.publicSectorConfirmed,
        creditsCount: form.creditsCount,
        pressureLevel: form.pressureLevel,
        language: lang,
      })
      if (ok) {
        setSuccess(true)
        trackMetaLead()
      } else {
        setSubmitError(t('form.error'))
      }
    } catch {
      setSubmitError(t('form.error'))
    } finally {
      setSubmitting(false)
    }
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
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden bg-gradient-to-br from-surface via-surface-alt to-surface pt-20 pb-8 md:pt-24 md:pb-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-[25%] -right-[15%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-teal-500/8 to-navy-500/5 blur-3xl" />
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -bottom-[20%] -left-[15%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-gold-500/5 to-teal-500/4 blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start min-h-[80vh] pt-2 md:pt-4">
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-gradient-to-br from-navy-700 to-navy-600 text-white text-sm font-bold shadow-lg shadow-navy-700/20 hover:shadow-xl hover:shadow-navy-700/30 transition-all mb-5 md:mb-0"
              >
                {t('hero.cta')}
                <ArrowLeft size={16} className={dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'} />
              </motion.button>
            </motion.div>

            <div className="hidden md:block relative h-[340px] mt-4">
              {cards.map((card, index) => {
                const Icon = card.icon
                const style: Record<string, string> = {
                  position: 'absolute',
                  top: card.top,
                  width: '155px',
                  height: '85px',
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  zIndex: '3',
                }
                style[dir === 'rtl' ? card.start ? 'right' : 'left' : card.start ? 'left' : 'right'] = card.start || card.end || '5%'
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + card.delay }}
                    className={`absolute rounded-2xl flex flex-col items-center justify-center shadow-lg border backdrop-blur-sm ${
                      card.gold ? 'bg-gradient-to-br from-gold-500 to-gold-400 text-white border-white/10'
                        : card.dark ? 'bg-gradient-to-br from-navy-700 to-navy-600 text-white border-white/10'
                          : 'bg-white/80 backdrop-blur-md text-navy-700 border-white/80'
                    }`}
                    style={style}
                  >
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }} className="flex flex-col items-center">
                      <Icon size={20} className={`mb-0.5 ${card.dark || card.gold ? 'text-white/90' : 'text-teal-500'}`} />
                      <span className={`text-[11px] font-bold ${card.dark || card.gold ? 'text-white' : 'text-navy-700'}`}>{card.label}</span>
                      <span className={`text-[10px] ${card.dark || card.gold ? 'text-white/70' : 'text-navy-400'}`}>{card.sub}</span>
                    </motion.div>
                  </motion.div>
                )
              })}
              <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.2 }} className="absolute top-[38%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white/90 shadow-lg border border-white/70 flex items-center justify-center z-10">
                <Shield size={28} className="text-teal-500" />
              </motion.div>
            </div>
          </div>

          <div id="lead-form" className="order-2 md:sticky md:top-24">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="p-5 md:p-6 rounded-[1.4rem] bg-white/85 backdrop-blur-xl border border-white/90 shadow-xl shadow-navy-900/5">
                <h2 className="text-base md:text-lg font-extrabold text-navy-800 text-center mb-1">{t('form.title')}</h2>
                <p className="text-xs md:text-sm text-navy-500 text-center mb-5 leading-relaxed">{t('form.subtitle')}</p>

                <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2" noValidate>
                  <Field error={errors.fullName}>
                    <Label htmlFor="fn">{t('form.name')}</Label>
                    <Input id="fn" value={form.fullName} onChange={(event) => update('fullName', event.target.value)} placeholder={t('form.name')} autoComplete="name" className="shadow-sm focus:shadow-md focus:shadow-teal-500/10" />
                  </Field>

                  <Field error={errors.phone}>
                    <Label htmlFor="ph">{t('form.phone')}</Label>
                    <Input id="ph" value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="06XXXXXXXX" autoComplete="tel" dir="ltr" className={`${lang === 'ar' ? 'text-right' : 'text-left'} shadow-sm focus:shadow-md focus:shadow-teal-500/10`} />
                  </Field>

                  <Field error={errors.age}>
                    <Label htmlFor="age">{t('form.age')}</Label>
                    <Input id="age" type="number" min="18" max="65" value={form.age} onChange={(event) => update('age', event.target.value)} placeholder={t('form.age.placeholder')} inputMode="numeric" className="shadow-sm focus:shadow-md focus:shadow-teal-500/10" />
                  </Field>

                  <Field error={errors.city}>
                    <Label htmlFor="city">{t('form.city')}</Label>
                    <Input id="city" list="moroccan-cities" value={form.city} onChange={(event) => update('city', event.target.value)} placeholder={t('form.city.placeholder')} autoComplete="address-level2" className="shadow-sm focus:shadow-md focus:shadow-teal-500/10" />
                    <datalist id="moroccan-cities">
                      {moroccanCities.map((city) => <option key={city} value={city} />)}
                    </datalist>
                  </Field>

                  <div className="md:col-span-2 space-y-3 pt-1">
                    <div className="space-y-1">
                      <Label>{t('form.institutions')}</Label>
                      <p className="text-[11px] font-medium text-navy-400">{t('form.institutions.helper')}</p>
                    </div>

                    <div className="relative">
                      <button
                        ref={selectorTriggerRef}
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded={institutionSelectorOpen}
                        onClick={openInstitutionSelector}
                        className={`flex h-12 w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 text-start text-sm shadow-sm transition-all duration-200 hover:border-teal-400 hover:shadow-md hover:shadow-teal-500/10 focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                          errors.currentCreditInstitutions ? 'border-red-200' : 'border-navy-200/60'
                        }`}
                      >
                        <span className={`min-w-0 flex-1 truncate font-bold ${selectedInstitutionsCount ? 'text-navy-800' : 'text-navy-300'}`}>
                          {selectedInstitutionsText}
                        </span>
                        <ChevronDown size={16} className={`flex-shrink-0 text-navy-400 transition-transform duration-200 ${institutionSelectorOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {institutionSelectorOpen && (
                          <>
                            <motion.button
                              type="button"
                              aria-label={lang === 'ar' ? 'إغلاق' : 'Fermer'}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={closeInstitutionSelector}
                              className="fixed inset-0 z-40 bg-navy-900/10 backdrop-blur-[2px] md:hidden"
                            />
                            <motion.div
                              ref={selectorPanelRef}
                              role="dialog"
                              aria-modal="true"
                              aria-label={t('form.institutions')}
                              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 4 }}
                              transition={{ duration: 0.16, ease: 'easeOut' }}
                              className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(78vh,400px)] flex-col rounded-[1.35rem] border border-white/80 bg-white/95 p-3 shadow-2xl shadow-navy-900/20 backdrop-blur-xl md:absolute md:inset-x-0 md:bottom-auto md:top-[calc(100%+0.5rem)] md:max-h-[390px]"
                            >
                              <div className="relative mb-2">
                                <Search size={15} className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-navy-300 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
                                <Input
                                  ref={institutionSearchRef}
                                  value={institutionSearch}
                                  onChange={(event) => setInstitutionSearch(event.target.value)}
                                  placeholder={lang === 'ar' ? 'بحث...' : 'Rechercher...'}
                                  className={`${dir === 'rtl' ? 'pr-9' : 'pl-9'} h-10 rounded-xl text-xs shadow-none`}
                                />
                              </div>

                              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pe-1">
                                {filteredFinancingInstitutions.length > 0 && (
                                  <InstitutionSection title={t('form.financingGroup')}>
                                    {filteredFinancingInstitutions.map((institution) => (
                                      <InstitutionOption
                                        key={institution}
                                        label={institution}
                                        checked={draftInstitutions.includes(institution)}
                                        onChange={() => toggleDraftInstitution(institution)}
                                      />
                                    ))}
                                  </InstitutionSection>
                                )}

                                {filteredBanks.length > 0 && (
                                  <InstitutionSection title={t('form.banksGroup')}>
                                    {filteredBanks.map((bank) => (
                                      <InstitutionOption
                                        key={bank}
                                        label={bank}
                                        checked={draftInstitutions.includes(bank)}
                                        onChange={() => toggleDraftInstitution(bank)}
                                      />
                                    ))}
                                  </InstitutionSection>
                                )}

                                {showOtherInstitution && (
                                  <InstitutionSection title={t('form.other')}>
                                    <InstitutionOption
                                      label={t('form.other')}
                                      checked={draftOtherSelected}
                                      onChange={toggleDraftOther}
                                    />
                                    <AnimatePresence>
                                      {draftOtherSelected && (
                                        <motion.div
                                          initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                                          transition={{ duration: 0.14, ease: 'easeOut' }}
                                          className="pt-1"
                                        >
                                          <Input
                                            value={draftOtherName}
                                            onChange={(event) => setDraftOtherName(event.target.value)}
                                            placeholder={t('form.other.placeholder')}
                                            className="h-10 rounded-xl text-xs shadow-none focus:shadow-md focus:shadow-[#C1272D]/10"
                                          />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </InstitutionSection>
                                )}

                                {!hasInstitutionResults && (
                                  <div className="rounded-xl border border-navy-100 bg-surface/60 px-3 py-4 text-center text-xs font-bold text-navy-400">
                                    {lang === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
                                  </div>
                                )}
                              </div>

                              <div className="mt-3 flex items-center gap-2 border-t border-navy-100/70 pt-3">
                                <button
                                  type="button"
                                  onClick={closeInstitutionSelector}
                                  className="h-10 flex-1 rounded-xl border border-navy-100 bg-white text-xs font-extrabold text-navy-500 transition-all hover:bg-surface hover:text-navy-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                >
                                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                                </button>
                                <button
                                  type="button"
                                  onClick={confirmInstitutionSelector}
                                  className="h-10 flex-1 rounded-xl bg-gradient-to-br from-navy-700 to-navy-600 text-xs font-extrabold text-white shadow-md shadow-navy-700/15 transition-all hover:shadow-lg hover:shadow-navy-700/25 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                >
                                  {lang === 'ar' ? 'تأكيد' : 'Confirmer'}
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    {errors.currentCreditInstitutions && <p className="text-[11px] text-red-500">{errors.currentCreditInstitutions}</p>}
                  </div>

                  <Field error={errors.pressureLevel} className="mt-1">
                    <Label htmlFor="pr">{t('form.pressure.label')}</Label>
                    <Select id="pr" value={form.pressureLevel} onChange={(event) => update('pressureLevel', event.target.value)} placeholder={lang === 'ar' ? 'اختر' : 'Sélectionnez'} options={[
                      { value: 'medium', label: t('form.pressure.medium') },
                      { value: 'high', label: t('form.pressure.high') },
                      { value: 'very_high', label: t('form.pressure.veryhigh') },
                    ]} />
                  </Field>

                  <Field error={errors.creditsCount} className="mt-1">
                    <Label htmlFor="cr">{t('form.credits.label')}</Label>
                    <Select id="cr" value={form.creditsCount} onChange={(event) => update('creditsCount', event.target.value)} placeholder={lang === 'ar' ? 'اختر' : 'Sélectionnez'} options={[
                      { value: '1', label: t('form.credits.1') },
                      { value: '2', label: t('form.credits.2') },
                      { value: '3+', label: t('form.credits.3') },
                    ]} />
                  </Field>

                  <div className="space-y-1 md:col-span-2">
                    <label className="flex items-start gap-2.5 cursor-pointer rounded-xl border border-navy-100/70 bg-surface/70 p-3 transition-colors hover:bg-white">
                      <Checkbox checked={form.publicSectorConfirmed} onChange={(event) => update('publicSectorConfirmed', event.target.checked)} className="mt-0.5" />
                      <span className="text-[11px] md:text-xs text-navy-600 leading-relaxed">{t('form.public.confirm')}</span>
                    </label>
                    {!form.publicSectorConfirmed && <p className="text-[11px] text-navy-400">{t('form.public.required')}</p>}
                  </div>

                  {submitError && (
                    <div className="md:col-span-2 flex items-start gap-2 p-2.5 rounded-xl bg-red-50 border border-red-100">
                      <AlertCircle size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[11px] text-red-600">{submitError}</p>
                    </div>
                  )}

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting || !form.publicSectorConfirmed}
                      className="w-full h-12 rounded-xl bg-gradient-to-br from-navy-700 to-navy-600 text-white text-sm font-extrabold shadow-lg shadow-navy-700/15 hover:shadow-xl hover:shadow-navy-700/25 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                      {submitting ? <Loader2 size={16} className="animate-spin" /> : <>{t('form.submit')}<Send size={14} className={lang === 'ar' ? 'mr-1.5' : 'ml-1.5'} /></>}
                    </button>
                  </motion.div>

                  <p className="md:col-span-2 text-[11px] text-navy-400 text-center mt-1">
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

function Field({ children, error, className = '' }: { children: ReactNode; error?: string; className?: string }) {
  return (
    <div className={`space-y-1 ${className}`}>
      {children}
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  )
}

function InstitutionSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="px-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-navy-400">
        {title}
      </p>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  )
}

function InstitutionOption({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label
      className={`group flex min-h-10 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
        checked
          ? 'border-teal-300 bg-teal-50/65 text-navy-800 shadow-sm shadow-teal-500/10'
          : 'border-transparent bg-white text-navy-600 hover:border-navy-100 hover:bg-surface/70'
      }`}
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded-md border-navy-300 accent-teal-500"
      />
      <span className="min-w-0 flex-1 truncate text-[12px] font-bold leading-relaxed">
        {label}
      </span>
      <AnimatePresence>
        {checked && (
          <motion.span
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.65 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="text-teal-500"
          >
            <CheckCircle2 size={14} />
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}
