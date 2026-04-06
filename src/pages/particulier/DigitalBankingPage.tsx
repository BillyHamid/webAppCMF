import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Star,
  Smartphone,
  Globe,
  Bell,
  Zap,
  ArrowRight,
  CheckCircle2,
  Wifi,
  Lock,
  QrCode,
  RefreshCw,
} from 'lucide-react';
import appMobile from '../../assets/images/app-mobile.png';

/* ───────────────────────── Hero CTA ───────────────────────── */

function HeroCTA() {
  return (
    <section className="py-16 md:py-24 bg-coris-gray overflow-hidden px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2.5rem] md:rounded-[3rem] bg-coris-navy text-white overflow-hidden shadow-2xl">
          <div className="p-8 sm:p-12 lg:p-20 relative">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-coris-blue/30 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-coris-red/15 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Text side */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 text-white/60 border border-white/10 bg-white/5 font-bold uppercase tracking-widest px-4 py-1.5 rounded-full text-[10px]">
                    <ShieldCheck className="w-4 h-4 text-coris-red" />
                    Sécurisé & certifié
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight leading-[1.05]"
                >
                  Votre banque,{' '}
                  <br className="hidden sm:block" />
                  <span className="text-coris-red italic">partout.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/50 text-base md:text-lg mb-12 max-w-lg leading-relaxed mx-auto lg:mx-0"
                >
                  L'application Coris Meso Finance met toute la puissance de votre banque 
                  dans votre poche. Consultation de solde, virements instantanés, paiement 
                  de factures et synchronisation en temps réel.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10"
                >
                  <a
                    href="#"
                    className="flex items-center gap-3 h-14 bg-white text-coris-navy hover:bg-gray-100 font-bold text-xs uppercase tracking-widest px-7 rounded-2xl transition-colors shadow-lg"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    App Store
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 h-14 bg-white/10 border border-white/20 text-white hover:bg-white/20 font-bold text-xs uppercase tracking-widest px-7 rounded-2xl transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    Play Store
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center lg:justify-start gap-8 border-t border-white/10 pt-8"
                >
                  <div className="text-left">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3.5 h-3.5 fill-coris-red text-coris-red" />
                      <span className="text-sm font-extrabold text-white">4.8/5</span>
                    </div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/35">
                      Note utilisateurs
                    </p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-left">
                    <span className="text-sm font-extrabold text-white block mb-1">50K+</span>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/35">
                      Téléchargements
                    </p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-left">
                    <span className="text-sm font-extrabold text-white block mb-1">24/7</span>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/35">
                      Disponibilité
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Phone mockup */}
              <div className="lg:w-1/2 relative">
                <motion.div
                  initial={{ opacity: 0, rotate: 12, y: 100 }}
                  whileInView={{ opacity: 1, rotate: -6, y: 0 }}
                  transition={{ duration: 1, ease: 'circOut' }}
                  className="relative z-10 w-[260px] sm:w-[280px] md:w-[300px] mx-auto aspect-[9/19] bg-coris-navy rounded-[2.8rem] border-[6px] border-gray-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden"
                >
                  <img
                    src={appMobile}
                    alt="Application Coris Meso Finance"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-800 rounded-b-2xl" />
                </motion.div>

                {/* Glow behind phone */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-coris-blue/20 rounded-full blur-[100px] -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Features Grid ───────────────────────── */

const services = [
  {
    icon: Smartphone,
    title: 'Application Mobile',
    description: 'Consultez vos comptes, effectuez des virements et gérez vos cartes depuis votre smartphone iOS ou Android.',
    features: ['Consultation de solde', 'Virements instantanés', 'Gestion des cartes', 'Historique complet'],
  },
  {
    icon: Globe,
    title: 'Internet Banking',
    description: "Accédez à l'ensemble de vos services bancaires via votre navigateur web avec une sécurité renforcée par token.",
    features: ['Tableau de bord', 'Paiements multiples', 'Relevés téléchargeables', 'Multi-comptes'],
  },
  {
    icon: Zap,
    title: 'Paiement de factures',
    description: 'Réglez vos factures SONABEL, ONEA, téléphone et abonnements en quelques secondes.',
    features: ['SONABEL & ONEA', 'Recharges téléphone', 'Paiements récurrents', 'Confirmations instantanées'],
  },
  {
    icon: Bell,
    title: 'Alertes & Notifications',
    description: 'Recevez des alertes SMS et email en temps réel pour chaque opération sur vos comptes.',
    features: ['Alertes SMS', 'Notifications email', 'Relevés électroniques', 'Alertes de sécurité'],
  },
];

function FeaturesGrid() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-coris-red font-semibold text-xs uppercase tracking-[0.15em]">
            Nos canaux digitaux
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-coris-navy mt-3 mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-coris-gray-dark max-w-xl mx-auto leading-relaxed">
            Une gamme complète de services numériques pour gérer vos finances à tout moment, en tout lieu.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-coris-gray hover:bg-white rounded-2xl p-8 border border-transparent hover:border-coris-blue/10 hover:shadow-xl hover:shadow-coris-blue/5 transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-coris-blue/10 group-hover:bg-coris-blue rounded-xl flex items-center justify-center shrink-0 transition-colors">
                  <service.icon className="text-coris-blue group-hover:text-white transition-colors" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-coris-navy mb-2">{service.title}</h3>
                  <p className="text-sm text-coris-gray-dark leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-coris-red shrink-0" />
                        <span className="text-xs text-coris-navy font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── How it works ───────────────────────── */

const steps = [
  {
    step: '01',
    icon: Smartphone,
    title: 'Téléchargez',
    desc: "Installez l'application Coris Meso Finance depuis l'App Store ou Google Play.",
  },
  {
    step: '02',
    icon: Lock,
    title: 'Connectez-vous',
    desc: "Utilisez vos identifiants Internet Banking ou créez un accès en agence.",
  },
  {
    step: '03',
    icon: QrCode,
    title: 'Vérifiez',
    desc: "Validez votre identité avec un code OTP reçu par SMS.",
  },
  {
    step: '04',
    icon: RefreshCw,
    title: 'Opérez',
    desc: "Virements, factures, consultation — tout est à portée de main.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-coris-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-coris-red font-semibold text-xs uppercase tracking-[0.15em]">
            Démarrez en 4 étapes
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-coris-navy mt-3">
            Comment ça marche ?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-2xl p-7 text-center border border-gray-100 hover:shadow-lg transition-all group"
            >
              <span className="text-[64px] font-black text-coris-blue/[0.04] absolute top-3 right-5 leading-none select-none group-hover:text-coris-blue/[0.08] transition-colors">
                {s.step}
              </span>
              <div className="w-14 h-14 bg-coris-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-coris-blue transition-colors">
                <s.icon className="text-coris-blue group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="font-bold text-coris-navy text-base mb-2">{s.title}</h4>
              <p className="text-sm text-coris-gray-dark leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Security section ───────────────────────── */

function SecuritySection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-coris-red font-semibold text-xs uppercase tracking-[0.15em]">
              Votre sécurité, notre priorité
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-coris-navy mt-3 mb-6 leading-tight">
              Des transactions protégées à chaque instant
            </h2>
            <p className="text-coris-gray-dark leading-relaxed mb-8">
              Nos plateformes digitales intègrent les standards de sécurité bancaire 
              les plus élevés pour protéger vos données et vos transactions.
            </p>

            <div className="space-y-4">
              {[
                { icon: Lock, title: 'Chiffrement SSL 256-bit', desc: 'Toutes vos données sont chiffrées de bout en bout.' },
                { icon: ShieldCheck, title: 'Authentification OTP', desc: 'Code unique par SMS pour chaque opération sensible.' },
                { icon: Bell, title: 'Alertes de sécurité', desc: 'Notification immédiate en cas de connexion suspecte.' },
                { icon: Wifi, title: 'Sessions sécurisées', desc: "Déconnexion automatique après inactivité." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-coris-blue/8 group-hover:bg-coris-blue rounded-lg flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={18} className="text-coris-blue group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-coris-navy text-sm mb-0.5">{title}</h4>
                    <p className="text-xs text-coris-gray-dark">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-coris-blue to-coris-navy rounded-[3rem] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(206,17,38,0.15),transparent)]" />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur-sm border border-white/10">
                    <ShieldCheck size={40} className="text-white" />
                  </div>
                  <p className="text-white font-bold text-xl mb-1">100% sécurisé</p>
                  <p className="text-white/50 text-sm">Certifié PCI DSS</p>
                </div>
              </div>
              <div className="absolute -inset-8 bg-coris-blue/10 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA bottom ───────────────────────── */

function BottomCTA() {
  return (
    <section className="py-16 bg-coris-sky/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-coris-navy mb-4">
            Prêt à passer au digital ?
          </h2>
          <p className="text-coris-gray-dark mb-8 max-w-lg mx-auto">
            Rendez-vous en agence pour activer votre accès Internet Banking ou 
            téléchargez directement notre application mobile.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/contact/formulaire"
              className="inline-flex items-center gap-2 bg-coris-red text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-coris-red-dark transition-colors shadow-lg shadow-coris-red/20"
            >
              Nous contacter
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/particulier/epargne"
              className="inline-flex items-center gap-2 border-2 border-coris-blue text-coris-blue font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-coris-blue hover:text-white transition-all"
            >
              Ouvrir un compte
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function DigitalBankingPage() {
  return (
    <>
      <HeroCTA />
      <FeaturesGrid />
      <HowItWorks />
      <SecuritySection />
      <BottomCTA />
    </>
  );
}
