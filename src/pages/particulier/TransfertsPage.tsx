import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Globe, Smartphone, ArrowRight, Clock, Shield, Zap, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Send,
    title: 'Virement national',
    desc: 'Envoyez de l\'argent vers n\'importe quel compte bancaire au Burkina Faso instantanément.',
    features: ['Instantané 24/7', 'Sans frais pour les comptes Coris', 'Depuis l\'app ou l\'agence'],
    color: 'bg-blue-50 text-coris-blue',
  },
  {
    icon: Globe,
    title: 'Transfert international',
    desc: 'Envoyez de l\'argent dans la zone UEMOA et au-delà avec des frais réduits.',
    features: ['14 pays en Afrique', 'Frais compétitifs', 'Taux de change avantageux'],
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Smartphone,
    title: 'Bank to Wallet',
    desc: 'Transférez directement vers Orange Money, Moov Money ou Coris Money.',
    features: ['Orange Money', 'Moov Money', 'Coris Money'],
    color: 'bg-purple-50 text-purple-600',
  },
];

const partners = [
  'Orange Money', 'Moov Money', 'Coris Money', 'Western Union', 'MoneyGram', 'RIA',
];

export default function TransfertsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-coris-navy via-coris-blue-dark to-coris-blue py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">Transferts d'argent</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Envoyez de l'argent facilement</h1>
            <p className="text-white/60 max-w-lg mx-auto">
              National, international ou vers un portefeuille mobile — vos transferts en quelques clics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-coris-gray">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${svc.color} flex items-center justify-center mb-4`}>
                <svc.icon size={22} />
              </div>
              <h3 className="font-bold text-coris-navy text-lg mb-2">{svc.title}</h3>
              <p className="text-sm text-coris-gray-dark mb-4">{svc.desc}</p>
              <ul className="space-y-2 mb-6">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-coris-navy">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-coris-blue text-white font-semibold text-sm hover:bg-coris-blue-dark transition-colors"
              >
                Effectuer un transfert <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-coris-navy text-center mb-12">Pourquoi Coris Meso Finance ?</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Rapide', desc: 'Transferts instantanés en temps réel, 24h/24 et 7j/7' },
              { icon: Shield, title: 'Sécurisé', desc: 'Chiffrement de bout en bout et authentification OTP' },
              { icon: Clock, title: 'Abordable', desc: 'Les frais les plus compétitifs du marché burkinabè' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 bg-coris-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-coris-blue" />
                </div>
                <h3 className="font-bold text-coris-navy mb-2">{title}</h3>
                <p className="text-sm text-coris-gray-dark">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 px-4 bg-coris-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-lg font-bold text-coris-navy mb-6">Nos partenaires de transfert</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p) => (
              <div key={p} className="bg-white rounded-xl px-5 py-3 border border-gray-100 text-sm font-semibold text-coris-navy">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
