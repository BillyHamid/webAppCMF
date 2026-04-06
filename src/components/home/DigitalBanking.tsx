import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Bell, Zap, ArrowRight, Check } from 'lucide-react';
import appMobile from '../../assets/images/app-mobile.png';

const features = [
  {
    icon: Smartphone,
    title: 'Application Mobile',
    desc: 'iOS et Android — gérez tout depuis votre smartphone.',
  },
  {
    icon: Globe,
    title: 'Internet Banking',
    desc: 'Accès sécurisé à vos comptes via navigateur web 24h/24.',
  },
  {
    icon: Bell,
    title: 'Alertes temps réel',
    desc: 'SMS et email instantanés pour chaque mouvement.',
  },
  {
    icon: Zap,
    title: 'Paiement de factures',
    desc: 'SONABEL, ONEA, téléphone — payez en un clic.',
  },
];

export default function DigitalBanking() {
  return (
    <section className="py-20 md:py-28 bg-coris-sky/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Phone with real screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center order-2 lg:order-1"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-[280px] md:w-[300px]">
                <div className="bg-coris-navy rounded-[2.8rem] p-2.5 shadow-2xl shadow-coris-blue/25 ring-1 ring-white/10">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-coris-navy rounded-b-2xl z-10" />
                  {/* Screen */}
                  <div className="rounded-[2.2rem] overflow-hidden bg-white">
                    <img
                      src={appMobile}
                      alt="Application mobile Coris Meso Finance"
                      className="w-full h-auto block"
                    />
                  </div>
                </div>

                {/* Side button */}
                <div className="absolute right-[-2px] top-28 w-[3px] h-12 bg-coris-navy/60 rounded-r-full" />
                <div className="absolute left-[-2px] top-24 w-[3px] h-8 bg-coris-navy/60 rounded-l-full" />
                <div className="absolute left-[-2px] top-36 w-[3px] h-8 bg-coris-navy/60 rounded-l-full" />
              </div>

              {/* Glow effects */}
              <div className="absolute -inset-12 bg-coris-blue/8 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-coris-red/10 rounded-full blur-2xl -z-10" />

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute -left-4 md:-left-10 top-1/4 bg-white rounded-2xl shadow-xl shadow-black/10 p-3 flex items-center gap-2.5 border border-gray-100"
              >
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Virement reçu</p>
                  <p className="text-xs font-bold text-coris-navy">+150 000 F</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="absolute -right-4 md:-right-10 bottom-1/3 bg-white rounded-2xl shadow-xl shadow-black/10 p-3 flex items-center gap-2.5 border border-gray-100"
              >
                <div className="w-9 h-9 bg-coris-blue/10 rounded-xl flex items-center justify-center">
                  <Bell size={16} className="text-coris-blue" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Alerte SMS</p>
                  <p className="text-xs font-bold text-coris-navy">Activé</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <span className="text-coris-red font-semibold text-xs uppercase tracking-[0.15em]">
              100% Digital
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-coris-navy mt-3 mb-5 leading-tight">
              Votre banque dans <br className="hidden md:block" />votre poche
            </h2>
            <p className="text-coris-gray-dark mb-8 leading-relaxed">
              Accédez à vos comptes, effectuez vos virements et payez vos factures 
              depuis votre smartphone ou votre ordinateur. Simple, rapide, sécurisé.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100 hover:border-coris-blue/20 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-coris-blue/8 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-coris-blue/15 transition-colors">
                    <f.icon className="text-coris-blue" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-coris-navy text-sm mb-0.5">{f.title}</h4>
                    <p className="text-xs text-coris-gray-dark leading-relaxed">{f.desc}</p>
                  </div>
                  <Check size={16} className="text-coris-red shrink-0 mt-1" />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/particulier/digital"
                className="inline-flex items-center gap-2 bg-coris-blue text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-coris-blue-dark transition-colors shadow-lg shadow-coris-blue/20 hover:shadow-xl"
              >
                Explorer la banque digitale
                <ArrowRight size={16} />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 border-2 border-coris-blue/20 text-coris-blue font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-coris-blue hover:text-white hover:border-coris-blue transition-all"
              >
                Télécharger l'app
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
