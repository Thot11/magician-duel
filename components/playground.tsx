import { useEffect, useState, useCallback } from "react";
import { Attributes, PlayerType, PlayersType, SpellStatus, Spells, attributeColors } from "../types/model";
import styled, { keyframes } from "styled-components";
import Player from "./player";
import { SPELLS_LIST } from "../datas/spellList";

const PlaygroundContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`

const PlayersWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
`

const FightScene = styled.div`
  background-image: url('/background.png');
  background-position: center; // Centrer l'image dans le conteneur
  background-repeat: no-repeat; // Empêcher la répétition de l'image
  background-size: contain;
  width: 714px;
  height: 335px;
  position: relative;
`

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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

const getPosition = (me?: boolean) => {
  if (me) {
    return `
      left: 200px;
      top: 168px;
    `
  } else {
    return `
      right: 200px;
      top: 168px;
      transform: scaleX(-1);
    `
  }
}

type MagicianType = {
  $me?: boolean;
}

const MagicianContainer = styled.div<MagicianType>`
  position: absolute;
  height: 90px;

  ${(props) => getPosition(props.$me)}
`

const Magician = styled.img`
  height: 100%;
`

type MagicianEffectType = {
  $color: string;
}

const MagicianEffect = styled.div<MagicianEffectType>`
  position: absolute;
  top: 17px;
  right: 18px;
  border-radius: 50%;
  box-shadow: 0 0 17px 12px ${(props) => props.$color};
  transition: box-shadow 0.2s ease;
`

const getElementFromSpellName = (spellName: Spells | null) => {
  if (!spellName) {
    return Attributes.FIRE
  }
  return SPELLS_LIST[spellName].attribut
}

const getMySpellColor = (spellStatus: SpellStatus, lastSpell: Spells | null) => {
  if (spellStatus === SpellStatus.CHANNELING) {
    return 'white'
  } else if (spellStatus === SpellStatus.MISSED) {
    return 'transparent'
  } else {
    return attributeColors[getElementFromSpellName(lastSpell)]
  }
}

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

  const removeMyID = () => (player: PlayerType) => {
    if (player.socketId === myID) {
      return false;
    }
    return true
  };

  useEffect(() => {
    if (spellStatus === SpellStatus.MISSED) {
      setIsBouncing(true)
    }
  }, [spellStatus])

  return (
    <PlaygroundContainer>
      <CurrentSpell onAnimationEnd={() => setIsBouncing(false)} $bounce={isBouncing} $spellStatus={spellStatus}>Spell en cours (ne le ratez pas): {spellName}</CurrentSpell>
      <FightScene>
        <MagicianContainer $me>
          <Magician src={'/magician.png'} />
          <MagicianEffect $color={getMySpellColor(spellStatus, players[myID].lastSpell)} />
        </MagicianContainer>
        {Object.values(players).filter(removeMyID()).map((player, index) => {
          return (
            <MagicianContainer key={index}>
              <Magician src={'/magician.png'} />
              <MagicianEffect $color={attributeColors[getElementFromSpellName(player.lastSpell)]} />
            </MagicianContainer>
          )
        })}
      </FightScene>
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
