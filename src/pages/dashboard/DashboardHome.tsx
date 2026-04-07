import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Wallet, CreditCard,
  Eye, EyeOff, Send, Download, QrCode,
  Landmark, PiggyBank, Users, ChevronRight, Calendar, Activity,
  Copy, CheckCircle
} from 'lucide-react';
import { useState } from 'react';
import { useAuth, type Transaction, type Account } from '../../context/AuthContext';

function formatMoney(n: number) {
  return Math.abs(n).toLocaleString('fr-FR') + ' FCFA';
}

const accountMeta: Record<Account['type'], { icon: typeof Landmark; color: string; bgColor: string; gradient: string }> = {
  courant: { icon: Landmark, color: 'text-coris-blue', bgColor: 'bg-coris-blue/10', gradient: 'from-coris-blue/5 to-coris-blue/[0.02]' },
  epargne: { icon: PiggyBank, color: 'text-emerald-600', bgColor: 'bg-emerald-50', gradient: 'from-emerald-50/80 to-emerald-50/20' },
  tontine: { icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50', gradient: 'from-purple-50/80 to-purple-50/20' },
  pret: { icon: CreditCard, color: 'text-amber-600', bgColor: 'bg-amber-50', gradient: 'from-amber-50/80 to-amber-50/20' },
};

const typeLabels: Record<Account['type'], string> = {
  courant: 'Compte Courant',
  epargne: 'Compte Épargne',
  tontine: 'Tontine',
  pret: 'Prêt',
};

function AccountCard({ account, showBalance, index }: { account: Account; showBalance: boolean; index: number }) {
  const [copied, setCopied] = useState(false);
  const meta = accountMeta[account.type];
  const Icon = meta.icon;

  const copyNumber = () => {
    navigator.clipboard.writeText(account.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all group"
    >
      <div className={`px-5 pt-5 pb-4 bg-gradient-to-br ${meta.gradient} rounded-t-2xl`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${meta.bgColor} flex items-center justify-center`}>
              <Icon size={20} className={meta.color} />
            </div>
            <div>
              <h4 className="font-bold text-coris-navy text-sm">{account.label}</h4>
              <span className="text-[10px] text-coris-gray-dark uppercase tracking-wider font-medium">
                {typeLabels[account.type]}
              </span>
            </div>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
            account.status === 'actif'
              ? 'bg-emerald-50 text-emerald-600'
              : account.status === 'gelé'
              ? 'bg-blue-50 text-blue-500'
              : 'bg-amber-50 text-amber-600'
          }`}>
            {account.status}
          </span>
        </div>

        <div className="mt-2">
          <p className="text-[10px] text-coris-gray-dark uppercase tracking-wider mb-0.5">Solde disponible</p>
          <p className="text-2xl font-extrabold text-coris-navy">
            {showBalance ? formatMoney(account.balance) : '•••••••••'}
          </p>
        </div>
      </div>

      <div className="px-5 py-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-coris-gray-dark">
            <span className="font-medium">N° :</span>
            <span className="font-mono text-coris-navy">{showBalance ? account.number : '•••••••••••'}</span>
          </div>
          <button onClick={copyNumber} className="text-coris-gray-dark hover:text-coris-blue transition-colors">
            {copied ? <CheckCircle size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-coris-gray-dark">
          <span className="flex items-center gap-1"><Calendar size={10} /> Ouvert le {account.openedDate}</span>
          <span className="flex items-center gap-1"><Activity size={10} /> {account.lastActivity}</span>
        </div>
      </div>
    </motion.div>
  );
}

function TransactionRow({ tx }: { tx: Transaction }) {
  const isCredit = tx.type === 'credit';
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isCredit ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-400'}`}>
        {isCredit ? <Download size={16} /> : <TrendingDown size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-coris-navy truncate">{tx.label}</p>
        <p className="text-[11px] text-coris-gray-dark">{tx.date} · {tx.category}</p>
      </div>
      <span className={`text-sm font-bold whitespace-nowrap ${isCredit ? 'text-emerald-600' : 'text-red-500'}`}>
        {isCredit ? '+' : '-'}{formatMoney(tx.amount)}
      </span>
    </div>
  );
}

export default function DashboardHome() {
  const { user, transactions, isNewClient } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  if (!user) return null;

  const totalBalance = user.accounts.reduce((s, a) => s + a.balance, 0);

  const quickActions = [
    { icon: Send, label: 'Virement', to: '/dashboard/transfert', color: 'bg-blue-50 text-coris-blue' },
    { icon: Wallet, label: 'Bank → Wallet', to: '/dashboard/bank-to-wallet', color: 'bg-purple-50 text-purple-600' },
    { icon: CreditCard, label: 'Mes Cartes', to: '/dashboard/cartes', color: 'bg-amber-50 text-amber-600' },
    { icon: QrCode, label: 'Payer', to: '/dashboard/payer', color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {isNewClient && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/90 px-4 py-3 sm:px-5 sm:py-4 text-sm text-amber-950">
          <p className="font-bold text-coris-navy mb-1">Bienvenue — compte récemment activé</p>
          <p className="text-coris-gray-dark leading-relaxed">
            Votre solde est à <strong>0 FCFA</strong> jusqu’à votre premier dépôt ou virement entrant. Le ou les comptes ouverts
            figurent ci-dessous ; l’historique des opérations sera alimenté au fil de votre activité.
          </p>
        </div>
      )}

      {/* Solde total + Actions rapides */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-gradient-to-br from-coris-blue via-coris-blue-dark to-coris-navy rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-coris-red/10 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Solde total — {user.accounts.length} comptes</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-extrabold">
                    {showBalance ? formatMoney(totalBalance) : '••••••••'}
                  </h2>
                  <button onClick={() => setShowBalance(!showBalance)} className="text-white/40 hover:text-white transition-colors">
                    {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              {!isNewClient && totalBalance > 0 && (
                <div className="flex items-center gap-1.5 bg-emerald-500/20 rounded-full px-3 py-1">
                  <TrendingUp size={13} />
                  <span className="text-xs font-semibold">+2.4%</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 text-xs">
              {user.accounts.map((acc) => {
                const pct = totalBalance > 0 ? Math.round((acc.balance / totalBalance) * 100) : 0;
                return (
                  <div key={acc.id} className="bg-white/[0.08] rounded-lg px-3 py-2 border border-white/[0.06]">
                    <span className="text-white/40 text-[10px]">{acc.label}</span>
                    <span className="block text-white font-bold text-sm mt-0.5">
                      {showBalance ? `${pct}%` : '••'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 p-6"
        >
          <h3 className="text-sm font-bold text-coris-navy mb-4">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ icon: Icon, label, to, color }) => (
              <Link
                key={label}
                to={to}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-coris-gray transition-colors group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} transition-transform group-hover:scale-110`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs font-medium text-coris-gray-dark">{label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mes Comptes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-coris-navy flex items-center gap-2">
            <Landmark size={18} className="text-coris-blue" />
            Mes Comptes
          </h3>
          <span className="text-xs text-coris-gray-dark bg-coris-gray px-3 py-1 rounded-full font-medium">
            {user.accounts.length} compte{user.accounts.length > 1 ? 's' : ''} actif{user.accounts.length > 1 ? 's' : ''}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {user.accounts.map((account, i) => (
            <AccountCard key={account.id} account={account} showBalance={showBalance} index={i} />
          ))}
        </div>
      </div>

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-coris-navy">Transactions récentes</h3>
          <Link to="/dashboard/transactions" className="text-xs font-medium text-coris-blue hover:underline flex items-center gap-1">
            Voir tout <ChevronRight size={12} />
          </Link>
        </div>
        <div>
          {transactions.length === 0 ? (
            <p className="text-sm text-coris-gray-dark py-6 text-center border border-dashed border-gray-200 rounded-xl bg-coris-gray/50">
              Aucune opération pour l’instant. Après votre premier dépôt ou paiement, l’historique apparaîtra ici.
            </p>
          ) : (
            transactions.slice(0, 6).map((tx) => <TransactionRow key={tx.id} tx={tx} />)
          )}
        </div>
      </motion.div>
    </div>
  );
}
