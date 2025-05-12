
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ThumbsUp, Star, Link2 } from 'lucide-react';

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <Star key={i} fill={i < rating ? "currentColor" : "none"} />
      ))}
    </div>
  );
};

const BaseCardSimple = ({ base }) => {
  const isBuilderBase = base.builderHallLevel !== undefined;
  const level = isBuilderBase ? base.builderHallLevel : base.townHallLevel;
  const levelPrefix = isBuilderBase ? "BH" : "TH";
  const id = base.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-hover h-full group flex flex-col"
    >
      <Link to={`/base/${id}`} className="block h-full flex flex-col">
        <Card className="overflow-hidden border-2 h-full flex flex-col flex-grow">
          <CardHeader className="p-0 relative aspect-[16/10]">
            <img    
              alt={`${levelPrefix}${level} ${base.name} Clash of Clans layout`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={base.imageUrls[0] || "https://images.unsplash.com/photo-1561406084-7721f5e4d465"} 
            />
            <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
              <Badge variant="default" className="bg-primary/90 backdrop-blur-sm text-xs px-1.5 py-0.5 shadow">
                {levelPrefix}{level}
              </Badge>
              <Badge variant="secondary" className="bg-secondary/90 backdrop-blur-sm text-xs px-1.5 py-0.5 shadow">
                {base.type}
              </Badge>
              <Badge variant="outline" className="bg-background/70 backdrop-blur-sm text-xs px-1.5 py-0.5 shadow border-primary/50 text-primary">
                <Link2 className="h-3 w-3 mr-1"/> Link
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-2 sm:p-3 flex-grow">
            <h3 className="text-sm sm:text-md font-semibold clash-font mb-1 group-hover:text-primary transition-colors truncate">{base.name}</h3>
          </CardContent>
          <CardFooter className="p-2 sm:p-3 pt-0 text-xs text-muted-foreground flex flex-wrap justify-between items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> 
              <span>{base.views || 0}</span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <ThumbsUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>{base.likes || 0}</span>
            </div>
            <StarRating rating={Math.floor(Math.random() * 2) + 4} /> {/* Random 4-5 stars */}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default BaseCardSimple;
