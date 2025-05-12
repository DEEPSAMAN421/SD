
const commonStats = () => ({
  defense: Math.floor(Math.random() * 3) + 7, 
  trophy: Math.floor(Math.random() * 3) + 7,
  war: Math.floor(Math.random() * 3) + 7,
  farming: Math.floor(Math.random() * 3) + 7,
});

const commonBuilderStats = () => ({
  defense: Math.floor(Math.random() * 3) + 7,
  attack: Math.floor(Math.random() * 3) + 7,
});

const generateImageUrls = (baseName, count = 3) => {
  const urls = [];
  const placeholderKeywords = ["clash of clans layout", "coc base design", "game strategy map", "epic base", "fortress design"];
  for (let i = 0; i < count; i++) {
    const keyword = `${placeholderKeywords[Math.floor(Math.random() * placeholderKeywords.length)]} panoramic`;
    urls.push(`https://source.unsplash.com/800x450/?${encodeURIComponent(keyword)},${baseName.replace(/\s+/g, '-')}-${i+1}`);
  }
  return urls;
};

const generateVideoUrl = (chance = 0.1) => {
  return Math.random() < chance ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : null;
};

const getRandomTownHallTags = () => {
  const allTags = ["Anti 2 Star", "Anti 3 Star", "Anti Air / Electro", "Anti Trophy"]; // Removed specified tags
  const numTags = Math.floor(Math.random() * 2) + 1; // 1 to 2 tags
  return Array.from({ length: numTags }, () => allTags[Math.floor(Math.random() * allTags.length)]).filter((v, i, a) => a.indexOf(v) === i);
};

const getRandomBuilderHallTags = () => {
  const allTags = ["Anti 3 Star", "Anti Trophy"]; // Only these two for BH
  const numTags = Math.floor(Math.random() * 2) + 1; // 1 to 2 tags
  return Array.from({ length: numTags }, () => allTags[Math.floor(Math.random() * allTags.length)]).filter((v, i, a) => a.indexOf(v) === i);
};

const createBaseEntry = (idPrefix, level, name, type, descriptionSuffix, linkId, specificStrengths = [], specificWeaknesses = [], isBuilderParam = false) => {
  const isBuilder = isBuilderParam;
  const levelProp = isBuilder ? 'builderHallLevel' : 'townHallLevel';
  const stats = isBuilder ? commonBuilderStats() : commonStats();
  const likes = Math.floor(Math.random() * 121) + 80; // 80 to 200
  
  let currentType = type;
  if (!isBuilder && type.toLowerCase() === 'war') {
    currentType = 'CWL/War';
  }

  return {
    id: `${idPrefix}-${currentType.toLowerCase().replace('/','-')}-${level}-${name.toLowerCase().replace(/\s+/g, '-').substring(0,10)}-${Math.random().toString(36).substring(2,7)}`,
    [levelProp]: level,
    name: `${isBuilder ? 'BH' : 'TH'}${level} ${name}`,
    type: currentType,
    description: `${currentType.charAt(0).toUpperCase() + currentType.slice(1)} base for ${isBuilder ? 'BH' : 'TH'}${level}. ${descriptionSuffix}`,
    link: `https://link.clashofclans.com/en?action=OpenLayout&id=${isBuilder ? 'BH' : 'TH'}${level}:${type.toUpperCase()}:${linkId}`, // Original type for link
    stats: stats,
    creator: `COCLayoutsPro${Math.floor(Math.random()*100)}`,
    imageUrls: generateImageUrls(`${isBuilder ? 'BH' : 'TH'}${level} ${name} ${currentType}`),
    videoUrl: generateVideoUrl(),
    strengths: ['Good trap placement', 'Protects key defenses', ...specificStrengths],
    weaknesses: ['Vulnerable to specific high-level attacks', ...specificWeaknesses],
    tags: isBuilder ? getRandomBuilderHallTags() : getRandomTownHallTags(),
    views: Math.floor(Math.random() * 501) + 500, // 500 to 1000
    likes: likes,
    rating: parseFloat((Math.random() * 1.1 + 3.9).toFixed(1)), // 3.9 to 5.0
    downloads: Math.floor(likes * (Math.random() * 0.4 + 0.8)), // 80-120% of likes
  };
};

const townHallLevels = [17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5];
const builderHallLevels = [10, 9, 8, 7, 6, 5, 4];
const baseTypes = ['war', 'trophy', 'farming', 'hybrid'];
const builderBaseTypes = ['defense', 'trophy']; 

