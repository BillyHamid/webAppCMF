export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  accent: string;
  /**
   * Image de fond (déposée dans `public/hero/`), fusionnée avec les couleurs Coris dans le HeroSlider.
   * Ex. `/hero/slide-1.png` — si absent ou erreur de chargement, le dégradé seul s’affiche.
   */
  image?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'L’épargne qui vous ressemble',
    subtitle:
      'Épargne Seya : des taux compétitifs et un accompagnement proche de vos projets, pour la solution PME et au-delà.',
    cta: { label: 'Découvrir l’épargne', href: '/particulier/epargne' },
    secondaryCta: { label: 'Nos services', href: '/particulier' },
    accent: 'blue',
    image: '/hero/slide-1.png',
  },
  {
    id: 2,
    title: 'Épargne Yoondo',
    subtitle:
      'Pour sécuriser le fruit de vos nombreux sacrifices — une épargne claire, avec l’expertise Coris Meso Finance.',
    cta: { label: 'En savoir plus', href: '/particulier/epargne' },
    accent: 'red',
    image: '/hero/slide-2.png',
  },
  {
    id: 3,
    title: 'Faites fructifier votre argent',
    subtitle:
      'Cultivez la croissance de votre patrimoine avec des solutions d’épargne pensées pour vos objectifs.',
    cta: { label: 'Nos offres', href: '/particulier/epargne' },
    secondaryCta: { label: 'Banque digitale', href: '/particulier/digital' },
    accent: 'blue',
    image: '/hero/slide-3.png',
  },
  {
    id: 4,
    title: 'L’avenir de votre enfant commence maintenant',
    subtitle:
      'Épargne et sérénité : des produits adaptés aux familles, avec l’engagement Coris Meso Finance à vos côtés.',
    cta: { label: 'Nous contacter', href: '/contact' },
    accent: 'red',
    image: '/hero/slide-4.png',
  },
];

export interface BankingOffer {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export const bankingOffers: BankingOffer[] = [
  {
    icon: 'UserPlus',
    title: 'Ouvrir un compte',
    description: "Démarrez en quelques minutes avec un dépôt dès 1 000 FCFA.",
    href: '/particulier/epargne',
  },
  {
    icon: 'CreditCard',
    title: 'Cartes bancaires',
    description: 'VISA Classic, Gold et prépayées pour toutes vos transactions.',
    href: '/particulier/cartes',
  },
  {
    icon: 'Smartphone',
    title: 'Banque mobile',
    description: "Vos comptes dans votre poche, accessibles à tout moment.",
    href: '/particulier/digital/mobile',
  },
  {
    icon: 'ArrowLeftRight',
    title: 'Transferts',
    description: "Envoyez et recevez de l'argent partout dans le monde.",
    href: '/particulier/transferts',
  },
  {
    icon: 'Landmark',
    title: 'Prêts & Crédits',
    description: "Des financements adaptés à vos projets personnels et professionnels.",
    href: '/particulier/prets',
  },
];

export interface SolutionTab {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  features: string[];
}

export const solutionTabs: SolutionTab[] = [
  {
    id: 'digital',
    title: 'Solutions digitales',
    description: "Effectuez vos opérations bancaires depuis n'importe quel appareil. Application mobile intuitive, Internet Banking sécurisé, alertes en temps réel.",
    href: '/particulier/digital',
    icon: 'Monitor',
    features: ['App mobile iOS & Android', 'Internet Banking 24h/24', 'Alertes SMS & Email', 'Paiement de factures'],
  },
  {
    id: 'cards',
    title: 'Cartes bancaires',
    description: "Payez en toute sécurité chez plus de 2 millions de marchands dans le monde. Retirez aux GAB et effectuez vos achats en ligne.",
    href: '/particulier/cartes',
    icon: 'CreditCard',
    features: ['VISA Classic & Gold', 'Cartes prépayées', 'Paiement sans contact', 'Plafonds personnalisables'],
  },
  {
    id: 'payments',
    title: 'Paiements',
    description: "Payez vos factures, transférez des fonds et gérez vos finances grâce à nos technologies de paiement modernes.",
    href: '/entreprise',
    icon: 'Wallet',
    features: ['TPE pour commerçants', 'Paiement en ligne', 'Mobile Money', 'QR Code'],
  },
  {
    id: 'security',
    title: 'Sécurité',
    description: "Vos données et vos transactions sont protégées par les standards de sécurité les plus élevés. Ne divulguez jamais vos identifiants.",
    href: '/contact',
    icon: 'ShieldCheck',
    features: ['Chiffrement avancé', 'Authentification OTP', 'Alertes de sécurité', 'Protection anti-fraude'],
  },
];

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Coris Meso Finance lance sa nouvelle application mobile',
    excerpt: "Une interface repensée pour une expérience bancaire encore plus fluide et sécurisée sur smartphone.",
    date: '21 Mars 2026',
    category: 'Innovation',
    slug: 'nouvelle-app-mobile',
  },
  {
    id: 2,
    title: "Programme d'inclusion financière : bilan et perspectives",
    excerpt: "Retour sur les initiatives de Coris Meso Finance pour bancariser les populations rurales du Burkina.",
    date: '15 Février 2026',
    category: 'Engagement',
    slug: 'inclusion-financiere',
  },
  {
    id: 3,
    title: 'Partenariat stratégique pour le financement des PME',
    excerpt: "Un nouvel accord pour faciliter l'accès au crédit des petites et moyennes entreprises burkinabè.",
    date: '8 Janvier 2026',
    category: 'Partenariat',
    slug: 'financement-pme',
  },
];
