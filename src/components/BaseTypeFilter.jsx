
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BaseTypeFilter = ({ activeType, setActiveType }) => {
  const baseTypes = [
    { id: 'all', label: 'All Bases' },
    { id: 'war', label: 'War Bases' },
    { id: 'trophy', label: 'Trophy Bases' },
    { id: 'farming', label: 'Farming Bases' },
    { id: 'hybrid', label: 'Hybrid Bases' },
  ];

  return (
    <div className="flex justify-center mb-8 md:mb-12">
      <Tabs value={activeType} onValueChange={setActiveType} className="w-full max-w-xl">
        <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 p-1 bg-muted/70 rounded-lg">
          {baseTypes.map((type) => (
            <TabsTrigger 
              key={type.id} 
              value={type.id} 
              className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md py-2.5"
            >
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default BaseTypeFilter;
