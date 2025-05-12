
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="image-modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="image-modal-content"
          onClick={(e) => e.stopPropagation()} 
        >
          <img  src={imageUrl} alt="Full screen base layout view" class="object-contain max-w-full max-h-full rounded-lg shadow-2xl" src="https://images.unsplash.com/photo-1605813876627-236a0efc9381" />
          <Button
            variant="destructive"
            size="icon"
            className="image-modal-close"
            onClick={onClose}
            aria-label="Close image modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
