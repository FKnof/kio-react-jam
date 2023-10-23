import type { RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {
  playerState: {
    [playerId: string]: {
      color: string;
      life: number;
    };
  };
}
export const colors = ["#BCFE00", "#10D4FF"];

type GameActions = {
  decreaseLife: (params: { opponentPlayerId: string; amount: number }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export function getlife(game: GameState, playerId: string) {
  return game.playerState[playerId].life;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (players): GameState => {
    const playerState: { [playerId: string]: { color: string; life: number } } =
      {};
    players.forEach((player, index) => {
      playerState[player] = {
        color: colors[index],
        life: 3,
      };
    });
    return {
      playerState: playerState,
    };
  },
  actions: {
    decreaseLife: ({ opponentPlayerId, amount }, { game }) => {
      game.playerState[opponentPlayerId].life -= amount;

      if (game.playerState[opponentPlayerId].life <= 0) {
        Rune.gameOver();
      }
    },
  },
});
