
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Award, Zap, Hammer, ThumbsUp, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BaseCard = ({ base }) => {
  const { toast } = useToast();
  const isBuilderBase = base.builderHallLevel !== undefined;
  const level = isBuilderBase ? base.builderHallLevel : base.townHallLevel;
  const levelPrefix = isBuilderBase ? "BH" : "TH";
  const id = base.id;

  const [likes, setLikes] = useState(() => parseInt(localStorage.getItem(`base_${id}_likes`) || '0', 10) + (Math.floor(Math.random() * 50) + 10)); // Add random initial likes
  const [rating, setRating] = useState(() => parseInt(localStorage.getItem(`base_${id}_rating`) || '0', 10) + (Math.floor(Math.random() * 20) + 5)); // Add random initial ratings

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`base_${id}_likes`, newLikes.toString());
    toast({ title: "Liked!", description: `${base.name} has ${newLikes} likes.` });
  };

  const handleRate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newRating = rating + 1;
    setRating(newRating);
    localStorage.setItem(`base_${id}_rating`, newRating.toString());
    toast({ title: "Rated!", description: `${base.name} has ${newRating} star ratings.` });
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-hover h-full"
    >
      <Card className="overflow-hidden border-2 h-full flex flex-col group">
        <CardHeader className="p-0 relative">
          <Link to={`/base/${id}`} className="block">
            <img    
              alt={`${levelPrefix}${level} ${base.name} base layout`}
              class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
             src="https://images.unsplash.com/photo-1561406084-7721f5e4d465" />
            <div className="absolute top-2 left-2 flex gap-1.5">
              <Badge variant="default" className="bg-primary/90 backdrop-blur-sm text-xs px-1.5 py-0.5">
                {levelPrefix}{level}
              </Badge>
              <Badge variant="secondary" className="bg-secondary/90 backdrop-blur-sm text-xs px-1.5 py-0.5">
                {base.type}
              </Badge>
            </div>
          </Link>
        </CardHeader>
        <CardContent className="p-3 flex-grow">
          <Link to={`/base/${id}`} className="block">
            <h3 className="text-md font-semibold clash-font mb-1 group-hover:text-primary transition-colors truncate">{base.name}</h3>
          </Link>
          <p className="text-muted-foreground text-xs mb-2 line-clamp-2">{base.description}</p>
          
          <div className="flex items-center justify-start gap-2.5 mt-2">
            <Button variant="ghost" size="xs" onClick={handleLike} className="text-muted-foreground hover:text-primary p-1 h-auto">
              <ThumbsUp className="h-3.5 w-3.5 mr-1" /> <span className="text-xs">{likes}</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={handleRate} className="text-muted-foreground hover:text-primary p-1 h-auto">
              <Star className="h-3.5 w-3.5 mr-1" /> <span className="text-xs">{rating}</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Link to={`/base/${id}`} className="w-full">
            <Button className="w-full h-8 text-xs">View Layout</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BaseCard;
