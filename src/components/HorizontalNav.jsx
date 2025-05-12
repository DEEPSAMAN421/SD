
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, Shield, Swords, Settings, Hammer } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const navItemsConfig = [
  { name: 'Town Hall Layouts', path: '/', icon: Home, sectionId: 'town-hall-categories', theme: 'th', colorClass: 'colorful-button-1', hoverClass: 'hover:bg-primary hover:text-primary-foreground' },
  { name: 'Builder Base Layouts', path: '/', icon: Hammer, sectionId: 'builder-hall-categories', theme: 'bh', colorClass: 'colorful-button-2', hoverClass: 'hover:bg-primary hover:text-primary-foreground' },
  { name: 'Hero Loadout', path: '/hero-loadout', icon: Shield, theme: 'hero', colorClass: 'colorful-button-3', hoverClass: 'hover:bg-primary hover:text-primary-foreground' },
  { name: 'Attack Strategy', path: '/attack-strategy', icon: Swords, theme: 'attack', colorClass: 'colorful-button-4', hoverClass: 'hover:bg-primary hover:text-primary-foreground' },
  { name: 'CoC Village Planner', path: '/coc-village-planner', icon: Settings, theme: 'planner', colorClass: 'colorful-button-6', hoverClass: 'hover:bg-primary hover:text-primary-foreground' },
];

const HorizontalNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTheme } = useTheme();

  const handleNavClick = (item) => {
    if (location.pathname === '/') {
      setTheme('default'); 
    } else {
      setTheme(item.theme);
    }

    if (item.sectionId && location.pathname === '/') {
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.sectionId && location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    }
    else {
      navigate(item.path);
    }
  };

  return (
    <section className="py-4 md:py-6 bg-background theme-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="section-title-bar">Explore Strategies & Layouts with Links</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto text-sm">
            Your one-stop destination for all things Clash of Clans: from base designs to advanced attack guides.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
          {navItemsConfig.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
                className="w-full" 
              >
                <Button 
                  onClick={() => handleNavClick(item)} 
                  variant="default" 
                  className={cn(
                    `w-full text-xs sm:text-sm py-2.5 px-2 md:py-3 md:px-3 shadow-sm transition-all duration-200 group flex flex-col sm:flex-row items-center justify-center h-full`,
                    item.colorClass,
                    item.hoverClass 
                  )}
                >
                  <IconComponent className="mb-1 sm:mb-0 sm:mr-1.5 h-4 w-4 md:h-5 md:w-5 transition-colors duration-200" />
                  <span className="text-center sm:text-left">{item.name}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HorizontalNav;
