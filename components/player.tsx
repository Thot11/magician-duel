import { useEffect, useState, useCallback } from "react";
import { PlayerStatsType } from "../types/model";
import styled from "styled-components";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`

const StatLine = styled.div`
  font-size: 13px;
`

const Suffix = styled.span``

type PlayerProps = {
  player: PlayerStatsType
}

const Player = ({ player }: PlayerProps) => {
  const {
    health,
    shields } = player;

  const {
    fire,
    water,
    wind,
    earth,
    physical } = shields

  // TODO améliorer le return
  return (
    <PlayerContainer>
      <StatLine>
        {health} <Suffix>HP</Suffix>
      </StatLine>
      <StatLine>
        {physical} <Suffix>Shield</Suffix>
      </StatLine>
      <StatLine>
        {fire} <Suffix>Fire Shield</Suffix>
      </StatLine>
      <StatLine>
        {water} <Suffix>Water Shield</Suffix>
      </StatLine>
      <StatLine>
        {earth} <Suffix>Earth Shield</Suffix>
      </StatLine>
      <StatLine>
        {wind} <Suffix>Wind Shield</Suffix>
      </StatLine>

    </PlayerContainer>
  );
}

export default Player;
