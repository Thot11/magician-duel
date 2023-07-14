import Head from 'next/head'
import Player from '../components/player'

import { useEffect, useState, useCallback } from "react";
import Enemy from '../components/enemy';
import { player, spellList } from '../datas/spellList';

export default function FightScene() {

  const playerOne = player;
  const playerTwo = player;

  
  const [spellName, setSpellName] = useState('')
  const [spellExecuted, setSpellExecuted] = useState('');

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

  const attackPlayer = ({player, attribut, damage}) => {
    const totalDamage = damage - (player.shield - player[`${attribut}Shield`]) > 0 ? damage - (player.shield - player[`${attribut}Shield`]) : 0;
    if (totalDamage > 0) {
      if (player.shield > 0) {
        player.health = player.health - (totalDamage - player.shield);
        player.shield = 0;
      }
      else {
        player.health = player.health - totalDamage;
      }
    }
    else {
      player.shield -= damage;
    }
  }

  useEffect(() => {
    if (spellExecuted?.type === 'attack') {
      attackPlayer({player: playerTwo, attribut: spellExecuted.attribut, damage: spellExecuted.damage})
    }
  }, [spellExecuted])

  return (
    <div>
      <Head>
        <title>Magician Duel</title>
        <meta name="description" content="Jeu de duel de magicien - Youpi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='fightSceneContainer'>
        <div className="playerWrapper">
          <div className="statsContainer">
            <p>{playerOne.health}</p>
            <p>{playerOne.shield}</p>
            <p>{playerOne.fireShield}</p>
            <p>{playerOne.waterShield}</p>
            <p>{playerOne.earthShield}</p>
            <p>{playerOne.windShield}</p>
          </div>
        </div>
        <div className="enemyWrapper">
          <div className="statsContainer">
            <p>{playerTwo.health}</p>
            <p>{playerTwo.shield}</p>
            <p>{playerTwo.fireShield}</p>
            <p>{playerTwo.waterShield}</p>
            <p>{playerTwo.earthShield}</p>
            <p>{playerTwo.windShield}</p>
          </div>
        </div>
      </main>

      <footer >
      </footer>
    </div>
  )
}
