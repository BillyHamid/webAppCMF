import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  FileSearch,
  UserCheck,
  CreditCard,
  PartyPopper,
  ArrowRight,
  AlertCircle,
  Phone,
  Mail,
  Copy,
  Check,
  RefreshCw,
  ChevronDown,
  MapPin,
  CalendarDays,
  Shield,
  LogIn,
} from 'lucide-react';

/* ═══════════════════ TYPES ═══════════════════ */

type StepStatus = 'done' | 'active' | 'upcoming';

interface TrackingStep {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  status: StepStatus;
  date?: string;
}

interface TrackingResult {
  reference: string;
  fullName: string;
  email: string;
  accountType: string;
  submittedAt: string;
  currentStatus: string;
  estimatedCompletion: string;
  agence: string;
  steps: TrackingStep[];
}

/* ═══════════════════ MOCK DATA ═══════════════════ */

const mockResults: Record<string, TrackingResult> = {
  'CMF-2026-00142': {
    reference: 'CMF-2026-00142',
    fullName: 'Aminata Ouédraogo',
    email: 'aminata@email.com',
    accountType: 'Épargne Classique',
    submittedAt: '02 Avril 2026, 14:35',
    currentStatus: 'Vérification en cours',
    estimatedCompletion: '04 Avril 2026',
    agence: 'Agence Ouaga 2000',
    steps: [
      { id: 'submitted', label: 'Demande soumise', description: 'Votre formulaire a été reçu avec succès.', icon: CheckCircle2, status: 'done', date: '02 Avr. 14:35' },
      { id: 'documents', label: 'Documents reçus', description: 'Vos pièces justificatives ont été téléchargées.', icon: FileSearch, status: 'done', date: '02 Avr. 14:35' },
      { id: 'verification', label: 'Vérification KYC', description: "Nos équipes vérifient vos informations et documents.", icon: UserCheck, status: 'active', date: 'En cours' },
      { id: 'approval', label: 'Validation', description: 'Votre dossier sera approuvé par un responsable.', icon: Shield, status: 'upcoming' },
      { id: 'account', label: 'Création du compte', description: 'Votre compte sera créé et vos accès générés.', icon: CreditCard, status: 'upcoming' },
      { id: 'ready', label: 'Compte actif', description: 'Vous recevrez vos identifiants par email et SMS.', icon: PartyPopper, status: 'upcoming' },
    ],
  },
  'CMF-2026-00098': {
    reference: 'CMF-2026-00098',
    fullName: 'Ibrahim Sawadogo',
    email: 'ibrahim.s@email.com',
    accountType: 'Compte Salarié',
    submittedAt: '28 Mars 2026, 09:12',
    currentStatus: 'Compte actif',
    estimatedCompletion: '30 Mars 2026',
    agence: 'Agence Principale Ouagadougou',
    steps: [
      { id: 'submitted', label: 'Demande soumise', description: 'Votre formulaire a été reçu avec succès.', icon: CheckCircle2, status: 'done', date: '28 Mar. 09:12' },
      { id: 'documents', label: 'Documents reçus', description: 'Vos pièces justificatives ont été téléchargées.', icon: FileSearch, status: 'done', date: '28 Mar. 09:12' },
      { id: 'verification', label: 'Vérification KYC', description: 'Vos informations ont été vérifiées avec succès.', icon: UserCheck, status: 'done', date: '28 Mar. 16:45' },
      { id: 'approval', label: 'Validation', description: 'Votre dossier a été approuvé.', icon: Shield, status: 'done', date: '29 Mar. 10:00' },
      { id: 'account', label: 'Création du compte', description: 'Votre compte a été créé.', icon: CreditCard, status: 'done', date: '29 Mar. 14:30' },
      { id: 'ready', label: 'Compte actif', description: 'Vos identifiants vous ont été envoyés.', icon: PartyPopper, status: 'done', date: '30 Mar. 08:00' },
    ],
  },
};

