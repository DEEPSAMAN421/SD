
import { townHallData, builderHallData, allBases as rawAllBases, heroes as rawHeroes, pets as rawPets, attackStrategies as rawAttackStrategies, faqData as rawFaqData } from '@/data/staticData';

export const getBases = (level, type, isBuilderBase = false, page = 1, limit = 15, sortOption = 'default', selectedTags = []) => {
  let filtered = rawAllBases.filter(base => {
    const levelMatch = isBuilderBase ? base.builderHallLevel === level : base.townHallLevel === level;
    const typeMatch = type === "All Bases" || base.type === type;
    const tagsMatch = selectedTags.length === 0 || selectedTags.every(tag => base.tags.includes(tag));
    return levelMatch && typeMatch && tagsMatch;
  });

  switch (sortOption) {
    case 'views':
      filtered.sort((a, b) => b.views - a.views);
      break;
    case 'likes':
      filtered.sort((a, b) => b.likes - a.likes);
      break;
    case 'rating':
      filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
    default:
      break;
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return {
    bases: filtered.slice(startIndex, endIndex),
    totalCount: filtered.length,
    totalPages: Math.ceil(filtered.length / limit)
  };
};


export const getBaseById = (id) => {
  return rawAllBases.find(base => base.id === id);
};

export const getSimilarBases = (currentBaseId, count = 9) => {
  const currentBase = getBaseById(currentBaseId);
  if (!currentBase) return [];

  const isBuilder = currentBase.builderHallLevel !== undefined;
  const level = currentBase.builderHallLevel || currentBase.townHallLevel;

  return rawAllBases
    .filter(base => 
      base.id !== currentBaseId &&
      (isBuilder ? base.builderHallLevel === level : base.townHallLevel === level)
    )
    .sort(() => 0.5 - Math.random()) 
    .slice(0, count);
};

export const getLayoutCountForLevel = (level, isBuilderBase = false) => {
  return rawAllBases.filter(base => 
    isBuilderBase ? base.builderHallLevel === level : base.townHallLevel === level
  ).length;
};

const updatedTownHallData = townHallData.map(th => ({
  ...th,
  layoutsAvailable: getLayoutCountForLevel(th.level, false),
  whatsNew: rawAllBases.find(b => b.townHallLevel === th.level)?.whatsNew || `Information about new features and strategies for Town Hall ${th.level} is coming soon.`
}));

const updatedBuilderHallData = builderHallData.map(bh => ({
  ...bh,
  layoutsAvailable: getLayoutCountForLevel(bh.level, true),
  whatsNew: rawAllBases.find(b => b.builderHallLevel === bh.level)?.whatsNew || `Information about new features and strategies for Builder Hall ${bh.level} is coming soon.`
}));


export { 
  updatedTownHallData as townHallData, 
  updatedBuilderHallData as builderHallData, 
  rawAllBases as allBases,
  rawHeroes as heroes,
  rawPets as pets,
  rawAttackStrategies as attackStrategies,
  rawFaqData as faqData
};

