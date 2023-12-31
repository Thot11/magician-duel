import { useEffect, useState, useCallback } from "react";
import { PlayerType, PlayersType, SpellStatus } from "../types/model";
import styled, { keyframes } from "styled-components";
import Player from "./player";

const PlaygroundContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  color: white;
`

const PlayersWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PlayerName = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`

const PlayerLastSpell = styled.div`
  font-style: italic;
  margin-bottom: 10px;
`

type CurrentSpellType = {
  $spellStatus: SpellStatus
  $bounce: boolean
}

const bounceAnimation = keyframes`
  0% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
  37% {
    transform: translateX(5px);
    timing-function: ease-out;
  }
  55% {
    transform: translateX(-5px);
    timing-function: ease-in;
  }
  73% {
    transform: translateX(4px);
    timing-function: ease-out;
  }
  82% {
    transform: translateX(-4px);
    timing-function: ease-in;
  }
  91% {
    transform: translateX(2px);
    timing-function: ease-out;
  }
  96% {
    transform: translateX(-2px);
    timing-function: ease-in;
  }
  100% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
`;

const CurrentSpell = styled.div<CurrentSpellType>`
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  width: fit-content;
  color: ${props => props.$spellStatus};

  animation-name: ${(props => props.$bounce && bounceAnimation)};
  animation-duration: 0.3s;
`

type PlaygroundProps = {
  players: PlayersType
  myID: string
  spellName: string
  spellStatus: SpellStatus
}

const Playground = ({ players, myID, spellName, spellStatus }: PlaygroundProps) => {
  const [isBouncing, setIsBouncing] = useState<boolean>(false)

  const sortByMyIDFirst = () => (playerA: PlayerType, playerB: PlayerType) => {
    if (playerA.socketId === myID) {
      return -1;
    } else if (playerB.socketId === myID) {
      return 1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (spellStatus === SpellStatus.MISSED) {
      setIsBouncing(true)
    }
  }, [spellStatus])

  return (
    <PlaygroundContainer>
      <CurrentSpell onAnimationEnd={() => setIsBouncing(false)} $bounce={isBouncing} $spellStatus={spellStatus}>Spell en cours (ne le ratez pas): {spellName}</CurrentSpell>
      <PlayersWrapper>
        {Object.values(players).sort(sortByMyIDFirst()).map((player, index) => {
          return (
            <PlayerContainer key={index}>
              <PlayerName>{player.username}</PlayerName>
              <PlayerLastSpell>Dernier spell: {player.lastSpell}</PlayerLastSpell>
              <Player player={player.playerStats} />
            </PlayerContainer>
          )
        })}

      </PlayersWrapper>
    </PlaygroundContainer>
  );
}

export default Playground;