/* ═══════════════════ HERO ═══════════════════ */

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-coris-navy via-coris-blue-dark to-coris-blue py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-coris-red/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 backdrop-blur-sm">
            <Search size={24} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Suivre ma demande
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Entrez votre numéro de référence ou votre adresse email pour consulter 
            l'avancement de votre ouverture de compte.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════ SEARCH FORM ═══════════════════ */

function SearchForm({ onResult }: { onResult: (r: TrackingResult | null, notFound: boolean) => void }) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    // Simulate API call
    setTimeout(() => {
      const normalized = query.trim().toUpperCase();
      const found = mockResults[normalized]
        || Object.values(mockResults).find((r) => r.email.toLowerCase() === query.trim().toLowerCase());
      onResult(found || null, !found);
      setSearching(false);
    }, 1200);
  };

  return (
    <section className="relative -mt-8 z-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-2xl shadow-black/8 border border-gray-100 p-2"
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="N° de référence (CMF-2026-XXXXX) ou email..."
                className="w-full pl-11 pr-4 py-4 text-sm rounded-xl focus:outline-none placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim() || searching}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                query.trim() && !searching
                  ? 'bg-coris-blue text-white hover:bg-coris-blue-dark shadow-lg shadow-coris-blue/20'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {searching ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span className="hidden sm:inline">Recherche...</span>
                </>
              ) : (
                <>
                  <Search size={16} />
                  <span className="hidden sm:inline">Rechercher</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo hint */}
        <p className="text-center text-xs text-coris-gray-dark mt-4">
          <span className="text-gray-400">Essayez :</span>{' '}
          <button onClick={() => setQuery('CMF-2026-00142')} className="text-coris-blue font-medium hover:underline">
            CMF-2026-00142
          </button>{' '}
          <span className="text-gray-300">ou</span>{' '}
          <button onClick={() => setQuery('CMF-2026-00098')} className="text-coris-blue font-medium hover:underline">
            CMF-2026-00098
          </button>
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════ TRACKING RESULT ═══════════════════ */

function TrackingResultView({ result }: { result: TrackingResult }) {
  const [copied, setCopied] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);

  const completedSteps = result.steps.filter((s) => s.status === 'done').length;
  const progress = Math.round((completedSteps / result.steps.length) * 100);
  const isComplete = progress === 100;

  const copyRef = () => {
    navigator.clipboard.writeText(result.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 mt-10"
    >
      {/* Status header card */}
      <div className={`rounded-2xl p-6 sm:p-8 mb-6 border ${
        isComplete
          ? 'bg-green-50 border-green-200'
          : 'bg-coris-blue/[0.02] border-coris-blue/10'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-extrabold text-coris-navy">{result.fullName}</h2>
              {isComplete && (
                <span className="text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Complété
                </span>
              )}
            </div>
            <p className="text-sm text-coris-gray-dark">{result.accountType}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-coris-gray-dark font-mono bg-white px-3 py-1.5 rounded-lg border border-gray-200">
              {result.reference}
            </span>
            <button
              onClick={copyRef}
              className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-coris-sky transition-colors"
              title="Copier la référence"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-coris-navy">Progression</span>
            <span className={`text-xs font-bold ${isComplete ? 'text-green-600' : 'text-coris-blue'}`}>
              {progress}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-coris-blue'}`}
            />
          </div>
        </div>

        {/* Current status */}
        <div className={`flex items-center gap-2 text-sm ${
          isComplete ? 'text-green-700' : 'text-coris-blue'
        }`}>
          {isComplete ? <CheckCircle2 size={16} /> : <Clock size={16} className="animate-pulse" />}
          <span className="font-semibold">{result.currentStatus}</span>
        </div>
      </div>

      {/* Details toggle */}
      <button
        onClick={() => setDetailsOpen(!detailsOpen)}
        className="flex items-center justify-between w-full bg-white rounded-xl px-5 py-4 border border-gray-100 mb-4 hover:border-coris-blue/15 transition-colors group"
      >
        <span className="text-sm font-bold text-coris-navy">Détails de la demande</span>
        <ChevronDown
          size={18}
          className={`text-gray-400 group-hover:text-coris-blue transition-transform ${detailsOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {detailsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="grid sm:grid-cols-2 gap-3 pb-2">
              {[
                { icon: CalendarDays, label: 'Soumise le', value: result.submittedAt },
                { icon: Clock, label: 'Activation estimée', value: result.estimatedCompletion },
                { icon: Mail, label: 'Email', value: result.email },
                { icon: MapPin, label: 'Agence', value: result.agence },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 bg-coris-gray rounded-xl p-4">
                  <div className="w-9 h-9 bg-coris-blue/8 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-coris-blue" />
                  </div>
                  <div>
                    <p className="text-[10px] text-coris-gray-dark uppercase tracking-wider font-semibold">{label}</p>
                    <p className="text-sm font-medium text-coris-navy">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
        <h3 className="text-sm font-bold text-coris-navy mb-6 uppercase tracking-wider">Suivi en temps réel</h3>
        <div className="space-y-0">
          {result.steps.map((s, i) => {
            const isLast = i === result.steps.length - 1;
            return (
              <div key={s.id} className="flex gap-4">
                {/* Timeline line + dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 transition-all ${
                    s.status === 'done'
                      ? 'bg-green-500 border-green-500 text-white'
                      : s.status === 'active'
                      ? 'bg-coris-blue border-coris-blue text-white shadow-lg shadow-coris-blue/30 animate-pulse'
                      : 'bg-gray-50 border-gray-200 text-gray-300'
                  }`}>
                    <s.icon size={18} />
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 flex-1 min-h-[40px] my-1 rounded-full ${
                      s.status === 'done' ? 'bg-green-300' : 'bg-gray-200'
                    }`} />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className={`font-bold text-sm ${
                      s.status === 'upcoming' ? 'text-gray-400' : 'text-coris-navy'
                    }`}>
                      {s.label}
                    </h4>
                    {s.status === 'active' && (
                      <span className="text-[9px] font-bold bg-coris-blue/10 text-coris-blue px-2 py-0.5 rounded-full uppercase tracking-wider">
                        En cours
                      </span>
                    )}
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    s.status === 'upcoming' ? 'text-gray-400' : 'text-coris-gray-dark'
                  }`}>
                    {s.description}
                  </p>
                  {s.date && (
                    <p className={`text-[10px] mt-1 font-semibold ${
                      s.status === 'active' ? 'text-coris-blue' : 'text-gray-400'
                    }`}>
                      {s.date}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compte actif : accès à l’espace client */}
      {isComplete && (
        <div className="mb-8 rounded-2xl border border-green-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-extrabold text-coris-navy mb-2 flex items-center gap-2">
            <PartyPopper size={22} className="text-green-600 shrink-0" />
            Accéder à votre espace client
          </h3>
          <p className="text-sm text-coris-gray-dark mb-5 leading-relaxed">
            Votre compte est ouvert. La procédure réelle envoie vos identifiants par <strong>SMS</strong> et{' '}
            <strong>e-mail</strong>. Ensuite vous vous connectez pour consulter vos comptes (solde à{' '}
            <strong>0 FCFA</strong> jusqu’au premier dépôt) et personnaliser votre mot de passe.
          </p>
          <ol className="text-sm text-coris-navy space-y-2 mb-6 list-decimal list-inside">
            <li>Utilisez l’adresse e-mail de votre dossier : <strong>{result.email}</strong></li>
            <li>Mot de passe provisoire reçu par SMS (démo : même mot de passe que sur l’écran de connexion test)</li>
            <li>À la première connexion, effectuez un dépôt ou un virement pour alimenter votre compte</li>
          </ol>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-coris-blue text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-coris-blue-dark transition-colors shadow-md shadow-coris-blue/20"
            >
              <LogIn size={18} />
              Se connecter à mon compte
            </Link>
            <Link
              to="/particulier/epargne"
              className="inline-flex items-center gap-2 border-2 border-gray-200 text-coris-navy font-semibold px-6 py-3 rounded-full text-sm hover:border-coris-blue/30 transition-colors"
            >
              Nouvelle demande
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 border-2 border-coris-blue text-coris-blue font-semibold px-6 py-3 rounded-full text-sm hover:bg-coris-blue hover:text-white transition-all"
        >
          <Phone size={15} />
          Contacter un conseiller
        </Link>
        {!isComplete && (
          <Link
            to="/particulier/epargne"
            className="inline-flex items-center gap-2 bg-coris-blue text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-coris-blue-dark transition-colors shadow-lg shadow-coris-blue/15"
          >
            Nouvelle demande
            <ArrowRight size={15} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════ NOT FOUND ═══════════════════ */

function NotFound({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto px-4 sm:px-6 mt-12 text-center"
    >
      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <AlertCircle size={28} className="text-coris-red" />
      </div>
      <h3 className="text-xl font-extrabold text-coris-navy mb-2">Aucun résultat</h3>
      <p className="text-sm text-coris-gray-dark mb-6 leading-relaxed">
        Aucune demande trouvée pour <strong className="text-coris-navy">"{query}"</strong>. 
        Vérifiez le numéro de référence ou l'adresse email utilisée lors de la soumission.
      </p>
      <div className="bg-coris-gray rounded-xl p-5 text-left space-y-3 mb-8">
        <p className="text-xs font-bold text-coris-navy uppercase tracking-wider mb-2">Conseils</p>
        {[
          'Le numéro de référence commence par CMF- suivi de l\'année.',
          'Vérifiez dans vos emails (y compris spam) pour retrouver la confirmation.',
          'Si vous avez soumis votre demande en agence, contactez directement votre conseiller.',
        ].map((tip) => (
          <div key={tip} className="flex items-start gap-2.5">
            <CheckCircle2 size={14} className="text-coris-blue shrink-0 mt-0.5" />
            <span className="text-xs text-coris-gray-dark">{tip}</span>
          </div>
        ))}
      </div>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 text-coris-blue font-semibold text-sm hover:gap-3 transition-all"
      >
        <Phone size={15} />
        Contacter le support
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

/* ═══════════════════ PAGE ═══════════════════ */

export default function TrackRequestPage() {
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const handleResult = (r: TrackingResult | null, nf: boolean) => {
    setResult(r);
    setNotFound(nf);
  };

  return (
    <div className="pb-20">
      <Hero />
      <SearchForm
        onResult={(r, nf) => {
          handleResult(r, nf);
          if (nf) {
            const input = document.querySelector<HTMLInputElement>('input[type="text"]');
            setLastQuery(input?.value || '');
          }
        }}
      />

      <AnimatePresence mode="wait">
        {result && <TrackingResultView key={result.reference} result={result} />}
        {notFound && !result && <NotFound key="nf" query={lastQuery} />}
      </AnimatePresence>

      {!result && !notFound && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-lg mx-auto px-4 sm:px-6 mt-16 text-center"
        >
          <div className="w-20 h-20 bg-coris-gray rounded-2xl flex items-center justify-center mx-auto mb-5">
            <FileSearch size={32} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-coris-navy mb-2">Suivez votre demande</h3>
          <p className="text-sm text-coris-gray-dark leading-relaxed mb-6">
            Entrez le numéro de référence reçu par email après votre soumission, 
            ou votre adresse email pour retrouver votre dossier.
          </p>
          <div className="flex justify-center gap-6 text-xs text-coris-gray-dark">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-coris-blue" />
              Mis à jour en temps réel
            </div>
            <div className="flex items-center gap-1.5">
              <Shield size={13} className="text-coris-blue" />
              Accès sécurisé
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
