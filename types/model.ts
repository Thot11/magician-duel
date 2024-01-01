// ENUMS

export enum Spells {
  FIREBALL = 'fireball',
  FIREWALL = 'firewall',
  WATERWAVE = 'waterwave',
  WATERWALL = 'waterwall',
  EARTHQUAKE = 'earthquake',
  EARTHWALL = 'earthwall',
  WINDSTRIKE = 'windstrike',
  WINDWALL = 'windwall',
}

export enum SpellStatus {
  SENT = 'green',
  MISSED = 'red',
  CHANNELING = 'white'
}

export enum SpellTypes {
  ATTACK = 'attack',
  DEFENSE = 'defense'
}

export enum Attributes {
  FIRE = 'fire',
  WATER = 'water',
  EARTH = 'earth',
  WIND = 'wind',
  PHYSICAL = 'physical'
}

export const attributeColors: { [key in Attributes]: string } = {
  [Attributes.FIRE]: "#FF4500", // orange-rougeâtre pour le feu
  [Attributes.WATER]: "#1E90FF", // bleu clair pour l'eau
  [Attributes.EARTH]: "#8B4513", // brun-terre pour la terre
  [Attributes.WIND]: "#ADD8E6", // gris léger pour le vent
  [Attributes.PHYSICAL]: "#696969" // gris foncé pour le physique
};

// CONST 

export const allSpells: string[] = [
  Spells.FIREBALL,
  Spells.FIREWALL,
  Spells.WATERWAVE,
  Spells.WATERWALL,
  Spells.EARTHQUAKE,
  Spells.EARTHWALL,
  Spells.WINDSTRIKE,
  Spells.WINDWALL,
];

export const elementalShields: Attributes[] = [
  Attributes.EARTH,
  Attributes.FIRE,
  Attributes.WIND,
  Attributes.WATER
]

export const element: ElementMap = {
  [Attributes.FIRE]: {
    weakness: [Attributes.WATER, Attributes.EARTH],
    strongness: [Attributes.WIND],
  },
  [Attributes.WATER]: {
    weakness: [Attributes.WIND],
    strongness: [Attributes.FIRE, Attributes.WATER],
  },
  [Attributes.EARTH]: {
    weakness: [Attributes.WATER],
    strongness: [Attributes.FIRE],
  },
  [Attributes.WIND]: {
    weakness: [Attributes.FIRE],
    strongness: [Attributes.WATER],
  },
  [Attributes.PHYSICAL]: {
  }
};

// TYPES

type ElementMap = {
  [key in Attributes]: ElementMapContent
};

export type ElementMapContent = {
  weakness?: Attributes[];
  strongness?: Attributes[];
}


export type Spell = {
  name: Spells,
  type: SpellTypes,
  damage: number,
  shields?: Record<Attributes, number | null>
  attribut: Attributes
}

export type PlayerStatsType = {
  health: number,
  shields: Record<Attributes, number>
}

export type PlayerType = {
  playerStats: PlayerStatsType,
  lastSpell: Spells | null,
  username: string,
  socketId: string
}

export type PlayersType = {
  [key: string]: PlayerType
}

export type RoomsType = {
  [key: string]: PlayersType
}