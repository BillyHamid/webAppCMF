import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserPlus,
  CreditCard,
  Smartphone,
  ArrowLeftRight,
  Landmark,
  ArrowRight,
} from 'lucide-react';
import { bankingOffers } from '../../data/homeData';

const iconMap: Record<string, React.ElementType> = {
  UserPlus,
  CreditCard,
  Smartphone,
  ArrowLeftRight,
  Landmark,
};

export default function BankingOffers() {
  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-coris-red font-semibold text-xs uppercase tracking-[0.15em]">
            Nos services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-coris-navy mt-3 mb-4">
            Vos finances, simplifiées
          </h2>
          <p className="text-coris-gray-dark text-lg max-w-xl mx-auto leading-relaxed">
            Des solutions pensées pour chaque étape de votre vie financière.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {bankingOffers.map((offer, index) => {
            const Icon = iconMap[offer.icon];
            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  to={offer.href}
                  className="group flex flex-col bg-coris-gray hover:bg-coris-blue rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:shadow-coris-blue/10 hover:-translate-y-1"
                >
                  <div className="w-11 h-11 bg-coris-blue/10 group-hover:bg-white/15 rounded-xl flex items-center justify-center mb-5 transition-colors">
                    <Icon className="text-coris-blue group-hover:text-white transition-colors" size={22} />
                  </div>
                  <h3 className="font-bold text-coris-navy group-hover:text-white text-[15px] mb-2 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-coris-gray-dark group-hover:text-white/75 mb-5 transition-colors leading-relaxed flex-1">
                    {offer.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-coris-red group-hover:text-white transition-colors uppercase tracking-wide">
                    Découvrir
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
