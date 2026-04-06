import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark,
  Calculator,
  Clock,
  Percent,
  Banknote,
  Info,
  Table2,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
  CheckCircle2,
  ListOrdered,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboardFinance } from '../../context/DashboardFinanceContext';
import {
  buildAmortizationSchedule,
  computeMonthlyPayment,
  totalInterest,
} from '../../lib/amortization';

const creditTypes = [
  {
    id: 'conso',
    name: 'Crédit à la consommation',
    desc: 'Projets personnels, équipement, besoins ponctuels.',
    defaultRate: 14,
    tauxLabel: '12 % à 18 %',
    duree: '6 à 60 mois',
    montant: 'Jusqu’à 5 000 000 FCFA',
    maxMonths: 60,
    maxAmount: 5_000_000,
  },
  {
    id: 'immo',
    name: 'Crédit immobilier',
    desc: 'Acquisition ou construction de logement.',
    defaultRate: 10,
    tauxLabel: '9 % à 11 %',
    duree: '5 à 20 ans',
    montant: 'Jusqu’à 50 000 000 FCFA',
    maxMonths: 240,
    maxAmount: 50_000_000,
  },
  {
    id: 'auto',
    name: 'Crédit véhicule',
    desc: 'Véhicule neuf ou d’occasion.',
    defaultRate: 13,
    tauxLabel: '11 % à 15 %',
    duree: '12 à 72 mois',
    montant: 'Jusqu’à 15 000 000 FCFA',
    maxMonths: 72,
    maxAmount: 15_000_000,
  },
  {
    id: 'pro',
    name: 'Crédit professionnel',
    desc: 'Trésorerie, investissement matériel, fonds de roulement.',
    defaultRate: 12,
    tauxLabel: '10 % à 14 %',
    duree: '12 à 84 mois',
    montant: 'Sur étude de dossier',
    maxMonths: 84,
    maxAmount: 50_000_000,
  },
  {
    id: 'express',
    name: 'Crédit express',
    desc: 'Besoin urgent, réponse accélérée.',
    defaultRate: 16,
    tauxLabel: '15 % à 18 %',
    duree: '3 à 24 mois',
    montant: 'Jusqu’à 2 000 000 FCFA',
    maxMonths: 24,
    maxAmount: 2_000_000,
  },
];

function formatFcfa(n: number) {
  return Math.round(n).toLocaleString('fr-FR') + ' FCFA';
}

