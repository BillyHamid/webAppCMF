export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  accent: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'La meso finance au service de votre avenir',
    subtitle: 'Coris Meso Finance vous accompagne dans tous vos projets avec des solutions financières accessibles et innovantes.',
    cta: { label: 'Ouvrir un compte', href: '/particulier/epargne' },
    secondaryCta: { label: 'Nos services', href: '/particulier' },
    accent: 'blue',
  },
  {
    id: 2,
    title: 'Votre crédit en 72 heures',
    subtitle: 'Salariés et retraités, obtenez votre prêt rapidement avec des conditions avantageuses et un accompagnement personnalisé.',
    cta: { label: 'Simuler un prêt', href: '/particulier/prets' },
    accent: 'red',
  },
  {
    id: 3,
    title: 'Banque digitale, sans limites',
    subtitle: 'Gérez vos finances 24h/24 depuis votre smartphone. Virements, paiements, consultations — tout en un clic.',
    cta: { label: 'Découvrir', href: '/particulier/digital' },
    secondaryCta: { label: 'Se connecter', href: '/internet-banking' },
    accent: 'blue',
  },
  {
    id: 4,
    title: 'Ensemble, construisons le Burkina',
    subtitle: "Entrepreneurs, commerçants, agriculteurs : des solutions de financement adaptées à chaque ambition.",
    cta: { label: 'Solutions entreprise', href: '/entreprise' },
    accent: 'red',
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
    href: '/particulier/transfert',
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
    href: '/particulier/cartes/choisir',
    icon: 'CreditCard',
    features: ['VISA Classic & Gold', 'Cartes prépayées', 'Paiement sans contact', 'Plafonds personnalisables'],
  },
  {
    id: 'payments',
    title: 'Paiements',
    description: "Payez vos factures, transférez des fonds et gérez vos finances grâce à nos technologies de paiement modernes.",
    href: '/entreprise/solutions-digitales',
    icon: 'Wallet',
    features: ['TPE pour commerçants', 'Paiement en ligne', 'Mobile Money', 'QR Code'],
  },
  {
    id: 'security',
    title: 'Sécurité',
    description: "Vos données et vos transactions sont protégées par les standards de sécurité les plus élevés. Ne divulguez jamais vos identifiants.",
    href: '/contact/assistance',
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
