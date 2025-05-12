
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { heroes as allHeroesData } from '@/data/bases';
import { Sparkles, ArrowLeft, Shield, Hammer, ExternalLink, Star as StarIcon, Settings as SettingsIcon, ChevronDown, ChevronUp, Bone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';
import PageHorizontalNav from '@/components/PageHorizontalNav';

const AdPlaceholderSidebar = ({ count = 1 }) => (
  Array.from({length: count}).map((_, idx) => (
    <div key={idx} className="ad-placeholder h-48 my-4"></div>
  ))
);
const AdPlaceholder = () => <div className="ad-placeholder my-6"></div>;

const QuickLinksSidebar = () => {
  const navigate = useNavigate();
  const reactRouterLocation = useLocation();
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
    if (item.sectionId && reactRouterLocation.pathname === '/') {
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.sectionId && reactRouterLocation.pathname !== '/') {
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
        const isActive = reactRouterLocation.pathname.startsWith(item.pagePath) || (item.pagePath === '/hero-loadout' && reactRouterLocation.pathname.includes('hero-equipments'));
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

const villageHeroes = allHeroesData.filter(h => !['Battle Machine', 'Battle Copter'].includes(h.name));
const builderHeroes = allHeroesData.filter(h => ['Battle Machine', 'Battle Copter'].includes(h.name));


const HeroEquipmentsPage = () => {
  const navigate = useNavigate();
  const reactRouterLocation = useLocation();
  const { setTheme } = useTheme();
  const [expandedHeroId, setExpandedHeroId] = useState(null);

  React.useEffect(() => {
    setTheme('hero');
  }, [setTheme]);

  const toggleExpandHero = (heroId) => {
    setExpandedHeroId(expandedHeroId === heroId ? null : heroId);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 py-6 theme-hero">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="text-sm h-8 px-3">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Hero Loadouts
        </Button>
      </div>
      <AdPlaceholder />
      <PageHorizontalNav currentPathBase="/hero-loadout" />
      <div className="my-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            size="lg" 
            className="w-full sm:w-auto py-3 colorful-button-5 text-md" 
            onClick={() => navigate('/hero-loadout/pets-combination')}
            variant={reactRouterLocation.pathname.includes('pets-combination') ? 'default' : 'outline'}
          >
            <Bone className="h-5 w-5 mr-2" />
            Best Pet Combinations
          </Button>
          <Button 
            size="lg" 
            className="w-full sm:w-auto py-3 colorful-button-3 text-md" 
            onClick={() => navigate('/hero-loadout/hero-equipments')}
            variant={reactRouterLocation.pathname.includes('hero-equipments') ? 'default' : 'outline'}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Best Hero Equipments
          </Button>
      </div>
       <div className="flex flex-col lg:flex-row gap-5 mt-6">
        <motion.main 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-full lg:flex-grow space-y-5"
        >
          <div className="bg-card rounded-lg border shadow-md p-3 md:p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-3" />
              <h1 className="text-3xl md:text-4xl font-bold clash-font text-primary mb-3">Best Hero Equipments</h1>
              <p className="text-muted-foreground max-w-xl mx-auto text-md">
                Equip your Heroes with the best gear to maximize their potential on the battlefield.
              </p>
            </motion.div>

            <HeroEquipmentSection title="Village Heroes" heroes={villageHeroes} expandedHeroId={expandedHeroId} toggleExpandHero={toggleExpandHero} />
            <hr className="my-8 border-border/50" />
            <HeroEquipmentSection title="Builder Base Heroes" heroes={builderHeroes} expandedHeroId={expandedHeroId} toggleExpandHero={toggleExpandHero} />
          </div>
        </motion.main>
        <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-[280px] xl:w-[320px] flex-shrink-0"
        >
          <QuickLinksSidebar />
        </motion.aside>
      </div>
    </div>
  );
};

const HeroEquipmentSection = ({ title, heroes, expandedHeroId, toggleExpandHero }) => (
  <section>
    <h2 className="text-2xl font-bold clash-font text-secondary-foreground mb-6 text-center md:text-left">{title}</h2>
    <div className="space-y-4">
      {heroes.map((hero, index) => (
        <motion.div
          key={hero.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="overflow-hidden card-hover">
            <div className="flex flex-col md:flex-row cursor-pointer" onClick={() => toggleExpandHero(hero.id)}>
              <div className="md:w-1/4 flex items-center justify-center p-4 bg-muted/30">
                <img 
                  alt={hero.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-md"
                  src={hero.imageUrl || "https://images.unsplash.com/photo-1578466455317-bb6b531fba83"} />
              </div>
              <div className="md:w-3/4 p-4 md:p-5">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl clash-font mb-1 text-primary">{hero.name}</CardTitle>
                  {expandedHeroId === hero.id ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                </div>
                <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{hero.description}</p>
              </div>
            </div>
            <AnimatePresence>
              {expandedHeroId === hero.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 md:p-5 border-t border-border"
                >
                  <p className="text-sm text-muted-foreground mb-3">{hero.description}</p>
                  {hero.equipment && hero.equipment.length > 0 ? (
                    <>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Available Equipments:</h4>
                      <div className="flex flex-wrap gap-3 mb-3">
                        {hero.equipment.map(equip => (
                          <div key={equip.name} className="flex flex-col items-center text-center w-16">
                            <img 
                              src={equip.imageUrl || "https://images.unsplash.com/photo-1508672155910-c3e05089393a"} 
                              alt={equip.name} 
                              className="w-10 h-10 object-cover rounded-md border-2 border-primary/50 mb-1"
                            />
                            <span className="text-xs text-muted-foreground">{equip.name}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-foreground">
                        <strong>Recommended:</strong> For {hero.name}, consider pairing 
                        {hero.equipment.length > 1 ? ` ${hero.equipment[0].name} with ${hero.equipment[1].name}` : ` ${hero.equipment[0].name}`} for optimal performance. 
                        (More detailed strategies coming soon!)
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Equipment information coming soon.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HeroEquipmentsPage;
