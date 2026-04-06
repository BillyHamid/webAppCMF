import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ArrowRight, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const operators = [
  { id: 'orange', name: 'Orange Money', prefix: '07', logo: '/logos/orange-money.png' },
  { id: 'moov', name: 'Moov Money', prefix: '06', logo: '/logos/moov-money.png' },
  { id: 'coris', name: 'Coris Money', prefix: '05', logo: '/logos/coris-money.png' },
];

export default function BankToWallet() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [operator, setOperator] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState(user?.accounts[0]?.id || '');
  const [loading, setLoading] = useState(false);

  const selectedAcc = user?.accounts.find((a) => a.id === account);
  const selectedOperator = operators.find((o) => o.id === operator);
  const amountNum = parseInt(amount.replace(/\s/g, ''), 10) || 0;

  const canProceed =
    step === 1
      ? !!operator && phone.length >= 8 && amountNum >= 500
      : step === 2;

  const handleNext = () => {
    if (step === 1 && canProceed) setStep(2);
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const reset = () => {
    setStep(1);
    setOperator('');
    setPhone('');
    setAmount('');
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-coris-navy flex items-center gap-2">
          <Wallet size={22} className="text-coris-blue" />
          Bank to Wallet
        </h1>
        <p className="text-sm text-coris-gray-dark mt-1">Transférez de votre compte vers un portefeuille mobile</p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= s ? 'bg-coris-blue text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {step > s ? <CheckCircle size={16} /> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 rounded-full ${step > s ? 'bg-coris-blue' : 'bg-gray-100'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5"
          >
            <div>
              <label className="block text-xs font-semibold text-coris-navy mb-3 uppercase tracking-wide">Opérateur</label>
              <div className="grid grid-cols-3 gap-3">
                {operators.map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setOperator(op.id)}
                    className={`p-3 rounded-xl border-2 text-center transition-all flex flex-col items-stretch ${
                      operator === op.id
                        ? 'border-coris-blue bg-coris-blue/5'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="h-14 w-full rounded-lg bg-white border border-gray-100 flex items-center justify-center mb-2 p-1.5 overflow-hidden">
                      <img
                        src={op.logo}
                        alt={op.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-[11px] font-semibold text-coris-navy leading-tight">{op.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Numéro de téléphone</label>
              <div className="relative">
                <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="70 12 34 56"
                  className="w-full bg-coris-gray border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Montant (FCFA)</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Ex : 50 000"
                className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue"
              />
              {amountNum > 0 && selectedAcc && amountNum > selectedAcc.balance && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> Solde insuffisant
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Compte source</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue"
              >
                {user?.accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label} ({a.number}) — {a.balance.toLocaleString('fr-FR')} FCFA
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="w-full bg-coris-blue hover:bg-coris-blue-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-40 text-sm"
            >
              Continuer <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5"
          >
            <h3 className="font-bold text-coris-navy">Confirmer le transfert</h3>
            {selectedOperator && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-1">
                  <img src={selectedOperator.logo} alt="" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-coris-gray-dark uppercase tracking-wide">Opérateur</p>
                  <p className="font-bold text-coris-navy truncate">{selectedOperator.name}</p>
                </div>
              </div>
            )}
            <div className="bg-coris-gray rounded-xl p-4 space-y-3">
              {[
                { l: 'Numéro', v: phone },
                { l: 'Montant', v: `${amountNum.toLocaleString('fr-FR')} FCFA` },
                { l: 'Frais', v: '150 FCFA' },
                { l: 'Total débité', v: `${(amountNum + 150).toLocaleString('fr-FR')} FCFA` },
                { l: 'Compte', v: selectedAcc?.label },
              ].map(({ l, v }) => (
                <div key={l} className="flex justify-between text-sm">
                  <span className="text-coris-gray-dark">{l}</span>
                  <span className="font-semibold text-coris-navy">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 text-coris-gray-dark font-medium py-3 rounded-xl hover:bg-coris-gray transition-colors text-sm"
              >
                Modifier
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 bg-coris-blue hover:bg-coris-blue-dark text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 text-sm"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Confirmer'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-gray-100 p-8 text-center"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-extrabold text-coris-navy mb-2">Transfert réussi !</h3>
            <p className="text-sm text-coris-gray-dark mb-6">
              <strong>{amountNum.toLocaleString('fr-FR')} FCFA</strong> ont été envoyés vers <strong>{phone}</strong>
            </p>
            <p className="text-xs text-coris-gray-dark mb-6">
              Réf: TRF-{Date.now().toString(36).toUpperCase()}
            </p>
            <button
              onClick={reset}
              className="bg-coris-blue hover:bg-coris-blue-dark text-white font-bold py-3 px-8 rounded-xl transition-colors text-sm"
            >
              Nouveau transfert
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
