import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { computeMonthlyPayment } from '../lib/amortization';

const STORAGE_KEY = 'cmf-dashboard-finance-v1';

export interface BudgetCategory {
  id: string;
  name: string;
  budget: number;
  color: string;
}

export interface LedgerEntry {
  id: string;
  date: string;
  label: string;
  amount: number;
  kind: 'income' | 'expense';
  categoryId?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

export type CreditApplicationStatus = 'en_cours' | 'acceptee' | 'refusee';

export interface CreditApplication {
  id: string;
  ref: string;
  createdAt: string;
  status: CreditApplicationStatus;
  creditTypeId: string;
  creditTypeName: string;
  amount: number;
  months: number;
  rate: number;
  monthlyPayment: number;
  totalInterest: number;
  purpose: string;
  monthlyIncome: string;
  profession: string;
  phone: string;
  email: string;
}

interface DashboardFinanceState {
  categories: BudgetCategory[];
  ledger: LedgerEntry[];
  goals: SavingsGoal[];
  creditApplications: CreditApplication[];
}

const DEFAULT_CATEGORIES: BudgetCategory[] = [
  { id: 'c1', name: 'Alimentation', budget: 200_000, color: 'bg-coris-blue' },
  { id: 'c2', name: 'Transport', budget: 80_000, color: 'bg-emerald-500' },
  { id: 'c3', name: 'Logement', budget: 150_000, color: 'bg-amber-500' },
  { id: 'c4', name: 'Loisirs', budget: 50_000, color: 'bg-purple-500' },
  { id: 'c5', name: 'Santé', budget: 40_000, color: 'bg-rose-500' },
];

function defaultLedger(): LedgerEntry[] {
  const y = new Date().getFullYear();
  const m = String(new Date().getMonth() + 1).padStart(2, '0');
  const d = String(new Date().getDate()).padStart(2, '0');
  const today = `${y}-${m}-${d}`;
  return [
    {
      id: 'l1',
      date: today,
      label: 'Salaire',
      amount: 450_000,
      kind: 'income',
    },
    {
      id: 'l2',
      date: today,
      label: 'Courses Marina Market',
      amount: 32_000,
      kind: 'expense',
      categoryId: 'c1',
    },
    {
      id: 'l3',
      date: today,
      label: 'SONABEL',
      amount: 18_500,
      kind: 'expense',
      categoryId: 'c3',
    },
  ];
}

const DEFAULT_GOALS: SavingsGoal[] = [
  { id: 'g1', name: "Fonds d'urgence", target: 2_000_000, current: 1_250_000, deadline: '2026-12' },
  { id: 'g2', name: 'Voyage famille', target: 800_000, current: 320_000, deadline: '2026-08' },
  { id: 'g3', name: 'Apport logement', target: 5_000_000, current: 2_100_000, deadline: '2028-01' },
];

const defaultState: DashboardFinanceState = {
  categories: DEFAULT_CATEGORIES,
  ledger: defaultLedger(),
  goals: DEFAULT_GOALS,
  creditApplications: [],
};

function loadState(): DashboardFinanceState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<DashboardFinanceState>;
    return {
      categories: parsed.categories?.length ? parsed.categories : defaultState.categories,
      ledger: parsed.ledger?.length ? parsed.ledger : defaultState.ledger,
      goals: parsed.goals?.length ? parsed.goals : defaultState.goals,
      creditApplications: parsed.creditApplications ?? [],
    };
  } catch {
    return defaultState;
  }
}

