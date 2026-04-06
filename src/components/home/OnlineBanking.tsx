import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Laptop, Lock, Fingerprint } from 'lucide-react';

export default function OnlineBanking() {
  return (
    <section className="py-20 md:py-28 bg-coris-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coris-blue/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coris-red/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-coris-red font-semibold text-xs uppercase tracking-[0.15em]">
              Internet Banking
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-5 leading-tight">
              La banque en ligne, <br className="hidden md:block" />sans limites
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-lg">
              Accédez à vos comptes 24h/24, planifiez vos virements, consultez vos relevés 
              et gérez vos cartes depuis votre navigateur. Sécurité maximale garantie.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-9">
              {[
                { icon: Shield, label: 'Sécurisé', sub: 'Chiffrement SSL' },
                { icon: Clock, label: '24h/24', sub: 'Toujours disponible' },
                { icon: Laptop, label: 'Multi-écran', sub: 'PC, tablette, mobile' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-white/[0.06] backdrop-blur-sm rounded-xl p-4 border border-white/[0.08] hover:bg-white/[0.1] transition-colors">
                  <Icon className="text-coris-red mb-2.5" size={22} />
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-white/40 text-xs">{sub}</p>
                </div>
              ))}
            </div>

            <Link
              to="/internet-banking"
              className="inline-flex items-center gap-2 bg-coris-red hover:bg-coris-red-light text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors shadow-lg shadow-coris-red/20"
            >
              Accéder à mon espace
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Browser mockup */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-1.5 border border-white/[0.1]">
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex items-center gap-2 bg-gray-700/60 rounded-lg px-3 py-1.5 ml-4">
                    <Lock size={11} className="text-green-400" />
                    <span className="text-[11px] text-gray-400">banking.corismeso.bf</span>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-coris-blue rounded-lg flex items-center justify-center">
                      <Fingerprint size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Coris Meso Finance</p>
                      <p className="text-gray-500 text-[10px]">Espace sécurisé</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-coris-blue to-coris-blue-dark rounded-xl p-4">
                      <p className="text-white/50 text-[10px] mb-1">Compte courant</p>
                      <p className="text-white font-bold text-base">1 250 000 <span className="text-[10px] font-normal">FCFA</span></p>
                    </div>
                    <div className="bg-gradient-to-br from-coris-red to-coris-red-dark rounded-xl p-4">
                      <p className="text-white/50 text-[10px] mb-1">Épargne</p>
                      <p className="text-white font-bold text-base">3 750 000 <span className="text-[10px] font-normal">FCFA</span></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {['Virement', 'Factures', 'Historique'].map((a) => (
                      <div key={a} className="bg-white/[0.06] hover:bg-white/[0.1] rounded-lg p-3 text-center transition-colors cursor-pointer border border-white/[0.06]">
                        <span className="text-white/70 text-[11px] font-medium">{a}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/[0.04] rounded-lg p-3">
                    <p className="text-gray-500 text-[10px] mb-2 font-medium">Dernières opérations</p>
                    {['Virement reçu +150 000', 'Paiement facture -15 000', 'Retrait GAB -50 000'].map((op) => (
                      <div key={op} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                        <span className="text-gray-400 text-[10px]">{op}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
