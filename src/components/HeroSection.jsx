
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  { src: "https://images.unsplash.com/photo-1609006130099-9390b843e543", alt: "Epic Clash of Clans Battle Scene" },
  { src: "https://images.unsplash.com/photo-1578466455317-bb6b531fba83", alt: "Detailed Clash of Clans Village Layout" },
  { src: "https://images.unsplash.com/photo-1618299010090-072cd6955979", alt: "Clash of Clans Heroes in Action" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };
  
  return (
    <section className="relative bg-gradient-to-r from-background via-secondary/50 to-background text-foreground overflow-hidden hero-slider theme-default">
      {heroImages.map((image, index) => (
        <motion.div
          key={index}
          className="hero-slide"
          initial={{ opacity: 0, x: index === currentSlide ? 0 : (index > currentSlide ? '100%' : '-100%') }}
          animate={{ opacity: index === currentSlide ? 1 : 0, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <img  class="w-full h-full object-cover" alt={image.alt} src={image.src} />
        </motion.div>
      ))}
      
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center min-h-[50vh] max-h-[400px] py-12 md:py-16">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold clash-font tracking-tight mb-3 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Top Clash of Clans Layouts with Links & Strategies 2025
        </motion.h1>
        <motion.p 
          className="mt-2 mb-6 text-md sm:text-lg text-slate-200 max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Find the perfect base design for your Town Hall or Builder Hall. Instantly copy links and dominate your opponents with our expertly curated coc bases and attack guides.
        </motion.p>
      </div>

      <button onClick={prevSlide} className="hero-slider-arrow left-0 text-white/70 hover:text-white transition-colors">
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button onClick={nextSlide} className="hero-slider-arrow right-0 text-white/70 hover:text-white transition-colors">
        <ChevronRight className="h-8 w-8" />
      </button>
      <div className="hero-slider-nav">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} className={currentSlide === i ? 'active' : ''}></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
