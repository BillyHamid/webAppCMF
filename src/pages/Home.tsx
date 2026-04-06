import HeroSlider from '../components/home/HeroSlider';
import BankingOffers from '../components/home/BankingOffers';
import DigitalBanking from '../components/home/DigitalBanking';
import QuickAccess from '../components/home/QuickAccess';
import SolutionsTabs from '../components/home/SolutionsTabs';
import ContactForm from '../components/home/ContactForm';
import OnlineBanking from '../components/home/OnlineBanking';
import NewsSection from '../components/home/NewsSection';
import StatsBar from '../components/home/StatsBar';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <BankingOffers />
      <DigitalBanking />
      <QuickAccess />
      <SolutionsTabs />
      <ContactForm />
      <OnlineBanking />
      <StatsBar />
      <NewsSection />
    </>
  );
}
