
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { bases as allBasesData } from '@/data/bases';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const TownHallCategories = () => {
  const { setTheme } = useTheme();
  const townHallLevels = Array.from({ length: 13 }, (_, i) => 17 - i);

  const getLayoutCount = (level) => {
    return allBasesData.filter(base => base.townHallLevel === level).length;
  };

  return (
    <section id="town-hall-categories" className="py-8 md:py-12 bg-background theme-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold clash-font text-primary mb-3">
            Browse Town Hall Base Layouts
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find the perfect Clash of Clans base design for your Town Hall level. Updated for the latest meta.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {townHallLevels.map((level, index) => (
            <motion.div
              key={level}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="h-full"
            >
              <Link 
                to={`/bases/${level}`} 
                onClick={() => setTheme('th')}
                className="block bg-card p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center card-hover border-2 border-transparent hover:border-primary h-full flex flex-col justify-between"
              >
                <div>
                  <img 
                    src={`https://images.unsplash.com/photo-1703866573385-778b8ef08290?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200&h=150&fit=crop&level=${level}`} 
                    alt={`Town Hall ${level}`} 
                    className="w-full h-32 md:h-40 mx-auto mb-4 rounded-md object-contain"
                  />
                  <h3 className="text-lg md:text-xl font-semibold clash-font text-primary mb-1">
                    Best TH{level} Bases
                  </h3>
                   <p className="text-xs text-muted-foreground mb-1">(Town Hall {level})</p>
                  <hr className="border-primary/30 my-2" />
                  <p className="text-sm text-muted-foreground mb-3">
                    {getLayoutCount(level)}+ Layouts Available
                  </p>
                </div>
                <Button variant="default" size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                  View Layouts
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TownHallCategories;
