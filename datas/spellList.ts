import { Attributes, Spell, SpellTypes, Spells } from "../types/model";

type SpellsListType = {
  [key in Spells]: Spell;
};

export const SPELLS_LIST: SpellsListType = {
  [Spells.FIREBALL]: {
    name: Spells.FIREBALL,
    type: SpellTypes.ATTACK,
    damage: 6,
    attribut: Attributes.FIRE,
  },
  [Spells.FIREWALL]: {
    name: Spells.FIREWALL,
    type: SpellTypes.DEFENSE,
    damage: 0,
    shields: {
      [Attributes.PHYSICAL]: 3,
      [Attributes.FIRE]: 3,
      [Attributes.WATER]: 0,
      [Attributes.WIND]: 0,
      [Attributes.EARTH]: 0,
    },
    attribut: Attributes.FIRE,
  },
  [Spells.WATERWAVE]: {
    name: Spells.WATERWAVE,
    type: SpellTypes.ATTACK,
    damage: 6,
    attribut: Attributes.WATER,
  },
  [Spells.WATERWALL]: {
    name: Spells.WATERWALL,
    type: SpellTypes.DEFENSE,
    damage: 0,
    shields: {
      [Attributes.PHYSICAL]: 3,
      [Attributes.FIRE]: 0,
      [Attributes.WATER]: 3,
      [Attributes.WIND]: 0,
      [Attributes.EARTH]: 0,
    },
    attribut: Attributes.WATER,
  },
  [Spells.EARTHQUAKE]: {
    name: Spells.EARTHQUAKE,
    type: SpellTypes.ATTACK,
    damage: 6,
    attribut: Attributes.EARTH,
  },
  [Spells.EARTHWALL]: {
    name: Spells.EARTHWALL,
    type: SpellTypes.DEFENSE,
    damage: 0,
    shields: {
      [Attributes.PHYSICAL]: 3,
      [Attributes.FIRE]: 0,
      [Attributes.WATER]: 0,
      [Attributes.WIND]: 0,
      [Attributes.EARTH]: 3,
    },
    attribut: Attributes.EARTH,
  },
  [Spells.WINDSTRIKE]: {
    name: Spells.WINDSTRIKE,
    type: SpellTypes.ATTACK,
    damage: 6,
    attribut: Attributes.WIND,
  },
  [Spells.WINDWALL]: {
    name: Spells.WINDWALL,
    type: SpellTypes.DEFENSE,
    damage: 0,
    shields: {
      [Attributes.PHYSICAL]: 3,
      [Attributes.FIRE]: 0,
      [Attributes.WATER]: 0,
      [Attributes.WIND]: 3,
      [Attributes.EARTH]: 0,
    },
    attribut: Attributes.WIND,
  },
};

