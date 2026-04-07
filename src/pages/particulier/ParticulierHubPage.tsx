import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PiggyBank,
  Landmark,
  Smartphone,
  CreditCard,
  ArrowLeftRight,
  Banknote,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const links = [
  {
    to: '/particulier/epargne',
    title: "Comptes d'épargne",
    desc: 'Faites fructifier votre épargne avec nos solutions adaptées.',
    icon: PiggyBank,
  },
  {
    to: '/particulier/courant',
    title: 'Comptes courants',
    desc: 'Gérez votre quotidien : virements, prélèvements et services associés.',
    icon: Landmark,
  },
  {
    to: '/particulier/digital',
    title: 'Banque digitale',
    desc: 'Application mobile et services en ligne, 24h/24.',
    icon: Smartphone,
  },
  {
    to: '/particulier/cartes',
    title: 'Cartes bancaires',
    desc: 'VISA Classic, Gold et cartes prépayées.',
    icon: CreditCard,
  },
  {
    to: '/particulier/transferts',
    title: "Transferts d'argent",
    desc: 'Envoyez et recevez de l’argent en toute sécurité.',
    icon: ArrowLeftRight,
  },
  {
    to: '/particulier/prets',
    title: 'Prêts & crédits',
    desc: 'Financez vos projets avec des offres adaptées.',
    icon: Banknote,
  },
];

export default function ParticulierHubPage() {
  return (
    <div className="bg-coris-gray min-h-screen">
      <section className="relative bg-gradient-to-br from-coris-blue via-coris-blue-dark to-coris-navy py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-coris-red/20 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/70 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles size={14} className="text-coris-red" />
            Particuliers
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4"
          >
            Nos offres pour les particuliers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Choisissez un service pour en savoir plus ou ouvrir un compte en ligne.
          </motion.p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="grid sm:grid-cols-2 gap-5">
          {links.map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={item.to}
                className="group flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-coris-blue/20 transition-all h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-coris-blue/10 text-coris-blue flex items-center justify-center shrink-0 group-hover:bg-coris-blue group-hover:text-white transition-colors">
                  <item.icon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-coris-navy text-lg mb-1 group-hover:text-coris-blue transition-colors flex items-center gap-1">
                    {item.title}
                    <ChevronRight size={18} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-coris-red" />
                  </h2>
                  <p className="text-sm text-coris-gray-dark leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-coris-blue font-semibold text-sm hover:underline"
          >
            Une question ? Contactez-nous
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
