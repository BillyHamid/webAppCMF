import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from './components/layout/Layout';
import SiteLogo from './components/brand/SiteLogo';
import Home from './pages/Home';
import DigitalBankingPage from './pages/particulier/DigitalBankingPage';
import OpenAccountPage from './pages/particulier/OpenAccountPage';
import ParticulierHubPage from './pages/particulier/ParticulierHubPage';
import TrackRequestPage from './pages/particulier/TrackRequestPage';
import CartesPage from './pages/particulier/CartesPage';
import PretsPage from './pages/particulier/PretsPage';
import TransfertsPage from './pages/particulier/TransfertsPage';
import EntreprisePage from './pages/entreprise/EntreprisePage';
import AboutPage from './pages/info/AboutPage';
import ContactPage from './pages/info/ContactPage';
import ActualitesPage from './pages/info/ActualitesPage';
import NewsArticlePage from './pages/info/NewsArticlePage';
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
          <Route path="/particulier" element={<ParticulierHubPage />} />
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
          <Route path="/actualites/:slug" element={<NewsArticlePage />} />
          <Route path="/suivi" element={<TrackRequestPage />} />

          {/* Anciens liens / raccourcis → routes canoniques */}
          <Route path="/actualite" element={<Navigate to="/actualites" replace />} />
          <Route path="/actualite/:slug" element={<RedirectToActualitesSlug />} />
          <Route path="/particulier/transfert" element={<Navigate to="/particulier/transferts" replace />} />
          <Route path="/particulier/cartes/choisir" element={<Navigate to="/particulier/cartes" replace />} />
          <Route path="/entreprise/solutions-digitales" element={<Navigate to="/entreprise" replace />} />
          <Route path="/contact/assistance" element={<Navigate to="/contact" replace />} />
          <Route path="/contact/formulaire" element={<Navigate to="/contact" replace />} />
          <Route path="/internet-banking" element={<Navigate to="/login" replace />} />

          <Route path="*" element={<NotFoundPage />} />
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

function RedirectToActualitesSlug() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/actualites" replace />;
  return <Navigate to={`/actualites/${slug}`} replace />;
}

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-coris-gray">
      <div className="text-center px-4">
        <Link to="/" className="inline-block mb-8">
          <SiteLogo className="h-12 md:h-14 object-contain mx-auto" />
        </Link>
        <h1 className="text-3xl font-extrabold text-coris-navy mb-3">Page introuvable</h1>
        <p className="text-coris-gray-dark mb-8 max-w-md mx-auto">
          Cette adresse ne correspond à aucune page du site. Vérifiez l’URL ou revenez à l’accueil.
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
