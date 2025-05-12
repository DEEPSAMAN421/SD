
import React from 'react';
import HeroSection from '@/components/HeroSection';
import HorizontalNav from '@/components/HorizontalNav';
import TownHallCategories from '@/components/TownHallCategories';
import BuilderHallCategories from '@/components/BuilderHallCategories';
import { useTheme } from '@/components/ThemeProvider';

const HomePage = () => {
  const { setTheme } = useTheme();
  React.useEffect(() => {
    setTheme('default'); // Set homepage to default orange theme
  }, [setTheme]);

  return (
    <div className="space-y-2 md:space-y-4 pb-8">
      <HeroSection />
      <HorizontalNav />
      <TownHallCategories />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="my-8 md:my-12 border-primary/50" />
      </div>
      <BuilderHallCategories />
    </div>
  );
};

export default HomePage;
