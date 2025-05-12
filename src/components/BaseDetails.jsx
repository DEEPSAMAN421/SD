
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Zap, Copy, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const BaseDetails = ({ base }) => {
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(base.link);
    toast({
      title: "Link copied!",
      description: "Base link has been copied to clipboard",
    });
  };

  const handleLike = () => {
    toast({
      title: "Thanks for your feedback!",
      description: "You liked this base layout",
    });
  };

  const handleDislike = () => {
    toast({
      title: "Thanks for your feedback!",
      description: "You disliked this base layout",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="bg-card rounded-lg overflow-hidden border shadow-lg">
            <div className="relative">
              <img  
                alt={`Town Hall ${base.townHallLevel} ${base.name} base layout`}
                className="w-full h-auto object-cover"
               src="https://images.unsplash.com/photo-1578466455317-bb6b531fba83" />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="default" className="bg-primary/90 backdrop-blur-sm">
                  TH{base.townHallLevel}
                </Badge>
                <Badge variant="secondary" className="bg-secondary/90 backdrop-blur-sm">
                  {base.type}
                </Badge>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold clash-font">{base.name}</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleLike}>
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDislike}>
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Dislike
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">{base.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary/50 rounded-lg p-4 flex flex-col items-center">
                  <Shield className="h-6 w-6 text-blue-500 mb-2" />
                  <span className="text-sm text-muted-foreground">Defense</span>
                  <span className="font-bold text-lg">{base.stats.defense}/10</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 flex flex-col items-center">
                  <Award className="h-6 w-6 text-yellow-500 mb-2" />
                  <span className="text-sm text-muted-foreground">Trophy</span>
                  <span className="font-bold text-lg">{base.stats.trophy}/10</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 flex flex-col items-center">
                  <Zap className="h-6 w-6 text-red-500 mb-2" />
                  <span className="text-sm text-muted-foreground">War</span>
                  <span className="font-bold text-lg">{base.stats.war}/10</span>
                </div>
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-2">Base Link</h3>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={base.link} 
                    readOnly 
                    className="flex-1 bg-background border rounded-md px-3 py-2 text-sm"
                  />
                  <Button variant="outline" size="icon" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Copy this link and paste it in Clash of Clans to use this base layout
                </p>
              </div>
              
              <Button className="w-full" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Base Link
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-card rounded-lg border shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Base Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Town Hall Level</h3>
                <p className="font-semibold">{base.townHallLevel}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Base Type</h3>
                <p className="font-semibold">{base.type}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Created By</h3>
                <p className="font-semibold">{base.creator}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                <p className="font-semibold">{base.updated}</p>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Strengths</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {base.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Weaknesses</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {base.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <a href="https://clashofclans.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Clash of Clans
                </a>
              </Button>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border shadow-lg p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Similar Bases</h2>
            <div className="space-y-4">
              {base.similarBases.map((similarBase, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <img  
                      alt={`TH${similarBase.townHallLevel} base thumbnail`}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1578466455317-bb6b531fba83" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{similarBase.name}</h3>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">TH{similarBase.townHallLevel}</Badge>
                      <Badge variant="outline" className="text-xs">{similarBase.type}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BaseDetails;
