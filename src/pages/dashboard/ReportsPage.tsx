import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  Calendar,
  ArrowRight,
  Wallet,
  PieChart,
} from 'lucide-react';
import { useDashboardFinance } from '../../context/DashboardFinanceContext';

type Period = '30j' | '90j' | '12m';

function formatFcfa(n: number) {
  return Math.abs(Math.round(n)).toLocaleString('fr-FR') + ' FCFA';
}

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function rangeForPeriod(period: Period): { from: string; to: string } {
  const to = new Date();
  const from = new Date(to);
  if (period === '30j') from.setDate(from.getDate() - 30);
  else if (period === '90j') from.setDate(from.getDate() - 90);
  else from.setFullYear(from.getFullYear() - 1);
  return { from: toISODate(from), to: toISODate(to) };
}

/** Barres hebdomadaires sur 30 ou 90 jours */
function weeklySeries(
  ledger: { date: string; kind: string; amount: number }[],
  period: '30j' | '90j'
) {
  const days = period === '30j' ? 30 : 90;
  const to = new Date();
  const start = new Date(to);
  start.setDate(start.getDate() - days);
  const startStr = toISODate(start);
  const toStr = toISODate(to);
  const numWeeks = Math.ceil(days / 7);
  const buckets = Array.from({ length: numWeeks }, (_, i) => ({
    label: `S${i + 1}`,
    revenus: 0,
    depenses: 0,
  }));

  ledger.forEach((e) => {
    if (e.date < startStr || e.date > toStr) return;
    const d = new Date(e.date + 'T12:00:00');
    const diff = d.getTime() - start.getTime();
    const dayIndex = Math.floor(diff / (24 * 60 * 60 * 1000));
    const w = Math.min(numWeeks - 1, Math.max(0, Math.floor(dayIndex / 7)));
    if (e.kind === 'income') buckets[w].revenus += e.amount;
    else buckets[w].depenses += e.amount;
  });

  return buckets;
}

