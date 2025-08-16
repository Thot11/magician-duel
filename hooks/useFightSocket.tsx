'use client'

import { useState, useEffect } from "react"
import { io, Socket } from "socket.io-client";
import { PlayersType, GameState } from "../types/model";
import { Spells } from "../types/model";
import { ServerToClientEvents, ClientToServerEvents } from "../types/socket";

const SERVER_URL = "http://localhost:3000";

type UseFightProps = {
  pseudo: string,
}

const useFightSocket = ({ pseudo }: UseFightProps) => {
  const [players, setPlayers] = useState<PlayersType | null>(null);
  const [myID, setMyID] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);


  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER_URL, {
      query: { pseudo }
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      setMyID(newSocket.id);
    });

    newSocket.on("status", (data) => {
      setStatus(data.message);
    });

    newSocket.on("gameStarted", (data) => {
      setPlayers(data.players);
      setStatus(null);
    });

    newSocket.on("gameStateUpdate", (data) => {
      setPlayers(data.players);
    });

    newSocket.on("gameOver", (data) => {
      setWinner(data.winner);
    });

    newSocket.on("opponentDisconnected", () => {
      setStatus("Your opponent has disconnected.");
      setPlayers(null);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [pseudo]);


  const sendSpell = (spell: Spells): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (socket) {
        socket.emit("castSpell", { spell }, (response) => {
          if (response.status === 'ok') {
            resolve('ok');
          } else {
            reject(new Error('Spell casting failed'));
          }
        });
      } else {
        reject(new Error('Socket not connected'));
      }
    });
  }

  return {
    players,
    myID,
    winner,
    status,
    sendSpell
  }
}

export default useFightSocket;