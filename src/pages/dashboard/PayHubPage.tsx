import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QrCode, ArrowLeftRight, Receipt, Smartphone, ChevronRight } from 'lucide-react';

const options = [
  {
    to: '/dashboard/transfert',
    icon: ArrowLeftRight,
    title: 'Virement ou virement instantané',
    desc: 'Envoyer de l’argent vers un bénéficiaire Coris ou une autre banque.',
  },
  {
    to: '/dashboard/bank-to-wallet',
    icon: Smartphone,
    title: 'Vers mobile money',
    desc: 'Bank to Wallet : Orange Money, Moov Money, Coris Money.',
  },
  {
    to: '/particulier/digital/factures',
    icon: Receipt,
    title: 'Paiement de factures',
    desc: 'SONABEL, ONEA, télécom et autres services (espace factures).',
  },
];

export default function PayHubPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <QrCode size={24} className="text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-coris-navy">Payer</h1>
          <p className="text-sm text-coris-gray-dark">Choisissez un mode de paiement ou d’envoi.</p>
        </div>
      </div>

      <div className="space-y-3">
        {options.map(({ to, icon: Icon, title, desc }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={to}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-coris-blue/25 hover:shadow-md transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-coris-gray flex items-center justify-center shrink-0 group-hover:bg-coris-blue/10 transition-colors">
                <Icon size={20} className="text-coris-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-coris-navy text-sm">{title}</p>
                <p className="text-xs text-coris-gray-dark mt-0.5 leading-relaxed">{desc}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-coris-blue shrink-0" />
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="text-[11px] text-coris-gray-dark mt-6 text-center">
        Paiement marchand par QR : disponible prochainement dans l’application mobile.
      </p>
    </div>
  );
}
