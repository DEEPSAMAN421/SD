
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import BasesPage from '@/pages/BasesPage';
import BuilderBasesPage from '@/pages/BuilderBasesPage';
import BaseDetailPage from '@/pages/BaseDetailPage';
import FAQPage from '@/pages/FAQPage';
import HeroLoadoutPage from '@/pages/HeroLoadoutPage';
import AttackStrategyPage from '@/pages/AttackStrategyPage';
import AttackStrategyDetailPage from '@/pages/AttackStrategyDetailPage';
import PetsCombinationPage from '@/pages/PetsCombinationPage';
import HeroEquipmentsPage from '@/pages/HeroEquipmentsPage';
import CocVillagePlannerPage from '@/pages/CocVillagePlannerPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfUsePage from '@/pages/TermsOfUsePage';
import DMCAPage from '@/pages/DMCAPage';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bases/:townHallLevel" element={<BasesPage />} />
              <Route path="/builder-bases/:builderHallLevel" element={<BuilderBasesPage />} />
              <Route path="/base/:id" element={<BaseDetailPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-use" element={<TermsOfUsePage />} />
              <Route path="/dmca" element={<DMCAPage />} />
              <Route path="/hero-loadout" element={<HeroLoadoutPage />} />
              <Route path="/hero-loadout/pets-combination" element={<PetsCombinationPage />} />
              <Route path="/hero-loadout/hero-equipments" element={<HeroEquipmentsPage />} />
              <Route path="/attack-strategy" element={<AttackStrategyPage />} />
              <Route path="/attack-strategy/:strategyId" element={<AttackStrategyDetailPage />} />
              <Route path="/coc-village-planner" element={<CocVillagePlannerPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
          <ScrollToTopButton />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
