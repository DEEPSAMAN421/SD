
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Bone, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import PageHorizontalNav from '@/components/PageHorizontalNav';

const AdPlaceholder = () => <div className="ad-placeholder my-6"></div>;

const HeroLoadoutPage = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme('hero');
  }, [setTheme]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-hero">
      <AdPlaceholder />
      <PageHorizontalNav currentPathBase="/hero-loadout" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 mt-6"
      >
        <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold clash-font text-primary mb-4">Hero Loadouts</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Optimize your Heroes! Explore the best Pet Combinations and Hero Equipments to dominate in Clash of Clans.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Button 
            size="lg" 
            className="w-full py-8 colorful-button-5 text-lg" 
            onClick={() => navigate('/hero-loadout/pets-combination')}
          >
            <Bone className="h-8 w-8 mr-4" />
            Best Pet Combinations
          </Button>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Button 
            size="lg" 
            className="w-full py-8 colorful-button-3 text-lg" 
            onClick={() => navigate('/hero-loadout/hero-equipments')}
          >
            <Sparkles className="h-8 w-8 mr-4" />
            Best Hero Equipments
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroLoadoutPage;
