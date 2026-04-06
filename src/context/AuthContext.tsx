import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountNumber: string;
  accounts: Account[];
}

export interface Account {
  id: string;
  label: string;
  type: 'courant' | 'epargne' | 'tontine' | 'pret';
  number: string;
  balance: number;
  currency: string;
  status: 'actif' | 'gelé' | 'en cours';
  openedDate: string;
  lastActivity: string;
}

export interface Transaction {
  id: string;
  label: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  transactions: Transaction[];
}

const mockUser: User = {
  id: '1',
  firstName: 'Aminata',
  lastName: 'Ouédraogo',
  email: 'aminata@email.com',
  phone: '+226 70 12 34 56',
  accountNumber: 'CMF-00248921',
  accounts: [
    { id: 'a1', label: 'Compte Courant', type: 'courant', number: 'CMF-4821-00192', balance: 1_250_000, currency: 'FCFA', status: 'actif', openedDate: '15 Jan. 2024', lastActivity: '01 Avr. 2026' },
    { id: 'a2', label: 'Épargne Classique', type: 'epargne', number: 'CMF-7703-00193', balance: 3_750_000, currency: 'FCFA', status: 'actif', openedDate: '15 Jan. 2024', lastActivity: '20 Mar. 2026' },
    { id: 'a3', label: 'Épargne Logement', type: 'epargne', number: 'CMF-2108-00194', balance: 8_500_000, currency: 'FCFA', status: 'actif', openedDate: '03 Jun. 2024', lastActivity: '01 Mar. 2026' },
    { id: 'a4', label: 'Compte Tontine', type: 'tontine', number: 'CMF-5590-00195', balance: 620_000, currency: 'FCFA', status: 'actif', openedDate: '10 Sep. 2025', lastActivity: '28 Mar. 2026' },
  ],
};

const mockTransactions: Transaction[] = [
  { id: 't1', label: 'Salaire Mars 2026', amount: 450_000, date: '01 Avr. 2026', type: 'credit', category: 'Salaire' },
  { id: 't2', label: 'Paiement SONABEL', amount: -18_500, date: '30 Mar. 2026', type: 'debit', category: 'Facture' },
  { id: 't3', label: 'Virement reçu — Koné I.', amount: 75_000, date: '28 Mar. 2026', type: 'credit', category: 'Virement' },
  { id: 't4', label: 'Retrait GAB Ouaga 2000', amount: -50_000, date: '27 Mar. 2026', type: 'debit', category: 'Retrait' },
  { id: 't5', label: 'Orange Money — Envoi', amount: -25_000, date: '26 Mar. 2026', type: 'debit', category: 'Mobile Money' },
  { id: 't6', label: 'Paiement ONEA', amount: -8_200, date: '25 Mar. 2026', type: 'debit', category: 'Facture' },
  { id: 't7', label: 'Dépôt espèces', amount: 200_000, date: '24 Mar. 2026', type: 'credit', category: 'Dépôt' },
  { id: 't8', label: 'Achat POS — Marina Market', amount: -32_000, date: '23 Mar. 2026', type: 'debit', category: 'Achat' },
  { id: 't9', label: 'Recharge Moov', amount: -5_000, date: '22 Mar. 2026', type: 'debit', category: 'Télécom' },
  { id: 't10', label: 'Intérêts épargne T1', amount: 32_800, date: '20 Mar. 2026', type: 'credit', category: 'Intérêts' },
];

const AuthContext = createContext<AuthContextType | null>(null);

/** Mot de passe attendu pour la démo / connexion mock. */
const LOGIN_PASSWORD = 'Box@fric@2024';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    if (email && password === LOGIN_PASSWORD) {
      setUser({ ...mockUser, email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, transactions: mockTransactions }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
