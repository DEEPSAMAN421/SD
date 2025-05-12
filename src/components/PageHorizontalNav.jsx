
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, Shield, Swords, Settings, Hammer } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const navItemsConfig = [
  { name: 'Town Hall Layouts', path: '/', icon: Home, sectionId: 'town-hall-categories', theme: 'th', pagePath: '/bases/' },
  { name: 'Builder Base Layouts', path: '/', icon: Hammer, sectionId: 'builder-hall-categories', theme: 'bh', pagePath: '/builder-bases/' },
  { name: 'Hero Loadout', path: '/hero-loadout', icon: Shield, theme: 'hero', pagePath: '/hero-loadout' },
  { name: 'Attack Strategy', path: '/attack-strategy', icon: Swords, theme: 'attack', pagePath: '/attack-strategy' },
  { name: 'CoC Village Planner', path: '/coc-village-planner', icon: Settings, theme: 'planner', pagePath: '/coc-village-planner' },
];

const PageHorizontalNav = ({ currentPathBase }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTheme } = useTheme();

  const handleNavClick = (item) => {
    setTheme(item.theme);
    if (item.sectionId && location.pathname === '/') {
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.sectionId && location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {navItemsConfig.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname.startsWith(item.pagePath) || (item.sectionId && location.pathname === '/' && location.hash === `#${item.sectionId}`);
          
          let colorClass = '';
          if (item.theme === 'th') colorClass = 'colorful-button-1';
          else if (item.theme === 'bh') colorClass = 'colorful-button-2';
          else if (item.theme === 'hero') colorClass = 'colorful-button-3';
          else if (item.theme === 'attack') colorClass = 'colorful-button-4';
          else if (item.theme === 'planner') colorClass = 'colorful-button-6';


          return (
            <Button 
              key={item.name}
              onClick={() => handleNavClick(item)} 
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={cn(
                `text-xs py-2 px-3 shadow-sm hover:shadow-md transition-all duration-200 group flex items-center`,
                isActive ? `bg-primary text-primary-foreground ${colorClass}` : "border-border hover:bg-accent"
              )}
            >
              <IconComponent className="mr-1.5 h-4 w-4" />
              <span>{item.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PageHorizontalNav;
