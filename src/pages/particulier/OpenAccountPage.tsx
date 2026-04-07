import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User,
  Briefcase,
  CreditCard,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  Building2,
  PiggyBank,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-coris-blue via-coris-blue-dark to-coris-navy py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coris-red/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={14} className="text-coris-red" />
            100% en ligne
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
            Ouvrez votre compte <br className="hidden sm:block" />
            <span className="text-coris-red">en quelques minutes</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Pas besoin de vous déplacer. Remplissez le formulaire, envoyez vos documents 
            et recevez votre compte activé rapidement.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: Clock, text: 'Traitement en 24h' },
              { icon: ShieldCheck, text: 'Données sécurisées' },
              { icon: MapPin, text: 'Disponible partout' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/40">
                <Icon size={16} className="text-coris-red" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ACCOUNT TYPE SELECTOR
   ═══════════════════════════════════════════════════════════ */

type AccountProfile = 'individuel' | 'association' | 'societe' | 'entreprise_individuelle';

interface AccountTypeOption {
  id: string;
  icon: React.ElementType;
  name: string;
  desc: string;
  minDeposit: string;
  profile: AccountProfile;
  /** Liste officielle des pièces à fournir (affichée à l’étape 1 et documents) */
  requirements: string[];
}

const accountTypes: AccountTypeOption[] = [
  {
    id: 'epargne',
    icon: PiggyBank,
    name: 'Compte épargne',
    desc: 'Épargnez en toute sécurité avec les pièces exigées par notre procédure d’ouverture.',
    minDeposit: '10 000 FCFA',
    profile: 'individuel',
    requirements: [
      "Copie de pièce d'identité valide du titulaire (CNIB ou passeport)",
      "Justificatif d'adresse du titulaire du compte",
      "Deux photos d'identité du titulaire du compte",
      "Une facture SONABEL ou ONEA au nom du demandeur / titulaire du compte",
      'Dépôt initial de dix mille (10 000) FCFA',
      "Nom et adresse d'une personne à contacter en cas de besoin",
    ],
  },
  {
    id: 'personne_physique',
    icon: User,
    name: 'Compte personne physique',
    desc: 'Compte courant pour les particuliers : opérations courantes et services associés.',
    minDeposit: '10 000 FCFA',
    profile: 'individuel',
    requirements: [
      "Copie de pièce d'identité valide du titulaire (CNIB ou passeport)",
      "Justificatif d'adresse du titulaire du compte",
      "Deux photos d'identité du titulaire du compte",
      'Une facture SONABEL ou ONEA au nom du titulaire du compte',
      'Dépôt initial de dix mille (10 000) FCFA',
      "Identité, coordonnées et adresse de la personne à contacter en cas de besoin",
    ],
  },
  {
    id: 'association',
    icon: Building2,
    name: 'Compte association',
    desc: 'Réservé aux associations reconnues : dossier juridique et désignation des signataires.',
    minDeposit: '10 000 FCFA',
    profile: 'association',
    requirements: [
      "Copie du règlement intérieur de l'association, en conformité avec la loi",
      'Copie des statuts',
      "Copie du procès-verbal de l'assemblée constitutive",
      "Copie du récépissé de reconnaissance (loi n° 064-2015/CNT portant liberté d'association)",
      "Copie du PV de l'AG autorisant l'ouverture du compte (s'il y a lieu)",
      'Lettre de désignation des signataires sur le compte',
      "Copie de pièce d'identité valide de chaque signataire (CNIB ou passeport)",
      "Deux photos d'identité de chaque signataire",
      "Une facture SONABEL ou ONEA au nom de l'association",
      'Dépôt initial de dix mille (10 000) FCFA',
    ],
  },
  {
    id: 'societe',
    icon: Briefcase,
    name: 'Compte de société',
    desc: 'Personnes morales : dossier complet (RCCM, IFU, statuts) et dépôt initial adapté.',
    minDeposit: '50 000 FCFA',
    profile: 'societe',
    requirements: [
      "Copie de pièce d'identité valide du titulaire du compte (CNIB ou passeport)",
      'Copie du RCCM',
      'Copie du numéro IFU',
      'Copie des statuts de la société',
      "Justificatif d'adresse du titulaire du compte",
      "Deux photos d'identité du titulaire du compte",
      "Une facture SONABEL ou ONEA au nom du titulaire du compte",
      'Dépôt initial de cinquante mille (50 000) F CFA',
      "Décision du conseil d'administration autorisant l'ouverture du compte (s'il y a lieu)",
      "Autorisation d'exercer pour certaines activités spécifiques (le cas échéant)",
      "PV de nomination du gérant (SARL) ou du directeur général (SA) s'il n'est pas prévu aux statuts",
    ],
  },
  {
    id: 'entreprise_individuelle',
    icon: CreditCard,
    name: 'Compte entreprise individuelle',
    desc: 'Pour les entrepreneurs individuels disposant du RCCM et du numéro IFU.',
    minDeposit: '10 000 FCFA',
    profile: 'entreprise_individuelle',
    requirements: [
      "Copie de pièce d'identité valide du titulaire (CNIB ou passeport)",
      'Copie du RCCM',
      'Copie du numéro IFU',
      "Justificatif d'adresse du titulaire du compte",
      "Deux photos d'identité du titulaire du compte",
      "Une facture SONABEL ou ONEA au nom du titulaire du compte",
      'Dépôt initial de dix mille (10 000) FCFA',
      "Identité et justificatif d'adresse de la personne à contacter en cas de besoin",
    ],
  },
];

function getAccountById(id: string) {
  return accountTypes.find((a) => a.id === id);
}

/* ═══════════════════════════════════════════════════════════
   MULTI-STEP FORM
   ═══════════════════════════════════════════════════════════ */

const stepsMeta = [
  { label: 'Type de compte', icon: CreditCard },
  { label: 'Identité & coordonnées', icon: User },
  { label: 'Compléments', icon: Briefcase },
  { label: 'Documents', icon: Upload },
  { label: 'Récapitulatif', icon: FileCheck },
];

/** Libellés pour les zones de dépôt de fichiers selon le type de compte */
function getDocumentUploadSlots(accountId: string): { id: string; label: string; subtitle?: string; optional?: boolean }[] {
  const commonSonabel = (hint: string) => ({
    id: 'facture_sonabel_onea',
    label: 'Facture SONABEL ou ONEA',
    subtitle: hint,
  });

  switch (accountId) {
    case 'epargne':
      return [
        { id: 'piece_identite', label: "Copie de pièce d'identité (CNIB ou passeport)", subtitle: 'Recto-verso lisible' },
        { id: 'justificatif_adresse', label: "Justificatif d'adresse du titulaire", subtitle: 'Moins de 3 mois' },
        { id: 'photo_identite_1', label: "Première photo d'identité du titulaire" },
        { id: 'photo_identite_2', label: "Deuxième photo d'identité du titulaire" },
        commonSonabel('Au nom du demandeur / titulaire du compte'),
      ];
    case 'personne_physique':
      return [
        { id: 'piece_identite', label: "Copie de pièce d'identité (CNIB ou passeport)", subtitle: 'Recto-verso lisible' },
        { id: 'justificatif_adresse', label: "Justificatif d'adresse du titulaire", subtitle: 'Moins de 3 mois' },
        { id: 'photo_identite_1', label: "Première photo d'identité du titulaire" },
        { id: 'photo_identite_2', label: "Deuxième photo d'identité du titulaire" },
        commonSonabel('Au nom du titulaire du compte'),
      ];
    case 'association':
      return [
        { id: 'reglement_interieur', label: "Règlement intérieur (conforme à la loi)", subtitle: 'Copie signée' },
        { id: 'statuts', label: 'Statuts de l’association', subtitle: 'Copie' },
        { id: 'pv_constitutif', label: "Procès-verbal de l’assemblée constitutive", subtitle: 'Copie' },
        { id: 'recepisse_064', label: "Récépissé de reconnaissance (loi n° 064-2015/CNT)", subtitle: 'Copie' },
        { id: 'pv_ag_ouverture', label: "PV de l’AG autorisant l’ouverture du compte", subtitle: "Si applicable — sinon laisser vide", optional: true },
        { id: 'lettre_signataires', label: 'Lettre de désignation des signataires sur le compte', subtitle: 'Copie' },
        { id: 'id_signataires', label: "Pièces d’identité des signataires (CNIB ou passeport)", subtitle: 'Un fichier par signataire ou document groupé' },
        { id: 'photos_signataires', label: "Photos d’identité des signataires", subtitle: 'Deux photos par signataire' },
        commonSonabel('Au nom de l’association'),
      ];
    case 'societe':
      return [
        { id: 'piece_identite_titulaire', label: "Pièce d’identité du titulaire du compte (CNIB ou passeport)", subtitle: 'Copie' },
        { id: 'rccm', label: 'RCCM', subtitle: 'Copie' },
        { id: 'ifu', label: 'Numéro IFU', subtitle: 'Copie' },
        { id: 'statuts_societe', label: 'Statuts de la société', subtitle: 'Copie' },
        { id: 'justificatif_adresse_titulaire', label: "Justificatif d’adresse du titulaire", subtitle: 'Moins de 3 mois' },
        { id: 'photo_identite_1', label: "Première photo d’identité du titulaire" },
        { id: 'photo_identite_2', label: "Deuxième photo d’identité du titulaire" },
        commonSonabel('Au nom du titulaire du compte'),
        { id: 'decision_ca', label: "Décision du conseil d’administration autorisant l’ouverture", subtitle: "Si applicable", optional: true },
        { id: 'autorisation_exercer', label: "Autorisation d’exercer (activités réglementées)", subtitle: 'Le cas échéant', optional: true },
        { id: 'pv_nomination', label: 'PV de nomination du gérant (SARL) ou du DG (SA)', subtitle: "Si le gérant / DG n’est pas prévu aux statuts", optional: true },
      ];
    case 'entreprise_individuelle':
      return [
        { id: 'piece_identite', label: "Copie de pièce d'identité (CNIB ou passeport)", subtitle: 'Recto-verso lisible' },
        { id: 'rccm', label: 'RCCM', subtitle: 'Copie' },
        { id: 'ifu', label: 'Numéro IFU', subtitle: 'Copie' },
        { id: 'justificatif_adresse', label: "Justificatif d'adresse du titulaire", subtitle: 'Moins de 3 mois' },
        { id: 'photo_identite_1', label: "Première photo d'identité du titulaire" },
        { id: 'photo_identite_2', label: "Deuxième photo d'identité du titulaire" },
        commonSonabel('Au nom du titulaire du compte'),
        { id: 'contact_urgence_id', label: "Identité de la personne à contacter", subtitle: 'Copie de pièce ou formulaire' },
        { id: 'contact_urgence_adresse', label: "Justificatif d'adresse de la personne à contacter", subtitle: 'Moins de 3 mois' },
      ];
    default:
      return [
        { id: 'piece_identite', label: "Pièce d'identité", subtitle: 'CNIB ou passeport' },
        { id: 'justificatif_adresse', label: "Justificatif d'adresse" },
      ];
  }
}

function AccountForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    accountType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: 'Burkinabè',
    idType: '',
    idNumber: '',
    address: '',
    city: 'Ouagadougou',
    profession: '',
    employer: '',
    monthlyIncome: '',
    password: '',
    acceptTerms: false,
    /** Personne à contacter (épargne, personne physique, entreprise individuelle) */
    contactPersonName: '',
    contactPersonPhone: '',
    contactPersonAddress: '',
    /** Structure (association, société) + représentant */
    orgDenomination: '',
    orgRccm: '',
    orgIfu: '',
    orgSiegeAddress: '',
    orgPhone: '',
    orgEmail: '',
    representativeFirstName: '',
    representativeLastName: '',
    representativePhone: '',
    /** Association : précisions signataires */
    associationSignatoriesDetails: '',
    /** Société */
    legalForm: '',
    activitySector: '',
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedAccount = getAccountById(form.accountType);

  const canNext = () => {
    const t = selectedAccount;
    switch (step) {
      case 0:
        return !!form.accountType;
      case 1: {
        if (!t) return false;
        if (t.id === 'epargne' || t.id === 'personne_physique') {
          return !!(
            form.firstName &&
            form.lastName &&
            form.email &&
            form.phone &&
            form.dateOfBirth &&
            form.gender &&
            form.address &&
            form.contactPersonName &&
            form.contactPersonPhone &&
            form.contactPersonAddress
          );
        }
        if (t.id === 'entreprise_individuelle') {
          return !!(
            form.firstName &&
            form.lastName &&
            form.email &&
            form.phone &&
            form.dateOfBirth &&
            form.gender &&
            form.address &&
            form.orgRccm &&
            form.orgIfu &&
            form.contactPersonName &&
            form.contactPersonPhone &&
            form.contactPersonAddress
          );
        }
        if (t.id === 'association') {
          return !!(
            form.orgDenomination &&
            form.orgSiegeAddress &&
            form.orgPhone &&
            form.orgEmail &&
            form.representativeFirstName &&
            form.representativeLastName &&
            form.representativePhone
          );
        }
        if (t.id === 'societe') {
          return !!(
            form.orgDenomination &&
            form.orgRccm &&
            form.orgIfu &&
            form.orgSiegeAddress &&
            form.orgPhone &&
            form.orgEmail &&
            form.representativeFirstName &&
            form.representativeLastName &&
            form.representativePhone
          );
        }
        return false;
      }
      case 2: {
        if (!t) return false;
        if (t.profile === 'individuel' || t.profile === 'entreprise_individuelle') {
          return !!(form.profession && form.monthlyIncome);
        }
        if (t.profile === 'association') {
          return form.associationSignatoriesDetails.trim().length >= 8;
        }
        if (t.profile === 'societe') {
          return !!(form.legalForm && form.activitySector);
        }
        return false;
      }
      case 3:
        return !!(form.idType && form.idNumber && form.password && form.password.length >= 8);
      case 4:
        return form.acceptTerms;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    const ref = `CMF-2026-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
    setSubmissionRef(ref);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 sm:py-20 px-4"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="text-green-600" size={36} />
        </div>
        <h2 className="text-3xl font-extrabold text-coris-navy mb-3">Demande envoyée !</h2>
        <p className="text-coris-gray-dark max-w-md mx-auto mb-4">
          Votre demande d'ouverture de compte <strong>{selectedAccount?.name}</strong> a été 
          soumise avec succès. Notre équipe la traitera sous 24 heures ouvrées.
        </p>
        <div className="inline-flex items-center gap-2 bg-coris-blue/5 border border-coris-blue/15 rounded-xl px-5 py-3 mb-6">
          <span className="text-xs text-coris-gray-dark">Votre référence :</span>
          <span className="font-mono font-bold text-coris-navy">{submissionRef}</span>
        </div>

        <div className="max-w-xl mx-auto text-left bg-coris-gray rounded-2xl border border-gray-100 p-5 sm:p-6 mb-8">
          <p className="text-xs font-bold text-coris-navy uppercase tracking-wider mb-3">Ensuite, comment ouvrir votre espace client ?</p>
          <ol className="text-sm text-coris-gray-dark space-y-2 list-decimal list-inside leading-relaxed">
            <li>
              <strong>Vérification du dossier</strong> (KYC) : vous suivez l’état sur la page{' '}
              <Link to="/suivi" className="text-coris-blue font-semibold underline">Suivre ma demande</Link> avec votre référence ou votre e-mail.
            </li>
            <li>
              <strong>Validation</strong> : une fois le dossier approuvé, Coris Meso Finance crée votre compte. Vous recevez un <strong>SMS</strong> et un <strong>e-mail</strong> avec vos identifiants d’accès à l’espace client.
            </li>
            <li>
              <strong>Première connexion</strong> : vous vous connectez avec cet e-mail et le mot de passe provisoire, puis vous le personnalisez. Votre <strong>solde démarre à 0 FCFA</strong> ; le type de compte demandé (épargne, courant, etc.) apparaît dans votre espace après activation.
            </li>
            <li>
              <strong>Alimentation</strong> : dépôt en agence, virement ou mobile money pour créditer votre compte.
            </li>
          </ol>
        </div>

        <p className="text-sm text-coris-gray-dark mb-8 max-w-md mx-auto">
          Un e-mail de confirmation a été envoyé à <strong>{form.email}</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-coris-blue text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-coris-blue-dark transition-colors"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/suivi"
            className="inline-flex items-center gap-2 border-2 border-coris-blue text-coris-blue font-semibold px-7 py-3 rounded-full text-sm hover:bg-coris-blue hover:text-white transition-all"
          >
            Suivre ma demande
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Stepper */}
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {stepsMeta.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={s.label} className="flex items-center flex-1 last:flex-initial">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => i < step && setStep(i)}
                    disabled={i > step}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                      done
                        ? 'bg-green-500 text-white shadow-md shadow-green-500/20 cursor-pointer'
                        : active
                        ? 'bg-coris-blue text-white shadow-lg shadow-coris-blue/25 scale-110'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {done ? <Check size={18} /> : <s.icon size={18} />}
                  </button>
                  <span className={`mt-2 text-[10px] font-semibold text-center leading-tight max-w-[80px] hidden sm:block ${
                    active ? 'text-coris-blue' : done ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {i < stepsMeta.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mt-[-20px] sm:mt-0 rounded-full transition-colors ${
                    done ? 'bg-green-400' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm text-coris-gray-dark mt-5 sm:hidden font-medium">
          Étape {step + 1}/{stepsMeta.length} — {stepsMeta[step].label}
        </p>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          {/* ── Step 0 : Account Type ── */}
          {step === 0 && (
            <div>
              <h3 className="text-xl font-bold text-coris-navy mb-1">Choisissez votre type de compte</h3>
              <p className="text-sm text-coris-gray-dark mb-6">
                Les pièces listées ci-dessous sont celles exigées pour l’ouverture. Le dépôt initial se fait en agence ou selon les instructions envoyées après validation du dossier.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {accountTypes.map((acc) => {
                  const selected = form.accountType === acc.id;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => update('accountType', acc.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${
                        selected
                          ? 'border-coris-blue bg-coris-blue/[0.03] shadow-lg shadow-coris-blue/10'
                          : 'border-gray-150 hover:border-coris-blue/30 bg-white hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          selected ? 'bg-coris-blue text-white' : 'bg-coris-blue/8 text-coris-blue'
                        }`}>
                          <acc.icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-coris-navy text-sm leading-snug">{acc.name}</h4>
                            {selected && (
                              <div className="w-5 h-5 bg-coris-blue rounded-full flex items-center justify-center shrink-0">
                                <Check size={12} className="text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-coris-gray-dark mb-2">{acc.desc}</p>
                          <p className="text-[10px] font-bold text-coris-red uppercase tracking-wide mb-2">
                            Dépôt initial : {acc.minDeposit}
                          </p>
                          <p className="text-[10px] font-semibold text-coris-navy uppercase tracking-wider mb-1.5">Pièces requises</p>
                          <ul className="text-[11px] text-coris-gray-dark space-y-1 list-disc list-inside leading-relaxed">
                            {acc.requirements.map((req) => (
                              <li key={req}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 1 : Identité & coordonnées (selon le type) ── */}
          {step === 1 && selectedAccount && (
            <div>
              <h3 className="text-xl font-bold text-coris-navy mb-1">
                {selectedAccount.profile === 'association' || selectedAccount.profile === 'societe'
                  ? 'Structure & représentant légal'
                  : 'Titulaire & coordonnées'}
              </h3>
              <p className="text-sm text-coris-gray-dark mb-6">
                {selectedAccount.profile === 'association' || selectedAccount.profile === 'societe'
                  ? 'Renseignez les informations de la structure et du représentant désigné.'
                  : 'Les informations doivent correspondre à votre pièce d’identité et à votre dossier.'}
              </p>

              {(selectedAccount.id === 'epargne' ||
                selectedAccount.id === 'personne_physique' ||
                selectedAccount.id === 'entreprise_individuelle') && (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField label="Prénom" value={form.firstName} onChange={(v) => update('firstName', v)} placeholder="Aminata" required />
                    <InputField label="Nom de famille" value={form.lastName} onChange={(v) => update('lastName', v)} placeholder="Ouédraogo" required />
                    <InputField label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} placeholder="aminata@email.com" required />
                    <InputField label="Téléphone" type="tel" value={form.phone} onChange={(v) => update('phone', v)} placeholder="+226 70 00 00 00" required />
                    <InputField label="Date de naissance" type="date" value={form.dateOfBirth} onChange={(v) => update('dateOfBirth', v)} required />
                    <SelectField label="Genre" value={form.gender} onChange={(v) => update('gender', v)} options={['Homme', 'Femme']} required />
                    <InputField label="Nationalité" value={form.nationality} onChange={(v) => update('nationality', v)} />
                    <InputField label="Ville" value={form.city} onChange={(v) => update('city', v)} />
                    <div className="sm:col-span-2">
                      <InputField label="Adresse complète du titulaire" value={form.address} onChange={(v) => update('address', v)} placeholder="Quartier, secteur, rue..." required />
                    </div>
                  </div>

                  {selectedAccount.id === 'entreprise_individuelle' && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <p className="text-xs font-bold text-coris-navy uppercase tracking-wider mb-4">Entreprise individuelle</p>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <InputField label="RCCM" value={form.orgRccm} onChange={(v) => update('orgRccm', v)} placeholder="Numéro d’immatriculation" required />
                        <InputField label="Numéro IFU" value={form.orgIfu} onChange={(v) => update('orgIfu', v)} placeholder="IFU" required />
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs font-bold text-coris-navy uppercase tracking-wider mb-2">
                      {selectedAccount.id === 'personne_physique'
                        ? 'Personne à contacter en cas de besoin (identité, coordonnées, adresse)'
                        : 'Personne à contacter en cas de besoin (nom et adresse)'}
                    </p>
                    <p className="text-xs text-coris-gray-dark mb-4">
                      {selectedAccount.id === 'entreprise_individuelle'
                        ? 'Joindrez également la pièce et le justificatif d’adresse de cette personne à l’étape documents.'
                        : 'Ces informations complètent votre dossier conformément à nos exigences.'}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <InputField label="Nom complet" value={form.contactPersonName} onChange={(v) => update('contactPersonName', v)} placeholder="Nom et prénom" required />
                      <InputField label="Téléphone" type="tel" value={form.contactPersonPhone} onChange={(v) => update('contactPersonPhone', v)} placeholder="+226 ..." required />
                      <div className="sm:col-span-2">
                        <InputField label="Adresse" value={form.contactPersonAddress} onChange={(v) => update('contactPersonAddress', v)} placeholder="Adresse complète" required />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {selectedAccount.id === 'association' && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-bold text-coris-navy uppercase tracking-wider mb-4">Association</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <InputField label="Dénomination de l’association" value={form.orgDenomination} onChange={(v) => update('orgDenomination', v)} required />
                      </div>
                      <InputField label="Téléphone de la structure" type="tel" value={form.orgPhone} onChange={(v) => update('orgPhone', v)} required />
                      <InputField label="Email de la structure" type="email" value={form.orgEmail} onChange={(v) => update('orgEmail', v)} required />
                      <div className="sm:col-span-2">
                        <InputField label="Adresse du siège" value={form.orgSiegeAddress} onChange={(v) => update('orgSiegeAddress', v)} required />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-xs font-bold text-coris-navy uppercase tracking-wider mb-4">Représentant légal</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <InputField label="Prénom" value={form.representativeFirstName} onChange={(v) => update('representativeFirstName', v)} required />
                      <InputField label="Nom" value={form.representativeLastName} onChange={(v) => update('representativeLastName', v)} required />
                      <InputField label="Téléphone" type="tel" value={form.representativePhone} onChange={(v) => update('representativePhone', v)} required />
                    </div>
                  </div>
                </div>
              )}

              {selectedAccount.id === 'societe' && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-bold text-coris-navy uppercase tracking-wider mb-4">Société</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <InputField label="Dénomination sociale" value={form.orgDenomination} onChange={(v) => update('orgDenomination', v)} required />
                      </div>
                      <InputField label="RCCM" value={form.orgRccm} onChange={(v) => update('orgRccm', v)} required />
                      <InputField label="Numéro IFU" value={form.orgIfu} onChange={(v) => update('orgIfu', v)} required />
                      <InputField label="Téléphone" type="tel" value={form.orgPhone} onChange={(v) => update('orgPhone', v)} required />
                      <InputField label="Email" type="email" value={form.orgEmail} onChange={(v) => update('orgEmail', v)} required />
                      <div className="sm:col-span-2">
                        <InputField label="Adresse du siège social" value={form.orgSiegeAddress} onChange={(v) => update('orgSiegeAddress', v)} required />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-xs font-bold text-coris-navy uppercase tracking-wider mb-4">Titulaire / représentant du dossier</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <InputField label="Prénom" value={form.representativeFirstName} onChange={(v) => update('representativeFirstName', v)} required />
                      <InputField label="Nom" value={form.representativeLastName} onChange={(v) => update('representativeLastName', v)} required />
                      <InputField label="Téléphone" type="tel" value={form.representativePhone} onChange={(v) => update('representativePhone', v)} required />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Step 2 : Compléments (profil ou structure) ── */}
          {step === 2 && selectedAccount && (
            <div>
              {(selectedAccount.profile === 'individuel' || selectedAccount.profile === 'entreprise_individuelle') && (
                <>
                  <h3 className="text-xl font-bold text-coris-navy mb-1">Situation professionnelle</h3>
                  <p className="text-sm text-coris-gray-dark mb-6">
                    Ces informations nous aident à qualifier votre dossier (KYC) conformément à la réglementation.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <SelectField
                      label="Profession"
                      value={form.profession}
                      onChange={(v) => update('profession', v)}
                      options={['Salarié(e) public', 'Salarié(e) privé', 'Commerçant(e)', 'Artisan(e)', 'Agriculteur/trice', 'Étudiant(e)', 'Retraité(e)', 'Travailleur indépendant', 'Autre']}
                      required
                    />
                    <InputField
                      label={selectedAccount.profile === 'entreprise_individuelle' ? 'Dénomination / activité' : 'Employeur / Activité'}
                      value={form.employer}
                      onChange={(v) => update('employer', v)}
                      placeholder="Nom de l'entreprise ou activité"
                    />
                    <SelectField
                      label="Revenu mensuel estimé"
                      value={form.monthlyIncome}
                      onChange={(v) => update('monthlyIncome', v)}
                      options={['Moins de 100 000 FCFA', '100 000 - 300 000 FCFA', '300 000 - 500 000 FCFA', '500 000 - 1 000 000 FCFA', 'Plus de 1 000 000 FCFA']}
                      required
                    />
                  </div>
                </>
              )}

              {selectedAccount.profile === 'association' && (
                <>
                  <h3 className="text-xl font-bold text-coris-navy mb-1">Signataires & précisions</h3>
                  <p className="text-sm text-coris-gray-dark mb-6">
                    Indiquez les noms des signataires sur le compte (tels que sur la lettre de désignation) et toute précision utile pour votre dossier.
                  </p>
                  <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">
                    Liste des signataires & détails <span className="text-coris-red">*</span>
                  </label>
                  <textarea
                    value={form.associationSignatoriesDetails}
                    onChange={(e) => update('associationSignatoriesDetails', e.target.value)}
                    rows={6}
                    placeholder="Ex. : Président — Nom Prénom ; Trésorier — …"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue transition-all placeholder:text-gray-400"
                  />
                </>
              )}

              {selectedAccount.profile === 'societe' && (
                <>
                  <h3 className="text-xl font-bold text-coris-navy mb-1">Informations sur la société</h3>
                  <p className="text-sm text-coris-gray-dark mb-6">
                    Compléments utiles pour la comptabilité du dossier et le suivi de la demande.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <SelectField
                      label="Forme juridique"
                      value={form.legalForm}
                      onChange={(v) => update('legalForm', v)}
                      options={['SARL', 'SA', 'SNC', 'SCS', 'GIE', 'Autre']}
                      required
                    />
                    <SelectField
                      label="Secteur d’activité"
                      value={form.activitySector}
                      onChange={(v) => update('activitySector', v)}
                      options={['Commerce', 'Services', 'Industrie', 'Transports', 'BTP', 'Agriculture', 'Numérique', 'Autre']}
                      required
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── Step 3 : Documents ── */}
          {step === 3 && selectedAccount && (
            <div>
              <h3 className="text-xl font-bold text-coris-navy mb-1">Pièces justificatives</h3>
              <p className="text-sm text-coris-gray-dark mb-4">
                Téléchargez les documents correspondant au type <strong>{selectedAccount.name}</strong>. Formats acceptés : PDF, JPG, PNG (max. 10 Mo par fichier recommandé).
              </p>
              <div className="bg-coris-blue/[0.04] border border-coris-blue/15 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold text-coris-navy mb-2">Rappel — dépôt initial</p>
                <p className="text-xs text-coris-gray-dark">
                  Le versement de <strong>{selectedAccount.minDeposit}</strong> est exigé pour l’ouverture. Il sera validé en agence ou selon les instructions qui vous seront communiquées après examen du dossier.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                <SelectField
                  label="Type de pièce d'identité (référence saisie)"
                  value={form.idType}
                  onChange={(v) => update('idType', v)}
                  options={['CNIB', 'Passeport', 'Carte consulaire']}
                  required
                />
                <InputField label="Numéro de la pièce" value={form.idNumber} onChange={(v) => update('idNumber', v)} placeholder="B0012345678" required />
              </div>

              <p className="text-xs font-semibold text-coris-navy uppercase tracking-wider mb-3">Fichiers à joindre</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {getDocumentUploadSlots(form.accountType).map((slot) => (
                  <FileUpload
                    key={slot.id}
                    label={slot.label}
                    accept="image/*,.pdf"
                    subtitle={slot.subtitle}
                    optional={slot.optional}
                  />
                ))}
              </div>

              {/* Password */}
              <div className="max-w-sm">
                <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">
                  Créer un mot de passe <span className="text-coris-red">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="Min. 8 caractères"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-coris-blue"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          form.password.length >= i * 3
                            ? form.password.length >= 12 ? 'bg-green-500' : form.password.length >= 8 ? 'bg-yellow-500' : 'bg-coris-red'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Step 4 : Summary ── */}
          {step === 4 && selectedAccount && (
            <div>
              <h3 className="text-xl font-bold text-coris-navy mb-1">Récapitulatif</h3>
              <p className="text-sm text-coris-gray-dark mb-6">Vérifiez vos informations avant de soumettre votre demande.</p>

              <div className="space-y-4">
                <SummaryCard
                  title="Type de compte"
                  icon={CreditCard}
                  rows={[
                    ['Compte', selectedAccount.name],
                    ['Dépôt initial requis', selectedAccount.minDeposit],
                  ]}
                  onEdit={() => setStep(0)}
                />
                <div className="bg-coris-gray rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 bg-coris-blue/10 rounded-lg flex items-center justify-center">
                      <FileCheck size={16} className="text-coris-blue" />
                    </div>
                    <h4 className="font-bold text-coris-navy text-sm">Pièces exigées (rappel)</h4>
                  </div>
                  <ul className="text-xs text-coris-gray-dark space-y-1.5 list-disc list-inside leading-relaxed">
                    {selectedAccount.requirements.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>

                {(selectedAccount.id === 'epargne' ||
                  selectedAccount.id === 'personne_physique' ||
                  selectedAccount.id === 'entreprise_individuelle') && (
                  <SummaryCard
                    title="Titulaire & coordonnées"
                    icon={User}
                    rows={[
                      ['Nom complet', `${form.firstName} ${form.lastName}`.trim() || '—'],
                      ['Email', form.email],
                      ['Téléphone', form.phone],
                      ['Date de naissance', form.dateOfBirth],
                      ['Genre', form.gender],
                      ['Adresse', `${form.address}, ${form.city}`],
                      ...(selectedAccount.id === 'entreprise_individuelle'
                        ? ([['RCCM', form.orgRccm], ['IFU', form.orgIfu]] as [string, string][])
                        : []),
                      ['Personne à contacter', form.contactPersonName],
                      ['Téléphone (contact)', form.contactPersonPhone],
                      ['Adresse (contact)', form.contactPersonAddress],
                    ]}
                    onEdit={() => setStep(1)}
                  />
                )}

                {(selectedAccount.id === 'association' || selectedAccount.id === 'societe') && (
                  <SummaryCard
                    title={selectedAccount.id === 'association' ? 'Association' : 'Société'}
                    icon={Building2}
                    rows={
                      selectedAccount.id === 'association'
                        ? [
                            ['Dénomination', form.orgDenomination],
                            ['Téléphone', form.orgPhone],
                            ['Email', form.orgEmail],
                            ['Siège', form.orgSiegeAddress],
                            [
                              'Représentant',
                              `${form.representativeFirstName} ${form.representativeLastName} — ${form.representativePhone}`,
                            ],
                          ]
                        : [
                            ['Dénomination sociale', form.orgDenomination],
                            ['RCCM', form.orgRccm],
                            ['IFU', form.orgIfu],
                            ['Téléphone', form.orgPhone],
                            ['Email', form.orgEmail],
                            ['Siège social', form.orgSiegeAddress],
                            [
                              'Contact dossier',
                              `${form.representativeFirstName} ${form.representativeLastName} — ${form.representativePhone}`,
                            ],
                          ]
                    }
                    onEdit={() => setStep(1)}
                  />
                )}

                {(selectedAccount.profile === 'individuel' || selectedAccount.profile === 'entreprise_individuelle') && (
                  <SummaryCard
                    title="Situation professionnelle"
                    icon={Briefcase}
                    rows={[
                      ['Profession', form.profession],
                      ['Employeur / activité', form.employer || '—'],
                      ['Revenu mensuel', form.monthlyIncome],
                    ]}
                    onEdit={() => setStep(2)}
                  />
                )}

                {selectedAccount.profile === 'association' && (
                  <SummaryCard
                    title="Signataires & précisions"
                    icon={Briefcase}
                    rows={[['Détails', form.associationSignatoriesDetails || '—']]}
                    onEdit={() => setStep(2)}
                  />
                )}

                {selectedAccount.profile === 'societe' && (
                  <SummaryCard
                    title="Société"
                    icon={Briefcase}
                    rows={[
                      ['Forme juridique', form.legalForm],
                      ['Secteur d’activité', form.activitySector],
                    ]}
                    onEdit={() => setStep(2)}
                  />
                )}

                <SummaryCard
                  title="Documents & accès sécurisé"
                  icon={FileCheck}
                  rows={[
                    ['Pièce d’identité (saisie)', `${form.idType} — ${form.idNumber}`],
                    [
                      'Fichiers joints',
                      `${getDocumentUploadSlots(form.accountType).length} type(s) de document(s)`,
                    ],
                  ]}
                  onEdit={() => setStep(3)}
                />
              </div>

              <label className="flex items-start gap-3 mt-8 cursor-pointer bg-coris-blue/[0.03] border border-coris-blue/10 rounded-xl p-4">
                <input
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) => update('acceptTerms', e.target.checked)}
                  className="mt-0.5 accent-coris-blue w-4 h-4"
                />
                <span className="text-xs text-coris-gray-dark leading-relaxed">
                  Je certifie l'exactitude des informations fournies et j'accepte les{' '}
                  <a href="#" className="text-coris-blue underline font-medium">conditions générales</a> et la{' '}
                  <a href="#" className="text-coris-blue underline font-medium">politique de confidentialité</a> de Coris Meso Finance.
                </span>
              </label>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all ${
            step === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-coris-gray-dark hover:text-coris-navy hover:bg-gray-50'
          }`}
        >
          <ChevronLeft size={16} />
          Précédent
        </button>

        {step < stepsMeta.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            className={`flex items-center gap-2 text-sm font-semibold px-7 py-3 rounded-xl transition-all ${
              canNext()
                ? 'bg-coris-blue text-white hover:bg-coris-blue-dark shadow-lg shadow-coris-blue/20'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuer
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canNext()}
            className={`flex items-center gap-2 text-sm font-bold px-8 py-3.5 rounded-xl transition-all ${
              canNext()
                ? 'bg-coris-red text-white hover:bg-coris-red-dark shadow-lg shadow-coris-red/20'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Soumettre ma demande
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FORM COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function InputField({ label, type = 'text', value, onChange, placeholder, required }: {
  label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">
        {label} {required && <span className="text-coris-red">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue transition-all placeholder:text-gray-400"
        required={required}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, required }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">
        {label} {required && <span className="text-coris-red">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue transition-all"
        required={required}
      >
        <option value="">Sélectionnez...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function FileUpload({ label, accept, subtitle, optional }: {
  label: string; accept: string; subtitle?: string; optional?: boolean;
}) {
  const [fileName, setFileName] = useState('');

  return (
    <div>
      <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">
        {label} {!optional && <span className="text-coris-red">*</span>}
        {optional && <span className="text-gray-400 normal-case tracking-normal font-normal"> (optionnel)</span>}
      </label>
      <label className={`flex items-center gap-3 border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all ${
        fileName ? 'border-green-300 bg-green-50/50' : 'border-gray-200 hover:border-coris-blue/30 hover:bg-coris-sky/30'
      }`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          fileName ? 'bg-green-100' : 'bg-gray-100'
        }`}>
          {fileName ? <Check size={18} className="text-green-600" /> : <Upload size={18} className="text-gray-400" />}
        </div>
        <div className="flex-1 min-w-0">
          {fileName ? (
            <p className="text-sm text-green-700 font-medium truncate">{fileName}</p>
          ) : (
            <>
              <p className="text-sm text-coris-navy font-medium">Cliquez pour choisir un fichier</p>
              {subtitle && <p className="text-[10px] text-gray-400 mt-0.5">{subtitle}</p>}
            </>
          )}
        </div>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
        />
      </label>
    </div>
  );
}

function SummaryCard({ title, icon: Icon, rows, onEdit }: {
  title: string; icon: React.ElementType; rows: [string, string][]; onEdit: () => void;
}) {
  return (
    <div className="bg-coris-gray rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-coris-blue/10 rounded-lg flex items-center justify-center">
            <Icon size={16} className="text-coris-blue" />
          </div>
          <h4 className="font-bold text-coris-navy text-sm">{title}</h4>
        </div>
        <button onClick={onEdit} className="text-xs font-semibold text-coris-blue hover:underline">
          Modifier
        </button>
      </div>
      <div className="space-y-2">
        {rows.map(([key, val]) => (
          <div key={key} className="flex items-center justify-between text-sm">
            <span className="text-coris-gray-dark">{key}</span>
            <span className="font-medium text-coris-navy">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════ */

const faqs = [
  {
    q: "Combien de temps prend l'ouverture de compte ?",
    a: "Votre demande est traitée sous 24 heures ouvrées. Vous recevrez un email de confirmation dès l'activation.",
  },
  {
    q: "Quels documents sont nécessaires ?",
    a: "Les pièces dépendent du type de compte : épargne, personne physique, association, société ou entreprise individuelle. La liste exacte est indiquée à la première étape du formulaire et reprend les exigences officielles (identité, justificatif d'adresse, RCCM/IFU le cas échéant, etc.).",
  },
  {
    q: "Puis-je ouvrir un compte sans me déplacer ?",
    a: "Oui, le formulaire en ligne permet de soumettre votre demande à distance. Le dépôt initial et la remise d'éventuels supports (carte, chéquier) peuvent nécessiter une visite en agence.",
  },
  {
    q: "Quel est le dépôt initial ?",
    a: "Dix mille (10 000) FCFA pour le compte épargne, personne physique, association et entreprise individuelle ; cinquante mille (50 000) F CFA pour le compte de société.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-coris-gray">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-coris-red font-semibold text-xs uppercase tracking-[0.15em]">FAQ</span>
          <h2 className="text-3xl font-extrabold text-coris-navy mt-3">Questions fréquentes</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start gap-4 bg-white rounded-xl p-5 text-left border border-gray-100 hover:border-coris-blue/15 transition-all group"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  open === i ? 'bg-coris-blue text-white' : 'bg-coris-blue/8 text-coris-blue'
                }`}>
                  <HelpCircle size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-coris-navy text-sm group-hover:text-coris-blue transition-colors">
                    {faq.q}
                  </h4>
                  <AnimatePresence>
                    {open === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="text-sm text-coris-gray-dark leading-relaxed overflow-hidden"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-coris-gray-dark mb-4">Vous avez d'autres questions ?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-coris-blue font-semibold text-sm hover:gap-3 transition-all"
          >
            <Phone size={16} />
            Contactez-nous
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST BADGES
   ═══════════════════════════════════════════════════════════ */

function TrustBadges() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, label: 'Données chiffrées', sub: 'SSL 256-bit' },
            { icon: Clock, label: 'Activation rapide', sub: 'Sous 24h ouvrées' },
            { icon: CheckCircle2, label: 'Agréé BCEAO', sub: 'Régulé & conforme' },
            { icon: Phone, label: 'Support dédié', sub: '7j/7 par téléphone' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-coris-blue/8 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={20} className="text-coris-blue" />
              </div>
              <div>
                <p className="text-sm font-bold text-coris-navy">{label}</p>
                <p className="text-[11px] text-coris-gray-dark">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */

export default function OpenAccountPage() {
  return (
    <>
      <Hero />
      <TrustBadges />

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AccountForm />
        </div>
      </section>

      <FAQ />
    </>
  );
}
