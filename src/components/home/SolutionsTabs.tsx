import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, CreditCard, Wallet, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { solutionTabs } from '../../data/homeData';
import appScreens from '../../assets/images/app-screens.png';
import corisCard from '../../assets/images/coris-card.png';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  CreditCard,
  Wallet,
  ShieldCheck,
};

export default function SolutionsTabs() {
  const [activeTab, setActiveTab] = useState(solutionTabs[0].id);
  const active = solutionTabs.find((t) => t.id === activeTab)!;
  const ActiveIcon = iconMap[active.icon];
  const isDigital = active.id === 'digital';
  const isCards = active.id === 'cards';

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-coris-red font-semibold text-xs uppercase tracking-[0.15em]">
            Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-coris-navy mt-3">
            Adaptées à vos besoins
          </h2>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-coris-gray rounded-2xl p-1.5 gap-1">
            {solutionTabs.map((tab) => {
              const Icon = iconMap[tab.icon];
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-coris-blue text-white shadow-md'
                      : 'text-coris-gray-dark hover:text-coris-navy hover:bg-white'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-coris-gray rounded-3xl overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-2">
                {/* Visual side */}
                <div className={`relative min-h-[320px] md:min-h-[400px] overflow-hidden ${
                  isDigital || isCards ? '' : 'bg-gradient-to-br from-coris-blue to-coris-navy'
                }`}>
                  {isDigital ? (
                    /* Real app screens for "Solutions digitales" */
                    <div className="absolute inset-0 bg-gradient-to-br from-coris-blue-dark to-coris-navy">
                      <img
                        src={appScreens}
                        alt="Aperçu des écrans de l'application Coris Meso Finance"
                        className="w-full h-full object-cover object-center opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-coris-navy/60 via-transparent to-coris-navy/30" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                        <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 mb-3">
                          <Monitor size={12} />
                          Application mobile
                        </span>
                        <h3 className="text-white text-xl md:text-2xl font-bold">{active.title}</h3>
                      </div>
                    </div>
                  ) : isCards ? (
                    /* Real card image for "Cartes bancaires" */
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2347] to-[#1a1a3e] flex items-center justify-center p-8 md:p-12">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 -right-12 w-72 h-72 bg-coris-red/15 rounded-full blur-[80px]" />
                        <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-coris-blue/20 rounded-full blur-[60px]" />
                      </div>
                      <div className="relative z-10 w-full max-w-[320px]">
                        <motion.img
                          key="card-img"
                          initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          src={corisCard}
                          alt="Carte VISA Coris Cash"
                          className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-xl"
                        />
                        <div className="mt-6 text-center">
                          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/15">
                            <CreditCard size={12} />
                            VISA International
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Default icon visual for other tabs */
                    <>
                      <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-coris-red/10 rounded-full translate-y-1/3 -translate-x-1/3" />
                      </div>
                      <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 md:p-16 text-center">
                        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
                          <ActiveIcon className="text-white" size={36} />
                        </div>
                        <h3 className="text-white text-2xl font-bold mb-2">{active.title}</h3>
                        <div className="w-12 h-1 bg-coris-red rounded-full mx-auto" />
                      </div>
                    </>
                  )}
                </div>

                {/* Text side */}
                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-coris-navy mb-3">{active.title}</h3>
                  <p className="text-coris-gray-dark leading-relaxed mb-6 text-sm">
                    {active.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {active.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-coris-red shrink-0" />
                        <span className="text-sm text-coris-navy font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={active.href}
                    className="inline-flex items-center gap-2 text-coris-blue font-semibold text-sm hover:gap-3 transition-all group"
                  >
                    En savoir plus
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