export default function ReportsPage() {
  const [period, setPeriod] = useState<Period>('90j');
  const { ledger, categories, totalsInRange, monthlySeries, expenseByCategoryInRange } =
    useDashboardFinance();

  const { from, to } = useMemo(() => rangeForPeriod(period), [period]);

  const totals = useMemo(() => totalsInRange(from, to), [totalsInRange, from, to]);

  const catBreakdown = useMemo(
    () => expenseByCategoryInRange(from, to),
    [expenseByCategoryInRange, from, to]
  );

  const totalCat = useMemo(
    () => catBreakdown.reduce((s, c) => s + c.amount, 0),
    [catBreakdown]
  );

  const chartData = useMemo(() => {
    if (period === '12m') {
      return monthlySeries(12).map((m) => ({
        label: m.label,
        revenus: m.revenus,
        depenses: m.depenses,
      }));
    }
    return weeklySeries(ledger, period).map((w) => ({
      label: w.label,
      revenus: w.revenus,
      depenses: w.depenses,
    }));
  }, [period, ledger, monthlySeries]);

  const maxBar = useMemo(
    () => Math.max(1, ...chartData.map((m) => Math.max(m.revenus, m.depenses))),
    [chartData]
  );

  const recent = useMemo(() => {
    return [...ledger]
      .filter((e) => e.date >= from && e.date <= to)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 12)
      .map((e) => ({
        id: e.id,
        label: e.label,
        amount: e.kind === 'income' ? e.amount : -e.amount,
        type: e.kind === 'income' ? ('credit' as const) : ('debit' as const),
        date: e.date,
        cat:
          e.kind === 'expense' && e.categoryId
            ? categories.find((c) => c.id === e.categoryId)?.name ?? 'Dépense'
            : e.kind === 'income'
              ? 'Revenu'
              : '—',
      }));
  }, [ledger, from, to, categories]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-coris-navy flex items-center gap-2">
            <BarChart3 size={22} className="text-coris-blue" />
            Rapports & analyse
          </h1>
          <p className="text-sm text-coris-gray-dark mt-1">
            Basé sur vos saisies du planner (revenus et dépenses). Période :{' '}
            <strong>
              {new Date(from).toLocaleDateString('fr-FR')} — {new Date(to).toLocaleDateString('fr-FR')}
            </strong>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-coris-gray-dark flex items-center gap-1">
            <Calendar size={12} /> Période
          </span>
          {(
            [
              { id: '30j' as const, label: '30 jours' },
              { id: '90j' as const, label: '90 jours' },
              { id: '12m' as const, label: '12 mois' },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setPeriod(id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                period === id
                  ? 'bg-coris-blue text-white shadow-md shadow-coris-blue/20'
                  : 'bg-white border border-gray-200 text-coris-gray-dark hover:bg-coris-gray'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: TrendingUp, label: 'Revenus', value: totals.income, tone: 'text-emerald-600', bg: 'bg-emerald-50' },
          { icon: TrendingDown, label: 'Dépenses', value: totals.expense, tone: 'text-red-500', bg: 'bg-red-50' },
          { icon: Wallet, label: 'Solde net', value: totals.income - totals.expense, tone: 'text-coris-navy', bg: 'bg-coris-blue/5' },
        ].map(({ icon: Icon, label, value, tone, bg }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border border-gray-100 p-5 ${bg}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon size={16} className={tone} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-coris-gray-dark">{label}</span>
            </div>
            <p className={`text-xl font-black ${tone}`}>{formatFcfa(value)}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6"
        >
          <h2 className="text-sm font-bold text-coris-navy mb-6 flex items-center gap-2">
            <BarChart3 size={16} className="text-coris-blue" />
            {period === '12m' ? 'Revenus vs dépenses (mensuel)' : 'Revenus vs dépenses (par semaine)'}
          </h2>
          <div className="flex items-end justify-between gap-1 sm:gap-3 h-52 border-b border-gray-100 pb-2 overflow-x-auto">
            {chartData.map((m) => (
              <div key={m.label} className="flex-1 flex flex-col items-center gap-2 min-w-[32px]">
                <div className="flex gap-0.5 items-end justify-center h-40 w-full">
                  <div
                    className="w-1/2 max-w-[14px] rounded-t-md bg-emerald-400/90"
                    style={{ height: `${(m.revenus / maxBar) * 100}%` }}
                  />
                  <div
                    className="w-1/2 max-w-[14px] rounded-t-md bg-red-400/90"
                    style={{ height: `${(m.depenses / maxBar) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] font-semibold text-coris-gray-dark text-center leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-emerald-400" /> Revenus
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-red-400" /> Dépenses
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6"
        >
          <h2 className="text-sm font-bold text-coris-navy mb-4 flex items-center gap-2">
            <PieChart size={16} className="text-coris-blue" />
            Dépenses par catégorie
          </h2>
          {totalCat === 0 ? (
            <p className="text-xs text-coris-gray-dark">
              Aucune dépense catégorisée sur cette période. Ajoutez des dépenses depuis le Planner budget.
            </p>
          ) : (
            <div className="space-y-3">
              {catBreakdown.map((c) => (
                <div key={c.categoryId}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-coris-navy">{c.name}</span>
                    <span className="text-coris-gray-dark">{formatFcfa(c.amount)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-coris-gray overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.color}`}
                      style={{ width: `${(c.amount / totalCat) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-sm font-bold text-coris-navy">Mouvements sur la période</h2>
          <div className="flex gap-2">
            <Link
              to="/dashboard/budget"
              className="text-xs font-semibold text-coris-blue hover:underline"
            >
              Planner budget
            </Link>
            <Link
              to="/dashboard/transactions"
              className="text-xs font-semibold text-coris-blue hover:underline flex items-center gap-1"
            >
              Historique compte <ArrowRight size={12} />
            </Link>
          </div>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-coris-gray-dark">Aucune opération sur cette période.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {recent.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 py-3 first:pt-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-400'
                  }`}
                >
                  {tx.type === 'credit' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-coris-navy truncate">{tx.label}</p>
                  <p className="text-[11px] text-coris-gray-dark">
                    {tx.date} · {tx.cat}
                  </p>
                </div>
                <span
                  className={`text-sm font-bold whitespace-nowrap ${
                    tx.type === 'credit' ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {tx.type === 'credit' ? '+' : ''}
                  {formatFcfa(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
