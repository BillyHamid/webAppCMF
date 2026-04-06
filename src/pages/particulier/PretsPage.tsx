import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, ChevronRight } from 'lucide-react';

const products = [
  {
    name: 'Crédit Personnel',
    desc: 'Pour financer vos projets personnels : mariage, voyage, équipement.',
    rate: '12%',
    maxAmount: '5 000 000 FCFA',
    duration: '3 à 36 mois',
    icon: '🏠',
  },
  {
    name: 'Crédit Express',
    desc: 'Un financement rapide pour les urgences. Décaissement en 72h.',
    rate: '15%',
    maxAmount: '2 000 000 FCFA',
    duration: '1 à 12 mois',
    icon: '⚡',
  },
  {
    name: 'Crédit Immobilier',
    desc: 'Réalisez votre rêve immobilier avec des mensualités adaptées.',
    rate: '9.5%',
    maxAmount: '50 000 000 FCFA',
    duration: '5 à 20 ans',
    icon: '🏗️',
  },
  {
    name: 'Crédit Scolaire',
    desc: 'Financez les frais de scolarité de vos enfants sans stress.',
    rate: '10%',
    maxAmount: '3 000 000 FCFA',
    duration: '1 à 12 mois',
    icon: '📚',
  },
];

export default function PretsPage() {
  const [amount, setAmount] = useState(1_000_000);
  const [months, setMonths] = useState(12);
  const rate = 0.12;
  const monthlyRate = rate / 12;
  const monthly = Math.round((amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months)));
  const total = monthly * months;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-coris-navy via-coris-blue-dark to-coris-blue py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-coris-gold/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-coris-gold font-bold text-sm uppercase tracking-wider mb-3">Prêts & Crédits</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Financez vos ambitions</h1>
            <p className="text-white/60 max-w-lg mx-auto">
              Des solutions de financement flexibles avec des taux compétitifs. Obtenez une réponse en 48h.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4 bg-coris-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold text-coris-navy mb-3">Nos offres de crédit</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {products.map((prod, i) => (
              <motion.div
                key={prod.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">{prod.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-coris-navy text-lg">{prod.name}</h3>
                    <p className="text-sm text-coris-gray-dark mt-1">{prod.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { l: 'Taux', v: prod.rate },
                    { l: 'Montant max', v: prod.maxAmount },
                    { l: 'Durée', v: prod.duration },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-coris-gray rounded-xl p-3 text-center">
                      <p className="text-[10px] text-coris-gray-dark uppercase tracking-wider">{l}</p>
                      <p className="text-sm font-bold text-coris-navy mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/particulier/epargne"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-coris-blue text-coris-blue font-semibold text-sm hover:bg-coris-blue hover:text-white transition-all"
                >
                  Faire une demande <ChevronRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Calculator size={32} className="text-coris-blue mx-auto mb-3" />
            <h2 className="text-2xl font-extrabold text-coris-navy mb-2">Simulateur de crédit</h2>
            <p className="text-sm text-coris-gray-dark">Estimez vos mensualités en quelques secondes</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-semibold text-coris-navy uppercase tracking-wide">Montant</label>
                  <span className="text-sm font-bold text-coris-blue">{amount.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <input
                  type="range"
                  min={100_000}
                  max={50_000_000}
                  step={100_000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-coris-blue"
                />
                <div className="flex justify-between text-[10px] text-coris-gray-dark">
                  <span>100 000</span>
                  <span>50 000 000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-semibold text-coris-navy uppercase tracking-wide">Durée</label>
                  <span className="text-sm font-bold text-coris-blue">{months} mois</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={240}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full accent-coris-blue"
                />
                <div className="flex justify-between text-[10px] text-coris-gray-dark">
                  <span>1 mois</span>
                  <span>20 ans</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="bg-coris-blue/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-coris-gray-dark uppercase tracking-wider">Mensualité</p>
                  <p className="text-lg font-extrabold text-coris-navy mt-1">{monthly.toLocaleString('fr-FR')}</p>
                  <p className="text-[10px] text-coris-gray-dark">FCFA/mois</p>
                </div>
                <div className="bg-coris-blue/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-coris-gray-dark uppercase tracking-wider">Coût total</p>
                  <p className="text-lg font-extrabold text-coris-navy mt-1">{total.toLocaleString('fr-FR')}</p>
                  <p className="text-[10px] text-coris-gray-dark">FCFA</p>
                </div>
                <div className="bg-coris-blue/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-coris-gray-dark uppercase tracking-wider">Taux annuel</p>
                  <p className="text-lg font-extrabold text-coris-navy mt-1">12%</p>
                  <p className="text-[10px] text-coris-gray-dark">fixe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 bg-coris-gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-coris-navy mb-10 text-center">Comment obtenir votre crédit ?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Demande en ligne', desc: 'Remplissez le formulaire de demande' },
              { step: '2', title: 'Étude du dossier', desc: 'Notre équipe analyse votre demande sous 48h' },
              { step: '3', title: 'Validation', desc: 'Vous recevez une réponse par SMS et email' },
              { step: '4', title: 'Décaissement', desc: 'Les fonds sont versés sur votre compte' },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-coris-blue text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {step}
                </div>
                <h3 className="font-bold text-coris-navy mb-1 text-sm">{title}</h3>
                <p className="text-xs text-coris-gray-dark">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
