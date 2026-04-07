import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SiteLogo from '../components/brand/SiteLogo';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (login(email, password)) {
        navigate('/dashboard');
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <section className="min-h-screen w-full bg-white flex flex-col lg:flex-row items-stretch">
      {/* Gauche : formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 bg-white order-2 lg:order-1">
        <div className="max-w-md w-full">
          <div className="mb-8 flex justify-center lg:justify-start">
            <SiteLogo className="h-11 max-h-12" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-black tracking-tight text-coris-navy mb-2">
              Bon retour
            </h2>
            <p className="text-coris-gray-dark text-sm font-medium">
              Saisissez vos identifiants pour accéder à votre espace client.
            </p>
          </motion.div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark ml-1">
                Adresse e-mail
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coris-gray-dark/60 transition-colors group-focus-within:text-coris-blue" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                  className="w-full pl-12 pr-4 h-14 bg-coris-gray/40 border border-gray-200/80 focus:border-coris-blue/50 focus:ring-2 focus:ring-coris-blue/15 rounded-xl text-sm text-coris-navy placeholder:text-gray-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-coris-gray-dark">
                  Mot de passe
                </label>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-coris-blue hover:underline">
                  Oublié ?
                </a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coris-gray-dark/60 transition-colors group-focus-within:text-coris-blue pointer-events-none" />
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 h-14 bg-coris-gray/40 border border-gray-200/80 focus:border-coris-blue/50 focus:ring-2 focus:ring-coris-blue/15 rounded-xl text-sm text-coris-navy placeholder:text-gray-400 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-coris-gray-dark/50 hover:text-coris-blue transition-colors"
                  aria-label={show ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl font-black uppercase tracking-[0.2em] text-xs bg-coris-blue hover:bg-coris-blue-dark text-white shadow-lg shadow-coris-blue/25 hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-coris-gray-dark font-medium">
            Pas encore client ?{' '}
            <Link to="/particulier/epargne" className="text-coris-blue font-black hover:underline ml-1">
              Ouvrir un compte
            </Link>
          </p>

          <div className="mt-6 rounded-xl border border-gray-200 bg-coris-gray/50 px-4 py-3 text-left">
            <p className="text-[11px] font-bold text-coris-navy uppercase tracking-wide mb-1.5">Parcours ouverture de compte (démo)</p>
            <p className="text-[11px] text-coris-gray-dark leading-relaxed">
              Après validation du dossier sur <strong>Suivre ma demande</strong>, connectez-vous avec l’e-mail du dossier. Pour tester le profil{' '}
              <strong>nouveau client</strong> (solde 0, un compte épargne) : <code className="text-coris-blue bg-white px-1 rounded">ibrahim.s@email.com</code> — même mot de passe que votre démo.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8 text-[11px] text-coris-gray-dark">
            <ShieldCheck size={14} className="text-coris-blue shrink-0" />
            Connexion sécurisée — SSL 256-bit
          </div>
        </div>
      </div>

      {/* Droite : visuel (desktop) */}
      <div className="hidden lg:block lg:w-1/2 bg-coris-navy relative overflow-hidden order-1 lg:order-2 min-h-[40vh] lg:min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            alt=""
            className="w-full h-full object-cover grayscale opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-coris-blue/40 to-coris-navy/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-coris-navy via-transparent to-coris-blue/20" />
        </div>

        <div className="absolute inset-0 flex flex-col items-start justify-between p-12 lg:p-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <SiteLogo inverted className="h-14 object-contain opacity-95" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="max-w-md"
          >
            <div className="w-12 h-1 bg-coris-red mb-8" />
            <h3 className="text-4xl xl:text-5xl font-black mb-6 leading-[1.1] tracking-tighter">
              La meso finance <br />
              au service de <span className="italic text-white/95">votre avenir.</span>
            </h3>
            <p className="text-base lg:text-lg font-medium text-white/75 leading-relaxed">
              Accédez à vos comptes, vos virements et vos services digitaux — où que vous soyez, en toute sécurité.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
