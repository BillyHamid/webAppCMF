import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, ArrowRight, LogIn, User } from 'lucide-react';
import { mainNavigation, type NavItem } from '../../data/navigation';
import { useAuth } from '../../context/AuthContext';
import TopBar from './TopBar';
import SiteLogo from '../brand/SiteLogo';

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleEnter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeout.current = setTimeout(() => {
      setOpen(false);
      setSubOpen(null);
    }, 200);
  };

  if (!item.children) {
    return (
      <Link
        to={item.href}
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-coris-blue transition-colors relative group"
      >
        {item.label}
        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-coris-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-coris-blue transition-colors relative group">
        {item.label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-coris-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </button>

      <div
        className={`absolute top-full left-0 pt-1 z-50 transition-all duration-200 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 min-w-72 py-2 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-coris-blue to-coris-red" />
          {item.children.map((child) => (
            <div
              key={child.href}
              className="relative"
              onMouseEnter={() => child.children && setSubOpen(child.href)}
              onMouseLeave={() => setSubOpen(null)}
            >
              <Link
                to={child.href}
                className="flex items-center justify-between px-5 py-2.5 text-sm text-gray-600 hover:bg-coris-sky hover:text-coris-blue transition-colors group/item"
              >
                <span>{child.label}</span>
                {child.children && <ChevronRight size={14} className="text-gray-300 group-hover/item:text-coris-blue" />}
              </Link>

              {child.children && (
                <div
                  className={`absolute left-full top-0 pt-0 z-50 transition-all duration-200 ${
                    subOpen === child.href ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 min-w-56 py-2 ml-1">
                    {child.children.map((sub) => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        className="block px-5 py-2 text-sm text-gray-500 hover:bg-coris-sky hover:text-coris-blue transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [subExpanded, setSubExpanded] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white overflow-y-auto shadow-2xl animate-[slideIn_0.3s_ease]">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <SiteLogo className="h-10 object-contain" />
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={22} className="text-gray-500" />
          </button>
        </div>

        <nav className="p-3">
          {mainNavigation.map((item) => (
            <div key={item.href} className="border-b border-gray-50 last:border-0">
              <button
                onClick={() => {
                  if (item.children) {
                    setExpanded(expanded === item.href ? null : item.href);
                    setSubExpanded(null);
                  }
                }}
                className="flex items-center justify-between w-full px-4 py-3.5 text-sm font-semibold text-coris-navy hover:text-coris-blue rounded-lg transition-colors"
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${expanded === item.href ? 'rotate-180' : ''}`}
                  />
                )}
              </button>

              {item.children && expanded === item.href && (
                <div className="pb-2 pl-2 space-y-0.5">
                  {item.children.map((child) => (
                    <div key={child.href}>
                      <button
                        onClick={() => {
                          if (child.children) {
                            setSubExpanded(subExpanded === child.href ? null : child.href);
                          } else {
                            onClose();
                          }
                        }}
                        className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-600 hover:text-coris-blue hover:bg-coris-sky rounded-lg transition-colors"
                      >
                        {child.label}
                        {child.children && (
                          <ChevronDown
                            size={14}
                            className={`text-gray-300 transition-transform ${subExpanded === child.href ? 'rotate-180' : ''}`}
                          />
                        )}
                      </button>

                      {child.children && subExpanded === child.href && (
                        <div className="pl-4 py-1 space-y-0.5">
                          {child.children.map((sub) => (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              onClick={onClose}
                              className="block px-4 py-2 text-xs text-gray-500 hover:text-coris-blue rounded-lg transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-5 space-y-3 border-t border-gray-100">
          <Link to="/login" onClick={onClose} className="flex items-center justify-center gap-2 w-full bg-coris-blue text-white py-3 rounded-xl text-sm font-semibold hover:bg-coris-blue-dark transition-colors">
            <LogIn size={16} /> Se connecter
          </Link>
          <Link to="/particulier/epargne" onClick={onClose} className="flex items-center justify-center gap-2 w-full border-2 border-coris-red text-coris-red py-3 rounded-xl text-sm font-semibold hover:bg-coris-red hover:text-white transition-colors">
            Ouvrir un compte <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <TopBar />
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-black/5' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-[72px]">
          <Link to="/" className="flex items-center shrink-0">
            <SiteLogo className="h-11 md:h-12 object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center">
            {mainNavigation.map((item) => (
              <DesktopDropdown key={item.href} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {user ? (
              <Link
                to="/dashboard"
                className="hidden md:inline-flex items-center gap-2 text-sm font-semibold bg-coris-blue text-white px-5 py-2.5 rounded-full hover:bg-coris-blue-dark transition-colors shadow-sm hover:shadow-md"
              >
                <User size={15} />
                Mon espace
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-coris-blue border-2 border-coris-blue px-4 py-2 rounded-full hover:bg-coris-blue hover:text-white transition-colors"
                >
                  <LogIn size={15} />
                  Se connecter
                </Link>
                <Link
                  to="/particulier/epargne"
                  className="hidden md:inline-flex items-center gap-2 text-sm font-semibold bg-coris-red text-white px-5 py-2.5 rounded-full hover:bg-coris-red-dark transition-colors shadow-sm hover:shadow-md"
                >
                  Ouvrir un compte
                </Link>
              </>
            )}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-coris-navy hover:bg-coris-sky rounded-xl transition-colors"
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
