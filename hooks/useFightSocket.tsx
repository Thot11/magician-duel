'use client'

import { useState, useEffect, useMemo } from "react"
import { io, Socket } from "socket.io-client";
import { PlayerType, PlayersType, Spells } from "../types/model";
import { ClientToServerEvents, ServerToClientEvents } from "../types/socket";


const SERVER_URL = "http://localhost:4000";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER_URL, {
  autoConnect: false
});

type UseFightProps = {
  pseudo: string,
  roomName: string
}

const useFightSocket = ({ pseudo, roomName }: UseFightProps) => {
  const [players, setPlayers] = useState<PlayersType | null>()
  const [startAt, setStartAt] = useState<number | null>()
  const [myID, setMyID] = useState<string | null>()
  const [roomJoined, setRoomJoined] = useState<boolean>(false)

  useEffect(() => {
    socket.on("spellSent", (data) => {
      setPlayers(data)
    });

    socket.on("roomJoined", (data) => {
      setPlayers(data)
    });

    socket.on("roomUpdated", (data) => {
      setPlayers(data)
    })
  }, [socket]);

  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", { roomName, username: pseudo }, (response) => {
      setRoomJoined(true)
      if (response.myID) {
        setMyID(response.myID)
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const sendSpell = (spell: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      socket.emit("spellSend", spell, (response) => {
        if (response.status === "ok") {
          resolve(response.status);
        } else {
          reject(new Error("help"));
        }
      });
    });
  }

  return {
    players,
    startAt,
    myID,
    sendSpell
  }
}

export default useFightSocket;