export type Language = 'ar' | 'fr'

export const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Header
    'header.logo': 'مستشارك',
    'header.cta': 'استشارة مجانية',

    // Hero
    'hero.title.line1': 'كتغرق فـ القروض؟',
    'hero.title.line2': 'الراتب ما كيبقاش كافي؟',
    'hero.subtitle': 'حلول ذكية تساعدك تفهم وضعيتك المالية وتنظم أقساطك الشهرية بطريقة أوضح.',
    'hero.badge': 'خدمة مخصصة لموظفي القطاع العام بالمغرب',
    'hero.cta': 'اطلب استشارتك المجانية',

    // Form
    'form.title': 'اطلب استشارتك المجانية',
    'form.subtitle': 'عمّر معلوماتك وغادي يتاصل بك مستشار باش يشرح ليك الحلول الممكنة حسب وضعيتك.',
    'form.name': 'الاسم الكامل',
    'form.phone': 'رقم الهاتف',
    'form.city': 'المدينة',
    'form.public.label': 'هل تعمل في القطاع العام أو الوظيفة العمومية؟',
    'form.public.yes': 'نعم، أعمل في القطاع العام أو الوظيفة العمومية',
    'form.public.no': 'لا',
    'form.public.message': 'هذه الخدمة مخصصة حالياً لموظفي القطاع العام والوظيفة العمومية بالمغرب.',
    'form.credits.label': 'عدد القروض أو الأقساط الحالية',
    'form.credits.1': '1',
    'form.credits.2': '2',
    'form.credits.3': '3 أو أكثر',
    'form.pressure.label': 'مستوى الضغط المالي الشهري',
    'form.pressure.medium': 'متوسط',
    'form.pressure.high': 'مرتفع',
    'form.pressure.veryhigh': 'مرتفع جداً',
    'form.consent': 'أوافق على أن يتم التواصل معي عبر الهاتف بخصوص الاستشارة المجانية.',
    'form.submit': 'أرسل طلبي الآن',
    'form.phone.error': 'يرجى إدخال رقم هاتف مغربي صحيح',
    'form.success': 'تم إرسال طلبك بنجاح. غادي يتاصل بك مستشار قريباً.',
    'form.error': 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    'form.trust': 'استشارة أولى مجانية وبدون التزام',

    // Section 2 - Problem + Solution
    's2.title': 'المشكل واضح… والحل خاصو يكون أذكى',
    's2.text': 'إذا كانت الأقساط الشهرية كتضغط عليك، الاستشارة المجانية كتعاونك تفهم الحلول الممكنة حسب وضعيتك.',
    's2.card1': 'أقساط كثيرة',
    's2.card2': 'ضغط شهري',
    's2.card3': 'حاجة لتوجيه واضح',

    // Section 3 - How It Works
    's3.title': 'كيفاش كتعمل الخدمة؟',
    's3.step1.title': 'عمّر الطلب',
    's3.step1.desc': 'عمر المعلومات ديالك فـ الاستمارة',
    's3.step2.title': 'نراجعو المعلومات',
    's3.step2.desc': 'كتفرقنا فـ الفريق باش ندرسو الحالة',
    's3.step3.title': 'يتاصل بك مستشار',
    's3.step3.desc': 'واحد من لمستشارين كيتاصل بك',

    // Section 4 - Eligibility + Trust
    's4.title': 'خدمة موجهة لموظفي القطاع العام',
    's4.text': 'هذه الخدمة مخصصة لموظفي القطاع العام والوظيفة العمومية بالمغرب، اللي عندهم أقساط شهرية وباغين يفهمو الحلول الممكنة.',
    's4.trust1': 'استشارة أولى مجانية',
    's4.trust2': 'بدون التزام',
    's4.trust3': 'توجيه أولي واضح',
    's4.trust4': 'تواصل عبر الهاتف',

    // Section 5 - Final CTA
    's5.title': 'ما تخليش ضغط الأقساط يزيد عليك',
    's5.text': 'اطلب استشارتك المجانية اليوم.',
    's5.cta': 'ابدأ الآن',

    // Footer
    'footer.tagline': 'خدمة استشارية مخصصة لموظفي القطاع العام بالمغرب',
    'footer.disclaimer': 'هذه الخدمة لا تمثل وعداً بالموافقة أو تمويلاً مباشراً. كل حالة يتم دراستها حسب المعطيات المتوفرة.',
    'footer.area': 'المغرب',
    'footer.copyright': 'جميع الحقوق محفوظة',

    // SEO
    'seo.title': 'حلول ذكية لتنظيم القروض لموظفي القطاع العام بالمغرب',
    'seo.description': 'استشارة مجانية لموظفي القطاع العام بالمغرب لفهم الحلول الممكنة لتنظيم الأقساط الشهرية.',
  },
  fr: {
    'header.logo': 'Votre Conseil',
    'header.cta': 'Consultation gratuite',

    'hero.title.line1': 'Vos crédits deviennent difficiles à gérer ?',
    'hero.title.line2': 'Votre salaire ne suffit plus ?',
    'hero.subtitle': 'Des solutions intelligentes pour comprendre votre situation financière et mieux organiser vos mensualités.',
    'hero.badge': 'Service dédié aux employés du secteur public au Maroc',
    'hero.cta': 'Demander ma consultation gratuite',

    'form.title': 'Demandez votre consultation gratuite',
    'form.subtitle': 'Remplissez vos informations et un conseiller vous contactera pour vous expliquer les solutions possibles selon votre situation.',
    'form.name': 'Nom complet',
    'form.phone': 'Numéro de téléphone',
    'form.city': 'Ville',
    'form.public.label': 'Travaillez-vous dans le secteur public ou la fonction publique ?',
    'form.public.yes': 'Oui, je travaille dans le secteur public ou la fonction publique',
    'form.public.no': 'Non',
    'form.public.message': 'Ce service est actuellement dédié aux employés du secteur public et de la fonction publique au Maroc.',
    'form.credits.label': 'Nombre de crédits ou mensualités en cours',
    'form.credits.1': '1',
    'form.credits.2': '2',
    'form.credits.3': '3 ou plus',
    'form.pressure.label': 'Niveau de pression financière mensuelle',
    'form.pressure.medium': 'Moyen',
    'form.pressure.high': 'Élevé',
    'form.pressure.veryhigh': 'Très élevé',
    'form.consent': "J'accepte d'être contacté(e) par téléphone concernant la consultation gratuite.",
    'form.submit': 'Envoyer ma demande',
    'form.phone.error': 'Veuillez entrer un numéro marocain valide',
    'form.success': 'Votre demande a bien été envoyée. Un conseiller vous contactera prochainement.',
    'form.error': 'Une erreur est survenue. Veuillez réessayer.',
    'form.trust': 'Première consultation gratuite et sans engagement',

    's2.title': 'Le problème est clair… la solution doit être plus intelligente',
    's2.text': 'Si vos mensualités deviennent lourdes, la consultation gratuite vous aide à comprendre les solutions possibles selon votre situation.',
    's2.card1': 'Plusieurs mensualités',
    's2.card2': 'Pression mensuelle',
    's2.card3': "Besoin d'orientation claire",

    's3.title': 'Comment ça fonctionne ?',
    's3.step1.title': 'Remplissez la demande',
    's3.step1.desc': 'Complétez le formulaire en quelques instants',
    's3.step2.title': 'Nous étudions les informations',
    's3.step2.desc': 'Notre équipe analyse votre situation',
    's3.step3.title': 'Un conseiller vous contacte',
    's3.step3.desc': "L'un de nos conseillers vous appelle",

    's4.title': 'Un service dédié au secteur public',
    's4.text': 'Ce service est dédié aux employés du secteur public et de la fonction publique au Maroc qui souhaitent mieux comprendre les solutions possibles.',
    's4.trust1': 'Première consultation gratuite',
    's4.trust2': 'Sans engagement',
    's4.trust3': 'Orientation initiale claire',
    's4.trust4': 'Contact par téléphone',

    's5.title': "Ne laissez pas la pression des mensualités augmenter",
    's5.text': 'Demandez votre consultation gratuite aujourd\'hui.',
    's5.cta': 'Commencer maintenant',

    'footer.tagline': 'Service consultatif dédié aux employés du secteur public au Maroc',
    'footer.disclaimer': "Ce service ne constitue pas une promesse d'acceptation ni un financement direct. Chaque situation est étudiée selon les informations disponibles.",
    'footer.area': 'Maroc',
    'footer.copyright': 'Tous droits réservés',

    'seo.title': 'Solutions intelligentes pour organiser les crédits du secteur public au Maroc',
    'seo.description': 'Consultation gratuite pour les employés du secteur public au Maroc afin de mieux organiser les mensualités.',
  },
}

export const t = (lang: Language, key: string): string => translations[lang][key] || key
