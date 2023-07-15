import Head from 'next/head'
import styled from "styled-components"
import Player from '../components/player'

import { useEffect, useState, useCallback } from "react";
import Enemy from '../components/enemy';
import { player, enemy, spellList, element } from '../datas/spellList';
import Header from '../components/header';

// Type d'utilisation styled
const FightSceneContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #050022 0%, #0A0047 100%);
`;


export default function FightScene() {

  const playerOne = player;
  const playerTwo = enemy;

  
  const [spellName, setSpellName] = useState('')
  const [spellExecuted, setSpellExecuted] = useState({});

  const handleKeyPress = useCallback((e) => {
    if(e.key.length === 1) {
      setSpellExecuted(undefined);
      setSpellName(spellName + e.key)
    }
    if(e.key === 'Enter') {
      setSpellExecuted(spellList[spellName]);
      setSpellName('')
    }
  }, [spellName]);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress])

  const attackPlayer = ({victime, attribut, damage}) => {
    const totalDamage = damage - (victime.shield - victime[`${attribut}Shield`]) > 0 ? damage - (victime.shield - victime[`${attribut}Shield`]) : 0;
    if (totalDamage > 0) {
      if (victime.shield > 0) {
        victime.health = victime.health - (totalDamage - victime.shield);
        victime.shield = 0;
      }
      else {
        victime.health = victime.health - totalDamage;
      }
    }
    else {
      victime.shield -= damage;
    }
  }

  const shieldUp = ({elementalShield, shield, attribut}) => {
    playerOne.shield += shield;
    playerOne[`${attribut}Shield`] += elementalShield;
    playerOne[`${element[attribut].weakness}Shield`] -= elementalShield
  }

  useEffect(() => {
    if (spellExecuted?.type === 'attack') {
      attackPlayer({victime: playerTwo, attribut: spellExecuted.attribut, damage: spellExecuted.damage})
    }
    if (spellExecuted?.type === 'defense') {
      shieldUp({elementalShield: spellExecuted.elementalShield, attribut: spellExecuted.attribut, shield: spellExecuted.shield})
    }
  }, [spellExecuted])

  return (
    <div>
      <Head>
        <title>Magician Duel</title>
        <meta name="description" content="Jeu de duel de magicien - Youpi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {/* <FightSceneContainer> */}
      <main className='fightSceneContainer'>
        <div className="playerWrapper">
          <div className="spellName">{spellName}</div>
          <div className="playerBody" />
          <div className="statsContainer">
            <p>{playerOne.health} <span>HP</span> </p>
            <p>{playerOne.shield} <span>SH</span></p>
            <p>{playerOne.fireShield} <span>FS</span></p>
            <p>{playerOne.waterShield} <span>WS</span></p>
            <p>{playerOne.earthShield} <span>HS</span></p>
            <p>{playerOne.windShield} <span>WS</span></p>
          </div>
        </div>
        <div className="enemyWrapper">
          <div className="spellName">aie</div>
          <div className="playerBody" />
          <div className="statsContainer">
            <p>{playerTwo.health} <span>HP</span> </p>
            <p>{playerTwo.shield} <span>SH</span></p>
            <p>{playerTwo.fireShield} <span>FS</span></p>
            <p>{playerTwo.waterShield} <span>WS</span></p>
            <p>{playerTwo.earthShield} <span>HS</span></p>
            <p>{playerTwo.windShield} <span>WS</span></p>
          </div>
        </div>
      </main>  
      {/* </FightSceneContainer> */}

      <footer >
      </footer>
    </div>
  )
}
