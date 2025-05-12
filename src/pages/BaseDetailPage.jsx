
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBaseById } from '@/data/bases';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
import BaseDetailContent from '@/components/BaseDetailContent';
import BaseDetailSidebar from '@/components/BaseDetailSidebar';
import ImageModal from '@/components/ImageModal';
import { useTheme } from '@/components/ThemeProvider';

const AdPlaceholder = () => <div className="ad-placeholder my-6"></div>;

const BaseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setTheme } = useTheme();
  const [base, setBase] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  useEffect(() => {
    const fetchedBase = getBaseById(id);
    if (fetchedBase) {
      setBase(fetchedBase);
      const themeToSet = fetchedBase.builderHallLevel ? 'bh' : 'th';
      setTheme(themeToSet);
    } else {
      navigate('/404'); 
    }
    window.scrollTo(0, 0);
  }, [id, navigate, setTheme]);

  const openImageModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImageUrl('');
  };

  if (!base) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading Base Details...</div>
      </div>
    );
  }

  const levelPrefix = base.builderHallLevel ? "BH" : "TH";
  const level = base.builderHallLevel || base.townHallLevel;

  return (
    <div className={`max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 py-6 ${base.builderHallLevel ? 'theme-bh' : 'theme-th'}`}>
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="text-sm h-8 px-3">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Layouts
        </Button>
      </div>
      <AdPlaceholder />
      <div className="flex flex-col lg:flex-row gap-5">
        <motion.main 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-full lg:flex-grow space-y-5"
        >
          <BaseDetailContent base={base} levelPrefix={levelPrefix} level={level} openImageModal={openImageModal} />
        </motion.main>
        <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-[280px] xl:w-[320px] flex-shrink-0"
        >
          <BaseDetailSidebar base={base} />
        </motion.aside>
      </div>
      {isImageModalOpen && <ImageModal imageUrl={selectedImageUrl} onClose={closeImageModal} />}
    </div>
  );
};

export default BaseDetailPage;