export default function CreditModulePage() {
  const { user } = useAuth();
  const { submitCreditApplication, creditApplications } = useDashboardFinance();

  const [selectedTypeId, setSelectedTypeId] = useState(creditTypes[0].id);
  const selectedType = creditTypes.find((c) => c.id === selectedTypeId)!;

  const [amount, setAmount] = useState(1_500_000);
  const [months, setMonths] = useState(24);
  const [rate, setRate] = useState(selectedType.defaultRate);

  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [activeTab, setActiveTab] = useState<'simulation' | 'demande'>('simulation');

  const [formPurpose, setFormPurpose] = useState('');
  const [formIncome, setFormIncome] = useState('');
  const [formProfession, setFormProfession] = useState('');
  const [formPhone, setFormPhone] = useState(user?.phone ?? '');
  const [formEmail, setFormEmail] = useState(user?.email ?? '');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const monthly = useMemo(
    () => computeMonthlyPayment(amount, rate, months),
    [amount, rate, months]
  );

  const schedule = useMemo(
    () => buildAmortizationSchedule(amount, rate, months),
    [amount, rate, months]
  );

  const interestTotal = useMemo(() => totalInterest(schedule), [schedule]);
  const totalRepay = amount + interestTotal;

  const schedulePreview = showFullSchedule ? schedule : schedule.slice(0, 12);

  const applyTypeDefaults = (id: string) => {
    const t = creditTypes.find((c) => c.id === id);
    if (!t) return;
    setRate(t.defaultRate);
    setMonths(Math.min(months, t.maxMonths));
    setAmount(Math.min(amount, t.maxAmount));
  };

  const handleSubmitDemand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPurpose.trim() || !formIncome || !formProfession.trim() || !formPhone.trim() || !formEmail.trim()) {
      return;
    }
    const app = submitCreditApplication({
      creditTypeId: selectedTypeId,
      creditTypeName: selectedType.name,
      amount,
      months,
      rate,
      purpose: formPurpose,
      monthlyIncome: formIncome,
      profession: formProfession,
      phone: formPhone,
      email: formEmail,
    });
    setSubmittedRef(app.ref);
    setTimeout(() => setSubmittedRef(null), 8000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-8">
      <div>
        <h1 className="text-xl font-black text-coris-navy flex items-center gap-2">
          <Landmark size={22} className="text-coris-blue" />
          Crédit
        </h1>
        <p className="text-sm text-coris-gray-dark mt-1">
          Simulation avec tableau d’amortissement et demande en ligne — instruction sous réserve d’acceptation du dossier.
        </p>
      </div>

      <div className="bg-coris-blue/5 border border-coris-blue/15 rounded-xl px-4 py-3 flex gap-2 text-xs text-coris-navy">
        <Info size={16} className="text-coris-blue shrink-0 mt-0.5" />
        <p>
          Les résultats sont indicatifs (assurance / frais de dossier non inclus). Une offre ferme vous sera communiquée après analyse.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-coris-gray rounded-xl w-fit flex-wrap">
        {(
          [
            { id: 'simulation' as const, label: 'Simulation & amortissement' },
            { id: 'demande' as const, label: 'Demande de crédit' },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === t.id
                ? 'bg-white text-coris-navy shadow-md'
                : 'text-coris-gray-dark hover:text-coris-navy'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'simulation' && (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {creditTypes.map((c, i) => (
              <motion.button
                key={c.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => {
                  setSelectedTypeId(c.id);
                  applyTypeDefaults(c.id);
                }}
                className={`text-left rounded-2xl border p-5 transition-all ${
                  selectedTypeId === c.id
                    ? 'border-coris-blue bg-coris-blue/[0.04] shadow-lg shadow-coris-blue/10'
                    : 'border-gray-100 bg-white hover:border-coris-blue/30'
                }`}
              >
                <h2 className="font-bold text-coris-navy text-sm mb-2">{c.name}</h2>
                <p className="text-xs text-coris-gray-dark mb-3 min-h-[2.5rem]">{c.desc}</p>
                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center gap-2 text-coris-gray-dark">
                    <Percent size={12} className="text-coris-blue shrink-0" />
                    <span>
                      <strong className="text-coris-navy">Taux :</strong> {c.tauxLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-coris-gray-dark">
                    <Clock size={12} className="text-coris-blue shrink-0" />
                    <span>
                      <strong className="text-coris-navy">Durée :</strong> {c.duree}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-coris-gray-dark">
                    <Banknote size={12} className="text-coris-blue shrink-0" />
                    <span>
                      <strong className="text-coris-navy">Montant :</strong> {c.montant}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8"
          >
            <h2 className="text-sm font-black text-coris-navy mb-6 flex items-center gap-2">
              <Calculator size={18} className="text-coris-blue" />
              Paramètres de simulation — {selectedType.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2 text-xs font-semibold text-coris-navy">
                    <span>Montant emprunté</span>
                    <span className="text-coris-blue">{amount.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <input
                    type="range"
                    min={100_000}
                    max={selectedType.maxAmount}
                    step={50_000}
                    value={Math.min(amount, selectedType.maxAmount)}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-coris-blue"
                  />
                  <p className="text-[10px] text-coris-gray-dark mt-1">
                    Plafond indicatif : {selectedType.maxAmount.toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-xs font-semibold text-coris-navy">
                    <span>Durée</span>
                    <span className="text-coris-blue">{months} mois</span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={selectedType.maxMonths}
                    step={1}
                    value={Math.min(months, selectedType.maxMonths)}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full accent-coris-blue"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-xs font-semibold text-coris-navy">
                    <span>Taux annuel nominal</span>
                    <span className="text-coris-blue">{rate.toFixed(1)} %</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={24}
                    step={0.5}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full accent-coris-blue"
                  />
                  <button
                    type="button"
                    onClick={() => setRate(selectedType.defaultRate)}
                    className="text-[10px] text-coris-blue font-semibold mt-1 hover:underline"
                  >
                    Réinitialiser au taux indicatif ({selectedType.defaultRate} %)
                  </button>
                </div>
              </div>
              <div className="bg-coris-gray rounded-2xl p-6 space-y-4">
                <div className="text-center pb-4 border-b border-gray-200">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-coris-gray-dark mb-1">
                    Mensualité constante
                  </p>
                  <p className="text-3xl font-black text-coris-navy">{formatFcfa(monthly)}</p>
                  <p className="text-xs text-coris-gray-dark">par mois</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-coris-gray-dark">Capital emprunté</p>
                    <p className="font-bold text-coris-navy">{formatFcfa(amount)}</p>
                  </div>
                  <div>
                    <p className="text-coris-gray-dark">Intérêts totaux</p>
                    <p className="font-bold text-coris-red">{formatFcfa(interestTotal)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-coris-gray-dark">Total à rembourser</p>
                    <p className="font-bold text-coris-navy">{formatFcfa(totalRepay)}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tableau d'amortissement */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-sm font-black text-coris-navy flex items-center gap-2">
                <Table2 size={18} className="text-coris-blue" />
                Tableau d’amortissement
              </h2>
              <button
                type="button"
                onClick={() => setShowFullSchedule(!showFullSchedule)}
                className="inline-flex items-center gap-2 text-xs font-bold text-coris-blue hover:underline"
              >
                {showFullSchedule ? (
                  <>
                    Voir les 12 premières échéances <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    Afficher tout ({schedule.length} lignes) <ChevronDown size={14} />
                  </>
                )}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-coris-gray/80 text-coris-gray-dark font-bold uppercase tracking-wider">
                    <th className="px-4 py-3">Mois</th>
                    <th className="px-4 py-3 text-right">Mensualité</th>
                    <th className="px-4 py-3 text-right">Capital</th>
                    <th className="px-4 py-3 text-right">Intérêts</th>
                    <th className="px-4 py-3 text-right">Capital restant dû</th>
                  </tr>
                </thead>
                <tbody>
                  {schedulePreview.map((row) => (
                    <tr key={row.month} className="border-t border-gray-50 hover:bg-coris-gray/30">
                      <td className="px-4 py-2.5 font-medium text-coris-navy">{row.month}</td>
                      <td className="px-4 py-2.5 text-right font-semibold">{formatFcfa(row.payment)}</td>
                      <td className="px-4 py-2.5 text-right text-emerald-700">{formatFcfa(row.principal)}</td>
                      <td className="px-4 py-2.5 text-right text-amber-700">{formatFcfa(row.interest)}</td>
                      <td className="px-4 py-2.5 text-right text-coris-gray-dark">{formatFcfa(row.balanceAfter)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!showFullSchedule && schedule.length > 12 && (
              <p className="px-6 py-3 text-[11px] text-coris-gray-dark bg-coris-gray/30 border-t border-gray-100">
                … {schedule.length - 12} autres lignes — cliquez sur « Afficher tout » pour le détail complet.
              </p>
            )}
          </motion.div>
        </>
      )}

      {activeTab === 'demande' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmitDemand}
            className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6"
          >
            <h2 className="text-sm font-black text-coris-navy flex items-center gap-2">
              <FileText size={18} className="text-coris-blue" />
              Dossier de demande
            </h2>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark ml-1 mb-2 block">
                Type de crédit
              </label>
              <select
                value={selectedTypeId}
                onChange={(e) => {
                  setSelectedTypeId(e.target.value);
                  applyTypeDefaults(e.target.value);
                }}
                className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm font-medium text-coris-navy bg-coris-gray/30 focus:outline-none focus:ring-2 focus:ring-coris-blue/20"
              >
                {creditTypes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark ml-1 mb-2 block">
                  Montant demandé (FCFA)
                </label>
                <input
                  type="number"
                  min={100_000}
                  max={selectedType.maxAmount}
                  step={50_000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark ml-1 mb-2 block">
                  Durée (mois)
                </label>
                <input
                  type="number"
                  min={6}
                  max={selectedType.maxMonths}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark ml-1 mb-2 block">
                  Taux annuel (%)
                </label>
                <input
                  type="number"
                  min={8}
                  max={24}
                  step={0.5}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark ml-1 mb-2 block">
                Objet du financement *
              </label>
              <textarea
                value={formPurpose}
                onChange={(e) => setFormPurpose(e.target.value)}
                rows={4}
                placeholder="Décrivez votre projet (achat, travaux, trésorerie…)"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-coris-blue/20"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark ml-1 mb-2 block">
                  Revenu mensuel net *
                </label>
                <select
                  value={formIncome}
                  onChange={(e) => setFormIncome(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm bg-coris-gray/30"
                  required
                >
                  <option value="">Sélectionner…</option>
                  <option>Moins de 100 000 FCFA</option>
                  <option>100 000 – 300 000 FCFA</option>
                  <option>300 000 – 500 000 FCFA</option>
                  <option>500 000 – 1 000 000 FCFA</option>
                  <option>Plus de 1 000 000 FCFA</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark ml-1 mb-2 block">
                  Profession *
                </label>
                <input
                  type="text"
                  value={formProfession}
                  onChange={(e) => setFormProfession(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm"
                  placeholder="Ex. : Fonctionnaire, commerçant…"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark ml-1 mb-2 block">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark ml-1 mb-2 block">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm"
                  required
                />
              </div>
            </div>

            <div className="rounded-xl bg-coris-gray/50 p-4 text-xs text-coris-gray-dark space-y-1">
              <p>
                <strong className="text-coris-navy">Mensualité indicative :</strong> {formatFcfa(monthly)} —{' '}
                <strong className="text-coris-navy">Intérêts totaux :</strong> {formatFcfa(interestTotal)}
              </p>
            </div>

            <AnimatePresence>
              {submittedRef && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-900"
                >
                  <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-bold">Demande enregistrée</p>
                    <p className="text-xs mt-1">
                      Référence : <span className="font-mono font-bold">{submittedRef}</span> — un conseiller vous contactera sous 48h ouvrées.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full h-14 rounded-xl font-black uppercase tracking-[0.15em] text-xs bg-coris-red hover:bg-coris-red-dark text-white shadow-lg shadow-coris-red/20 flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Envoyer la demande
            </button>
          </motion.form>

          <div className="space-y-4">
            <div className="bg-coris-navy rounded-2xl p-6 text-white">
              <h3 className="text-sm font-black mb-3 flex items-center gap-2">
                <ListOrdered size={16} />
                Mes demandes
              </h3>
              {creditApplications.length === 0 ? (
                <p className="text-xs text-white/60">Aucune demande pour le moment.</p>
              ) : (
                <ul className="space-y-3 max-h-80 overflow-y-auto text-xs">
                  {creditApplications.map((a) => (
                    <li key={a.id} className="border-b border-white/10 pb-3 last:border-0">
                      <p className="font-mono font-bold text-coris-sky">{a.ref}</p>
                      <p className="text-white/80 mt-1">{a.creditTypeName}</p>
                      <p className="text-white/50">
                        {formatFcfa(a.amount)} — {a.months} mois @ {a.rate}%
                      </p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold text-amber-300">
                        {a.status === 'en_cours' ? 'En cours d’instruction' : a.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
