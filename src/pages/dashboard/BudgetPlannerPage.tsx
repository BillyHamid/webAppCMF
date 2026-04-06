import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  PieChart,
  TrendingUp,
  Plus,
  Trash2,
  Pencil,
  X,
  RotateCcw,
  Wallet,
} from 'lucide-react';
import { useDashboardFinance, monthKey } from '../../context/DashboardFinanceContext';

const COLOR_OPTIONS = [
  { value: 'bg-coris-blue', label: 'Bleu' },
  { value: 'bg-emerald-500', label: 'Vert' },
  { value: 'bg-amber-500', label: 'Ambre' },
  { value: 'bg-purple-500', label: 'Violet' },
  { value: 'bg-rose-500', label: 'Rose' },
  { value: 'bg-coris-red', label: 'Rouge' },
];

function formatFcfa(n: number) {
  return Math.round(n).toLocaleString('fr-FR') + ' FCFA';
}

export default function BudgetPlannerPage() {
  const {
    categories,
    ledger,
    goals,
    addCategory,
    updateCategory,
    removeCategory,
    addLedgerEntry,
    removeLedgerEntry,
    addGoal,
    updateGoal,
    removeGoal,
    spentByCategory,
    resetPlannerDemo,
  } = useDashboardFinance();

  const now = new Date();
  const [viewMonth, setViewMonth] = useState(() =>
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  );

  const spentMap = useMemo(() => spentByCategory(viewMonth), [spentByCategory, viewMonth]);

  const { totalBudget, totalSpent } = useMemo(() => {
    let budget = 0;
    let spent = 0;
    categories.forEach((c) => {
      budget += c.budget;
      spent += spentMap[c.id] ?? 0;
    });
    return { totalBudget: budget, totalSpent: spent };
  }, [categories, spentMap]);

  const [showCatModal, setShowCatModal] = useState(false);
  const [catName, setCatName] = useState('');
  const [catBudget, setCatBudget] = useState(100_000);
  const [catColor, setCatColor] = useState(COLOR_OPTIONS[0].value);

  const [showExpModal, setShowExpModal] = useState(false);
  const [showIncModal, setShowIncModal] = useState(false);
  const [expLabel, setExpLabel] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('');
  const [expDate, setExpDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [incLabel, setIncLabel] = useState('');
  const [incAmount, setIncAmount] = useState('');
  const [incDate, setIncDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState(1_000_000);
  const [goalCurrent, setGoalCurrent] = useState(0);
  const [goalDeadline, setGoalDeadline] = useState('');

  const monthExpenses = useMemo(
    () => ledger.filter((e) => e.kind === 'expense' && monthKey(e.date) === viewMonth),
    [ledger, viewMonth]
  );

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    addCategory(catName.trim(), catBudget, catColor);
    setCatName('');
    setCatBudget(100_000);
    setShowCatModal(false);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseFloat(expAmount.replace(/\s/g, ''));
    if (!expLabel.trim() || !expCategory || !n || n <= 0) return;
    addLedgerEntry({
      date: expDate,
      label: expLabel.trim(),
      amount: n,
      kind: 'expense',
      categoryId: expCategory,
    });
    setExpLabel('');
    setExpAmount('');
    setShowExpModal(false);
  };

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseFloat(incAmount.replace(/\s/g, ''));
    if (!incLabel.trim() || !n || n <= 0) return;
    addLedgerEntry({
      date: incDate,
      label: incLabel.trim(),
      amount: n,
      kind: 'income',
    });
    setIncLabel('');
    setIncAmount('');
    setShowIncModal(false);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName.trim() || !goalDeadline) return;
    addGoal({
      name: goalName.trim(),
      target: goalTarget,
      current: goalCurrent,
      deadline: goalDeadline,
    });
    setGoalName('');
    setShowGoalModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-coris-navy flex items-center gap-2">
            <PieChart size={22} className="text-coris-blue" />
            Planner budget
          </h1>
          <p className="text-sm text-coris-gray-dark mt-1">
            Enveloppes par catégorie, saisie des dépenses et objectifs — données enregistrées sur cet appareil.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Wallet size={14} className="text-coris-gray-dark hidden sm:inline" />
          <input
            type="month"
            value={viewMonth}
            onChange={(e) => setViewMonth(e.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium"
          />
          <button
            type="button"
            onClick={() => setShowExpModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-coris-blue text-white text-sm font-bold hover:bg-coris-blue-dark shadow-md shadow-coris-blue/20"
          >
            <Plus size={16} />
            Dépense
          </button>
          <button
            type="button"
            onClick={() => setShowIncModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
          >
            <Plus size={16} />
            Revenu
          </button>
          <button
            type="button"
            onClick={() => setShowCatModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-coris-blue text-coris-blue text-sm font-bold hover:bg-coris-blue/5"
          >
            <Plus size={16} />
            Catégorie
          </button>
          <button
            type="button"
            onClick={() => setShowGoalModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-coris-navy text-white text-sm font-bold hover:bg-coris-blue"
          >
            <Target size={16} />
            Objectif
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('Réinitialiser les comptes de démonstration ?')) resetPlannerDemo();
            }}
            className="p-2.5 rounded-xl border border-gray-200 text-coris-gray-dark hover:bg-coris-gray"
            title="Réinitialiser la démo"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 p-5"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-coris-gray-dark mb-1">
            Budget mensuel (somme des enveloppes)
          </p>
          <p className="text-xl font-black text-coris-navy">{formatFcfa(totalBudget)}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-gray-100 p-5"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-coris-gray-dark mb-1">
            Dépensé ({viewMonth})
          </p>
          <p className="text-xl font-black text-red-500">{formatFcfa(totalSpent)}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 p-5"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-coris-gray-dark mb-1">Reste</p>
          <p className="text-xl font-black text-emerald-600">{formatFcfa(totalBudget - totalSpent)}</p>
        </motion.div>
      </div>

      {/* Catégories */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 p-6"
      >
        <h2 className="text-sm font-black text-coris-navy mb-6">Enveloppes par catégorie</h2>
        <div className="space-y-5">
          {categories.map((c) => {
            const spent = spentMap[c.id] ?? 0;
            const pct = c.budget > 0 ? Math.min(100, (spent / c.budget) * 100) : 0;
            const over = spent > c.budget;
            return (
              <div key={c.id} className="group">
                <div className="flex justify-between items-center text-sm mb-2 gap-2">
                  <span className="font-semibold text-coris-navy flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${c.color}`} />
                    {c.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-coris-gray-dark">
                      <span className={over ? 'text-red-500 font-bold' : ''}>{formatFcfa(spent)}</span>
                      {' / '}
                      {formatFcfa(c.budget)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const n = prompt('Nouveau budget mensuel (FCFA)', String(c.budget));
                        if (n && !Number.isNaN(Number(n))) updateCategory(c.id, { budget: Number(n) });
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-coris-blue"
                      title="Modifier le budget"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Supprimer cette catégorie ?')) removeCategory(c.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </span>
                </div>
                <div className="h-3 rounded-full bg-coris-gray overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${over ? 'bg-red-400' : c.color}`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
                <p className="text-[10px] text-coris-gray-dark mt-1">
                  {over ? 'Dépassement du budget' : `${Math.round(pct)} % utilisé`}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Dépenses du mois */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 p-6"
      >
        <h2 className="text-sm font-black text-coris-navy mb-4">
          Dépenses saisies — {viewMonth}
        </h2>
        {monthExpenses.length === 0 ? (
          <p className="text-sm text-coris-gray-dark">Aucune dépense pour ce mois. Ajoutez-en une avec « Dépense ».</p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {monthExpenses.map((e) => (
              <li key={e.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-coris-navy">{e.label}</p>
                  <p className="text-[11px] text-coris-gray-dark">{e.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-red-500">-{formatFcfa(e.amount)}</span>
                  <button
                    type="button"
                    onClick={() => removeLedgerEntry(e.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      {/* Objectifs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 p-6"
      >
        <h2 className="text-sm font-black text-coris-navy mb-6 flex items-center gap-2">
          <Target size={18} className="text-coris-blue" />
          Objectifs d’épargne
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {goals.map((g) => {
            const pct = g.target > 0 ? (g.current / g.target) * 100 : 0;
            return (
              <div
                key={g.id}
                className="rounded-xl border border-gray-100 p-5 bg-coris-gray/30 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <p className="font-bold text-coris-navy text-sm">{g.name}</p>
                  <button
                    type="button"
                    onClick={() => removeGoal(g.id)}
                    className="text-coris-gray-dark hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="text-[10px] text-coris-gray-dark mb-3">Échéance : {g.deadline}</p>
                <div className="h-2 rounded-full bg-white overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-coris-blue to-emerald-500"
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <TrendingUp size={12} />
                    {formatFcfa(g.current)}
                  </span>
                  <span className="text-coris-gray-dark">{formatFcfa(g.target)}</span>
                </div>
                <p className="text-[10px] text-coris-navy font-bold mt-2">{Math.round(pct)} % atteint</p>
                <input
                  type="range"
                  min={0}
                  max={g.target}
                  step={10_000}
                  value={g.current}
                  onChange={(e) => updateGoal(g.id, { current: Number(e.target.value) })}
                  className="w-full mt-3 accent-coris-blue"
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Modal catégorie */}
      {showCatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.form
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleAddCategory}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-coris-navy">Nouvelle catégorie</h3>
              <button type="button" onClick={() => setShowCatModal(false)} className="p-1">
                <X size={18} />
              </button>
            </div>
            <input
              className="w-full border rounded-xl px-3 py-2 text-sm mb-3"
              placeholder="Nom"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              required
            />
            <input
              type="number"
              className="w-full border rounded-xl px-3 py-2 text-sm mb-3"
              placeholder="Budget mensuel"
              value={catBudget}
              onChange={(e) => setCatBudget(Number(e.target.value))}
              min={0}
            />
            <select
              value={catColor}
              onChange={(e) => setCatColor(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm mb-4"
            >
              {COLOR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <button type="submit" className="w-full py-3 rounded-xl bg-coris-blue text-white font-bold text-sm">
              Ajouter
            </button>
          </motion.form>
        </div>
      )}

      {/* Modal revenu */}
      {showIncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.form
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleAddIncome}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-3"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-coris-navy">Nouveau revenu</h3>
              <button type="button" onClick={() => setShowIncModal(false)} className="p-1">
                <X size={18} />
              </button>
            </div>
            <input
              className="w-full border rounded-xl px-3 py-2 text-sm"
              placeholder="Libellé (salaire, prime…)"
              value={incLabel}
              onChange={(e) => setIncLabel(e.target.value)}
              required
            />
            <input
              type="number"
              className="w-full border rounded-xl px-3 py-2 text-sm"
              placeholder="Montant (FCFA)"
              value={incAmount}
              onChange={(e) => setIncAmount(e.target.value)}
              required
            />
            <input
              type="date"
              value={incDate}
              onChange={(e) => setIncDate(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm"
            />
            <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm">
              Enregistrer
            </button>
          </motion.form>
        </div>
      )}

      {/* Modal dépense */}
      {showExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.form
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleAddExpense}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-3"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-coris-navy">Nouvelle dépense</h3>
              <button type="button" onClick={() => setShowExpModal(false)} className="p-1">
                <X size={18} />
              </button>
            </div>
            <input
              className="w-full border rounded-xl px-3 py-2 text-sm"
              placeholder="Libellé"
              value={expLabel}
              onChange={(e) => setExpLabel(e.target.value)}
              required
            />
            <input
              type="number"
              className="w-full border rounded-xl px-3 py-2 text-sm"
              placeholder="Montant (FCFA)"
              value={expAmount}
              onChange={(e) => setExpAmount(e.target.value)}
              required
            />
            <select
              value={expCategory}
              onChange={(e) => setExpCategory(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm"
              required
            >
              <option value="">Catégorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm"
            />
            <button type="submit" className="w-full py-3 rounded-xl bg-coris-blue text-white font-bold text-sm">
              Enregistrer
            </button>
          </motion.form>
        </div>
      )}

      {/* Modal objectif */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.form
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleAddGoal}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-3"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-coris-navy">Nouvel objectif</h3>
              <button type="button" onClick={() => setShowGoalModal(false)} className="p-1">
                <X size={18} />
              </button>
            </div>
            <input
              className="w-full border rounded-xl px-3 py-2 text-sm"
              placeholder="Nom"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              required
            />
            <input
              type="number"
              className="w-full border rounded-xl px-3 py-2 text-sm"
              placeholder="Cible (FCFA)"
              value={goalTarget}
              onChange={(e) => setGoalTarget(Number(e.target.value))}
            />
            <input
              type="number"
              className="w-full border rounded-xl px-3 py-2 text-sm"
              placeholder="Montant déjà épargné"
              value={goalCurrent}
              onChange={(e) => setGoalCurrent(Number(e.target.value))}
            />
            <input
              type="month"
              value={goalDeadline}
              onChange={(e) => setGoalDeadline(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm"
              required
            />
            <button type="submit" className="w-full py-3 rounded-xl bg-coris-navy text-white font-bold text-sm">
              Créer
            </button>
          </motion.form>
        </div>
      )}
    </div>
  );
}
