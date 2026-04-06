import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, TrendingUp, CreditCard, FileText, Users, Globe,
  ChevronRight, CheckCircle, Briefcase, BarChart3, Shield
} from 'lucide-react';

const solutions = [
  {
    icon: Building2,
    title: 'Compte Entreprise',
    desc: 'Un compte professionnel complet avec gestion multi-signataires et reporting avancé.',
    features: ['Multi-signataires', 'Relevés automatiques', 'API bancaire'],
  },
  {
    icon: TrendingUp,
    title: 'Crédit Entreprise',
    desc: 'Financez vos investissements, votre fonds de roulement ou vos projets d\'expansion.',
    features: ['Crédit d\'investissement', 'Ligne de crédit', 'Affacturage'],
  },
  {
    icon: CreditCard,
    title: 'Cartes Business',
    desc: 'Des cartes corporate pour vos collaborateurs avec contrôle des plafonds.',
    features: ['Cartes nominatives', 'Plafonds individuels', 'Reporting temps réel'],
  },
  {
    icon: Globe,
    title: 'Commerce International',
    desc: 'Facilitez vos opérations import/export avec nos solutions de trade finance.',
    features: ['Lettres de crédit', 'Remises documentaires', 'Garanties bancaires'],
  },
  {
    icon: FileText,
    title: 'Gestion de Paie',
    desc: 'Automatisez le versement des salaires de vos employés en un clic.',
    features: ['Virements groupés', 'Fichier CNSS', 'Bulletins numériques'],
  },
  {
    icon: BarChart3,
    title: 'Cash Management',
    desc: 'Optimisez la gestion de votre trésorerie avec des outils digitaux avancés.',
    features: ['Prévisions de trésorerie', 'Centralisation comptes', 'Alertes soldes'],
  },
];

const stats = [
  { value: '2 000+', label: 'Entreprises clientes' },
  { value: '98%', label: 'Satisfaction client' },
  { value: '72h', label: 'Ouverture de compte' },
  { value: '24/7', label: 'Support dédié' },
];

export default function EntreprisePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-coris-navy via-coris-blue-dark to-[#1a2a5e] py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-coris-gold/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-coris-blue/20 rounded-full blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-coris-gold font-bold text-sm uppercase tracking-wider mb-3">Solutions Entreprise</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Propulsez votre entreprise avec Coris Meso Finance
            </h1>
            <p className="text-white/50 mb-8 leading-relaxed">
              Des solutions bancaires taillées pour les PME, les grandes entreprises et les entrepreneurs ambitieux du Burkina Faso.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="bg-coris-red hover:bg-coris-red-dark text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-sm">
                Demander un rendez-vous
              </Link>
              <a href="#solutions" className="border border-white/20 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-white/10 transition-colors text-sm">
                Voir les solutions
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="bg-white/[0.05] rounded-3xl p-8 border border-white/[0.08] backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ value, label }) => (
                  <div key={label} className="text-center py-4">
                    <p className="text-2xl font-extrabold text-white">{value}</p>
                    <p className="text-xs text-white/40 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-16 px-4 bg-coris-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-coris-navy mb-3">Nos solutions pour les entreprises</h2>
            <p className="text-coris-gray-dark max-w-lg mx-auto">Des outils performants pour accélérer votre croissance</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-shadow group"
              >
                <div className="w-12 h-12 bg-coris-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-coris-blue group-hover:text-white transition-colors text-coris-blue">
                  <sol.icon size={22} />
                </div>
                <h3 className="font-bold text-coris-navy text-lg mb-2">{sol.title}</h3>
                <p className="text-sm text-coris-gray-dark mb-4">{sol.desc}</p>
                <ul className="space-y-2">
                  {sol.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-coris-navy">
                      <CheckCircle size={14} className="text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-coris-navy">
        <div className="max-w-3xl mx-auto text-center">
          <Briefcase size={32} className="text-coris-gold mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Un conseiller dédié pour votre entreprise
          </h2>
          <p className="text-white/50 mb-8">
            Contactez-nous pour une étude personnalisée de vos besoins bancaires.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-coris-red hover:bg-coris-red-dark text-white font-bold py-3.5 px-8 rounded-xl transition-colors text-sm"
          >
            Prendre rendez-vous <ChevronRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
