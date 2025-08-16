import Head from "next/head";
import React, { useState } from "react";
import styled from "styled-components";
import { SPELLS_LIST } from "../datas/spellList";
import SpellCard from "../components/spellCard";
import Header from "../components/header";
import { Attributes, SpellTypes, Spell } from "../types/model";

const SpellBookContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 64px;
  background: linear-gradient(180deg, #050022 0%, #0a0047 100%);
`;

const Filters = styled.div`
  display: flex;
  align-items: center;

  span {
    width: 2px;
    height: 50px;
    background-color: white;
    margin: 0 48px 0 32px;
  }
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  margin-right: 16px;
  padding: 16px 32px;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ $isActive }) => ($isActive ? "white" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#0A0047" : "white")};
  transition: all 0.2s ease-in-out;
`;

const ResetButton = styled.button`
  border: 0;
  background: transparent;
  color: red;
  margin-left: 32px;
  padding: 16px 32px;
  cursor: pointer;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 16px;
  margin-top: 48px;
`;

const SpellBookPage = () => {
  const [attributFilters, setAttributFilters] = useState<Attributes[]>([]);
  const [typeFilters, setTypeFilters] = useState<SpellTypes[]>([]);

  const handleAttributFilter = (filterName: Attributes) => {
    setAttributFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((item) => item !== filterName)
        : [...prev, filterName]
    );
  };

  const handleTypeFilter = (filterName: SpellTypes) => {
    setTypeFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((item) => item !== filterName)
        : [...prev, filterName]
    );
  };

  const handleEmptyFilters = () => {
    setAttributFilters([]);
    setTypeFilters([]);
  };

  const filteredSpells = Object.values(SPELLS_LIST).filter((spell: Spell) => {
    const attributMatch = attributFilters.length === 0 || attributFilters.includes(spell.attribut);
    const typeMatch = typeFilters.length === 0 || typeFilters.includes(spell.type);
    return attributMatch && typeMatch;
  });

  return (
    <div>
      <Head>
        <title>MD - Spellbook</title>
        <meta name="description" content="Jeu de duel de magicien" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <SpellBookContainer>
        <Filters>
          <FilterButton $isActive={attributFilters.includes(Attributes.FIRE)} onClick={() => handleAttributFilter(Attributes.FIRE)}>Feu</FilterButton>
          <FilterButton $isActive={attributFilters.includes(Attributes.WATER)} onClick={() => handleAttributFilter(Attributes.WATER)}>Eau</FilterButton>
          <FilterButton $isActive={attributFilters.includes(Attributes.WIND)} onClick={() => handleAttributFilter(Attributes.WIND)}>Vent</FilterButton>
          <FilterButton $isActive={attributFilters.includes(Attributes.EARTH)} onClick={() => handleAttributFilter(Attributes.EARTH)}>Terre</FilterButton>
          <span />
          <FilterButton $isActive={typeFilters.includes(SpellTypes.ATTACK)} onClick={() => handleTypeFilter(SpellTypes.ATTACK)}>Attaque</FilterButton>
          <FilterButton $isActive={typeFilters.includes(SpellTypes.DEFENSE)} onClick={() => handleTypeFilter(SpellTypes.DEFENSE)}>Défense</FilterButton>
          <ResetButton onClick={handleEmptyFilters}>Réinitialiser</ResetButton>
        </Filters>
        <CardList>
          {filteredSpells.map((spell) => (
            <SpellCard key={spell.name} spell={spell} />
          ))}
        </CardList>
      </SpellBookContainer>
    </div>
  );
};

export default SpellBookPage;
