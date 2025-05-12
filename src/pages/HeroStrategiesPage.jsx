
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { heroes } from '@/data/bases'; 
import { Shield } from 'lucide-react';

const HeroStrategiesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold clash-font text-primary mb-4">Hero Strategies</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Master your Heroes! Learn the best ways to utilize each Hero's abilities to crush your opponents in Clash of Clans.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {heroes.map((hero, index) => (
          <motion.div
            key={hero.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            className="card-hover h-full"
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <CardHeader className="p-0">
                <img 
                  alt={hero.name}
                  class="w-full h-56 object-cover"
                 src="https://images.unsplash.com/photo-1578466455317-bb6b531fba83" />
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="text-2xl clash-font mb-3 text-primary">{hero.name}</CardTitle>
                <p className="text-muted-foreground text-sm flex-grow">{hero.description}</p>
                <p className="text-xs text-muted-foreground mt-4">More strategies coming soon...</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroStrategiesPage;
