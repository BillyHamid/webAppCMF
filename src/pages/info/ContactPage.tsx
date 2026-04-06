import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, Building2 } from 'lucide-react';

const agencies = [
  { city: 'Ouagadougou', address: 'Avenue de la Nation, Ouaga 2000', phone: '+226 25 30 XX XX', hours: 'Lun-Ven 7h30-16h' },
  { city: 'Bobo-Dioulasso', address: 'Boulevard de la Révolution', phone: '+226 20 97 XX XX', hours: 'Lun-Ven 7h30-16h' },
  { city: 'Koudougou', address: 'Avenue de l\'Indépendance', phone: '+226 25 44 XX XX', hours: 'Lun-Ven 7h30-16h' },
  { city: 'Ouahigouya', address: 'Rue du Commerce', phone: '+226 24 55 XX XX', hours: 'Lun-Ven 7h30-15h30' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSent(true), 600);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-coris-navy via-coris-blue-dark to-coris-blue py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-coris-red/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-coris-red-light font-bold text-sm uppercase tracking-wider mb-3">Contact</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Parlons de vos projets</h1>
            <p className="text-white/60 max-w-lg mx-auto">
              Notre équipe est à votre écoute. Contactez-nous par téléphone, email ou en agence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-12">
          {/* Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-coris-navy mb-6">Coordonnées</h2>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: 'Siège social', value: 'Avenue de la Nation\nOuaga 2000, Ouagadougou' },
                  { icon: Phone, label: 'Téléphone', value: '+226 25 30 XX XX\n+226 70 XX XX XX' },
                  { icon: Mail, label: 'Email', value: 'contact@corismeso.bf\ninfo@corismeso.bf' },
                  { icon: Clock, label: 'Horaires', value: 'Lun - Ven : 7h30 - 16h00\nSam : 8h00 - 12h00' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4 p-4 bg-coris-gray rounded-xl">
                    <div className="w-10 h-10 bg-coris-blue/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-coris-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-coris-navy">{label}</p>
                      <p className="text-xs text-coris-gray-dark whitespace-pre-line">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-coris-navy mb-3 flex items-center gap-2">
                <MessageCircle size={16} className="text-coris-blue" /> Service client
              </h3>
              <p className="text-sm text-coris-gray-dark">
                Appelez le <strong>+226 70 XX XX XX</strong> (gratuit) ou ouvrez Maya, votre assistante financière virtuelle en bas de page.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-gray-100 p-10 text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-extrabold text-coris-navy mb-2">Message envoyé !</h3>
                <p className="text-sm text-coris-gray-dark mb-6">
                  Nous avons reçu votre message et vous répondrons dans les plus brefs délais.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="bg-coris-blue text-white font-bold py-3 px-6 rounded-xl text-sm">
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-5"
              >
                <h2 className="text-xl font-extrabold text-coris-navy mb-2">Envoyez-nous un message</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Nom complet</label>
                    <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required placeholder="Votre nom" className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Email</label>
                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required placeholder="votre@email.com" className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Téléphone</label>
                    <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+226 70 XX XX XX" className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Sujet</label>
                    <select value={form.subject} onChange={(e) => update('subject', e.target.value)} className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20">
                      <option value="">Choisir un sujet</option>
                      <option>Ouvrir un compte</option>
                      <option>Demande de crédit</option>
                      <option>Carte bancaire</option>
                      <option>Services digitaux</option>
                      <option>Réclamation</option>
                      <option>Autre</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Message</label>
                  <textarea value={form.message} onChange={(e) => update('message', e.target.value)} required rows={5} placeholder="Décrivez votre demande..." className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-coris-blue/20" />
                </div>
                <button type="submit" className="w-full bg-coris-blue hover:bg-coris-blue-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                  <Send size={16} /> Envoyer le message
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* Agencies */}
      <section className="py-16 px-4 bg-coris-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-coris-navy mb-3">Nos Agences</h2>
            <p className="text-coris-gray-dark">Retrouvez-nous dans les principales villes du Burkina Faso</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agencies.map((agency) => (
              <div key={agency.city} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={16} className="text-coris-blue" />
                  <h3 className="font-bold text-coris-navy">{agency.city}</h3>
                </div>
                <div className="space-y-1 text-xs text-coris-gray-dark">
                  <p className="flex items-center gap-1"><MapPin size={11} /> {agency.address}</p>
                  <p className="flex items-center gap-1"><Phone size={11} /> {agency.phone}</p>
                  <p className="flex items-center gap-1"><Clock size={11} /> {agency.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
