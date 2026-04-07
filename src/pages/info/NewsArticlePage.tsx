import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { newsArticles } from '../../data/homeData';

export default function NewsArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 bg-coris-gray">
        <p className="text-coris-gray-dark mb-6">Article introuvable.</p>
        <Link to="/actualites" className="text-coris-blue font-semibold hover:underline">
          Voir toutes les actualités
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-coris-navy to-coris-blue-dark text-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Retour aux actualités
          </Link>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white/90 mb-4"
          >
            <Tag size={12} />
            {article.category}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4"
          >
            {article.title}
          </motion.h1>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Calendar size={14} />
            {article.date}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-none text-coris-gray-dark leading-relaxed space-y-4"
        >
          <p className="text-lg font-medium text-coris-navy mb-6">{article.excerpt}</p>
          <p>
            Coris Meso Finance poursuit son engagement pour une finance accessible et innovante. Pour toute précision sur cette
            actualité, nos équipes sont à votre écoute via la page{' '}
            <Link to="/contact" className="text-coris-blue font-semibold hover:underline">
              Contact
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </article>
  );
}
