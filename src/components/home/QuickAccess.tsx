import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PiggyBank, Building2, ArrowRight } from 'lucide-react';

export default function QuickAccess() {
  return (
    <section className="py-16 md:py-20 bg-coris-sky/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/particulier/epargne"
              className="group flex items-start gap-5 bg-white rounded-2xl p-7 hover:shadow-xl hover:shadow-coris-blue/5 transition-all h-full border border-gray-100 hover:border-coris-blue/20"
            >
              <div className="w-14 h-14 bg-coris-blue/8 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-coris-blue group-hover:scale-105 transition-all">
                <PiggyBank className="text-coris-blue group-hover:text-white transition-colors" size={26} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-coris-navy mb-2 group-hover:text-coris-blue transition-colors">
                  Comptes d'épargne
                </h3>
                <p className="text-sm text-coris-gray-dark mb-4 leading-relaxed">
                  Classique, Jeune, Femme, Logement, Éducation, Premium — un compte pour 
                  chaque profil avec des taux jusqu'à 5% dès 1 000 FCFA.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-coris-red uppercase tracking-wide group-hover:gap-2.5 transition-all">
                  Voir les comptes
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/entreprise"
              className="group flex items-start gap-5 bg-white rounded-2xl p-7 hover:shadow-xl hover:shadow-coris-blue/5 transition-all h-full border border-gray-100 hover:border-coris-red/20"
            >
              <div className="w-14 h-14 bg-coris-red/8 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-coris-red group-hover:scale-105 transition-all">
                <Building2 className="text-coris-red group-hover:text-white transition-colors" size={26} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-coris-navy mb-2 group-hover:text-coris-red transition-colors">
                  Solutions entreprise
                </h3>
                <p className="text-sm text-coris-gray-dark mb-4 leading-relaxed">
                  Internet Banking entreprise, terminaux de paiement, gestion de trésorerie 
                  et paiements avec workflow maker-checker sécurisé.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-coris-blue uppercase tracking-wide group-hover:gap-2.5 transition-all">
                  Découvrir
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
