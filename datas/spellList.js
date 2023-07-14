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
    type: 'attack',
    damage: 0,
    shield: 6,
    elementalShield: 3,
    attribut: 'fire',
  },
  waterwave: {
    name: 'waterwave',
    type: 'attack',
    damage: 0,
    shield: 6,
    elementalShield: 0,
    attribut: 'water',
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


export { spellList, player, element };