export const bases = [];
townHallLevels.forEach(level => {
  baseTypes.forEach(type => {
    bases.push(createBaseEntry(
      `th${level}`, level, `${type.charAt(0).toUpperCase() + type.slice(1)} Prime Base`, type, 
      `Prime ${type} design for TH${level}.`, `PrimeLink${level}${type}`, [], [], false
    ));
    for (let i = 1; i <= (Math.floor(Math.random() * 3) + 3); i++) { 
      bases.push(createBaseEntry(
        `th${level}`, level, `${type.charAt(0).toUpperCase() + type.slice(1)} Base ${i}`, type, 
        `Designed for ${type} at TH${level}.`, `UniqueLink${level}${type}${i}`, [], [], false
      ));
    }
  });
});

export const builderBases = [];
builderHallLevels.forEach(level => {
  builderBaseTypes.forEach(type => {
     builderBases.push(createBaseEntry(
      `bh${level}`, level, `${type.charAt(0).toUpperCase() + type.slice(1)} Core Layout`, type, 
      `Core ${type} layout for BH${level}.`, `CoreBHLink${level}${type}`, [], [], true
    ));
    for (let i = 1; i <= (Math.floor(Math.random() * 2) + 2); i++) { 
      builderBases.push(createBaseEntry(
        `bh${level}`, level, `${type.charAt(0).toUpperCase() + type.slice(1)} Layout ${i}`, type, 
        `Effective for ${type} at BH${level}.`, `BHUnique${level}${type}${i}`, [], [], true
      ));
    }
  });
});