function saveState(state: DashboardFinanceState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function monthKey(isoDate: string): string {
  return isoDate.slice(0, 7);
}

interface DashboardFinanceContextType extends DashboardFinanceState {
  addCategory: (name: string, budget: number, color: string) => void;
  updateCategory: (id: string, patch: Partial<Pick<BudgetCategory, 'name' | 'budget'>>) => void;
  removeCategory: (id: string) => void;
  addLedgerEntry: (entry: Omit<LedgerEntry, 'id'>) => void;
  removeLedgerEntry: (id: string) => void;
  addGoal: (g: Omit<SavingsGoal, 'id'>) => void;
  updateGoal: (id: string, patch: Partial<SavingsGoal>) => void;
  removeGoal: (id: string) => void;
  submitCreditApplication: (input: {
    creditTypeId: string;
    creditTypeName: string;
    amount: number;
    months: number;
    rate: number;
    purpose: string;
    monthlyIncome: string;
    profession: string;
    phone: string;
    email: string;
  }) => CreditApplication;
  resetPlannerDemo: () => void;
  /** Dépenses par catégorie sur un mois YYYY-MM */
  spentByCategory: (month: string) => Record<string, number>;
  /** Totaux pour une période [from, to] ISO */
  totalsInRange: (fromIso: string, toIso: string) => { income: number; expense: number };
  /** Agrégation mensuelle revenus / dépenses */
  monthlySeries: (monthsBack: number) => { label: string; revenus: number; depenses: number }[];
  /** Dépenses par catégorie sur un intervalle */
  expenseByCategoryInRange: (fromIso: string, toIso: string) => { categoryId: string; name: string; amount: number; color: string }[];
}

const DashboardFinanceContext = createContext<DashboardFinanceContextType | null>(null);

export function DashboardFinanceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DashboardFinanceState>(() =>
    typeof window !== 'undefined' ? loadState() : defaultState
  );

  useEffect(() => {
    saveState(state);
  }, [state]);

  const set = useCallback((updater: (s: DashboardFinanceState) => DashboardFinanceState) => {
    setState((prev) => updater(prev));
  }, []);

  const addCategory = useCallback(
    (name: string, budget: number, color: string) => {
      set((s) => ({
        ...s,
        categories: [
          ...s.categories,
          { id: `c-${Date.now()}`, name: name.trim(), budget, color: color || 'bg-coris-blue' },
        ],
      }));
    },
    [set]
  );

  const updateCategory = useCallback(
    (id: string, patch: Partial<Pick<BudgetCategory, 'name' | 'budget'>>) => {
      set((s) => ({
        ...s,
        categories: s.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      }));
    },
    [set]
  );

  const removeCategory = useCallback(
    (id: string) => {
      set((s) => ({
        ...s,
        categories: s.categories.filter((c) => c.id !== id),
        ledger: s.ledger.map((x) => (x.categoryId === id ? { ...x, categoryId: undefined } : x)),
      }));
    },
    [set]
  );

  const addLedgerEntry = useCallback(
    (entry: Omit<LedgerEntry, 'id'>) => {
      set((s) => ({
        ...s,
        ledger: [
          {
            ...entry,
            id: `l-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            amount: Math.abs(entry.amount),
          },
          ...s.ledger,
        ],
      }));
    },
    [set]
  );

  const removeLedgerEntry = useCallback(
    (id: string) => {
      set((s) => ({ ...s, ledger: s.ledger.filter((x) => x.id !== id) }));
    },
    [set]
  );

  const addGoal = useCallback(
    (g: Omit<SavingsGoal, 'id'>) => {
      set((s) => ({
        ...s,
        goals: [...s.goals, { ...g, id: `g-${Date.now()}` }],
      }));
    },
    [set]
  );

  const updateGoal = useCallback(
    (id: string, patch: Partial<SavingsGoal>) => {
      set((s) => ({
        ...s,
        goals: s.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)),
      }));
    },
    [set]
  );

  const removeGoal = useCallback(
    (id: string) => {
      set((s) => ({ ...s, goals: s.goals.filter((g) => g.id !== id) }));
    },
    [set]
  );

  const submitCreditApplication = useCallback(
    (input: {
      creditTypeId: string;
      creditTypeName: string;
      amount: number;
      months: number;
      rate: number;
      purpose: string;
      monthlyIncome: string;
      profession: string;
      phone: string;
      email: string;
    }) => {
      const monthlyPayment = computeMonthlyPayment(input.amount, input.rate, input.months);
      const totalInterest =
        Math.round(monthlyPayment * input.months - input.amount);
      const ref = `CRD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
      const app: CreditApplication = {
        id: `ca-${Date.now()}`,
        ref,
        createdAt: new Date().toISOString(),
        status: 'en_cours',
        creditTypeId: input.creditTypeId,
        creditTypeName: input.creditTypeName,
        amount: input.amount,
        months: input.months,
        rate: input.rate,
        monthlyPayment: Math.round(monthlyPayment),
        totalInterest: Math.max(0, totalInterest),
        purpose: input.purpose.trim(),
        monthlyIncome: input.monthlyIncome,
        profession: input.profession.trim(),
        phone: input.phone.trim(),
        email: input.email.trim(),
      };
      set((s) => ({
        ...s,
        creditApplications: [app, ...s.creditApplications],
      }));
      return app;
    },
    [set]
  );

  const resetPlannerDemo = useCallback(() => {
    set(() => ({ ...defaultState }));
  }, [set]);

  const spentByCategory = useCallback(
    (month: string) => {
      const map: Record<string, number> = {};
      state.ledger.forEach((e) => {
        if (e.kind !== 'expense' || !e.categoryId) return;
        if (monthKey(e.date) !== month) return;
        map[e.categoryId] = (map[e.categoryId] ?? 0) + e.amount;
      });
      return map;
    },
    [state.ledger]
  );

  const totalsInRange = useCallback(
    (fromIso: string, toIso: string) => {
      let income = 0;
      let expense = 0;
      state.ledger.forEach((e) => {
        if (e.date < fromIso || e.date > toIso) return;
        if (e.kind === 'income') income += e.amount;
        else expense += e.amount;
      });
      return { income, expense };
    },
    [state.ledger]
  );

  const monthlySeries = useCallback(
    (monthsBack: number) => {
      const out: { label: string; revenus: number; depenses: number }[] = [];
      const now = new Date();
      for (let i = monthsBack - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const from = `${key}-01`;
        const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        const to = `${key}-${String(lastDay).padStart(2, '0')}`;
        const { income, expense } = totalsInRange(from, to);
        out.push({
          label: d.toLocaleDateString('fr-FR', { month: 'short' }),
          revenus: income,
          depenses: expense,
        });
      }
      return out;
    },
    [totalsInRange]
  );

  const expenseByCategoryInRange = useCallback(
    (fromIso: string, toIso: string) => {
      const map: Record<string, number> = {};
      state.ledger.forEach((e) => {
        if (e.kind !== 'expense' || !e.categoryId) return;
        if (e.date < fromIso || e.date > toIso) return;
        map[e.categoryId] = (map[e.categoryId] ?? 0) + e.amount;
      });
      return state.categories
        .map((c) => ({
          categoryId: c.id,
          name: c.name,
          color: c.color,
          amount: map[c.id] ?? 0,
        }))
        .filter((x) => x.amount > 0);
    },
    [state.ledger, state.categories]
  );

  const value = useMemo(
    () => ({
      ...state,
      addCategory,
      updateCategory,
      removeCategory,
      addLedgerEntry,
      removeLedgerEntry,
      addGoal,
      updateGoal,
      removeGoal,
      submitCreditApplication,
      resetPlannerDemo,
      spentByCategory,
      totalsInRange,
      monthlySeries,
      expenseByCategoryInRange,
    }),
    [
      state,
      addCategory,
      updateCategory,
      removeCategory,
      addLedgerEntry,
      removeLedgerEntry,
      addGoal,
      updateGoal,
      removeGoal,
      submitCreditApplication,
      resetPlannerDemo,
      spentByCategory,
      totalsInRange,
      monthlySeries,
      expenseByCategoryInRange,
    ]
  );

  return (
    <DashboardFinanceContext.Provider value={value}>{children}</DashboardFinanceContext.Provider>
  );
}

export function useDashboardFinance() {
  const ctx = useContext(DashboardFinanceContext);
  if (!ctx) throw new Error('useDashboardFinance must be used within DashboardFinanceProvider');
  return ctx;
}
