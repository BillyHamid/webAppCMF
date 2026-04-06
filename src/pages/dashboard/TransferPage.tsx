import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, User, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function TransferPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'interne' | 'externe'>('interne');
  const [beneficiary, setBeneficiary] = useState('');
  const [ibanOrAccount, setIbanOrAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [motif, setMotif] = useState('');
  const [sourceAccount, setSourceAccount] = useState(user?.accounts[0]?.id || '');
  const [loading, setLoading] = useState(false);

  const selectedAcc = user?.accounts.find((a) => a.id === sourceAccount);
  const amountNum = parseInt(amount.replace(/\s/g, ''), 10) || 0;

  const canContinue = beneficiary.length >= 2 && amountNum >= 100 && (type === 'interne' || ibanOrAccount.length >= 5);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1200);
  };

  const reset = () => {
    setStep(1);
    setBeneficiary('');
    setIbanOrAccount('');
    setAmount('');
    setMotif('');
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-coris-navy flex items-center gap-2">
          <ArrowLeftRight size={22} className="text-coris-blue" />
          Transferts
        </h1>
        <p className="text-sm text-coris-gray-dark mt-1">Effectuez un virement vers un autre compte</p>
      </div>

      {/* Type tabs */}
      <div className="flex gap-2 mb-6">
        {([['interne', 'Virement interne'], ['externe', 'Virement externe']] as const).map(([val, label]) => (
          <button
            key={val}
            onClick={() => { setType(val); reset(); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              type === val ? 'bg-coris-blue text-white shadow-md shadow-coris-blue/20' : 'bg-white border border-gray-200 text-coris-gray-dark hover:bg-coris-gray'
            }`}
          >
            {label}
          </button>
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
              <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Compte source</label>
              <select
                value={sourceAccount}
                onChange={(e) => setSourceAccount(e.target.value)}
                className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20"
              >
                {user?.accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label} ({a.number}) — {a.balance.toLocaleString('fr-FR')} FCFA
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Bénéficiaire</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={beneficiary}
                  onChange={(e) => setBeneficiary(e.target.value)}
                  placeholder="Nom du bénéficiaire"
                  className="w-full bg-coris-gray border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20"
                />
              </div>
            </div>

            {type === 'externe' && (
              <div>
                <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">N° de compte / IBAN</label>
                <input
                  type="text"
                  value={ibanOrAccount}
                  onChange={(e) => setIbanOrAccount(e.target.value)}
                  placeholder="BF42 XXXX XXXX XXXX"
                  className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Montant (FCFA)</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Ex : 100 000"
                className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20"
              />
              {amountNum > 0 && selectedAcc && amountNum > selectedAcc.balance && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> Solde insuffisant
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Motif (optionnel)</label>
              <input
                type="text"
                value={motif}
                onChange={(e) => setMotif(e.target.value)}
                placeholder="Ex : Loyer Mars 2026"
                className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canContinue}
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
            <h3 className="font-bold text-coris-navy">Récapitulatif</h3>
            <div className="bg-coris-gray rounded-xl p-4 space-y-3">
              {[
                { l: 'Type', v: type === 'interne' ? 'Virement interne' : 'Virement externe' },
                { l: 'De', v: selectedAcc?.label || '' },
                { l: 'Bénéficiaire', v: beneficiary },
                ...(type === 'externe' ? [{ l: 'Compte', v: ibanOrAccount }] : []),
                { l: 'Montant', v: `${amountNum.toLocaleString('fr-FR')} FCFA` },
                ...(motif ? [{ l: 'Motif', v: motif }] : []),
                { l: 'Frais', v: type === 'interne' ? 'Gratuit' : '500 FCFA' },
              ].map(({ l, v }) => (
                <div key={l} className="flex justify-between text-sm">
                  <span className="text-coris-gray-dark">{l}</span>
                  <span className="font-semibold text-coris-navy">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-coris-gray-dark font-medium py-3 rounded-xl hover:bg-coris-gray text-sm">
                Modifier
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 bg-coris-blue hover:bg-coris-blue-dark text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Confirmer'}
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
            <h3 className="text-xl font-extrabold text-coris-navy mb-2">Virement effectué !</h3>
            <p className="text-sm text-coris-gray-dark mb-2">
              <strong>{amountNum.toLocaleString('fr-FR')} FCFA</strong> envoyés à <strong>{beneficiary}</strong>
            </p>
            <p className="text-xs text-coris-gray-dark mb-6">
              Réf: VIR-{Date.now().toString(36).toUpperCase()}
            </p>
            <button onClick={reset} className="bg-coris-blue hover:bg-coris-blue-dark text-white font-bold py-3 px-8 rounded-xl text-sm">
              Nouveau virement
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
