import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Lock, Bell, Shield, Globe, ChevronRight, Check, Camera, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profil');
  const [notifs, setNotifs] = useState({ email: true, sms: false, push: true });
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: 'profil', icon: User, label: 'Mon profil' },
    { id: 'securite', icon: Shield, label: 'Sécurité' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'langue', icon: Globe, label: 'Langue et région' },
  ];

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-coris-navy flex items-center gap-2">
          <Settings size={22} className="text-coris-blue" /> Paramètres
        </h1>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        {/* Menu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 space-y-1 self-start">
          {sections.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSection === id ? 'bg-coris-blue text-white' : 'text-coris-gray-dark hover:bg-coris-gray'
              }`}
            >
              <Icon size={16} /> {label}
              <ChevronRight size={14} className="ml-auto" />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          {activeSection === 'profil' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-coris-blue text-white flex items-center justify-center text-2xl font-bold">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-coris-navy text-white rounded-lg flex items-center justify-center">
                    <Camera size={12} />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-coris-navy">{user.firstName} {user.lastName}</h3>
                  <p className="text-xs text-coris-gray-dark">Client depuis 2024</p>
                  <p className="text-xs text-coris-gray-dark">{user.accountNumber}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Prénom</label>
                  <input defaultValue={user.firstName} className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Nom</label>
                  <input defaultValue={user.lastName} className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide flex items-center gap-1"><Mail size={12} /> Email</label>
                  <input defaultValue={user.email} className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide flex items-center gap-1"><Phone size={12} /> Téléphone</label>
                  <input defaultValue={user.phone} className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coris-blue/20" />
                </div>
              </div>

              <button onClick={save} className="bg-coris-blue hover:bg-coris-blue-dark text-white font-bold py-3 px-6 rounded-xl text-sm flex items-center gap-2">
                {saved ? <><Check size={16} /> Enregistré</> : 'Sauvegarder'}
              </button>
            </motion.div>
          )}

          {activeSection === 'securite' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <h3 className="font-bold text-coris-navy">Sécurité du compte</h3>
              {[
                { icon: Lock, label: 'Changer le mot de passe', desc: 'Dernière modification il y a 3 mois' },
                { icon: Shield, label: 'Authentification à deux facteurs', desc: 'Activé — Via SMS' },
                { icon: Globe, label: 'Sessions actives', desc: '2 appareils connectés' },
              ].map(({ icon: Icon, label, desc }) => (
                <button key={label} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-coris-gray transition-colors text-left">
                  <div className="w-10 h-10 bg-coris-gray rounded-xl flex items-center justify-center">
                    <Icon size={18} className="text-coris-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-coris-navy">{label}</p>
                    <p className="text-xs text-coris-gray-dark">{desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <h3 className="font-bold text-coris-navy">Préférences de notification</h3>
              {[
                { key: 'email' as const, label: 'Notifications email', desc: 'Relevés, alertes de sécurité' },
                { key: 'sms' as const, label: 'Notifications SMS', desc: 'OTP, alertes de transaction' },
                { key: 'push' as const, label: 'Notifications push', desc: 'Alertes en temps réel' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-coris-gray">
                  <div>
                    <p className="text-sm font-semibold text-coris-navy">{label}</p>
                    <p className="text-xs text-coris-gray-dark">{desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                    className={`w-12 h-7 rounded-full transition-colors relative ${notifs[key] ? 'bg-coris-blue' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-1 transition-all ${notifs[key] ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              ))}
              <button onClick={save} className="bg-coris-blue hover:bg-coris-blue-dark text-white font-bold py-3 px-6 rounded-xl text-sm flex items-center gap-2">
                {saved ? <><Check size={16} /> Enregistré</> : 'Sauvegarder'}
              </button>
            </motion.div>
          )}

          {activeSection === 'langue' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <h3 className="font-bold text-coris-navy">Langue et région</h3>
              <div>
                <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Langue</label>
                <select className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm">
                  <option>Français</option>
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-coris-navy mb-2 uppercase tracking-wide">Fuseau horaire</label>
                <select className="w-full bg-coris-gray border border-gray-200 rounded-xl px-4 py-3 text-sm">
                  <option>GMT+0 — Ouagadougou</option>
                  <option>GMT+1 — Paris</option>
                </select>
              </div>
              <button onClick={save} className="bg-coris-blue hover:bg-coris-blue-dark text-white font-bold py-3 px-6 rounded-xl text-sm flex items-center gap-2">
                {saved ? <><Check size={16} /> Enregistré</> : 'Sauvegarder'}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
