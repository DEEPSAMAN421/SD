
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { attackStrategies } from '@/data/bases';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Hammer, ExternalLink, Star as StarIcon, Settings as SettingsIcon, Users, Zap as ZapIcon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import PageHorizontalNav from '@/components/PageHorizontalNav';

const AdPlaceholderSidebar = ({ count = 1 }) => (
  Array.from({length: count}).map((_, idx) => (
    <div key={idx} className="ad-placeholder h-48 my-4"></div>
  ))
);

const AdPlaceholder = () => <div className="ad-placeholder my-6"></div>;

const QuickLinksSidebar = ({ currentStrategyId }) => {
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
    if (item.sectionId && window.location.pathname === '/') {
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.sectionId && window.location.pathname !== '/') {
       navigate('/');
       setTimeout(() => document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      navigate(item.path);
    }
  };

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
          <Button key={`th-sidebar-${level}`} variant="outline" size="xs" className="text-xs px-1.5 py-0.5 h-auto" asChild>
            <Link to={`/bases/${level}`} onClick={() => setTheme('th')}>TH{level}</Link>
          </Button>
        ))}
      </div>
      <h4 className="text-sm font-semibold text-muted-foreground pt-2 mt-2 border-t flex items-center px-1"><Hammer className="w-3.5 h-3.5 mr-1.5 text-primary/70" />Builder Halls</h4>
      <div className="flex flex-wrap gap-1 px-1">
        {builderHallLevels.map(level => (
          <Button key={`bh-sidebar-${level}`} variant="outline" size="xs" className="text-xs px-1.5 py-0.5 h-auto" asChild>
            <Link to={`/builder-bases/${level}`} onClick={() => setTheme('bh')}>BH{level}</Link>
          </Button>
        ))}
      </div>
      <AdPlaceholderSidebar count={2} />
    </div>
  );
};


const AttackStrategyDetailPage = () => {
  const { strategyId } = useParams();
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const strategy = attackStrategies.find(s => s.id === strategyId);

  useEffect(() => {
    setTheme('attack');
    window.scrollTo(0, 0);
  }, [setTheme, strategyId]);

  if (!strategy) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center theme-attack">
        <ExternalLink className="h-20 w-20 text-destructive mx-auto mb-6 opacity-70" />
        <h1 className="text-4xl font-bold clash-font text-destructive mb-4">Strategy Not Found</h1>
        <p className="text-muted-foreground mb-6">The attack strategy you are looking for could not be found.</p>
        <Button onClick={() => navigate('/attack-strategy')} size="lg"><ArrowLeft className="h-5 w-5 mr-2" />Back to Strategies</Button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 py-6 theme-attack">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="text-sm h-8 px-3">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Strategies
        </Button>
      </div>
      <AdPlaceholder />
      <div className="flex flex-col lg:flex-row gap-5">
        <motion.main 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-full lg:flex-grow space-y-5"
        >
          <div className="bg-card rounded-lg border shadow-md p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-3xl md:text-4xl font-bold clash-font text-primary mb-2">{strategy.name}</h1>
              <p className="text-sm text-muted-foreground">Requires: {strategy.townHall}</p>
            </motion.div>

            <div className="prose prose-sm sm:prose-base max-w-none text-foreground">
              <h3 className="clash-font text-primary">Strategy Overview</h3>
              <p>{strategy.description}</p>

              <h3 className="clash-font text-primary mt-4">Detailed Breakdown</h3>
              <p className="whitespace-pre-line">{strategy.details || "Detailed breakdown coming soon."}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-secondary/30 p-3 rounded-md">
                  <h4 className="font-semibold text-md clash-font text-primary mb-1 flex items-center"><Users className="h-5 w-5 mr-2"/>Key Troops</h4>
                  <ul className="list-disc list-inside text-xs">
                    {strategy.troops.map(troop => <li key={troop}>{troop}</li>)}
                  </ul>
                </div>
                <div className="bg-secondary/30 p-3 rounded-md">
                  <h4 className="font-semibold text-md clash-font text-primary mb-1 flex items-center"><ZapIcon className="h-5 w-5 mr-2"/>Key Spells</h4>
                  <ul className="list-disc list-inside text-xs">
                    {strategy.spells.map(spell => <li key={spell}>{spell}</li>)}
                  </ul>
                </div>
              </div>
              
              <h3 className="clash-font text-primary mt-6">Execution Tips</h3>
              <ul className="list-disc list-inside">
                <li>Scout the base carefully to identify key targets and pathing.</li>
                <li>Proper funneling is crucial for most strategies.</li>
                <li>Time your hero abilities and spell placements effectively.</li>
                <li>Practice makes perfect! Test strategies in friendly challenges.</li>
              </ul>
            </div>
          </div>
        </motion.main>
        <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-[280px] xl:w-[320px] flex-shrink-0"
        >
          <QuickLinksSidebar currentStrategyId={strategy.id} />
        </motion.aside>
      </div>
    </div>
  );
};

export default AttackStrategyDetailPage;
