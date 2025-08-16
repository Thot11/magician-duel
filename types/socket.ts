import { GameState, Spells, Player } from "./model";

export interface ServerToClientEvents {
  status: (data: { message: string }) => void;
  gameStarted: (data: GameState) => void;
  gameStateUpdate: (data: { players: Player[] }) => void;
  gameOver: (data: { winner: string }) => void;
  opponentDisconnected: () => void;
}

export interface ClientToServerEvents {
  castSpell: (payload: { spell: Spells }, callback: (response: { status: string }) => void) => void;
}