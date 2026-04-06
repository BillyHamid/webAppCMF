import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, Shield, Globe, Smartphone, Wifi, ChevronRight, Zap, Star } from 'lucide-react';

const cards = [
  {
    name: 'VISA Classic',
    desc: 'La carte idéale pour vos opérations du quotidien au Burkina Faso et à l\'étranger.',
    features: ['Paiements et retraits nationaux', 'Plafond 500 000 FCFA/jour', 'Sans contact NFC'],
    color: 'from-coris-blue to-coris-navy',
    badge: 'Populaire',
    fee: '5 000 FCFA/an',
  },
  {
    name: 'VISA Gold',
    desc: 'Des avantages premium pour les clients exigeants. Plafonds élevés et assurances incluses.',
    features: ['Paiements internationaux', 'Plafond 2 000 000 FCFA/jour', 'Assurance voyage incluse', 'Accès salons VIP'],
    color: 'from-amber-500 to-amber-700',
    badge: 'Premium',
    fee: '25 000 FCFA/an',
  },
  {
    name: 'Carte Prépayée',
    desc: 'Rechargeable et sécurisée. Parfaite pour les achats en ligne et les petits budgets.',
    features: ['Sans compte bancaire', 'Rechargeable en agence', 'Idéale pour les jeunes'],
    color: 'from-emerald-500 to-emerald-700',
    badge: 'Accessible',
    fee: '2 500 FCFA/an',
  },
];

const benefits = [
  { icon: Shield, title: 'Sécurité maximale', desc: 'Protection 3D Secure et alertes instantanées' },
  { icon: Globe, title: 'Acceptée partout', desc: 'Utilisable dans 200+ pays via le réseau VISA' },
  { icon: Smartphone, title: 'Gestion mobile', desc: 'Bloquez, débloquez et gérez depuis l\'app' },
  { icon: Wifi, title: 'Sans contact', desc: 'Payez en un instant avec le NFC intégré' },
];

export default function CartesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-coris-navy via-coris-blue-dark to-coris-blue py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-coris-red/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-coris-red font-bold text-sm uppercase tracking-wider mb-3">Cartes Bancaires</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">La carte qui vous ressemble</h1>
            <p className="text-white/60 max-w-lg mx-auto">
              Choisissez la carte adaptée à vos besoins. Paiements, retraits, achats en ligne — en toute sécurité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="py-16 px-4 bg-coris-gray">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className={`bg-gradient-to-br ${card.color} p-8 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.06] rounded-full -translate-y-1/2 translate-x-1/4" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-8 bg-amber-300/80 rounded-md" />
                      <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">{card.badge}</span>
                    </div>
                    <p className="font-mono text-white/60 text-sm tracking-widest mb-1">•••• •••• •••• ••••</p>
                    <p className="text-white font-bold text-lg">{card.name}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-coris-gray-dark mb-4">{card.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Zap size={12} className="text-coris-blue shrink-0" />
                        <span className="text-coris-navy">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-coris-gray-dark">{card.fee}</span>
                    <Link
                      to="/particulier/epargne"
                      className="flex items-center gap-1 text-sm font-semibold text-coris-blue hover:underline"
                    >
                      Commander <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-coris-navy mb-3">Pourquoi nos cartes ?</h2>
            <p className="text-coris-gray-dark max-w-lg mx-auto">Des avantages concrets pour simplifier votre quotidien financier</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-coris-gray rounded-2xl p-6 text-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100"
              >
                <div className="w-12 h-12 bg-coris-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-coris-blue" />
                </div>
                <h3 className="font-bold text-coris-navy mb-2 text-sm">{title}</h3>
                <p className="text-xs text-coris-gray-dark">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-coris-navy">
        <div className="max-w-3xl mx-auto text-center">
          <Star size={32} className="text-coris-gold mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Prêt à commander votre carte ?</h2>
          <p className="text-white/50 mb-8">Rendez-vous en agence ou ouvrez un compte en ligne pour recevoir votre carte.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/particulier/epargne" className="bg-coris-red hover:bg-coris-red-dark text-white font-bold py-3.5 px-8 rounded-xl transition-colors text-sm">
              Ouvrir un compte
            </Link>
            <Link to="/contact" className="border border-white/20 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-white/10 transition-colors text-sm">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
