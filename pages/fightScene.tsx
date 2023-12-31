import Head from "next/head";
import styled from "styled-components";
import React, { useEffect, useState, useCallback, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
// import Player from "../components/player";
// import Enemy from "../components/enemy";
import Header from "../components/header";
import FightContainer from "../container/fightContainer";
import SelectRoomName from "../components/selectRoomName";


const FightSceneContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #050022 0%, #0a0047 100%);
`;

const FightScene = () => {
  const [roomName, setRoomName] = useState("");

  const validateRoomName = (roomName: string) => {
    setRoomName(roomName)
  }

  return (
    <div>
      <Header />

      <FightSceneContainer>
        {roomName ? (<FightContainer roomName={roomName} />) : (<SelectRoomName validate={validateRoomName} />)}
      </FightSceneContainer>
    </div>
  );
}

export default FightScene
