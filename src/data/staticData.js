
export const townHallData = [
  { id: 'th17', level: 17, layoutsAvailable: 25, imageUrl: '/assets/town-halls/TH17.png', description: 'Ultimate defenses for the highest Town Hall level.' },
  { id: 'th16', level: 16, layoutsAvailable: 30, imageUrl: '/assets/town-halls/TH16.png', description: 'Cutting-edge strategies for near-max players.' },
  { id: 'th15', level: 15, layoutsAvailable: 40, imageUrl: '/assets/town-halls/TH15.png', description: 'Advanced base designs for competitive play.' },
  { id: 'th14', level: 14, layoutsAvailable: 45, imageUrl: '/assets/town-halls/TH14.png', description: 'Solid layouts for experienced Clashers.' },
  { id: 'th13', level: 13, layoutsAvailable: 50, imageUrl: '/assets/town-halls/TH13.png', description: 'Master Scattershots with these bases.' },
  { id: 'th12', level: 12, layoutsAvailable: 55, imageUrl: '/assets/town-halls/TH12.png', description: 'Defend against Siege Machines effectively.' },
  { id: 'th11', level: 11, layoutsAvailable: 60, imageUrl: '/assets/town-halls/TH11.png', description: 'Eagle Artillery focused base designs.' },
  { id: 'th10', level: 10, layoutsAvailable: 50, imageUrl: '/assets/town-halls/TH10.png', description: 'Inferno Tower strategies for TH10.' },
  { id: 'th9', level: 9, layoutsAvailable: 45, imageUrl: '/assets/town-halls/TH9.png', description: 'Unlock X-Bows and Archer Queen tactics.' },
  { id: 'th8', level: 8, layoutsAvailable: 40, imageUrl: '/assets/town-halls/TH8.png', description: 'Solid bases for mid-level players.' },
  { id: 'th7', level: 7, layoutsAvailable: 35, imageUrl: '/assets/town-halls/TH7.png', description: 'Introduce Dark Elixir and Barbarian King.' },
  { id: 'th6', level: 6, layoutsAvailable: 30, imageUrl: '/assets/town-halls/TH6.png', description: 'Early game defensive setups.' },
  { id: 'th5', level: 5, layoutsAvailable: 25, imageUrl: '/assets/town-halls/TH5.png', description: 'Beginner friendly base designs.' },
];

export const builderHallData = [
  { id: 'bh10', level: 10, layoutsAvailable: 20, imageUrl: '/assets/builder-halls/BH10.png', description: 'Master Builder Hall 10 with these layouts.' },
  { id: 'bh9', level: 9, layoutsAvailable: 25, imageUrl: '/assets/builder-halls/BH9.png', description: 'Strong defenses for Builder Hall 9.' },
  { id: 'bh8', level: 8, layoutsAvailable: 30, imageUrl: '/assets/builder-halls/BH8.png', description: 'Effective BH8 base designs.' },
  { id: 'bh7', level: 7, layoutsAvailable: 25, imageUrl: '/assets/builder-halls/BH7.png', description: 'Solid layouts for Builder Hall 7.' },
  { id: 'bh6', level: 6, layoutsAvailable: 20, imageUrl: '/assets/builder-halls/BH6.png', description: 'Defensive strategies for BH6.' },
  { id: 'bh5', level: 5, layoutsAvailable: 15, imageUrl: '/assets/builder-halls/BH5.png', description: 'Mid-level Builder Hall bases.' },
  { id: 'bh4', level: 4, layoutsAvailable: 10, imageUrl: '/assets/builder-halls/BH4.png', description: 'Beginner Builder Hall layouts.' },
];

