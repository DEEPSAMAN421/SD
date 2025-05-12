
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, PlayCircle, ThumbsUp, Star as StarIcon, Download, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getSimilarBases } from '@/data/bases';
import BaseCardSimple from '@/components/BaseCardSimple';

const StarRatingDisplay = ({ ratingValue }) => {
  const fullStars = Math.floor(ratingValue);
  const halfStar = ratingValue % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-current" />)}
      {halfStar && <StarIcon key="half" className="h-4 w-4 text-yellow-400" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} fill="currentColor" />}
      {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />)}
    </div>
  );
};


const BaseDetailContent = ({ base, levelPrefix, level, openImageModal }) => {
  const { toast } = useToast();
  
  const [likes, setLikes] = React.useState(() => {
    const storedLikes = localStorage.getItem(`base_${base.id}_likes`);
    return storedLikes ? parseInt(storedLikes, 10) : base.likes;
  });
  const [hasLiked, setHasLiked] = React.useState(localStorage.getItem(`base_${base.id}_hasLiked`) === 'true');
  
  const [rating, setRating] = React.useState(() => {
    const storedRating = localStorage.getItem(`base_${base.id}_rating_val`);
    return storedRating ? parseFloat(storedRating) : base.rating;
  });
  const [hasRated, setHasRated] = React.useState(localStorage.getItem(`base_${base.id}_hasRated`) === 'true');

  const [downloads, setDownloads] = React.useState(() => {
    const storedDownloads = localStorage.getItem(`base_${base.id}_downloads_val`);
    return storedDownloads ? parseInt(storedDownloads, 10) : base.downloads;
  });
  
  const [views, setViews] = React.useState(() => {
     const storedViews = localStorage.getItem(`base_${base.id}_views_val`);
     return storedViews ? parseInt(storedViews, 10) : base.views;
  });

  React.useEffect(() => {
    const sessionViewed = sessionStorage.getItem(`base_${base.id}_sessionViewed`);
    if (!sessionViewed) {
      const newViews = views + 1;
      setViews(newViews);
      localStorage.setItem(`base_${base.id}_views_val`, newViews.toString());
      sessionStorage.setItem(`base_${base.id}_sessionViewed`, 'true');
    }
  }, [base.id, views]);


  const similarBases = getSimilarBases(base.id, level, base.type, 9, base.builderHallLevel !== undefined); // 3x3 grid = 9 bases

  const handleInteraction = (type) => {
    if (type === 'like') {
      if (hasLiked) {
        toast({ title: "Already Liked!", description: "You can only like a base once.", variant: "destructive" });
        return;
      }
      const newValue = likes + 1;
      setLikes(newValue);
      localStorage.setItem(`base_${base.id}_likes`, newValue.toString());
      localStorage.setItem(`base_${base.id}_hasLiked`, 'true');
      setHasLiked(true);
      toast({ title: "Liked!", description: `${base.name} now has ${newValue} likes.` });
    } else if (type === 'rate') {
      if (hasRated) {
        toast({ title: "Already Rated!", description: "You can only star a base once.", variant: "destructive" });
        return;
      }
      localStorage.setItem(`base_${base.id}_hasRated`, 'true');
      setHasRated(true);
      toast({ title: "Starred!", description: `Thanks for rating ${base.name}!` });
    } else if (type === 'download') {
      const newValue = downloads + 1;
      setDownloads(newValue);
      localStorage.setItem(`base_${base.id}_downloads_val`, newValue.toString());
      
      if (base && base.link) {
        navigator.clipboard.writeText(base.link)
          .then(() => {
            toast({ title: "Link Copied & Opening!", description: `${base.name} link copied. Opening in Clash of Clans...` });
            window.open(base.link, '_blank'); 
          })
          .catch(err => {
            toast({ title: "Copy Failed", description: "Could not copy link. Please try again.", variant: "destructive" });
            console.error('Failed to copy link: ', err);
          });
      } else {
         toast({ title: "No Link", description: "This base does not have a copy link available.", variant: "destructive" });
      }
    }
  };


  return (
    <div className="bg-card rounded-lg border shadow-md p-3 md:p-4">
      <h1 className="text-xl md:text-2xl font-bold clash-font text-primary mb-3">{base.name} - {levelPrefix}{level} {base.type} Clash of Clans Layout</h1>
      
      <div className="space-y-3 mb-4">
        {base.imageUrls.slice(0,3).map((imgUrl, idx) => (
          <div key={idx} className="w-full rounded-md overflow-hidden border-2 border-primary/30 hover:border-primary transition-all cursor-pointer shadow-sm" onClick={() => openImageModal(imgUrl || 'https://images.unsplash.com/photo-1578466455317-bb6b531fba83')}>
            <img  src={imgUrl} alt={`${base.name} Clash of Clans layout image ${idx + 1}`} className="w-full h-auto object-contain base-detail-image" />
          </div>
        ))}
      </div>

      {base.videoUrl && (
        <div className="mb-4">
          <a href={base.videoUrl} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border-2 border-red-500/50 hover:border-red-500">
            <div className="aspect-video bg-black flex items-center justify-center text-white relative">
               <img  alt={`${base.name} video thumbnail`} className="w-full h-full object-cover opacity-50" src="https://images.unsplash.com/photo-1578466455317-bb6b531fba83" />
              <PlayCircle className="h-16 w-16 absolute text-red-500 drop-shadow-lg" />
              <p className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 text-xs rounded">Watch Video Guide</p>
            </div>
          </a>
        </div>
      )}

      <Button size="lg" className="w-full text-base py-3 mb-4 font-semibold clash-font" onClick={() => handleInteraction('download')}>
        <Copy className="h-5 w-5 mr-2.5" /> Copy Base Link
      </Button>

      <div className="bg-secondary/30 rounded-lg p-3 mb-4 text-sm">
        <h3 className="font-semibold mb-1.5 text-md clash-font text-foreground">Base Information:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1.5 text-xs">
          <p><strong>{levelPrefix} Level:</strong> {level}</p>
          <p><strong>Type:</strong> <span className="capitalize">{base.type}</span></p>
          <p className="flex items-center gap-1"><strong><Eye className="w-3.5 h-3.5"/></strong> {views}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
        <Button variant="outline" onClick={() => handleInteraction('like')} disabled={hasLiked} className="flex-1 sm:flex-none text-xs sm:text-sm">
          <ThumbsUp className="h-3.5 w-3.5 mr-1.5" /> Like ({likes})
        </Button>
        <Button variant="outline" onClick={() => handleInteraction('rate')} disabled={hasRated} className="flex-1 sm:flex-none text-xs sm:text-sm">
          <StarIcon className="h-3.5 w-3.5 mr-1.5" /> Star
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none text-xs sm:text-sm" disabled>
          <Download className="h-3.5 w-3.5 mr-1.5" /> Downloads ({downloads})
        </Button>
      </div>
      <div className="mb-3">
        <StarRatingDisplay ratingValue={rating} />
      </div>
      {base.tags && base.tags.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-1">Tags:</h4>
          <div className="flex flex-wrap gap-1.5">
            {base.tags.map(tag => <span key={tag} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{tag}</span>)}
          </div>
        </div>
      )}
      
      <hr className="my-6 border-border/50" />

      {similarBases.length > 0 && (
        <div>
          <h2 className="text-lg font-bold clash-font text-primary mb-3">More {levelPrefix}{level} Clash of Clans Layouts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {similarBases.map(simBase => (
              <BaseCardSimple key={simBase.id} base={simBase} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseDetailContent;
