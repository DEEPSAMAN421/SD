
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Youtube, Home, Settings, Swords, Shield as ShieldIcon, Hammer as HammerIcon, HelpCircle, Globe, Mail, FileText, ShieldAlert, Copyright } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from '@/components/ThemeProvider';


const mainNavItems = [
  { id: 'town-hall-categories', name: 'Town Hall Layouts', path: '/', icon: <Home className="mr-2 h-4 w-4" />, sectionId: 'town-hall-categories', theme: 'th' },
  { id: 'builder-hall-categories', name: 'Builder Base Layouts', path: '/', icon: <HammerIcon className="mr-2 h-4 w-4" />, sectionId: 'builder-hall-categories', theme: 'bh' },
  { name: 'Hero Loadout', path: '/hero-loadout', icon: <ShieldIcon className="mr-2 h-4 w-4" />, theme: 'hero' },
  { name: 'Attack Strategy', path: '/attack-strategy', icon: <Swords className="mr-2 h-4 w-4" />, theme: 'attack' },
  { name: 'CoC Village Planner', path: '/coc-village-planner', icon: <Settings className="mr-2 h-4 w-4" />, theme: 'planner' },
];

const legalNavItems = [
  { name: 'About Us', path: '/about', icon: <Globe className="mr-2 h-4 w-4" /> },
  { name: 'F&Q', path: '/faq', icon: <HelpCircle className="mr-2 h-4 w-4" /> },
  { name: 'Contact Us', path: '/contact', icon: <Mail className="mr-2 h-4 w-4" /> },
  { name: 'Privacy Policy', path: '/privacy-policy', icon: <FileText className="mr-2 h-4 w-4" /> },
  { name: 'Terms of Use', path: '/terms-of-use', icon: <Copyright className="mr-2 h-4 w-4" /> },
  { name: 'DMCA', path: '/dmca', icon: <ShieldAlert className="mr-2 h-4 w-4" /> },
];


const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
];

const Footer = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const { setTheme } = useTheme();

  const handleNavClick = (item) => {
    setTheme(item.theme || 'default');
    if (item.sectionId && window.location.pathname === item.path) {
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(item.path);
      if (item.sectionId) {
        setTimeout(() => {
          document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    console.log(`Language changed to: ${lang.name}`);
  };

  return (
    <footer className="bg-card border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex flex-col items-center md:items-start mb-3" onClick={() => setTheme('default')}>
              <img  alt="COC Bases Layouts Logo Footer" class="w-20 h-20 rounded-lg mb-2 shadow-md" src="https://images.unsplash.com/photo-1578466455317-bb6b531fba83" />
              <span className="text-xl font-bold clash-font text-foreground">COC Bases Layouts</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Discover the best Clash of Clans layouts and strategies. We provide top-tier base designs for all Town Hall and Builder Hall levels, helping you dominate in wars and protect your loot. Your ultimate resource for coc bases and base building mastery.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 clash-font">Quick Links</h3>
            <ul className="space-y-2">
              {mainNavItems.map(item => (
                <li key={item.name}>
                  <button 
                    onClick={() => handleNavClick(item)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center mx-auto md:mx-0"
                  >
                    {React.cloneElement(item.icon, {className: "mr-2 h-4 w-4 text-primary/70"})}
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 clash-font">Legal & Support</h3>
            <ul className="space-y-2">
              {legalNavItems.map(item => (
                 <li key={item.name}>
                  <Link to={item.path} onClick={() => setTheme('default')} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center mx-auto md:mx-0">
                     {React.cloneElement(item.icon, {className: "mr-2 h-4 w-4 text-primary/70"})} {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 clash-font">Join our Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our YouTube channel for video guides, base reviews, and the latest Clash of Clans tips and tricks!
            </p>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white w-full max-w-xs sm:w-auto">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5 mr-2" />
                Subscribe on YouTube
              </a>
            </Button>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 clash-font">Language</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full max-w-xs sm:w-auto">
                    <Globe className="h-4 w-4 mr-2" />
                    {selectedLanguage.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {languages.map((lang) => (
                    <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang)}>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-border/40 text-center text-xs text-muted-foreground/80">
           <p className="mb-2">
            <strong>Disclaimer:</strong> This material is unofficial and is not endorsed by Supercell. For more information see Supercell’s Fan Content Policy: <a href="https://www.supercell.com/fan-content-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.supercell.com/fan-content-policy</a>.
          </p>
          <p>&copy; {new Date().getFullYear()} COC Bases Layouts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