const generateBase = (id, level, type, isBuilderBase = false, specificTags = []) => {
  const levelPrefix = isBuilderBase ? "BH" : "TH";
  const defaultImageUrl = isBuilderBase 
    ? (level >= 8 ? 'https://images.unsplash.com/photo-1697256200022-f61abccad430' : 'https://images.unsplash.com/photo-1578466455317-bb6b531fba83')
    : (level >= 13 ? 'https://images.unsplash.com/photo-1654630106961-955f61257d8f' : 'https://images.unsplash.com/photo-1578466455317-bb6b531fba83');
  const baseName = `${levelPrefix}${level} ${type} Base #${id}`;
  const allTags = ["Link", ...specificTags];


  return {
    id: `${levelPrefix.toLowerCase()}${level}-${type.toLowerCase().replace(/[\s/]+/g, '-')}-${id}`,
    name: baseName,
    [isBuilderBase ? "builderHallLevel" : "townHallLevel"]: level,
    type: type,
    imageUrls: [
      defaultImageUrl, 
      "https://images.unsplash.com/photo-1508672155910-c3e05089393a", 
      "https://images.unsplash.com/photo-1578466455317-bb6b531fba83"
    ],
    videoUrl: null, 
    description: `This is a ${type} base design for ${levelPrefix} ${level}. It is designed to counter popular attack strategies. ${baseName} is a great choice for Clash of Clans layouts and coc bases.`,
    copyLink: `https://link.clashofclans.com/en?action=OpenLayout&id=${levelPrefix}${level}:${type.replace(/\s+/g,'')}:xxxxxxxxxxxx${id}`,
    tags: allTags,
    views: Math.floor(Math.random() * 500) + 500, 
    likes: Math.floor(Math.random() * 121) + 80,  
    rating: (Math.random() * 1.1 + 3.9).toFixed(1), 
    downloads: Math.floor(Math.random() * 100) + 70, 
    strengths: ["Anti-Air", "Good Trap Placement"],
    weaknesses: ["Vulnerable to Queen Charge", "Specific funneling can break it"],
    createdBy: "User" + Math.floor(Math.random() * 1000),
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    whatsNew: isBuilderBase 
      ? `Builder Hall ${level} introduces new defensive capabilities and troop upgrades, focusing on compact and tricky base designs. Key defenses include the ${level >=6 ? "Roaster" : "Crusher"}.`
      : `Town Hall ${level} unlocks powerful new defenses like the ${level >= 13 ? "Scattershot and Monolith" : (level >=11 ? "Eagle Artillery" : (level >= 10 ? "Inferno Towers" : "X-Bows"))}, and offensive upgrades. Base building at TH${level} is crucial for protecting resources and winning wars.`
  };
};

export let allBases = [];
let baseIdCounter = 1;

townHallData.forEach(th => {
  const types = ["CWL/War Bases", "Trophy Bases", "Farming Bases", "Hybrid Bases"];
  const commonTags = ["Anti 2 Star", "Anti 3 Star", "Anti Air / Electro", "Anti Trophy"];
  types.forEach(type => {
    for (let i = 0; i < 5; i++) { 
      allBases.push(generateBase(baseIdCounter++, th.level, type, false, commonTags.sort(() => 0.5 - Math.random()).slice(0, 2)));
    }
  });
});

builderHallData.forEach(bh => {
  const types = ["Defense Bases", "Trophy Bases"];
  const commonTags = ["Anti 3 Star", "Anti Trophy"];
  types.forEach(type => {
    for (let i = 0; i < 5; i++) { 
      allBases.push(generateBase(baseIdCounter++, bh.level, type, true, commonTags.sort(() => 0.5 - Math.random()).slice(0,1)));
    }
  });
});


