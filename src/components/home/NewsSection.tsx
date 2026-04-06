import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { newsArticles } from '../../data/homeData';

const categoryColors: Record<string, string> = {
  Innovation: 'bg-coris-blue/10 text-coris-blue',
  Engagement: 'bg-green-50 text-green-700',
  Partenariat: 'bg-coris-red/10 text-coris-red',
};

export default function NewsSection() {
  return (
    <section className="py-20 md:py-28 bg-coris-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-coris-red font-semibold text-xs uppercase tracking-[0.15em]">
              Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-coris-navy mt-3">
              Actualités
            </h2>
          </motion.div>
          <Link
            to="/actualite"
            className="hidden md:inline-flex items-center gap-2 text-coris-blue font-semibold text-sm hover:gap-3 transition-all group"
          >
            Tout voir
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/actualite/${article.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all h-full border border-gray-100"
              >
                {/* Image */}
                <div className="h-44 bg-gradient-to-br from-coris-blue to-coris-navy flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(206,17,38,0.2),transparent)]" />
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <Tag size={24} className="text-white/40" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${categoryColors[article.category] || 'bg-gray-100 text-gray-600'}`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-coris-gray-dark mb-3">
                    <Calendar size={12} />
                    {article.date}
                  </div>
                  <h3 className="font-bold text-coris-navy mb-2 group-hover:text-coris-blue transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-coris-gray-dark line-clamp-2 mb-5 flex-1">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-coris-red uppercase tracking-wide group-hover:gap-2.5 transition-all">
                    Lire
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            to="/actualite"
            className="inline-flex items-center gap-2 text-coris-blue font-semibold text-sm"
          >
            Voir toutes les actualités
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
