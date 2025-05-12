
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Construction, ShieldCheck, Lightbulb } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import PageHorizontalNav from '@/components/PageHorizontalNav';

const AdPlaceholder = () => <div className="ad-placeholder my-6"></div>;

const CocVillagePlannerPage = () => {
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme('planner');
  }, [setTheme]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-planner">
      <AdPlaceholder />
      <PageHorizontalNav currentPathBase="/coc-village-planner" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 mt-6"
      >
        <Settings className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold clash-font text-primary mb-4">CoC Village Planner</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Plan your village upgrades, army compositions, and resource management effectively. (Feature Coming Soon!)
        </p>
      </motion.div>

      <motion.div 
        className="bg-card p-6 sm:p-8 rounded-lg shadow-xl border"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold clash-font text-primary mb-6 text-center">
          Exciting Planning Tools Are Under Construction!
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
            <Construction className="h-10 w-10 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Upgrade Tracker</h3>
            <p className="text-xs text-muted-foreground">Keep track of your building and troop upgrade progress.</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
            <ShieldCheck className="h-10 w-10 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Army Cost Calculator</h3>
            <p className="text-xs text-muted-foreground">Calculate elixir and dark elixir costs for your favorite armies.</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
            <Lightbulb className="h-10 w-10 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Resource Management Tips</h3>
            <p className="text-xs text-muted-foreground">Learn how to optimize your resource gathering and spending.</p>
          </div>
        </div>
        <p className="text-center text-muted-foreground mt-8">
          We are working hard to bring you these powerful village planning tools. Stay tuned for updates!
        </p>
      </motion.div>
    </div>
  );
};

export default CocVillagePlannerPage;
