import { useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Download, TrendingDown, Search, Filter, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function formatMoney(n: number) {
  return Math.abs(n).toLocaleString('fr-FR') + ' FCFA';
}

const categories = ['Tout', 'Salaire', 'Facture', 'Virement', 'Retrait', 'Mobile Money', 'Dépôt', 'Achat', 'Télécom', 'Intérêts'];

export default function TransactionsPage() {
  const { transactions } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tout');
  const [typeFilter, setTypeFilter] = useState<'all' | 'credit' | 'debit'>('all');

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.label.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Tout' || tx.category === category;
    const matchType = typeFilter === 'all' || tx.type === typeFilter;
    return matchSearch && matchCat && matchType;
  });

  const totalCredit = filtered.filter((t) => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const totalDebit = filtered.filter((t) => t.type === 'debit').reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-coris-navy flex items-center gap-2">
            <Receipt size={22} className="text-coris-blue" />
            Historique des transactions
          </h1>
          <p className="text-sm text-coris-gray-dark mt-1">{filtered.length} transaction(s) trouvée(s)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-coris-gray-dark hover:bg-coris-gray transition-colors">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">Total reçu</p>
          <p className="text-xl font-extrabold text-emerald-700">+{formatMoney(totalCredit)}</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
          <p className="text-xs text-red-500 font-semibold uppercase tracking-wider mb-1">Total dépensé</p>
          <p className="text-xl font-extrabold text-red-600">-{formatMoney(totalDebit)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une transaction..."
              className="w-full bg-coris-gray border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'credit', 'debit'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  typeFilter === t
                    ? 'bg-coris-blue text-white'
                    : 'bg-coris-gray text-coris-gray-dark hover:bg-gray-200'
                }`}
              >
                {t === 'all' ? 'Tout' : t === 'credit' ? 'Entrées' : 'Sorties'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === cat ? 'bg-coris-navy text-white' : 'bg-coris-gray text-coris-gray-dark hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions list */}
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {filtered.length === 0 && (
          <div className="p-8 text-center">
            <Filter size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-coris-gray-dark">Aucune transaction trouvée</p>
          </div>
        )}
        {filtered.map((tx, i) => {
          const isCredit = tx.type === 'credit';
          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 px-5 py-4 hover:bg-coris-gray/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isCredit ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-400'}`}>
                {isCredit ? <Download size={18} /> : <TrendingDown size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-coris-navy truncate">{tx.label}</p>
                <div className="flex items-center gap-2 text-[11px] text-coris-gray-dark">
                  <Calendar size={10} /> {tx.date}
                  <span className="bg-coris-gray px-2 py-0.5 rounded-full">{tx.category}</span>
                </div>
              </div>
              <span className={`text-sm font-bold whitespace-nowrap ${isCredit ? 'text-emerald-600' : 'text-red-500'}`}>
                {isCredit ? '+' : '-'}{formatMoney(tx.amount)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
