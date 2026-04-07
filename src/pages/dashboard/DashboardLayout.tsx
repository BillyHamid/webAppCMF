import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState, useRef, type ComponentType } from 'react';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  Receipt,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  BarChart3,
  PieChart,
  Landmark,
  Link2,
} from 'lucide-react';
import SiteLogo from '../../components/brand/SiteLogo';
import MayaChat from '../../components/layout/MayaChat';

type NavItem = {
  to: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  end?: boolean;
};

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Vue d’ensemble',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord', end: true },
      { to: '/dashboard/rapports', icon: BarChart3, label: 'Rapports' },
      { to: '/dashboard/budget', icon: PieChart, label: 'Planner budget' },
      { to: '/dashboard/credit', icon: Landmark, label: 'Crédit' },
    ],
  },
  {
    title: 'Opérations',
    items: [
      { to: '/dashboard/transfert', icon: ArrowLeftRight, label: 'Transferts' },
      { to: '/dashboard/bank-to-wallet', icon: Wallet, label: 'Bank to Wallet' },
      { to: '/dashboard/liaison-compte', icon: Link2, label: 'Liaison de compte' },
      { to: '/dashboard/cartes', icon: CreditCard, label: 'Mes Cartes' },
      { to: '/dashboard/transactions', icon: Receipt, label: 'Historique' },
    ],
  },
];

const flatNav = navSections.flatMap((s) => s.items);

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userMenuOpen && !notifOpen) return;
    const close = (e: MouseEvent) => {
      const t = e.target as Node;
      if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(t)) setUserMenuOpen(false);
      if (notifOpen && notifRef.current && !notifRef.current.contains(t)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [userMenuOpen, notifOpen]);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-coris-gray flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 shrink-0">
        <div className="p-6 border-b border-gray-50">
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity" aria-label="Coris Meso Finance — retour au site">
            <SiteLogo className="h-10 w-auto max-w-[220px] object-contain object-left" />
          </Link>
        </div>

        <div className="flex-1 py-3 px-3 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.title} className="mb-4 last:mb-0">
              <p className="px-4 pt-2 pb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map(({ to, icon: Icon, label, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                        isActive
                          ? 'bg-coris-blue text-white shadow-md shadow-coris-blue/20'
                          : 'text-coris-gray-dark hover:bg-coris-gray hover:text-coris-navy'
                      }`
                    }
                  >
                    <Icon size={18} />
                    {label}
                    <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-gray-50 space-y-1">
          <NavLink
            to="/dashboard/parametres"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'bg-coris-gray text-coris-navy' : 'text-coris-gray-dark hover:bg-coris-gray'
              }`
            }
          >
            <Settings size={18} /> Paramètres
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Link
              to="/dashboard"
              className="lg:hidden shrink-0"
              aria-label="Tableau de bord"
            >
              <SiteLogo className="h-9 w-auto max-w-[150px] object-contain object-left" />
            </Link>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-coris-navy truncate">
                Bonjour, {user.firstName} 👋
              </h2>
              <p className="text-xs text-coris-gray-dark">Bienvenue sur votre espace client</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((o) => !o);
                  setUserMenuOpen(false);
                }}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                  notifOpen ? 'bg-coris-blue/15 ring-2 ring-coris-blue/20' : 'bg-coris-gray hover:bg-gray-200'
                }`}
                aria-label="Notifications"
                aria-expanded={notifOpen}
              >
                <Bell size={18} className={notifOpen ? 'text-coris-blue' : 'text-coris-gray-dark'} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-coris-red text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              {notifOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-[min(100vw-2rem,20rem)] max-h-[min(70vh,22rem)] overflow-y-auto rounded-xl border border-gray-100 bg-white py-2 shadow-xl z-[150]"
                  role="menu"
                >
                  <p className="px-4 py-2 text-[10px] font-black uppercase tracking-wider text-gray-400">Notifications</p>
                  {[
                    { id: '1', t: 'Virement reçu', d: 'Un virement de 75 000 FCFA a été crédité sur votre compte courant.', when: 'Il y a 2 h' },
                    { id: '2', t: 'Échéance carte', d: 'Votre carte se termine par 4821 arrive à échéance dans 60 jours.', when: 'Hier' },
                    { id: '3', t: 'Sécurité', d: 'Connexion réussie depuis un nouvel appareil (Ouagadougou).', when: '28 Mar.' },
                  ].map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      className="w-full text-left px-4 py-3 hover:bg-coris-gray/80 border-b border-gray-50 last:border-0 transition-colors"
                      onClick={() => setNotifOpen(false)}
                    >
                      <p className="text-sm font-semibold text-coris-navy">{n.t}</p>
                      <p className="text-xs text-coris-gray-dark mt-0.5 leading-snug">{n.d}</p>
                      <p className="text-[10px] text-gray-400 mt-1.5">{n.when}</p>
                    </button>
                  ))}
                  <div className="px-3 pt-1 pb-2">
                    <Link
                      to="/dashboard/transactions"
                      onClick={() => setNotifOpen(false)}
                      className="block text-center text-xs font-semibold text-coris-blue py-2 rounded-lg hover:bg-coris-blue/5"
                    >
                      Voir l’historique des opérations
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="relative lg:hidden" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen((o) => !o);
                  setNotifOpen(false);
                }}
                className="w-10 h-10 rounded-xl bg-coris-blue text-white flex items-center justify-center font-bold text-sm shrink-0 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-coris-blue/40"
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                aria-label="Menu compte"
              >
                {user.firstName[0]}
                {user.lastName[0]}
              </button>
              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-100 bg-white py-1 shadow-xl z-[150]"
                  role="menu"
                >
                  <NavLink
                    to="/dashboard/parametres"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-coris-navy hover:bg-coris-gray"
                  >
                    <Settings size={16} /> Paramètres
                  </NavLink>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} /> Déconnexion
                  </button>
                </div>
              )}
            </div>
            <div className="hidden lg:flex w-10 h-10 rounded-xl bg-coris-blue text-white items-center justify-center font-bold text-sm">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="lg:hidden bg-white border-b border-gray-100 px-3 py-2 flex gap-1 overflow-x-auto scrollbar-hide">
          {flatNav.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive ? 'bg-coris-blue text-white' : 'text-coris-gray-dark hover:bg-coris-gray'
                }`
              }
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
          <NavLink
            to="/dashboard/parametres"
            className={({ isActive }) =>
              `shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border border-dashed border-gray-200 ${
                isActive ? 'bg-coris-blue text-white border-transparent' : 'text-coris-gray-dark hover:bg-coris-gray'
              }`
            }
            title="Paramètres"
          >
            <Settings size={14} />
            <span className="hidden sm:inline">Paramètres</span>
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50"
            title="Déconnexion"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <MayaChat />
    </div>
  );
}
