import { PlayersType, Spells } from "./model";

export interface ServerToClientEvents {
  spellSent: (players: PlayersType) => void;
  roomJoined: (players: PlayersType) => void;
  roomUpdated: (players: PlayersType) => void;
}

export interface ClientToServerEvents {
  spellSend: (spell: string, callback: (response: any) => void) => void;
  joinRoom: (params: { roomName: string, username: string }, callback: (response: { myID: string }) => void) => void;
}