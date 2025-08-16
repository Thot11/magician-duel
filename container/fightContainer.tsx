import { useEffect, useState, useCallback } from "react";
import { Spells, allSpells, SpellStatus } from "../types/model";
import styled from "styled-components";
import Playground from "../components/playground";
import useFightSocket from "../hooks/useFightSocket";

const FightMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const WaitingPlayers = styled.div`
  color: white;
`

const LOCKED_TIMER = 500

const FightContainer = () => {
  const [username, setUsername] = useState<string | null>(null);
  
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || 'Anonymous');
  }, []);

  const { players, myID, winner, status, sendSpell } = useFightSocket({ pseudo: username || 'Anonymous' })

  const [spellName, setSpellName] = useState<string | Spells>('');
  const [spellStatus, setSpellStatus] = useState<SpellStatus>(SpellStatus.CHANNELING)
  const [lockSpell, setLockSpell] = useState<boolean>(false)

  const clearSpell = () => {
    setLockSpell(true)
    setTimeout(() => {
      setSpellName('')
      setSpellStatus(SpellStatus.CHANNELING)
      setLockSpell(false)
    }, LOCKED_TIMER)
  }

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (players && !winner) {
        if (lockSpell) {
          return;
        }

        if (e.key.length === 1) {
          setSpellName((prevState) => prevState + e.key);
        }

        if (e.key === "Enter") {
          if (allSpells.includes(spellName as Spells)) {
            sendSpell(spellName as Spells).then(() => {
              setSpellStatus(SpellStatus.SENT)
              clearSpell()
            }).catch(() => {
              setSpellStatus(SpellStatus.MISSED)
              clearSpell()
            })
          } else {
            setSpellStatus(SpellStatus.MISSED)
            clearSpell()
          }
        }
      }
    },
    [spellName, lockSpell, players, winner, sendSpell],
  );

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

  if (!username) {
    return <WaitingPlayers>Loading user...</WaitingPlayers>;
  }

  if (winner) {
    const winnerPlayer = players?.find(p => p.id === winner);
    return <WaitingPlayers>{winnerPlayer ? `${winnerPlayer.pseudo} won!` : 'Game Over'}</WaitingPlayers>
  }

  return (
    <FightMainContainer>
      {players && myID ? (
        <Playground players={players} myID={myID} spellName={spellName} spellStatus={spellStatus} />
      ) : (
        <WaitingPlayers>{status || 'Connecting...'}</WaitingPlayers>
      )}
    </FightMainContainer>
  );
}

export default FightContainer;
