
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';

const ComingSoonPage = ({ pageName }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12 bg-gradient-to-br from-background to-secondary/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="bg-card p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full border"
      >
        <Wrench className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold clash-font text-primary mb-4">
          {pageName} - Coming Soon!
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          We're working hard to bring you the best {pageName.toLowerCase()}. Stay tuned for awesome content!
        </p>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link to="/">
              Go Back Home
            </Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-8">
          In the meantime, check out our other available sections.
        </p>
      </motion.div>
    </div>
  );
};

export default ComingSoonPage;
