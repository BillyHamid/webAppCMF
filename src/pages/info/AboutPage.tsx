import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Users, MapPin, Award, TrendingUp, Building2 } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Proximité', desc: 'Nous sommes au plus près de nos clients, avec un réseau d\'agences sur tout le territoire.' },
  { icon: Target, title: 'Innovation', desc: 'Nous investissons dans la technologie pour offrir des services financiers modernes et accessibles.' },
  { icon: Users, title: 'Inclusion', desc: 'Notre mission est de rendre la finance accessible à tous, y compris les populations non-bancarisées.' },
  { icon: Award, title: 'Excellence', desc: 'Nous visons l\'excellence dans chaque interaction, chaque produit, chaque service.' },
];

const milestones = [
  { year: '2015', title: 'Création', desc: 'Fondation de Coris Meso Finance à Ouagadougou' },
  { year: '2017', title: 'Expansion', desc: 'Ouverture de 10 agences dans les principales villes' },
  { year: '2019', title: 'Digital', desc: 'Lancement de la plateforme Internet Banking' },
  { year: '2021', title: 'Mobile', desc: 'Lancement de l\'application mobile et services USSD' },
  { year: '2023', title: 'International', desc: 'Expansion dans 5 pays de la zone UEMOA' },
  { year: '2025', title: 'Innovation', desc: 'Intégration de l\'IA et des services Meso Finance 2.0' },
];

const stats = [
  { icon: Users, value: '500K+', label: 'Clients' },
  { icon: MapPin, value: '14', label: 'Pays' },
  { icon: Building2, value: '85', label: 'Agences' },
  { icon: TrendingUp, value: '150Mrd', label: 'FCFA d\'actifs' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-coris-navy via-coris-blue-dark to-coris-blue py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coris-gold/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-coris-gold font-bold text-sm uppercase tracking-wider mb-3">À propos</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              La meso finance au service de l'Afrique
            </h1>
            <p className="text-white/60 max-w-lg mx-auto">
              Depuis 2015, Coris Meso Finance accompagne les particuliers et entreprises dans leur développement financier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-0 px-4 -mt-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="p-6 text-center">
                <Icon size={20} className="text-coris-blue mx-auto mb-2" />
                <p className="text-2xl font-extrabold text-coris-navy">{value}</p>
                <p className="text-xs text-coris-gray-dark">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-coris-blue/10 rounded-xl flex items-center justify-center mb-4">
              <Target size={24} className="text-coris-blue" />
            </div>
            <h2 className="text-2xl font-extrabold text-coris-navy mb-4">Notre Mission</h2>
            <p className="text-coris-gray-dark leading-relaxed">
              Rendre les services financiers accessibles et inclusifs pour tous les Burkinabè 
              et les populations africaines. Nous croyons que chacun mérite un accès à des 
              solutions bancaires modernes, sécurisées et abordables.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-coris-gold/10 rounded-xl flex items-center justify-center mb-4">
              <Eye size={24} className="text-coris-gold" />
            </div>
            <h2 className="text-2xl font-extrabold text-coris-navy mb-4">Notre Vision</h2>
            <p className="text-coris-gray-dark leading-relaxed">
              Devenir la référence de la meso finance en Afrique de l'Ouest, en combinant 
              innovation technologique et proximité humaine. Nous aspirons à bancariser 
              2 millions de personnes d'ici 2030.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-coris-gray">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-coris-navy text-center mb-12">Nos Valeurs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-coris-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-coris-blue" />
                </div>
                <h3 className="font-bold text-coris-navy mb-2">{title}</h3>
                <p className="text-xs text-coris-gray-dark">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-coris-navy text-center mb-12">Notre Parcours</h2>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
            {milestones.map(({ year, title, desc }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-center gap-4 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1 hidden md:block" />
                <div className="relative z-10 w-12 h-12 bg-coris-blue rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-lg shadow-coris-blue/20">
                  {year}
                </div>
                <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-coris-navy">{title}</h3>
                  <p className="text-sm text-coris-gray-dark">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-coris-navy text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-4">Rejoignez l'aventure</h2>
          <p className="text-white/50 mb-8">Devenez client et faites partie de notre histoire.</p>
          <Link to="/particulier/epargne" className="bg-coris-red hover:bg-coris-red-dark text-white font-bold py-3.5 px-8 rounded-xl transition-colors text-sm">
            Ouvrir un compte
          </Link>
        </div>
      </section>
    </div>
  );
}
