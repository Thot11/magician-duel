import Head from 'next/head'

import { useEffect, useState, useCallback } from "react";
import { player, enemy, spellList, element } from '../datas/spellList';
import SpellCard from '../components/spellCard'
import Header from '../components/header';

export default function spellBook() {

  const [attributFilters, setAttributFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);

  const handleFilter = ({filterList, filterName }) => {
    if (filterList === 'attribut') {
      const index = attributFilters.indexOf(filterName);
      if (index > -1) {
        setAttributFilters(attributFilters.splice(index, 1))
      }
      else {
        setAttributFilters([...attributFilters, filterName])
      }
    }
    else {
      const key = typeFilters.indexOf(filterName);
      
      if (key > -1) {
        setTypeFilters(typeFilters.splice(key, 1))
      }
      else {
        setTypeFilters([...typeFilters, filterName])
      }
    }
  }

  const handleEmptyFilters = () => {
    setAttributFilters([]);
    setTypeFilters([])
  }


  return (
    <div>
      <Head>
        <title>Magician Duel - Spellbook</title>
        <meta name="description" content="Jeu de duel de magicien - Youpi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className='spellBookContainer'>
        <div className="filters">
          <button className={attributFilters.includes('fire') && 'filterActive'} onClick={() => handleFilter({filterList: 'attribut', filterName: 'fire'})}>Feu</button>
          <button className={attributFilters.includes('water') && 'filterActive'}  onClick={() => handleFilter({filterList: 'attribut', filterName: 'water'})}>Eau</button>
          <button className={attributFilters.includes('wind') && 'filterActive'}  onClick={() => handleFilter({filterList: 'attribut', filterName: 'wind'})}>Vent</button>
          <button className={attributFilters.includes('earth') && 'filterActive'}  onClick={() => handleFilter({filterList: 'attribut', filterName: 'earth'})}>Terre</button>
          <span></span>
          <button className={typeFilters.includes('attack') && 'filterActive'}  onClick={() => handleFilter({filterList: 'type', filterName: 'attack'})}>Attaque</button>
          <button className={typeFilters.includes('defense') && 'filterActive'}  onClick={() => handleFilter({filterList: 'type', filterName: 'defense'})}>Défense</button>
          <button className={typeFilters.includes('buff') && 'filterActive'}  onClick={() => handleFilter({filterList: 'type', filterName: 'buff'})}>Buff</button>
          <button className={typeFilters.includes('debuff') && 'filterActive'}  onClick={() => handleFilter({filterList: 'type', filterName: 'debuff'})}>Débuff</button>
          <button onClick={handleEmptyFilters} className="btnReinitialize">Empty filters</button>
        </div>
        <div className="cardList">
          {Object.values(spellList).map((spell) => {
            if ((attributFilters.includes(spell.attribut) || attributFilters.length === 0) && (typeFilters.includes(spell.type) || typeFilters.length === 0)) {
              return (
                <SpellCard spell={spell} />
              )
            }
          })}
        </div>
      </main>

      <footer >
      </footer>
    </div>
  )
}
