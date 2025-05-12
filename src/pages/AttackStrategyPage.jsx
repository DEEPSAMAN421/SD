
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { attackStrategies } from '@/data/bases';
import { Swords, Users, Droplets, Zap, ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import PageHorizontalNav from '@/components/PageHorizontalNav';
import { Button } from '@/components/ui/button';

const AdPlaceholder = () => <div className="ad-placeholder my-6"></div>;

const AttackStrategyPage = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme('attack');
  }, [setTheme]);

  const handleStrategyClick = (strategyId) => {
    navigate(`/attack-strategy/${strategyId}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-attack">
      <AdPlaceholder />
      <PageHorizontalNav currentPathBase="/attack-strategy" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 mt-6"
      >
        <Swords className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold clash-font text-primary mb-4">Attack Strategies</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Master powerful attack strategies to conquer any Clash of Clans base. Learn troop compositions, spell placements, and execution tips.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attackStrategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleStrategyClick(strategy.id)}
            className="cursor-pointer"
          >
            <Card className="h-full flex flex-col card-hover bg-card group">
              <CardHeader>
                <CardTitle className="clash-font text-xl text-primary group-hover:underline">{strategy.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">Requires: {strategy.townHall}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground mb-4 line-clamp-3">{strategy.description}</p>
                <div className="space-y-2">
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center"><Users className="h-3.5 w-3.5 mr-1.5 text-primary/80" />Troops</h4>
                    <p className="text-xs text-foreground truncate">{strategy.troops.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center"><Zap className="h-3.5 w-3.5 mr-1.5 text-primary/80" />Spells</h4>
                    <p className="text-xs text-foreground truncate">{strategy.spells.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 pt-0">
                <Button variant="link" className="text-xs p-0 h-auto text-primary group-hover:underline">
                  View Strategy <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-muted-foreground">
          More strategies and detailed guides coming soon! Keep clashing!
        </p>
      </motion.div>
    </div>
  );
};

export default AttackStrategyPage;
