import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, ExternalLink } from 'lucide-react';
import SiteLogo from '../brand/SiteLogo';

/** Routes alignées sur `App.tsx` (évite la page * « en construction »). */
const footerLinks = {
  'Services': [
    { label: "Comptes d'épargne", href: '/particulier/epargne' },
    { label: 'Comptes courants', href: '/particulier/courant' },
    { label: 'Cartes bancaires', href: '/particulier/cartes' },
    { label: 'Prêts & Crédits', href: '/particulier/prets' },
    { label: "Transferts d'argent", href: '/particulier/transferts' },
  ],
  'Digital': [
    { label: 'Application mobile', href: '/particulier/digital/mobile' },
    { label: 'Internet Banking', href: '/particulier/digital/internet-banking' },
    { label: 'Paiement de factures', href: '/particulier/digital/factures' },
    { label: 'Alertes SMS & Email', href: '/particulier/digital/notifications' },
  ],
  'Entreprise': [
    { label: 'Solutions digitales', href: '/entreprise' },
    { label: 'Commerce international', href: '/entreprise' },
    { label: 'TPE & Encaissement', href: '/entreprise' },
  ],
  'Informations': [
    { label: 'Qui sommes-nous', href: '/a-propos' },
    { label: 'Notre histoire', href: '/a-propos' },
    { label: 'Actualités', href: '/actualites' },
    { label: 'Nous contacter', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-coris-navy text-white">
      {/* Whistleblowing */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-coris-red/20 rounded-lg flex items-center justify-center shrink-0">
              <MessageCircle className="text-coris-red" size={18} />
            </div>
            <div>
              <p className="font-semibold text-sm">Signalement confidentiel</p>
              <p className="text-xs text-gray-500">Canal anonyme et sécurisé</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Phone size={11} /> +226 80 00 12 16
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={11} /> whistleblowing@corismeso.bf
            </span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 mb-4 lg:mb-0">
            <Link to="/" className="inline-block mb-5">
              <SiteLogo inverted className="h-12 object-contain" />
            </Link>
            <p className="text-xs text-gray-400 mb-5 leading-relaxed max-w-xs">
              Coris Meso Finance, institution de microfinance agréée et réglementée 
              par la Banque Centrale (BCEAO). Votre partenaire de confiance.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin size={13} className="shrink-0 text-gray-500" />
                <span>Ouagadougou, Burkina Faso</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Phone size={13} className="text-gray-500" />
                <span>+226 25 30 00 00</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Mail size={13} className="text-gray-500" />
                <span>contact@corismeso.bf</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-xs mb-4 text-white uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs text-gray-400 hover:text-white transition-colors touch-manipulation cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-sm mb-1">Newsletter</h4>
              <p className="text-xs text-gray-500">
                Recevez nos dernières offres et actualités.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="bg-white/5 border border-white/10 rounded-l-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-coris-blue w-full md:w-72"
              />
              <button className="bg-coris-red hover:bg-coris-red-dark px-5 py-3 rounded-r-xl text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5">
                S'inscrire
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-600">
            © {new Date().getFullYear()} Coris Meso Finance. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors text-[11px]">
              Conditions générales
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors text-[11px]">
              Confidentialité
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors text-[11px]">
              Mentions légales
            </a>
          </div>
          <div className="flex items-center gap-2">
            {['Facebook', 'LinkedIn', 'Twitter'].map((name) => (
              <a
                key={name}
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-coris-blue transition-colors border border-white/5"
                title={name}
              >
                <ExternalLink size={12} className="text-gray-500" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
