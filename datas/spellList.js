const spellList = {
  fireball: {
    name: 'fireball',
    type: 'attack',
    damage: 6,
    shield: 0,
    elementalShield: 0,
    attribut: 'fire',
  },
  firewall: {
    name: 'firewall',
    type: 'defense',
    damage: 0,
    shield: 3,
    elementalShield: 3,
    attribut: 'fire',
  },
  waterwave: {
    name: 'waterwave',
    type: 'attack',
    damage: 6,
    shield: 0,
    elementalShield: 0,
    attribut: 'water',
  },
  earthwave: {
    name: 'earthwave',
    type: 'attack',
    damage: 6,
    shield: 0,
    elementalShield: 0,
    attribut: 'earth',
  },
  windslash: {
    name: 'windslash',
    type: 'attack',
    damage: 6,
    shield: 0,
    elementalShield: 0,
    attribut: 'wind',
  }
}

const player = {
  health: 50,
  shield: 50,
  fireShield: 0,
  waterShield: 0,
  windShield: 0,
  earthShield: 0,
  spellBook: spellList,
}
const enemy = {
  health: 50,
  shield: 50,
  fireShield: 0,
  waterShield: 0,
  windShield: 0,
  earthShield: 0,
  spellBook: spellList,
}

const element = {
  fire: {
    weakness: 'earth',
    strongness: 'water',
  },
  water: {
    weakness: 'fire',
    strongness: 'earth',
  },
  earth: {
    weakness: 'water',
    strongness: 'fire',
  },
  wind: {
    weakness: 'fire',
    strongness: 'water',
  },
}


export { spellList, player, element, enemy };