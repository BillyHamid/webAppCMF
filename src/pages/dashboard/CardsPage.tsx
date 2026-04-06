import { motion } from 'framer-motion';
import { CreditCard, Lock, Unlock, Settings, Eye, EyeOff, Copy, Snowflake, Plus } from 'lucide-react';
import { useState } from 'react';

interface Card {
  id: string;
  type: string;
  number: string;
  expiry: string;
  holder: string;
  balance: number;
  color: string;
  status: 'active' | 'frozen';
}

const cards: Card[] = [
  { id: 'c1', type: 'VISA Classic', number: '4256 •••• •••• 8421', expiry: '09/28', holder: 'AMINATA OUEDRAOGO', balance: 1_250_000, color: 'from-coris-blue to-coris-navy', status: 'active' },
  { id: 'c2', type: 'VISA Gold', number: '4256 •••• •••• 3107', expiry: '03/29', holder: 'AMINATA OUEDRAOGO', balance: 3_750_000, color: 'from-amber-500 to-amber-700', status: 'active' },
];

function CardVisual({ card }: { card: Card }) {
  return (
    <div className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white aspect-[1.6/1] relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.06] rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/[0.04] rounded-full translate-y-1/2 -translate-x-1/4" />
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-10 h-7 bg-amber-300/80 rounded-md" />
          <span className="text-xs font-bold uppercase tracking-wider opacity-80">{card.type}</span>
        </div>
        <div>
          <p className="font-mono text-lg tracking-[0.2em] mb-3">{card.number}</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] text-white/40 uppercase">Titulaire</p>
              <p className="text-xs font-semibold">{card.holder}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-white/40 uppercase">Expire</p>
              <p className="text-xs font-semibold">{card.expiry}</p>
            </div>
          </div>
        </div>
      </div>
      {card.status === 'frozen' && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <Snowflake size={16} />
            <span className="text-sm font-bold">Carte gelée</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CardsPage() {
  const [cardList, setCardList] = useState(cards);
  const [activeId, setActiveId] = useState(cards[0].id);
  const [showDetails, setShowDetails] = useState(false);

  const active = cardList.find((c) => c.id === activeId)!;

  const toggleFreeze = (id: string) => {
    setCardList((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'frozen' : 'active' } : c
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-coris-navy flex items-center gap-2">
          <CreditCard size={22} className="text-coris-blue" />
          Mes Cartes
        </h1>
        <p className="text-sm text-coris-gray-dark mt-1">Gérez vos cartes bancaires</p>
      </div>

      {/* Card selector */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {cardList.map((card) => (
          <button
            key={card.id}
            onClick={() => setActiveId(card.id)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeId === card.id
                ? 'bg-coris-blue text-white shadow-md shadow-coris-blue/20'
                : 'bg-white border border-gray-200 text-coris-gray-dark hover:bg-coris-gray'
            }`}
          >
            {card.type}
          </button>
        ))}
        <button className="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border-2 border-dashed border-gray-200 text-coris-gray-dark hover:border-coris-blue hover:text-coris-blue transition-all flex items-center gap-1">
          <Plus size={14} /> Nouvelle carte
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card visual */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, rotateY: -15 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CardVisual card={active} />
        </motion.div>

        {/* Card actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-bold text-coris-navy text-sm mb-3">Actions</h3>

          <div className="space-y-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-coris-gray transition-colors text-sm"
            >
              {showDetails ? <EyeOff size={18} className="text-coris-blue" /> : <Eye size={18} className="text-coris-blue" />}
              <span className="font-medium text-coris-navy">{showDetails ? 'Masquer les détails' : 'Voir les détails'}</span>
            </button>

            <button
              onClick={() => toggleFreeze(active.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-coris-gray transition-colors text-sm"
            >
              {active.status === 'frozen' ? (
                <>
                  <Unlock size={18} className="text-emerald-500" />
                  <span className="font-medium text-coris-navy">Débloquer la carte</span>
                </>
              ) : (
                <>
                  <Snowflake size={18} className="text-blue-400" />
                  <span className="font-medium text-coris-navy">Geler la carte</span>
                </>
              )}
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-coris-gray transition-colors text-sm">
              <Lock size={18} className="text-amber-500" />
              <span className="font-medium text-coris-navy">Changer le code PIN</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-coris-gray transition-colors text-sm">
              <Settings size={18} className="text-coris-gray-dark" />
              <span className="font-medium text-coris-navy">Paramètres de la carte</span>
            </button>
          </div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-coris-gray rounded-xl p-4 space-y-2"
            >
              {[
                { l: 'Numéro', v: '4256 1234 5678 8421' },
                { l: 'CVV', v: '•••' },
                { l: 'Plafond journalier', v: '500 000 FCFA' },
                { l: 'Plafond mensuel', v: '5 000 000 FCFA' },
                { l: 'Paiement en ligne', v: 'Activé' },
              ].map(({ l, v }) => (
                <div key={l} className="flex justify-between text-xs">
                  <span className="text-coris-gray-dark">{l}</span>
                  <span className="font-semibold text-coris-navy flex items-center gap-1">
                    {v}
                    {l === 'Numéro' && <Copy size={11} className="text-coris-blue cursor-pointer" />}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
