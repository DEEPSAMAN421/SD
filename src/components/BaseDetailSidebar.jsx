
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Hammer, ExternalLink, Star, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

const AdPlaceholderSidebar = ({ count = 1 }) => (
  Array.from({length: count}).map((_, idx) => (
    <div key={idx} className="ad-placeholder h-48 my-4"></div>
  ))
);

const BaseDetailSidebar = ({ base }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const townHallLevels = Array.from({ length: 13 }, (_, i) => 17 - i);
  const builderHallLevels = Array.from({ length: 7 }, (_, i) => 10 - i);

  const navStrategyItems = [
    { name: 'Town Hall Layouts', path: '/', sectionId: 'town-hall-categories', icon: Shield, theme: 'th', pagePath: '/bases/' },
    { name: 'Builder Base Layouts', path: '/', sectionId: 'builder-hall-categories', icon: Hammer, theme: 'bh', pagePath: '/builder-bases/' },
    { name: 'Hero Loadout', path: '/hero-loadout', icon: Shield, theme: 'hero', pagePath: '/hero-loadout' },
    { name: 'Attack Strategy', path: '/attack-strategy', icon: ExternalLink, theme: 'attack', pagePath: '/attack-strategy' },
    { name: 'CoC Village Planner', path: '/coc-village-planner', icon: SettingsIcon, theme: 'planner', pagePath: '/coc-village-planner' },
  ];

  const handleNavClick = (item) => {
    setTheme(item.theme || 'default');
    if (item.sectionId && location.pathname === '/') {
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.sectionId && location.pathname !== '/') {
       navigate('/');
       setTimeout(() => document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      navigate(item.path);
    }
  };
  
  const currentBaseLevel = base.townHallLevel || base.builderHallLevel;
  const isCurrentBaseBuilder = base.builderHallLevel !== undefined;

  return (
    <div className="bg-card border rounded-lg shadow-sm p-3 space-y-1.5 sidebar-sticky">
      <h3 className="text-md font-semibold clash-font text-primary mb-1.5 px-1">Explore More</h3>
      {navStrategyItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname.startsWith(item.pagePath);
        return (
          <Button 
            key={item.name} 
            variant={isActive ? "default" : "ghost"}
            size="sm" 
            className={cn(
              `w-full justify-start text-xs h-auto py-1.5 px-2 transition-all`,
              isActive ? `bg-primary text-primary-foreground` : `hover:bg-accent hover:text-accent-foreground`
            )}
            onClick={() => handleNavClick(item)}
          >
            <Icon className="w-3.5 h-3.5 mr-1.5" />{item.name}
          </Button>
        );
      })}
      
      <h4 className="text-sm font-semibold text-muted-foreground pt-2 mt-2 border-t flex items-center px-1"><Shield className="w-3.5 h-3.5 mr-1.5 text-primary/70" />Town Halls</h4>
      <div className="flex flex-wrap gap-1 px-1">
        {townHallLevels.map(level => (
          <Button 
            key={`th-sidebar-${level}`} 
            variant={!isCurrentBaseBuilder && currentBaseLevel === level ? "default" : "outline"} 
            size="xs" 
            className={cn("text-xs px-1.5 py-0.5 h-auto", !isCurrentBaseBuilder && currentBaseLevel === level && "bg-primary text-primary-foreground")}
            asChild
          >
            <Link to={`/bases/${level}`} onClick={() => setTheme('th')}>TH{level}</Link>
          </Button>
        ))}
      </div>
      <h4 className="text-sm font-semibold text-muted-foreground pt-2 mt-2 border-t flex items-center px-1"><Hammer className="w-3.5 h-3.5 mr-1.5 text-primary/70" />Builder Halls</h4>
      <div className="flex flex-wrap gap-1 px-1">
        {builderHallLevels.map(level => (
          <Button 
            key={`bh-sidebar-${level}`} 
            variant={isCurrentBaseBuilder && currentBaseLevel === level ? "default" : "outline"} 
            size="xs" 
            className={cn("text-xs px-1.5 py-0.5 h-auto", isCurrentBaseBuilder && currentBaseLevel === level && "bg-primary text-primary-foreground")}
            asChild
          >
            <Link to={`/builder-bases/${level}`} onClick={() => setTheme('bh')}>BH{level}</Link>
          </Button>
        ))}
      </div>
      <AdPlaceholderSidebar count={2} />
    </div>
  );
};

export default BaseDetailSidebar;
