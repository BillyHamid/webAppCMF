import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Tag, Clock, ArrowRight } from 'lucide-react';

const allArticles = [
  {
    id: 1,
    title: 'Coris Meso Finance lance son application mobile 2.0',
    excerpt: 'Une nouvelle version de notre application avec des fonctionnalités inédites : paiement QR, biométrie et suivi de budget.',
    category: 'Innovation',
    date: '28 Mars 2026',
    readTime: '3 min',
    featured: true,
  },
  {
    id: 2,
    title: 'Nouveau partenariat avec Orange Money',
    excerpt: 'Le service Bank to Wallet est désormais disponible avec Orange Money pour des transferts instantanés.',
    category: 'Partenariat',
    date: '15 Mars 2026',
    readTime: '2 min',
    featured: true,
  },
  {
    id: 3,
    title: 'Ouverture de 5 nouvelles agences au Burkina',
    excerpt: 'Coris Meso Finance poursuit son expansion avec l\'ouverture d\'agences à Kaya, Fada, Tenkodogo, Dédougou et Banfora.',
    category: 'Expansion',
    date: '01 Mars 2026',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 4,
    title: 'Crédit Express : obtenez un financement en 72h',
    excerpt: 'Notre nouvelle offre Crédit Express permet aux particuliers d\'obtenir un prêt rapide avec un minimum de documents.',
    category: 'Produit',
    date: '20 Fév. 2026',
    readTime: '3 min',
    featured: false,
  },
  {
    id: 5,
    title: 'Maya, votre assistante financière virtuelle',
    excerpt: 'Découvrez Maya, assistante financière virtuelle disponible 24/7 pour répondre à vos questions sur le budget, les prêts et les services Coris Meso Finance.',
    category: 'Innovation',
    date: '10 Fév. 2026',
    readTime: '5 min',
    featured: false,
  },
  {
    id: 6,
    title: 'Bilan 2025 : une année de croissance record',
    excerpt: 'Avec 30% de croissance et 100 000 nouveaux clients, 2025 a été une année exceptionnelle pour Coris Meso Finance.',
    category: 'Résultats',
    date: '25 Jan. 2026',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 7,
    title: 'Forum de la finance inclusive à Ouagadougou',
    excerpt: 'Coris Meso Finance a participé au Forum international de la finance inclusive, présentant ses solutions innovantes.',
    category: 'Événement',
    date: '10 Jan. 2026',
    readTime: '3 min',
    featured: false,
  },
  {
    id: 8,
    title: 'Carte VISA Gold : les avantages premium',
    excerpt: 'Découvrez tous les avantages exclusifs de notre carte VISA Gold : assurance voyage, accès VIP et plafonds élevés.',
    category: 'Produit',
    date: '02 Jan. 2026',
    readTime: '3 min',
    featured: false,
  },
];

const categories = ['Tout', 'Innovation', 'Partenariat', 'Expansion', 'Produit', 'Résultats', 'Événement'];

export default function ActualitesPage() {
  const [category, setCategory] = useState('Tout');
  const filtered = category === 'Tout' ? allArticles : allArticles.filter((a) => a.category === category);
  const featured = allArticles.filter((a) => a.featured);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-coris-navy via-coris-blue-dark to-coris-blue py-20 px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-coris-sky font-bold text-sm uppercase tracking-wider mb-3">Actualités</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Restez informé</h1>
            <p className="text-white/60 max-w-lg mx-auto">
              Suivez nos dernières actualités, nos événements et nos innovations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-bold text-coris-navy mb-6">À la une</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-coris-blue/10 to-coris-blue/5 flex items-center justify-center relative overflow-hidden">
                  <Tag size={40} className="text-coris-blue/20" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-coris-red text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-coris-gray-dark mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-coris-navy text-lg mb-2 group-hover:text-coris-blue transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-coris-gray-dark mb-4">{article.excerpt}</p>
                  <span className="flex items-center gap-1 text-sm font-semibold text-coris-blue">
                    Lire la suite <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All articles */}
      <section className="py-12 px-4 bg-coris-gray">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-lg font-bold text-coris-navy">Toutes les actualités</h2>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    category === cat
                      ? 'bg-coris-blue text-white'
                      : 'bg-white text-coris-gray-dark hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-coris-blue/10 text-coris-blue text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-coris-gray-dark flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
                </div>
                <h3 className="font-bold text-coris-navy mb-2 group-hover:text-coris-blue transition-colors text-sm leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-coris-gray-dark mb-3 line-clamp-2">{article.excerpt}</p>
                <span className="flex items-center gap-1 text-xs font-semibold text-coris-blue">
                  Lire la suite <ChevronRight size={12} />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
