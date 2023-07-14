import { useEffect, useState, useCallback } from "react";
import spellList from "../datas/spellList";


const Player = ({spellExecuted, setSpellExecuted}) => {

  const [spellName, setSpellName] = useState('')
  const [spellFinished, setSpellFinished] = useState('');

  const handleKeyPress = useCallback((e) => {
    // console.log(e.key);
    // console.log(spellName)
    if(e.key.length === 1) {      
      setSpellFinished('');
      setSpellExecuted(undefined);
      setSpellName(spellName + e.key)
    }
    if(e.key === 'Enter') {
      setSpellFinished(spellName);
      setSpellName('')
    }
  }, [spellName]);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress])
  
  useEffect(() => {
    console.log(spellName)
  }, [spellName])

  useEffect(() => {
    const indexOfSpell = spellList.findIndex(spell => spell.name === spellFinished);
      if(indexOfSpell > -1) {
        setSpellExecuted(spellList[indexOfSpell]);
      }
      else {
        setSpellExecuted(undefined);
      }
  }, [spellFinished])

  return (
    <div className="playerContainer">
      <p className="spellName">{spellFinished} {spellFinished !== '' && '!' }</p>

      {spellExecuted && spellExecuted.type === 'attack' && (
        <div className="spellSprite attackSprite" />
      )}

      {spellExecuted === undefined && spellFinished !== '' && (
        <div className="spellSprite errorMessage"> hm rien ne se passe </div>
      )}
    </div>
  );
};

export default Player;