import { useState } from 'react';
import { Globe, ChevronDown, LogIn } from 'lucide-react';
import { countries } from '../../data/navigation';

export default function TopBar() {
  const [showCountries, setShowCountries] = useState(false);

  return (
    <div className="bg-coris-navy text-white text-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-9">
        <div className="relative">
          <button
            onClick={() => setShowCountries(!showCountries)}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors"
          >
            <Globe size={13} />
            <span>Burkina Faso</span>
            <ChevronDown size={11} className={`transition-transform ${showCountries ? 'rotate-180' : ''}`} />
          </button>

          {showCountries && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowCountries(false)} />
              <div className="absolute top-full left-0 mt-2 bg-white text-coris-navy rounded-xl shadow-2xl z-50 p-3 grid grid-cols-2 gap-0.5 w-64 border border-gray-100">
                {countries.map((country) => (
                  <button
                    key={country}
                    className="text-left px-3 py-2 rounded-lg hover:bg-coris-sky text-xs font-medium transition-colors"
                    onClick={() => setShowCountries(false)}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 text-xs text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Particulier</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-white transition-colors">Entreprise</a>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs font-medium text-coris-sky hover:text-white transition-colors"
          >
            <LogIn size={13} />
            <span className="hidden sm:inline">Internet Banking</span>
          </a>
        </div>
      </div>
    </div>
  );
}
