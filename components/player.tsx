import { Player as PlayerType, Attributes } from "../types/model";
import styled from "styled-components";
import HealthBar from "./HealthBar";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 150px;
  align-items: center;
`;

const StatLine = styled.div`
  font-size: 14px;
  margin-top: 5px;
  font-weight: bold;
  height: 20px;
  text-align: center;
`;

type PlayerProps = {
  player: PlayerType;
};

const Player = ({ player }: PlayerProps) => {
  const { hp, shields } = player;

  const shieldText = Object.entries(shields || {})
    .filter(([, value]) => value > 0)
    .map(([type, value]) => `+${value} ${type}`)
    .join(' ');

  return (
    <PlayerContainer>
      <HealthBar player={player} />
      <StatLine>
        {hp} HP {shieldText}
      </StatLine>
    </PlayerContainer>
  );
};

export default Player;

