
import React from 'react';
import { motion } from 'framer-motion';
import BaseCard from '@/components/BaseCard';
import { bases } from '@/data/bases'; // Using all bases for now, you can create a specific featured list

const FeaturedBases = () => {
  // Get first 3 bases as featured or create a dedicated list in bases.js
  const featuredBasesData = bases.slice(0,3);


  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold clash-font mb-4">Featured Base Layouts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out our most popular base designs that have proven effective in wars, trophy pushing, and resource protection.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBasesData.map((base) => (
            <BaseCard key={base.id} base={base} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBases;
