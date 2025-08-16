import { useEffect, useState } from "react";
import { Attributes, Player, PlayersType, SpellStatus, Spells, attributeColors } from "../types/model";
import styled, { keyframes } from "styled-components";
import PlayerComponent from "./player";
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
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 714px;
  height: 335px;
  position: relative;
`

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;
`

const PlayerName = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`

const PlayerLastSpell = styled.div`
  font-style: italic;
  margin-bottom: 10px;
  height: 20px;
`

type CurrentSpellType = {
  $spellStatus: SpellStatus
  $bounce: boolean
}

const bounceAnimation = keyframes`
  0% { transform: translateX(0px); }
  37% { transform: translateX(5px); }
  55% { transform: translateX(-5px); }
  73% { transform: translateX(4px); }
  82% { transform: translateX(-4px); }
  91% { transform: translateX(2px); }
  96% { transform: translateX(-2px); }
  100% { transform: translateX(0px); }
`;

const CurrentSpell = styled.div<CurrentSpellType>`
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  width: fit-content;
  color: ${props => props.$spellStatus};
  animation: ${props => props.$bounce ? bounceAnimation : 'none'} 0.3s ease-in-out;
  height: 20px;
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

const getElementFromSpellName = (spellName: Spells | null | undefined) => {
  if (!spellName) {
    return Attributes.FIRE
  }
  return SPELLS_LIST[spellName].attribut
}

const getMySpellColor = (spellStatus: SpellStatus, lastSpell: Spells | null | undefined) => {
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

  const me = players.find(p => p.id === myID);
  const opponent = players.find(p => p.id !== myID);

  useEffect(() => {
    if (spellStatus === SpellStatus.MISSED) {
      setIsBouncing(true)
    }
  }, [spellStatus])

  if (!me || !opponent) {
    return <div>Waiting for player data...</div>;
  }

  return (
    <PlaygroundContainer>
      <CurrentSpell onAnimationEnd={() => setIsBouncing(false)} $bounce={isBouncing} $spellStatus={spellStatus}>
        {spellName ? `Spell: ${spellName}` : ''}
      </CurrentSpell>
      <FightScene>
        <MagicianContainer $me>
          <Magician src={'/magician.png'} />
          <MagicianEffect $color={getMySpellColor(spellStatus, me.lastSpell)} />
        </MagicianContainer>
        <MagicianContainer>
          <Magician src={'/magician.png'} />
          <MagicianEffect $color={attributeColors[getElementFromSpellName(opponent.lastSpell)]} />
        </MagicianContainer>
      </FightScene>
      <PlayersWrapper>
        {[me, opponent].map((player) => {
          return (
            <PlayerInfoContainer key={player.id}>
              <PlayerName>{player.pseudo}</PlayerName>
              <PlayerLastSpell>Last spell: {player.lastSpell || 'none'}</PlayerLastSpell>
              <PlayerComponent player={player} />
            </PlayerInfoContainer>
          )
        })}
      </PlayersWrapper>
    </PlaygroundContainer>
  );
}

export default Playground;
