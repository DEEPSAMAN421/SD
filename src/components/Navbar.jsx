
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const townHallLevels = Array.from({ length: 13 }, (_, i) => 17 - i); 
  const builderHallLevels = Array.from({ length: 7 }, (_, i) => 10 - i); 

  const handleScrollToSection = (sectionId, theme) => {
    setTheme(theme);
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsOpen(false);
  };

  const handleNavigate = (path, theme) => {
    setTheme(theme);
    navigate(path);
    setIsOpen(false);
  }
  
  const Slogan = () => (
    <div className="text-xs slogan-text mt-0.5">
      <span className="font-semibold">Defend.</span> <span className="font-semibold">Destroy.</span> <span className="font-semibold">Win.</span>
    </div>
  );

  return (
    <nav className="bg-background/95 border-b border-border/40 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={() => setTheme('default')}>
              <img  alt="COC Bases Layouts Logo Header" class="w-10 h-10 rounded-full mr-3 shadow-md" src="https://images.unsplash.com/photo-1578466455317-bb6b531fba83" />
              <div>
                <span className="text-lg font-bold clash-font text-foreground hover:text-primary transition-colors">COC Bases Layouts</span>
                <Slogan />
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Button variant="link" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md font-medium text-sm" onClick={() => handleNavigate('/', 'default')}>
              Home
            </Button>
            <div className="relative group">
              <Button 
                variant="link" 
                className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md font-medium flex items-center text-sm"
                onClick={() => handleScrollToSection('town-hall-categories', 'th')}
              >
                Town Hall Layouts
              </Button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border hidden group-hover:block max-h-96 overflow-y-auto z-[60]">
                <div className="py-1">
                  {townHallLevels.map((level) => (
                    <Link
                      key={level}
                      to={`/bases/${level}`}
                      onClick={() => setTheme('th')}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                    >
                      Best TH{level} Bases
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <Button 
                variant="link" 
                className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md font-medium flex items-center text-sm"
                onClick={() => handleScrollToSection('builder-hall-categories', 'bh')}
              >
                Builder Hall Layouts
              </Button>
              <div className="absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-background border border-border hidden group-hover:block max-h-96 overflow-y-auto z-[60]">
                <div className="py-1">
                  {builderHallLevels.map((level) => (
                    <Link
                      key={level}
                      to={`/builder-bases/${level}`}
                      onClick={() => setTheme('bh')}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                    >
                      Best BH{level} Layouts
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="link" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md font-medium text-sm" onClick={() => handleNavigate('/faq', 'default')}>
              F&Q
            </Button>
            <Button variant="link" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md font-medium text-sm" onClick={() => handleNavigate('/about', 'default')}>
              About Us
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-b border-border/40 max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate('/', 'default')}>Home</Button>
              
              <p className="px-3 py-1 text-sm font-semibold text-muted-foreground">Town Hall Layouts</p>
              <Button variant="ghost" className="w-full justify-start" onClick={() => handleScrollToSection('town-hall-categories', 'th')}>Scroll to TH Section</Button>
              {townHallLevels.map((level) => (
                <Button variant="ghost" className="w-full justify-start pl-6" key={level} onClick={() => handleNavigate(`/bases/${level}`, 'th')}>
                  Best TH{level} Bases
                </Button>
              ))}
              
              <p className="px-3 py-1 text-sm font-semibold text-muted-foreground">Builder Hall Layouts</p>
              <Button variant="ghost" className="w-full justify-start" onClick={() => handleScrollToSection('builder-hall-categories', 'bh')}>Scroll to BH Section</Button>
              {builderHallLevels.map((level) => (
                 <Button variant="ghost" className="w-full justify-start pl-6" key={level} onClick={() => handleNavigate(`/builder-bases/${level}`, 'bh')}>
                   Best BH{level} Layouts
                </Button>
              ))}
              <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate('/faq', 'default')}>F&Q</Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate('/about', 'default')}>About Us</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
