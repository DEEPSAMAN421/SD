
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, BarChart2, Zap, Info } from 'lucide-react';
import { aboutUsContent } from '@/data/bases';
import { useTheme } from '@/components/ThemeProvider';

const AboutPage = () => {
  const { title, paragraphs, stats } = aboutUsContent;
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme('default');
  }, [setTheme]);


  return (
    <div className="bg-gradient-to-b from-background to-secondary/10 py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <Info className="h-16 w-16 md:h-20 md:w-20 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold clash-font text-primary mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your Ultimate Hub for Clash of Clans Base Layouts and Strategies.
          </p>
        </motion.div>

        <div className="bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border border-border/50">
          <div className="prose prose-lg max-w-none text-foreground prose-p:text-muted-foreground prose-headings:text-primary prose-headings:clash-font">
            {paragraphs.map((p, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                className="mb-5 last:mb-0 text-base md:text-lg leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        {stats && stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 md:mt-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.15, ease: "easeOut" }}
                  className="bg-card p-6 rounded-lg shadow-lg border border-border/30"
                >
                  {index === 0 && <BarChart2 className="h-10 w-10 text-primary mx-auto mb-3" />}
                  {index === 1 && <Zap className="h-10 w-10 text-primary mx-auto mb-3" />}
                  {index === 2 && <Users className="h-10 w-10 text-primary mx-auto mb-3" />}
                  <p className="text-3xl md:text-4xl font-bold text-primary clash-font">{stat.value}</p>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground">
            Need help or have questions? Visit our <Link to="/faq" className="text-primary hover:underline font-semibold">F&Q page</Link> or <Link to="/contact" className="text-primary hover:underline font-semibold">contact us</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
