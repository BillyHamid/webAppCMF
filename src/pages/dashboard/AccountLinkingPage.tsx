import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  ChevronRight,
  Wallet,
  Building2,
  CreditCard,
  Landmark,
  type LucideIcon,
} from 'lucide-react';

type AccountKind = {
  id: string;
  label: string;
  Icon: LucideIcon;
  iconAccent: 'blue' | 'red';
  badge?: boolean;
};

const ACCOUNT_TYPES: AccountKind[] = [
  { id: 'corismoney', label: 'CORISMONEY', Icon: Wallet, iconAccent: 'blue', badge: true },
  { id: 'coris-bank', label: 'CORIS BANK', Icon: Building2, iconAccent: 'red' },
  { id: 'coris-cash', label: 'CORIS CASH', Icon: CreditCard, iconAccent: 'blue', badge: true },
  { id: 'coris-mesofinance', label: 'CORIS MESOFINANCE', Icon: Landmark, iconAccent: 'red' },
];

export default function AccountLinkingPage() {
  const [selected, setSelected] = useState<AccountKind | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleAddClick = () => {
    setConfirmed(false);
    setSelected(null);
    document.getElementById('liaison-types')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePickType = (kind: AccountKind) => {
    setConfirmed(false);
    setSelected(kind);
  };

  const handleConfirmLink = () => {
    setConfirmed(true);
  };

  return (
    <div className="max-w-lg mx-auto w-full pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-coris-navy">Liaison de compte</h1>
        <p className="text-sm text-coris-gray-dark mt-1">
          Liez vos comptes Coris pour une vue consolidée et des transferts simplifiés.
        </p>
      </div>

      {/* Bloc principal — ajouter un compte */}
      <button
        type="button"
        onClick={handleAddClick}
        className="w-full rounded-2xl bg-slate-600 hover:bg-slate-700 transition-colors px-6 py-8 flex flex-col items-center gap-4 text-center shadow-lg shadow-slate-600/25 mb-8"
      >
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
          <Plus size={32} className="text-coris-navy stroke-[2.5]" aria-hidden />
        </div>
        <span className="text-white font-extrabold text-sm tracking-wide uppercase">
          Ajouter un compte
        </span>
      </button>

      <p
        id="liaison-types"
        className="text-[10px] font-black uppercase tracking-[0.2em] text-coris-navy mb-3"
      >
        Type
      </p>

      <ul className="space-y-3">
        {ACCOUNT_TYPES.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => handlePickType(item)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-md shadow-black/[0.06] text-left transition-all hover:border-coris-blue/25 hover:shadow-lg ${
                selected?.id === item.id ? 'ring-2 ring-coris-blue/30 border-coris-blue/40' : ''
              }`}
            >
              <div className="relative shrink-0 w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <item.Icon
                  size={22}
                  className={
                    item.iconAccent === 'red' ? 'text-coris-red' : 'text-coris-blue'
                  }
                  strokeWidth={2}
                />
                {item.badge && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-coris-red rounded-full border-2 border-white" />
                )}
              </div>
              <span className="flex-1 font-extrabold text-coris-navy text-sm tracking-wide uppercase min-w-0">
                {item.label}
              </span>
              <ChevronRight size={20} className="text-coris-blue/40 shrink-0" />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg"
          >
            <p className="text-xs font-semibold text-coris-gray-dark uppercase tracking-wide mb-1">
              Compte sélectionné
            </p>
            <p className="text-lg font-extrabold text-coris-navy mb-4">{selected.label}</p>
            {!confirmed ? (
              <>
                <p className="text-sm text-coris-gray-dark mb-4">
                  Confirmez la liaison pour activer ce compte dans votre espace. En production, une
                  vérification sécurisée (OTP / agence) sera requise.
                </p>
                <button
                  type="button"
                  onClick={handleConfirmLink}
                  className="w-full bg-coris-blue hover:bg-coris-blue-dark text-white font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  Confirmer la liaison
                </button>
              </>
            ) : (
              <p className="text-sm text-emerald-700 font-semibold flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                Liaison enregistrée (démonstration). Vous recevrez une confirmation par SMS.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