export const heroes = [
  { 
    id: 'bk', 
    name: 'Barbarian King', 
    description: 'The Barbarian King is a mighty warrior, excelling at tanking damage and clearing buildings with his powerful attacks.',
    imageUrl: 'https://images.unsplash.com/photo-1578466455317-bb6b531fba83', 
    equipment: [
      { name: 'Barbarian Puppet', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Rage Vial', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Earthquake Boots', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Vampstache', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' }
    ],
    details: 'The Barbarian King is the first Hero unlocked. His high health pool makes him an excellent tank, capable of absorbing significant damage while other troops deal damage. His Iron Fist ability summons Barbarians and grants him a rage effect, increasing his damage and speed.'
  },
  { 
    id: 'aq', 
    name: 'Archer Queen', 
    description: 'The Archer Queen is a deadly ranged attacker, capable of picking off defenses from afar and dealing high damage.',
    imageUrl: 'https://images.unsplash.com/photo-1578466455317-bb6b531fba83', 
    equipment: [
      { name: 'Archer Puppet', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Invisibility Vial', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Giant Arrow', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Healer Puppet', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' }
    ],
    details: 'The Archer Queen is a versatile ranged Hero. Her Royal Cloak ability makes her invisible and summons Archers, allowing her to deal massive damage or take out key defenses. She is crucial for strategies like Queen Walks.'
  },
  {
    id: 'mp',
    name: 'Minion Prince',
    description: 'The Minion Prince is a placeholder hero. This hero would fly and attack with dark elixir based attacks.',
    imageUrl: 'https://images.unsplash.com/photo-1578466455317-bb6b531fba83', 
    equipment: [
      { name: 'Dark Puppet', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Shadow Vial', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' }
    ],
    details: 'The Minion Prince would be a powerful flying Hero, specializing in targeted aerial assaults and supporting ground troops by eliminating air defenses.'
  },
  { 
    id: 'gw', 
    name: 'Grand Warden', 
    description: 'The Grand Warden supports troops with his Life Aura and can make them temporarily invincible with his Eternal Tome ability.',
    imageUrl: 'https://images.unsplash.com/photo-1578466455317-bb6b531fba83', 
    equipment: [
      { name: 'Life Gem', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Eternal Tome', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Rage Gem', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Healing Tome', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' }
    ],
    details: 'The Grand Warden is a support Hero that can switch between ground and air mode. His Life Aura passively increases the health of nearby troops, and his Eternal Tome ability makes them immune to damage for a short period, which is game-changing in battles.'
  },
  { 
    id: 'rc', 
    name: 'Royal Champion', 
    description: 'The Royal Champion targets defenses with her Seeking Shield, capable of hitting multiple targets.',
    imageUrl: 'https://images.unsplash.com/photo-1578466455317-bb6b531fba83', 
    equipment: [
      { name: 'Seeking Shield', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Royal Gem', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Hog Rider Puppet', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' },
      { name: 'Haste Vial', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' }
    ],
    details: 'The Royal Champion is a defense-targeting Hero. Her Seeking Shield ability throws her shield, which bounces between defenses, dealing significant damage. She can also jump over walls, making her excellent for taking out key defensive structures.'
  },
  { 
    id: 'bm', 
    name: 'Battle Machine', 
    description: 'The Battle Machine is the primary hero in the Builder Base, smashing through defenses with its electric hammer.',
    imageUrl: 'https://images.unsplash.com/photo-1578466455317-bb6b531fba83', 
    equipment: [
      { name: 'Electric Hammer', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' }
    ],
    details: 'The Battle Machine is a melee Hero in the Builder Base. Its Electric Hammer ability recharges, allowing it to deal increased damage and regenerate health for three hits. It is crucial for tanking and destroying key defenses.'
  },
  { 
    id: 'bc', 
    name: 'Battle Copter', 
    description: 'The Battle Copter provides air support in the Builder Base, with a rapid-fire attack and a powerful Bomb Rush ability.',
    imageUrl: 'https://images.unsplash.com/photo-1578466455317-bb6b531fba83', 
    equipment: [
        { name: 'Bomb Rush', imageUrl: 'https://images.unsplash.com/photo-1508672155910-c3e05089393a' }
    ],
    details: 'The Battle Copter is a flying Hero in the Builder Base. It has a fast attack speed, making it effective against single targets. Its Bomb Rush ability allows it to dash forward and drop a powerful bomb, dealing area damage.'
  }
];

export const pets = [
  { 
    id: 'lassi', 
    name: 'L.A.S.S.I', 
    description: 'A loyal companion that jumps over walls to attack nearby targets, especially defenses.',
    imageUrl: 'https://images.unsplash.com/photo-1473509179290-435b45e983f4', 
    bestWith: ['Archer Queen', 'Royal Champion'],
    details: 'L.A.S.S.I (Loyal Aerial Support & Sabotage Instrument) is a ground-based Pet that can jump over Walls. It prioritizes attacking targets within a small radius of the Hero it is assigned to. L.A.S.S.I is excellent for helping Heroes take down nearby defenses or distracting single-target Inferno Towers.'
  },
  { 
    id: 'electro_owl', 
    name: 'Electro Owl', 
    description: 'A flying pet that zaps targets with chain lightning, prioritizing the Hero\'s target.',
    imageUrl: 'https://images.unsplash.com/photo-1473509179290-435b45e983f4', 
    bestWith: ['Grand Warden', 'Archer Queen'],
    details: 'The Electro Owl is a flying Pet that shoots a chained lightning attack, similar to an Electro Dragon. It prioritizes the Hero\'s target. Its ranged attack and ability to hit multiple targets make it a strong support Pet, especially when paired with ranged Heroes.'
  },
  { 
    id: 'mighty_yak', 
    name: 'Mighty Yak', 
    description: 'A powerful beast that helps clear walls and deals heavy damage to nearby buildings.',
    imageUrl: 'https://images.unsplash.com/photo-1473509179290-435b45e983f4', 
    bestWith: ['Barbarian King', 'Grand Warden'],
    details: 'The Mighty Yak is a ground-based Pet that deals high damage to Walls, helping create paths for the Hero and other troops. It also attacks other buildings. Its rage ability increases its damage and speed when its Hero takes damage, making it a strong tank and wall breaker.'
  },
  { 
    id: 'unicorn', 
    name: 'Unicorn', 
    description: 'A mystical creature that follows its Hero, providing healing support.',
    imageUrl: 'https://images.unsplash.com/photo-1473509179290-435b45e983f4', 
    bestWith: ['Archer Queen', 'Royal Champion', 'Barbarian King'],
    details: 'The Unicorn is a ground-based Pet that acts as a personal Healer for the Hero it is assigned to. It follows the Hero and continuously heals them. This makes Heroes significantly more survivable, especially in strategies like Queen Walks or King Dives.'
  },
  { 
    id: 'frosty', 
    name: 'Frosty', 
    description: 'Summons Frostmites that slow down enemy defenses and troops.',
    imageUrl: 'https://images.unsplash.com/photo-1473509179290-435b45e983f4', 
    bestWith: ['Grand Warden', 'Royal Champion'],
    details: 'Frosty is a ground-based Pet that spawns Frostmites. These Frostmites target defenses and slow down their attack speed. Frosty itself also has a ranged attack that slows targets. This Pet is excellent for reducing incoming damage and supporting pushes.'
  },
  { 
    id: 'diggy', 
    name: 'Diggy', 
    description: 'Burrows underground to stun and attack defenses, a great surprise element.',
    imageUrl: 'https://images.unsplash.com/photo-1473509179290-435b45e983f4', 
    bestWith: ['Royal Champion', 'Barbarian King'],
    details: 'Diggy is a ground-based Pet that burrows underground, making it invulnerable while moving. It pops up to attack defenses, stunning them briefly. This makes Diggy excellent for disabling key defenses like Inferno Towers or Scattershots, allowing troops to advance.'
  },
  { 
    id: 'poison_lizard', 
    name: 'Poison Lizard', 
    description: 'Assists the Hero by spitting slowing, poisonous projectiles at enemies, similar to Headhunters.',
    imageUrl: 'https://images.unsplash.com/photo-1473509179290-435b45e983f4', 
    bestWith: ['Archer Queen', 'Grand Warden'],
    details: 'The Poison Lizard is a ground-based Pet that acts like a ranged Headhunter. It targets enemy troops and Heroes, spitting poisonous projectiles that slow them down and deal damage over time. It is particularly effective at helping take down enemy Clan Castle troops or Heroes.'
  },
  { 
    id: 'phoenix', 
    name: 'Phoenix', 
    description: 'When its Hero is knocked out, Phoenix revives them for a short period with temporary invulnerability.',
    imageUrl: 'https://images.unsplash.com/photo-1473509179290-435b45e983f4', 
    bestWith: ['Barbarian King', 'Archer Queen', 'Royal Champion'],
    details: 'Phoenix is a flying Pet. When the Hero it is assigned to is knocked out, Phoenix sacrifices itself to revive the Hero for a few seconds, making them temporarily invulnerable. This can be a game-changer, allowing the Hero to deal extra damage or take out a key structure before going down for good.'
  }
];


export const attackStrategies = [
  {
    id: 'queen_charge_lavaloon',
    name: 'Queen Charge Lavaloon',
    townHall: 'TH9+',
    description: 'A powerful air strategy combining a Queen Walk/Charge with a Lavaloon attack.',
    troops: ['Archers', 'Wall Breakers', 'Healers', 'Lava Hounds', 'Balloons', 'Minions'],
    spells: ['Rage Spell', 'Freeze Spell', 'Poison Spell', 'Haste Spell'],
    details: `The Queen Charge Lavaloon is a versatile and potent strategy.
    Phase 1: Queen Charge
    - Deploy Archer Queen with 4-5 Healers.
    - Use Wall Breakers or Super Wall Breakers to open compartments for the Queen.
    - Funnel the Queen into the base to take out key objectives: Enemy Archer Queen, Clan Castle troops, Air Defenses, and ideally an Inferno Tower or Eagle Artillery.
    - Use Rage Spells on the Queen and Healers, especially when under heavy fire or to speed up clearing.
    - Use Freeze Spells on single-target Inferno Towers or high-damage defenses targeting the Queen.
    - Use Poison Spell on enemy Clan Castle troops.
    Phase 2: Lavaloon
    - Once key objectives are down, deploy Lava Hounds towards remaining Air Defenses. Spread them out.
    - Follow up with Balloons deployed surgically (2-3 per defense) behind the Lava Hounds.
    - Use Haste Spells to speed up Balloons towards defenses.
    - Use remaining Rage Spells on groups of Balloons, especially near high HP defenses or the Town Hall.
    - Use Freeze Spells on multi-target Inferno Towers, Wizard Towers, or the Town Hall weapon.
    - Minions are used for cleanup behind the Balloons.
    Key Considerations:
    - Pathing: Predict your Queen's path and the Lava Hounds' path carefully.
    - Funneling: Crucial for both the Queen Charge and the Lavaloon portion.
    - Spell Placement: Precise and timely spell usage is key.
    - Time Management: This is a complex attack that can run short on time if not executed efficiently.`,
  },
  {
    id: 'hybrid_hog_miner',
    name: 'Hybrid (Hog Miner)',
    townHall: 'TH10+',
    description: 'A ground strategy utilizing the synergy between Hog Riders and Miners.',
    troops: ['Miners', 'Hog Riders', 'Siege Barracks/Flame Flinger', 'Healers (for Queen Walk/Charge)', 'Wizards/Baby Dragon (for funneling)'],
    spells: ['Heal Spell', 'Rage Spell', 'Freeze Spell', 'Poison Spell'],
    details: `The Hybrid Hog Miner attack is a very strong ground strategy.
    Phase 1: Queen Walk/Charge or Sui Hero
    - Often starts with a Queen Walk/Charge to take out Clan Castle, enemy Queen/King, and key defenses like Inferno Towers or Scattershots. This creates pathing for the Hybrid portion.
    - Alternatively, use King and Queen (Sui Heroes) to create a funnel and take out a section of the base.
    Phase 2: Hybrid Deployment
    - Deploy Siege Barracks or Flame Flinger to help with funneling and tanking on one side.
    - Deploy Miners and Hog Riders together in a wide line or a focused group, depending on the base. They should move through the base together.
    - Grand Warden is crucial; set to ground mode and deploy with the Hybrid group. Use his Eternal Tome ability to protect them through heavy damage areas (e.g., Eagle Artillery shots, Scattershots, giant bombs).
    Phase 3: Spell Support
    - Use Heal Spells to keep Miners and Hog Riders alive through splash damage (Wizard Towers, Bomb Towers, multi-target Infernos, Scattershots). Try to cover both Miners and Hogs.
    - Use Rage Spells strategically, often with the Eternal Tome or to push through high HP areas.
    - Use Freeze Spells for single-target Infernos, Scattershots, or the Town Hall weapon.
    - Use Poison Spell for enemy CC troops or heroes.
    Key Considerations:
    - Funneling: Extremely important to guide the Hybrid deep into the base.
    - Pathing: Understand how defenses will pull your troops.
    - Heal Spell Placement: Anticipate where troops will take damage.
    - Warden Ability Timing: Critical for maximizing troop survival.`,
  },
  {
    id: 'blizzard_lavaloon',
    name: 'Blizzard Lavaloon',
    townHall: 'TH11+',
    description: 'Uses a Battle Blimp with Super Wizards to destroy a core section, followed by Lavaloon.',
    troops: ['Super Wizards', 'Lava Hounds', 'Balloons', 'Invisibility Spell Troops (e.g. 1 Rocket Loon, 1 regular Loon, rest Super Wizards in Blimp)'],
    spells: ['Rage Spell', 'Invisibility Spell', 'Freeze Spell', 'Haste Spell', 'Poison Spell'],
    details: `Blizzard Lavaloon is a high-skill, high-reward attack.
    Phase 1: Blizzard
    - Deploy Battle Blimp towards a key area, usually the Town Hall or a dense core of defenses.
    - Use a Lava Hound or Golem to tank for the Blimp if needed, or send it in raw (YOLO Blimp).
    - As the Blimp is about to reach its target or is taking heavy fire, activate it.
    - Immediately drop an Invisibility Spell on the Super Wizards as they emerge. Then drop a Rage Spell.
    - Chain Invisibility Spells to keep the Super Wizards hidden while they destroy the core. Aim for 4-5 Invisibility Spells. The goal is to take out the Town Hall, Clan Castle, Inferno Towers, Scattershots, etc.
    Phase 2: Lavaloon
    - Similar to standard Lavaloon. Deploy Lava Hounds towards remaining Air Defenses.
    - Follow with surgical Balloons.
    - Use Haste, Rage, and Freeze Spells as needed to support the Balloons.
    - Use Heroes (King, Queen, Royal Champion) for cleanup or to take out remaining defenses on the outside.
    Key Considerations:
    - Blimp Pathing: Ensure it reaches the target. Sweepers are a major threat.
    - Invisibility Spell Timing & Placement: This is the hardest part. Spells must be perfectly timed and placed to cover the Super Wizards but not the defenses they are targeting.
    - Target Selection: Choose a high-value area for the Blizzard.
    - Remaining Base: Ensure your Lavaloon portion can handle the rest of the base after the Blizzard.`,
  },
  {
    id: 'zap_dragons',
    name: 'Zap Dragons / DragBat',
    townHall: 'TH9-TH12 (Zap Dragons), TH10+ (DragBat)',
    description: 'Uses Lightning Spells to take out Air Defenses, then mass Dragons or Dragons with Bat Spells.',
    troops: ['Dragons', 'Balloons (often in CC or with Dragons)', 'Lightning Spell Troops (for Zap Quake variants)'],
    spells: ['Lightning Spell', 'Earthquake Spell (optional for ZapQuake)', 'Rage Spell', 'Freeze Spell', 'Bat Spell (for DragBat)'],
    details: `Zap Dragons / DragBat focuses on overwhelming air defenses.
    Zap Dragons:
    - Use Lightning Spells to destroy 2 or 3 Air Defenses (sometimes an Inferno Tower at TH10).
    - At TH9, 4 Lightning Spells per AD. At TH10, 5 Lightning Spells or 4 Lightning + 1 Earthquake per AD.
    - Deploy Dragons in a line or a V-shape to sweep through the base.
    - Use Rage Spells to power them through high HP areas or remaining ADs.
    - Use Freeze Spells on sweepers or single-target Infernos.
    - Heroes help funnel or take out an exposed AD.
    DragBat (TH10+):
    - Often involves a Queen Walk/Charge or Sui Heroes to take out one side of the base, including an Air Defense and Inferno Tower(s).
    - Deploy Dragons and Balloons from another side.
    - Once splash defenses (Wizard Towers, multi-target Infernos) are distracted or destroyed by Dragons/Heroes, deploy Bat Spells from an angle to overwhelm the remaining point defenses.
    - Use Rage Spells for Dragons, Freeze Spells for Wizard Towers or single Infernos protecting bats.
    Key Considerations:
    - AD Levels: Know how many Lightning Spells are needed.
    - Sweeper Position: Crucial for Dragon pathing.
    - Funneling: Essential to prevent Dragons from circling the base.
    - Bat Spell Pathing & Timing (for DragBat): Protect bats from splash damage. Wizard towers are the primary threat.`,
  },
  {
    id: 'smash_attacks_pekka_bowler_witch',
    name: 'Smash Attacks (GoBoWiPe, Pekka Smash)',
    townHall: 'TH9+',
    description: 'Ground-based attacks that use tanky troops and high DPS to overwhelm defenses.',
    troops: ['Golems', 'Pekkas', 'Bowlers', 'Witches', 'Wizards', 'Wall Breakers/Super Wall Breakers', 'Siege Machine (Wall Wrecker, Log Launcher)'],
    spells: ['Rage Spell', 'Heal Spell', 'Jump Spell', 'Freeze Spell', 'Poison Spell'],
    details: `Smash attacks aim to create a wide entry point and push through the core of the base.
    GoBoWiPe (Golem, Bowlers, Witches, Pekkas):
    - Create a funnel using King, Queen, Wizards, or Baby Dragons.
    - Deploy Golems (or Pekkas as tanks) followed by Witches, Bowlers, and Pekkas.
    - Use Wall Breakers or a Siege Machine (Wall Wrecker/Log Launcher) to open compartments.
    - Rage Spells to boost damage output through the core.
    - Heal Spells to sustain troops through splash damage.
    - Jump Spells to guide troops over walls into deeper compartments.
    - Freeze Spells for Inferno Towers or Eagle Artillery.
    Pekka Smash:
    - Similar concept but often uses more Pekkas and fewer Witches/Bowlers.
    - Can involve a Queen Walk to start.
    - Focuses on brute force and high DPS from Pekkas.
    - Yeti Smash (TH12+) is a variation using Yetis and YetiMites.
    Key Considerations:
    - Funneling: Absolutely critical. If the funnel fails, the attack likely fails.
    - Entry Point: Choose a side that gives access to key defenses and the Town Hall.
    - Spell Placement: Timely Rages and Heals are vital. Jump Spells must connect compartments correctly.
    - Siege Machine: Log Launcher is often preferred for its ability to open multiple layers.`,
  },
  {
    id: 'super_archer_blimp_hydra',
    name: 'Super Archer Blimp Hydra',
    townHall: 'TH13+',
    description: 'A strategy involving a Super Archer Blimp to clear a significant portion of the base, followed by a Hydra (Dragons and Dragon Riders) attack.',
    troops: ['Super Archers', 'Dragons', 'Dragon Riders', 'Balloons', 'Invisibility Spell Troops (e.g. 1 Rocket Loon, 1 regular Loon, rest Super Archers in Blimp)'],
    spells: ['Rage Spell', 'Invisibility Spell', 'Clone Spell (optional for SA Blimp)', 'Freeze Spell'],
    details: `This is a powerful strategy that relies on the Super Archer Blimp for massive value.
    Phase 1: Super Archer Blimp
    - Deploy Battle Blimp towards a high-value area (Town Hall, core defenses like Monolith, Spell Towers, multiple Infernos/Scattershots).
    - Tank for the Blimp if necessary (e.g., Lava Hound, Golem, Ice Golem).
    - Upon reaching the target, deploy Super Archers.
    - Use Rage Spell and chain Invisibility Spells to keep Super Archers alive and destroying targets.
    - A Clone Spell can be used on the Super Archers for even more destructive power if space allows or Town Hall is the main target.
    Phase 2: Hydra Attack
    - Deploy Dragons and Dragon Riders, usually spread out, to take on the remaining parts of the base.
    - Grand Warden (air mode) should accompany the Hydra. Use Eternal Tome ability to protect them through heavy damage.
    - Use Balloons (often with Heroes or as part of the main push) to target remaining defenses.
    - Use Rage Spells for the Hydra push.
    - Use Freeze Spells for critical defenses like single-target Infernos, Air Defenses, or Monolith.
    - Heroes (King, Queen, Royal Champion) are typically used for funneling, cleanup, or taking out specific defenses.
    Key Considerations:
    - Blimp Value: The success heavily depends on how much the Super Archer Blimp destroys.
    - Invisibility and Rage Timing: Crucial for Super Archer survival and damage output.
    - Sweeper Awareness: Air Sweepers can push the Blimp off course.
    - Hydra Pathing: Ensure the Dragons and Dragon Riders cover the remaining base effectively.`,
  },
];

export const faqData = [
  {
    question: "What are Clash of Clans layouts?",
    answer: "Clash of Clans layouts, or coc bases, are the specific arrangements of buildings and defenses within a player's village. A good layout is crucial for defending against enemy attacks, protecting resources, and winning wars."
  },
  {
    question: "How often should I change my base layout?",
    answer: "It's a good idea to check for new layouts or adapt your current one after major game updates, when you upgrade your Town Hall, or if you notice you're consistently being defeated by certain attack strategies. Clashofclanslayouts.com provides updated bases regularly."
  },
  {
    question: "What is the difference between War, Farming, and Trophy bases?",
    answer: "War Bases prioritize protecting your Town Hall and defenses to prevent stars. Farming Bases focus on protecting your resources (Gold, Elixir, Dark Elixir). Trophy Bases aim to protect the Town Hall to gain or maintain trophies, often a hybrid between war and farming."
  },
  {
    question: "How do I copy a base layout link?",
    answer: "Most base sharing websites, including ours, provide a 'Copy Link' or 'Download Base' button. Clicking this will usually open Clash of Clans directly and prompt you to save the layout in one of your village editor slots."
  },
  {
    question: "What makes a good Town Hall [X] base?",
    answer: "A good base for any Town Hall level generally has: well-protected key defenses (like Inferno Towers, Eagle Artillery, Scattershots for higher THs), good trap placement, compartments to slow down attackers, centralized Clan Castle, and defenses that cover each other. Specifics vary by TH level and meta."
  },
  {
    question: "Are these layouts free to use?",
    answer: "Yes, all base layouts shared on Clashofclanslayouts.com are free to use. We aim to provide the Clash of Clans community with the best coc bases without any cost."
  },
  {
    question: "What are 'Anti 3 Star' or 'Anti 2 Star' bases?",
    answer: "'Anti 3 Star' bases are designed to make it very difficult for an attacker to get a 3-star victory, often by spreading out defenses, using tricky trap placements, and protecting the Town Hall well, even if it means giving up a 2-star. 'Anti 2 Star' bases are more common in lower Town Hall levels or specific trophy pushing scenarios, aiming to prevent even a 2-star by heavily protecting the Town Hall."
  },
  {
    question: "How can I find layouts for a specific Town Hall or Builder Hall level?",
    answer: "You can use the navigation menu or the category sections on our homepage. We have dedicated pages for each Town Hall (e.g., TH17, TH16, etc.) and Builder Hall level (e.g., BH10, BH9, etc.) that list various coc bases."
  },
  {
    question: "Do you have guides for attack strategies?",
    answer: "Yes, we have an 'Attack Strategy' section where we break down popular and effective attack strategies for different Town Hall levels. These guides include troop compositions, spell placements, and execution tips."
  },
  {
    question: "What is the best way to use Hero Equipments?",
    answer: "The 'Hero Loadout' section on our site provides insights into the best Hero Equipment combinations for different heroes and attack styles. Choosing the right equipment can significantly boost your hero's effectiveness in battle."
  }
];
