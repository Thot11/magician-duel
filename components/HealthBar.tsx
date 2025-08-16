import styled from "styled-components";
import { Player as PlayerType, attributeColors, shieldOrder, healthColors } from "../types/model";

const BarContainer = styled.div`
  width: 100%;
  height: 15px;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #555;
  position: relative;
  display: flex;
`;

type BarSegmentProps = {
  $width: number;
  $color: string;
  $value: number;
};

const BarSegment = styled.div<BarSegmentProps>`
  height: 100%;
  width: ${(props) => props.$width}%;
  background-color: ${(props) => props.$color};
  transition: width 0.2s ease-in-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: repeating-linear-gradient(
      to right,
      transparent,
      transparent calc(100% / (${props => props.$value} / 10) - 1px),
      rgba(0, 0, 0, 0.3) calc(100% / (${props => props.$value} / 10) - 1px),
      rgba(0, 0, 0, 0.3) calc(100% / (${props => props.$value} / 10))
    );
    display: ${props => props.$value > 10 ? 'block' : 'none'};
  }
`;

type HealthBarProps = {
  player: PlayerType;
};

const HealthBar = ({ player }: HealthBarProps) => {
  const { hp, shields } = player;

  const totalShields = Object.values(shields || {}).reduce((sum, value) => sum + value, 0);
  const totalEffectiveHealth = hp + totalShields;

  if (totalEffectiveHealth === 0) {
    return <BarContainer />;
  }

  const hpWidth = (hp / totalEffectiveHealth) * 100;
  const hpColor = hp > 50 ? healthColors.high : hp > 20 ? healthColors.medium : healthColors.low;

  return (
    <BarContainer>
      <BarSegment
        $width={hpWidth}
        $color={hpColor}
        $value={hp}
      />
      {shieldOrder.map((shieldType) => {
        const shieldValue = shields?.[shieldType];
        if (shieldValue && shieldValue > 0) {
          const shieldWidth = (shieldValue / totalEffectiveHealth) * 100;
          return (
            <BarSegment
              key={shieldType}
              $width={shieldWidth}
              $color={attributeColors[shieldType]}
              $value={shieldValue}
            />
          );
        }
        return null;
      })}
    </BarContainer>
  );
};

export default HealthBar;
