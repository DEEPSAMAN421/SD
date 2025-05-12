
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import BaseCardSimple from '@/components/BaseCardSimple';
import { getBasesByTypeAndTags, builderHallInfo } from '@/data/bases';
import { Shield, Hammer, Home, Swords, Settings, ChevronLeft, ChevronRight, Filter, Tag, Info, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageHorizontalNav from '@/components/PageHorizontalNav';

const AdPlaceholder = () => <div className="ad-placeholder my-6"></div>;

const QuickNav = ({ currentLevel, isBuilderBase }) => {
  const townHallLevels = Array.from({ length: 13 }, (_, i) => 17 - i);
  const builderHallLevels = Array.from({ length: 7 }, (_, i) => 10 - i);
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();

  const handleLevelClick = (level, isTargetBuilder) => {
    setTheme(isTargetBuilder ? 'bh' : 'th');
  };

  return (
    <div className={cn("bg-card border rounded-lg shadow-sm p-2 sm:p-3 mb-6 text-xs",
      isBuilderBase ? "theme-bh" : "theme-th"
    )}>
      <div className="flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 items-center justify-center">
        <span className="font-semibold text-primary clash-font mr-1 sm:mr-2">Quick Nav:</span>
        {townHallLevels.map(level => (
          <Link 
            key={`th-${level}`} 
            to={`/bases/${level}`} 
            onClick={() => handleLevelClick(level, false)}
            className={cn("hover:text-primary hover:underline px-1 py-0.5 rounded", 
              !isBuilderBase && parseInt(currentLevel) === level && pathname.startsWith("/bases/") ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground"
            )}
          >
            TH{level}
          </Link>
        ))}
        <span className="text-muted-foreground mx-1 hidden sm:inline">|</span>
        {builderHallLevels.map(level => (
          <Link 
            key={`bh-${level}`} 
            to={`/builder-bases/${level}`} 
            onClick={() => handleLevelClick(level, true)}
            className={cn("hover:text-primary hover:underline px-1 py-0.5 rounded", 
              isBuilderBase && parseInt(currentLevel) === level && pathname.startsWith("/builder-bases/") ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground"
            )}
          >
            BH{level}
          </Link>
        ))}
      </div>
    </div>
  );
};

const BuilderBaseTypeFilterComponent = ({ activeType, setActiveType, availableTags, selectedTags, toggleTag, currentSort, setCurrentSort }) => {
  const baseTypes = [
    { id: 'all', label: 'All Layouts' },
    { id: 'defense', label: 'Defense' },
    { id: 'trophy', label: 'Trophy' }, 
  ];
  const sortOptions = [
    { id: 'default', label: 'Default' },
    { id: 'views', label: 'Views' },
    { id: 'likes', label: 'Likes' },
    { id: 'rating', label: 'Rating' },
  ];

  return (
    <div className="mb-6 md:mb-8 space-y-4">
      <div className="flex flex-wrap justify-center items-center gap-2">
        {baseTypes.map((type) => (
          <Button
            key={type.id}
            variant={activeType === type.id ? 'default' : 'outline'}
            onClick={() => setActiveType(type.id)}
            className={cn("text-xs sm:text-sm px-3 py-1.5 h-auto", activeType === type.id && "shadow-md")}
          >
            {type.label}
          </Button>
        ))}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-3 py-1.5 h-auto ml-auto">
                <ListFilter className="h-3.5 w-3.5 mr-1.5" />
                Sort by: {sortOptions.find(s => s.id === currentSort)?.label || 'Default'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map(option => (
                <DropdownMenuItem key={option.id} onClick={() => setCurrentSort(option.id)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
      {availableTags.length > 0 && (
        <div className="bg-card border rounded-lg p-3">
          <h4 className="text-sm font-semibold mb-2 flex items-center"><Tag className="w-4 h-4 mr-2 text-primary"/>Filter by Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
                onClick={() => toggleTag(tag)}
                className="cursor-pointer text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ITEMS_PER_PAGE = 15;

const BuilderBasesPage = () => {
  const { builderHallLevel } = useParams();
  const [activeType, setActiveType] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [allBasesForLevel, setAllBasesForLevel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState('default');
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('bh');
  }, [setTheme]);

  const availableTags = useMemo(() => {
    const bases = getBasesByTypeAndTags(builderHallLevel, 'all', [], true);
    const tags = new Set();
    bases.forEach(base => base.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [builderHallLevel]);

  useEffect(() => {
    const filteredBases = getBasesByTypeAndTags(builderHallLevel, activeType, selectedTags, true, currentSort);
    setAllBasesForLevel(filteredBases);
    setCurrentPage(1); 
  }, [builderHallLevel, activeType, selectedTags, currentSort]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const totalPages = Math.ceil(allBasesForLevel.length / ITEMS_PER_PAGE);
  const currentBases = allBasesForLevel.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const pageTitle = `Best BH${builderHallLevel} Builder Base Layouts`;
  const pageDescription = `Explore top Clash of Clans Builder Hall ${builderHallLevel} base layouts. Find the best BH${builderHallLevel} defense and trophy pushing coc bases for your builder base. Updated for ${new Date().getFullYear()}.`;

  const currentBuilderHallInfo = builderHallInfo[parseInt(builderHallLevel)];

  return (
    <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 py-6 md:py-8 theme-bh">
      <AdPlaceholder />
      <PageHorizontalNav currentPathBase="/builder-bases/" />
      <QuickNav currentLevel={builderHallLevel} isBuilderBase={true} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 md:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold clash-font text-primary mb-2">{pageTitle}</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base">
          {pageDescription}
        </p>
      </motion.div>
      
      <BuilderBaseTypeFilterComponent 
        activeType={activeType} 
        setActiveType={setActiveType}
        availableTags={availableTags}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        currentSort={currentSort}
        setCurrentSort={setCurrentSort}
      />
      
      {currentBases.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {currentBases.map((base) => (
              <BaseCardSimple key={base.id} base={base} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-1 sm:space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                 (pageNumber === 1 || pageNumber === totalPages || Math.abs(pageNumber - currentPage) <= 1 || (currentPage <=3 && pageNumber <=3) || (currentPage >= totalPages - 2 && pageNumber >= totalPages -2 )) ? (
                  <Button 
                    key={pageNumber} 
                    variant={currentPage === pageNumber ? "default" : "outline"} 
                    size="icon"
                    onClick={() => setCurrentPage(pageNumber)}
                    className="h-8 w-8 sm:h-9 sm:w-9 text-xs"
                  >
                    {pageNumber}
                  </Button>
                 ) : (pageNumber === 2 && currentPage > 4) || (pageNumber === totalPages -1 && currentPage < totalPages - 3) ? <span key={pageNumber} className="px-1 text-muted-foreground">...</span> : null
              ))}
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                disabled={currentPage === totalPages}
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-card rounded-lg shadow-md border">
          <Filter className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-semibold clash-font mb-3">No Matching Layouts Found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your filters or check back later for new Builder Hall {builderHallLevel} layouts.
          </p>
        </div>
      )}
      {currentBuilderHallInfo && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-border/50 bg-card rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-bold clash-font text-primary mb-4 flex items-center">
            <Info className="h-6 w-6 mr-3 text-primary/80"/>What's New in Builder Hall {builderHallLevel}?
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img 
              src={currentBuilderHallInfo.imageUrl} 
              alt={`Builder Hall ${builderHallLevel} Visual`} 
              className="w-full sm:w-1/3 max-w-xs rounded-lg shadow-md border object-cover aspect-video"
            />
            <p className="text-muted-foreground text-sm sm:text-base flex-1">{currentBuilderHallInfo.new}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BuilderBasesPage;