export const getBasesByTypeAndTags = (level, type, selectedTags, isBuilder = false, sortBy = 'default') => {
  const sourceArray = isBuilder ? builderBases : bases;
  const levelField = isBuilder ? 'builderHallLevel' : 'townHallLevel';
  const parsedLevel = parseInt(level);

  let filtered = sourceArray.filter(base => base[levelField] === parsedLevel);

  if (type !== 'all') {
    filtered = filtered.filter(base => base.type.toLowerCase().replace('/', '-') === type.toLowerCase().replace('/', '-'));
  }

  if (selectedTags.length > 0) {
    filtered = filtered.filter(base => selectedTags.every(tag => base.tags.includes(tag)));
  }

  switch (sortBy) {
    case 'views':
      filtered.sort((a, b) => b.views - a.views);
      break;
    case 'likes':
      filtered.sort((a, b) => b.likes - a.likes);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return filtered;
};


export const getBaseById = (id) => {
  const allBases = [...bases, ...builderBases];
  return allBases.find(base => base.id === id) || null;
};

export const getSimilarBases = (currentId, level, type, count = 9, isBuilder = false) => { // Updated to 9 for 3x3 grid
  const sourceArray = isBuilder ? builderBases : bases;
  const levelField = isBuilder ? 'builderHallLevel' : 'townHallLevel';

  return sourceArray
    .filter(base => base.id !== currentId && base[levelField] === level && (base.type === type || count > 10)) 
    .sort(() => 0.5 - Math.random()) 
    .slice(0, count);
};

export const heroes = [
  { id: 'bk', name: 'Barbarian King', imageUrl: 'https://images.unsplash.com/photo-1618299010090-072cd6955979', description: 'A mighty warrior with a powerful sword and iron fist ability. Key for tanking and funneling.', equipment: [{name: 'Barbarian Puppet', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a'}, {name: 'Rage Vial', imageUrl: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91'}, {name: 'Earthquake Boots', imageUrl: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d'}] },
  { id: 'aq', name: 'Archer Queen', imageUrl: 'https://images.unsplash.com/photo-1610050019077-399d6b3a0b75', description: 'A deadly archer with a royal cloak ability. Essential for Queen Walks and taking out key defenses.', equipment: [{name: 'Archer Puppet', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a'}, {name: 'Invisibility Vial', imageUrl: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91'}, {name: 'Giant Arrow', imageUrl: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d'}] },
  { id: 'gw', name: 'Grand Warden', imageUrl: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91', description: 'A mystical hero who can make nearby troops temporarily invulnerable. Crucial for protecting large groups of troops.', equipment: [{name: 'Eternal Tome', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a'}, {name: 'Life Gem', imageUrl: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91'}, {name: 'Healing Tome', imageUrl: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d'}] },
  { id: 'rc', name: 'Royal Champion', imageUrl: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d', description: 'A fierce warrior who targets defenses with her seeking shield. Excellent for sniping defenses on the backend.', equipment: [{name: 'Seeking Shield', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a'}, {name: 'Royal Gem', imageUrl: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91'}, {name: 'Hog Rider Puppet', imageUrl: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d'}] },
  { id: 'mp', name: 'Minion Prince', imageUrl: 'https://images.unsplash.com/photo-1581092919409-837d150ef3b3', description: 'Placeholder: A powerful aerial hero with unique abilities.', equipment: [{name: 'Placeholder Gem 1', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a'}, {name: 'Placeholder Vial 2', imageUrl: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91'}] },
  { id: 'bm', name: 'Battle Machine', imageUrl: 'https://images.unsplash.com/photo-1581092919409-837d150ef3b3', description: 'The Builder Base primary hero, smashes through defenses with its electric hammer. Its ability recharges health and increases damage.', equipment: [{name: 'Electric Hammer', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a'}] },
  { id: 'bc', name: 'Battle Copter', imageUrl: 'https://images.unsplash.com/photo-1618299010090-072cd6955979', description: 'A flying Builder Base hero that provides air support and targeted damage.', equipment: [{name: 'Bomb Rush', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a'}] },
];

export const pets = [
  { id: 'lassi', name: 'L.A.S.S.I', imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a', description: 'A loyal companion that jumps over walls to attack nearby targets. Good for supporting ground troops.', bestWith: ['Barbarian King', 'Royal Champion'], details: "L.A.S.S.I's ability to bypass walls makes it excellent for heroes that dive deep into bases. It can help clear out trash buildings or even target defenses if the hero is tanking." },
  { id: 'electro_owl', name: 'Electro Owl', imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1', description: 'An electrifying pet that zaps targets and gives its Hero a ranged attack. Great for air attacks or heroes that stay back.', bestWith: ['Grand Warden', 'Archer Queen'], details: "The Electro Owl provides consistent ranged damage and can chain to multiple targets. It's particularly effective with the Grand Warden to protect air attacks or with a Queen Charge to help snipe buildings." },
  { id: 'mighty_yak', name: 'Mighty Yak', imageUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9', description: 'A sturdy pet that bashes through walls and deals extra damage to them. Useful for ground smash attacks.', bestWith: ['Barbarian King', 'Battle Machine'], details: "Mighty Yak is a wall-breaking powerhouse. It helps ground-based heroes create paths and can tank a surprising amount of damage. Essential for smash-style attacks." },
  { id: 'unicorn', name: 'Unicorn', imageUrl: 'https://images.unsplash.com/photo-1598929599001-a69a4ef39002', description: 'A mystical pet that heals its Hero and nearby troops. Excellent for Queen Charges or Warden Walks.', bestWith: ['Archer Queen', 'Grand Warden'], details: "The Unicorn is the go-to healing pet. It significantly increases the survivability of heroes, making Queen Charges and Warden Walks much more potent and sustainable." },
  { id: 'phoenix', name: 'Phoenix', imageUrl: 'https://images.unsplash.com/photo-1555169062-013468b47731', description: 'When its Hero is knocked out, Phoenix revives them for a short period. Provides a second chance for the hero.', bestWith: ['All Heroes'], details: "Phoenix offers a crucial second life for any hero, allowing them to get extra value even after being taken down. This can be game-changing for critical hero abilities or final pushes." },
  { id: 'poison_lizard', name: 'Poison Lizard', imageUrl: 'https://images.unsplash.com/photo-1470093851219-69951fcbb533', description: 'Spits poison that slows down and damages enemy troops and heroes. Effective against Clan Castle troops.', bestWith: ['Royal Champion', 'Archer Queen'], details: "The Poison Lizard acts like a mobile Poison Spell, slowing down and damaging enemy units. It's great for dealing with defending Clan Castle troops or slowing down enemy heroes." },
  { id: 'diggy', name: 'Diggy', imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d', description: 'Burrows underground to stun and attack defenses. Good for taking out single target infernos or key defenses.', bestWith: ['Royal Champion', 'Barbarian King'], details: "Diggy excels at neutralizing key single-target defenses like Inferno Towers or Eagle Artillery shots. Its stun can interrupt powerful attacks and buy valuable time for your troops." },
  { id: 'frosty', name: 'Frosty', imageUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b', description: 'Summons Frostmites that slow down enemy defenses and troops. Helps in slowing down high damage defenses.', bestWith: ['Grand Warden'], details: "Frosty and its Frostmites provide area denial by slowing down defenses and troops. This is particularly useful for protecting large groups of troops under the Grand Warden's aura or slowing down high DPS defenses." },
];

export const attackStrategies = [
    { id: 'qc_hybrid', name: 'Queen Charge Hybrid', townHall: 'TH10+', description: 'A powerful strategy involving a Queen Charge to take out key defenses, followed by a Hybrid (Miners & Hog Riders) attack. This Clash of Clans layout attack is very popular.', troops: ['Archers', 'Miners', 'Hog Riders', 'Healers'], spells: ['Heal', 'Rage', 'Freeze', 'Poison'], details: "The Queen Charge Hybrid is a versatile and potent attack strategy. Start by deploying your Archer Queen with 4-5 Healers to create a funnel and take down crucial enemy defenses, Clan Castle troops, and potentially the enemy Queen. Use Rage Spells to keep the Queen alive and boost Healer output. Once a significant portion of the base is cleared or key objectives are met, deploy your Hybrid portion – typically Miners and Hog Riders. Use Heal Spells to keep them alive as they move through the base. Freeze Spells can be used on high-damage defenses like Inferno Towers or Scattershots. The Grand Warden is often used with the Hybrid portion, using his ability to protect them through heavy damage areas. This strategy requires good planning for the Queen's pathing and precise spell placement." },
    { id: 'lavaloon', name: 'LavaLoon', townHall: 'TH9+', description: 'Classic air attack using Lava Hounds to tank for Balloons, often with Minions for cleanup. A staple in Clash of Clans layouts for air dominance.', troops: ['Lava Hounds', 'Balloons', 'Minions'], spells: ['Rage', 'Haste', 'Freeze'], details: "LavaLoon is a classic air attack that relies on Lava Hounds to tank Air Defenses while Balloons target remaining defenses. Deploy Lava Hounds towards Air Defenses. Follow them with a line or surgical deployment of Balloons. Use Haste Spells to speed up Balloons towards defenses and Rage Spells over groups of Balloons, especially when approaching high HP defenses or the Town Hall. Minions are used for cleanup behind the Balloons. Freeze Spells can neutralize Inferno Towers or high-damage splash defenses like Wizard Towers or Multi-Target Infernos. Proper pathing and timing of spells are key to a successful LavaLoon attack." },
    { id: 'dragbat', name: 'DragBat', townHall: 'TH11+', description: 'Dragon attack combined with Bat Spells to overwhelm defenses. Effective against many Clash of Clans layouts.', troops: ['Dragons', 'Balloons'], spells: ['Rage', 'Freeze', 'Bat Spell'], details: "DragBat combines the raw power of Dragons with the overwhelming force of Bat Spells. Create a funnel using heroes or a few Dragons/Balloons. Deploy the main Dragon army, often supported by Balloons to target Air Defenses. Use Rage Spells to power through core defenses. The key is the Bat Spell deployment: target areas with single-target Inferno Towers or groups of Wizard Towers/Archer Towers that are not covered by multi-target Infernos or Scattershots. Use Freeze Spells to protect the bats from splash damage, especially Wizard Towers and Giga Teslas/Infernos. The bats will quickly overwhelm defenses if protected correctly. This strategy is particularly strong against bases with exposed single-target infernos." },
];

export const faqData = [
  { question: "How do I copy a base layout link?", answer: "On the base detail page, click the 'Copy Base Link' button. Then, open Clash of Clans, go to the Layout Editor, select an empty slot or an existing base you want to replace, and you should see an option to paste the layout from clipboard." },
  { question: "Are these Clash of Clans layouts up to date?", answer: "We strive to keep our base layouts updated with the latest meta and game balance changes. We regularly review and add new, effective designs. For real-world use, always consider the current game balance." },
  { question: "What does 'Hybrid' base type mean?", answer: "A Hybrid base is designed to be effective for multiple purposes, typically offering a balance between protecting resources (like a Farming base) and defending against attacks in Clan Wars or trophy pushing (like a War or Trophy base). They are good all-rounders but may not be as specialized as a dedicated base type." },
  { question: "How often are new layouts added?", answer: "We aim to add new layouts frequently, especially after major game updates or when new strategies emerge in the Clash of Clans community. Our goal is to provide a fresh and relevant selection of coc bases." },
  { question: "Can I submit my own base layout?", answer: "Currently, we do not have a direct submission system on the website. However, we are always looking for top-performing layouts. You can share your designs on popular Clash of Clans forums or communities, and our team might discover them!" },
  { question: "What are 'Anti 2 Star' or 'Anti 3 Star' tags?", answer: "'Anti 2 Star' bases are designed to make it very difficult for an attacker to achieve a 2-star victory, often by protecting the Town Hall heavily. 'Anti 3 Star' bases focus on preventing a complete 3-star destruction, often by spreading out key defenses and making pathing difficult, even if the Town Hall is more accessible." },
];

export const townHallInfo = {
  5: { new: "Spell Factory, first Dark Elixir Drill.", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  6: { new: "Dark Spell Factory, second Dark Elixir Drill.", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  7: { new: "Barbarian King, Dark Barracks, Hidden Teslas.", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  8: { new: "Second Dark Barracks, Golem, Valkyrie.", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  9: { new: "Archer Queen, X-Bows, Lava Hound.", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  10: { new: "Inferno Towers, Bowler, Miner.", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  11: { new: "Grand Warden, Eagle Artillery, Electro Dragon.", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  12: { new: "Siege Workshop, Giga Tesla (TH weapon).", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  13: { new: "Royal Champion, Scattershots, Giga Inferno.", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  14: { new: "Pet House, Battle Builders, Giga Inferno (Poison Bomb).", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  15: { new: "Monolith, Spell Towers, Giga Inferno (Area Damage).", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  16: { new: "Ricochet Cannon, Multi-Archer Tower, Giga Inferno (Upgraded).", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
  17: { new: "Placeholder: Exciting new defenses and troops!", imageUrl: "https://images.unsplash.com/photo-1703866573385-778b8ef08290" },
};

export const builderHallInfo = {
  4: { new: "Guard Post, Clock Tower.", imageUrl: "https://images.unsplash.com/photo-1658204212985-e0126040f88f" },
  5: { new: "Battle Machine, Multi Mortar.", imageUrl: "https://images.unsplash.com/photo-1658204212985-e0126040f88f" },
  6: { new: "Roaster, Night Witch.", imageUrl: "https://images.unsplash.com/photo-1658204212985-e0126040f88f" },
  7: { new: "Giant Cannon, Drop Ship.", imageUrl: "https://images.unsplash.com/photo-1658204212985-e0126040f88f" },
  8: { new: "Mega Tesla, Super Pekka.", imageUrl: "https://images.unsplash.com/photo-1658204212985-e0126040f88f" },
  9: { new: "Lava Launcher, Hog Glider, O.T.T.O Hut.", imageUrl: "https://images.unsplash.com/photo-1658204212985-e0126040f88f" },
  10: { new: "X-Bow (Builder Base), Battle Copter, Electrofire Wizard.", imageUrl: "https://images.unsplash.com/photo-1658204212985-e0126040f88f" },
};

export const aboutUsContent = {
  title: "About COC Bases Layouts",
  paragraphs: [
    "Welcome to COC Bases Layouts, your ultimate destination for the best Clash of Clans base designs and strategies! Our mission is to provide Clashers of all levels with top-tier, meticulously tested layouts that help you defend your village, dominate in wars, and climb the trophy ladder with confidence.",
    "Founded by a team of passionate Clash of Clans veterans, we understand that a solid base is the cornerstone of success. A well-designed layout can be the difference between a glorious victory and a crushing defeat. That's why we dedicate ourselves to creating new, innovative layouts and rigorously testing existing popular designs. We analyze attack replays, identify weaknesses, and make crucial adjustments to ensure our bases offer the most efficient defense against current meta strategies.",
    "Our collection includes CWL/War Bases, Trophy Pushing Bases, Farming Bases, and Hybrid Bases, all optimized for peak performance. Beyond just layouts, we provide insights into Hero Loadouts, Attack Strategies, and Pet Combinations to give you a comprehensive competitive edge.",
    "We are constantly updating our database with new and refined Clash of Clans layouts, ensuring you always have access to the freshest and most effective designs. Whether you're a seasoned pro seeking cutting-edge strategies or a new player learning the art of base building, COC Bases Layouts is here to support your journey to becoming a Clash legend.",
    "Thank you for choosing us as your trusted source for coc bases and clash of base designs. Clash On!"
  ],
  stats: [
    { label: "Layouts Available", value: `${bases.length + builderBases.length}+` },
    { label: "Years Clashing", value: "8+" },
    { label: "Happy Users", value: "100K+" },
  ]
};
