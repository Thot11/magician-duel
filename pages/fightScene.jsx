import Head from "next/head";
import styled from "styled-components";
import React, { useEffect, useState, useCallback, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { io } from "socket.io-client";
import Player from "../components/player";
import Enemy from "../components/enemy";
import { player, enemy, spellList, element } from "../datas/spellList";
import Header from "../components/header";

const SERVER_URL = "http://localhost:4000";

const socket = io(SERVER_URL, {
  autoConnect: false,
});

const FightSceneContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(180deg, #050022 0%, #0a0047 100%);
`;

const RoomNameContainer = styled.div`
  display: inline-flex;
  align-items: center;$
  margin-top: 30px;
`;

const ValidateRoomName = styled.div`
  margin-left: 10px;
  color: white;
`;

const RoomNameInput = styled.input`
  color: white;
  border: 1px solid white;
  border-radius: 12px;
  padding: 10px 8px;
  min-width: 50px;
  min-height: 20px;
`;

export default function FightScene() {
  const playerOne = player;
  const playerTwo = enemy;

  const [roomName, setRoomName] = useState("");
  const [fightStarted, setFightStarted] = useState(false);
  const [spellName, setSpellName] = useState("");
  const [spellExecuted, setSpellExecuted] = useState({});

  const inputRef = useRef();

  const handleKeyPress = useCallback(
    (e) => {
      if (!fightStarted || !roomName) {
        return;
      }
      if (e.key.length === 1) {
        setSpellExecuted(undefined);
        setSpellName(spellName + e.key);
      }
      if (e.key === "Enter") {
        setSpellName("");
        socket.emit("spellSend", {
          spellId: spellList[spellName].name,
          name: "j1",
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      }
    },
    [spellName, fightStarted, roomName],
  );

  useEffect(() => {
    socket.on("spellSent", (data) => {
      if (data) {
        setSpellExecuted(spellList[data.spellId]);
      }
    });

    socket.on("roomJoined", () => setFightStarted(true));
  }, [socket]);

  useEffect(() => {
    if (roomName) {
      socket.connect();
      socket.emit("join", roomName);
    }
  }, [roomName]);

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

  const attackPlayer = ({ victime, attribut, damage }) => {
    const totalDamage =
      damage - (victime.shield - victime[`${attribut}Shield`]) > 0
        ? damage - (victime.shield - victime[`${attribut}Shield`])
        : 0;
    if (totalDamage > 0) {
      if (victime.shield > 0) {
        victime.health -= totalDamage - victime.shield;
        victime.shield = 0;
      } else {
        victime.health -= totalDamage;
      }
    } else {
      victime.shield -= damage;
    }
  };

  const shieldUp = ({ elementalShield, shield, attribut }) => {
    playerOne.shield += shield;
    playerOne[`${attribut}Shield`] += elementalShield;
    playerOne[`${element[attribut].weakness}Shield`] -= elementalShield;
  };

  useEffect(() => {
    if (spellExecuted?.type === "attack") {
      attackPlayer({
        victime: playerTwo,
        attribut: spellExecuted.attribut,
        damage: spellExecuted.damage,
      });
    }
    if (spellExecuted?.type === "defense") {
      shieldUp({
        elementalShield: spellExecuted.elementalShield,
        attribut: spellExecuted.attribut,
        shield: spellExecuted.shield,
      });
    }
  }, [spellExecuted]);

  if (!roomName) {
    return (
      <div>
        <Head>
          <title>Magician Duel</title>
          <meta name="description" content="Jeu de duel de magicien - Youpi" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <FightSceneContainer>
          <RoomNameContainer>
            <RoomNameInput ref={inputRef} placeholder="tap room name" />
            <ValidateRoomName
              onClick={() =>
                inputRef && inputRef.current
                  ? setRoomName(inputRef.current.value)
                  : null
              }
            >
              Go
            </ValidateRoomName>
          </RoomNameContainer>
        </FightSceneContainer>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Magician Duel</title>
        <meta name="description" content="Jeu de duel de magicien - Youpi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {/* <FightSceneContainer> */}
      <main className="fightSceneContainer">
        <div className="playerWrapper">
          <div className="spellName">{spellName}</div>
          <div className="playerBody" />
          <div className="statsContainer">
            <p>
              {playerOne.health} <span>HP</span>{" "}
            </p>
            <p>
              {playerOne.shield} <span>SH</span>
            </p>
            <p>
              {playerOne.fireShield} <span>FS</span>
            </p>
            <p>
              {playerOne.waterShield} <span>WS</span>
            </p>
            <p>
              {playerOne.earthShield} <span>HS</span>
            </p>
            <p>
              {playerOne.windShield} <span>WS</span>
            </p>
          </div>
        </div>
        <div className="enemyWrapper">
          <div className="spellName">aie</div>
          <div className="playerBody" />
          <div className="statsContainer">
            <p>
              {playerTwo.health} <span>HP</span>{" "}
            </p>
            <p>
              {playerTwo.shield} <span>SH</span>
            </p>
            <p>
              {playerTwo.fireShield} <span>FS</span>
            </p>
            <p>
              {playerTwo.waterShield} <span>WS</span>
            </p>
            <p>
              {playerTwo.earthShield} <span>HS</span>
            </p>
            <p>
              {playerTwo.windShield} <span>WS</span>
            </p>
          </div>
        </div>
      </main>
      {/* </FightSceneContainer> */}
    </div>
  );
}
