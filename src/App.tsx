import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from './components/layout/Layout';
import SiteLogo from './components/brand/SiteLogo';
import Home from './pages/Home';
import DigitalBankingPage from './pages/particulier/DigitalBankingPage';
import OpenAccountPage from './pages/particulier/OpenAccountPage';
import TrackRequestPage from './pages/particulier/TrackRequestPage';
import CartesPage from './pages/particulier/CartesPage';
import PretsPage from './pages/particulier/PretsPage';
import TransfertsPage from './pages/particulier/TransfertsPage';
import EntreprisePage from './pages/entreprise/EntreprisePage';
import AboutPage from './pages/info/AboutPage';
import ContactPage from './pages/info/ContactPage';
import ActualitesPage from './pages/info/ActualitesPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import { DashboardFinanceProvider } from './context/DashboardFinanceContext';
import DashboardHome from './pages/dashboard/DashboardHome';
import BankToWallet from './pages/dashboard/BankToWallet';
import TransferPage from './pages/dashboard/TransferPage';
import CardsPage from './pages/dashboard/CardsPage';
import TransactionsPage from './pages/dashboard/TransactionsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import ReportsPage from './pages/dashboard/ReportsPage';
import CreditModulePage from './pages/dashboard/CreditModulePage';
import BudgetPlannerPage from './pages/dashboard/BudgetPlannerPage';
import AccountLinkingPage from './pages/dashboard/AccountLinkingPage';
import PayHubPage from './pages/dashboard/PayHubPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages with Header/Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/particulier/digital" element={<DigitalBankingPage />} />
          <Route path="/particulier/digital/*" element={<DigitalBankingPage />} />
          <Route path="/particulier/epargne" element={<OpenAccountPage />} />
          <Route path="/particulier/courant" element={<OpenAccountPage />} />
          <Route path="/particulier/cartes" element={<CartesPage />} />
          <Route path="/particulier/prets" element={<PretsPage />} />
          <Route path="/particulier/transferts" element={<TransfertsPage />} />
          <Route path="/entreprise" element={<EntreprisePage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/actualites" element={<ActualitesPage />} />
          <Route path="/suivi" element={<TrackRequestPage />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Login (no Header/Footer) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard (own layout, no Header/Footer) */}
        <Route
          path="/dashboard"
          element={
            <DashboardFinanceProvider>
              <DashboardLayout />
            </DashboardFinanceProvider>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="bank-to-wallet" element={<BankToWallet />} />
          <Route path="transfert" element={<TransferPage />} />
          <Route path="cartes" element={<CardsPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="rapports" element={<ReportsPage />} />
          <Route path="credit" element={<CreditModulePage />} />
          <Route path="budget" element={<BudgetPlannerPage />} />
          <Route path="parametres" element={<SettingsPage />} />
          <Route path="liaison-compte" element={<AccountLinkingPage />} />
          <Route path="payer" element={<PayHubPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PlaceholderPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-coris-gray">
      <div className="text-center px-4">
        <Link to="/" className="inline-block mb-8">
          <SiteLogo className="h-12 md:h-14 object-contain mx-auto" />
        </Link>
        <div className="w-16 h-16 bg-coris-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">🏗️</span>
        </div>
        <h1 className="text-3xl font-extrabold text-coris-navy mb-3">Page en construction</h1>
        <p className="text-coris-gray-dark mb-8 max-w-md mx-auto">
          Cette page sera bientôt disponible. Revenez nous voir prochainement !
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-coris-blue text-white font-semibold px-6 py-3 rounded-full hover:bg-coris-blue-dark transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
