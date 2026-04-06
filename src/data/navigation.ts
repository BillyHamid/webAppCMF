export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    label: 'Particulier',
    href: '/particulier',
    children: [
      {
        label: "Comptes d'épargne",
        href: '/particulier/epargne',
      },
      {
        label: 'Comptes courants',
        href: '/particulier/courant',
      },
      {
        label: 'Banque digitale',
        href: '/particulier/digital',
      },
      {
        label: 'Cartes bancaires',
        href: '/particulier/cartes',
      },
      {
        label: "Transferts d'argent",
        href: '/particulier/transferts',
      },
      {
        label: 'Prêts & Crédits',
        href: '/particulier/prets',
      },
    ],
  },
  {
    label: 'Entreprise',
    href: '/entreprise',
  },
  {
    label: 'Actualités',
    href: '/actualites',
  },
  {
    label: 'À propos',
    href: '/a-propos',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const countries = [
  'Burkina Faso', 'Bénin', 'Cameroun', 'Tchad', 'RDC',
  "Côte d'Ivoire", 'Gabon', 'Ghana', 'Guinée', 'Kenya',
  'Mali', 'Niger', 'Sénégal', 'Togo',
];
