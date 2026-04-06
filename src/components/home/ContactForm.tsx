import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Phone, Mail, Clock } from 'lucide-react';

const interests = [
  'Ouvrir un compte',
  'Crédit / Prêt',
  'Carte bancaire',
  'Épargne',
  "Solutions d'entreprise",
  'Autre demande',
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    interest: '',
    name: '',
    email: '',
    phone: '',
    acceptTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <span className="text-coris-red font-semibold text-xs uppercase tracking-[0.15em]">
              Parlons-en
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-coris-navy mt-3 mb-5 leading-tight">
              Comment pouvons-nous vous aider ?
            </h2>
            <p className="text-coris-gray-dark leading-relaxed mb-8">
              Remplissez le formulaire et notre équipe vous recontactera dans les plus brefs délais.
            </p>

            <div className="space-y-4">
              {[
                { icon: Phone, label: '+226 25 30 00 00', sub: 'Appelez-nous' },
                { icon: Mail, label: 'contact@corismeso.bf', sub: 'Écrivez-nous' },
                { icon: Clock, label: 'Lun - Ven : 7h30 - 16h30', sub: 'Horaires' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={sub} className="flex items-center gap-4 bg-coris-sky/60 rounded-xl p-4">
                  <div className="w-10 h-10 bg-coris-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-coris-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-coris-gray-dark">{sub}</p>
                    <p className="text-sm font-semibold text-coris-navy">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-coris-gray rounded-3xl p-7 md:p-9 border border-gray-100">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-coris-navy mb-2">Demande envoyée !</h3>
                  <p className="text-coris-gray-dark text-sm">
                    Nous vous recontacterons dans les 24 heures ouvrées.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">
                      Objet de votre demande
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue transition-all"
                      required
                    >
                      <option value="">Sélectionnez...</option>
                      {interests.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom et prénom"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue transition-all"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nom@email.com"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+226 70 00 00 00"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20 focus:border-coris-blue transition-all"
                        required
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="mt-0.5 accent-coris-blue w-4 h-4"
                      required
                    />
                    <span className="text-xs text-coris-gray-dark leading-relaxed">
                      J'accepte que Coris Meso Finance utilise mes coordonnées pour me recontacter.{' '}
                      <a href="#" className="text-coris-blue underline">Politique de confidentialité</a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-coris-blue hover:bg-coris-blue-dark text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-coris-blue/15 hover:shadow-xl text-sm"
                  >
                    <Send size={15} />
                    Envoyer ma demande
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
