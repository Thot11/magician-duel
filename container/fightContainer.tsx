import { useEffect, useState, useCallback, useMemo } from "react";
import { PlayerType, Spells, allSpells, SpellStatus } from "../types/model";
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

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

type FightContainerType = {
  roomName: string
}

const LOCKED_TIMER = 500


const FightContainer = ({ roomName }: FightContainerType) => {
  const username = useMemo(() => localStorage.getItem("username"), [])
  const { players, startAt, myID, sendSpell } = useFightSocket({ pseudo: username || '', roomName })

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
      if (startAt || (true && !lockSpell)) {
        // const isFightStarted = Date.now() - startAt;
        // if (isFightStarted < 0) {
        //   return;
        // }

        if (e.key.length === 1) {
          setSpellName((prevState) => prevState + e.key);
        }

        if (e.key === "Enter") {
          if (allSpells.includes(spellName)) {
            console.log('test1')
            sendSpell(spellName).then(() => {
              setSpellStatus(SpellStatus.SENT)
              clearSpell()
            }).catch((error) => {
              console.log('osecour', error)
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
    [spellName, roomName],
  );

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <FightMainContainer>
      {players && myID && Object.keys(players).length > 1 ? (
        <Playground players={players} myID={myID} spellName={spellName} spellStatus={spellStatus} />
      ) : (
        <WaitingPlayers>Waiting players... </WaitingPlayers>
      )}
    </FightMainContainer>
  );
}

export default FightContainer;
