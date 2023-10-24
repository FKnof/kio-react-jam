import type { RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {
  playerState: {
    [playerId: string]: {
      color: string;
      life: number;
    };
  };
  playerProjectiles: PlayerProjectile[];
}
export const colors = ["#BCFE00", "#10D4FF"];

type GameActions = {
  decreaseLife: (params: { opponentPlayerId: string; amount: number }) => void;
  addProjectile: (params: { projectile: PlayerProjectile }) => void;
  deleteProjectile: (params: { id: number }) => void;
};

export interface PlayerProjectile {
  color: string;
  id: number;
  level: number;
  radius: number;
  type: string;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

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
      playerProjectiles: [],
    };
  },
  actions: {
    decreaseLife: ({ opponentPlayerId, amount }, { game }) => {
      game.playerState[opponentPlayerId].life -= amount;

      if (game.playerState[opponentPlayerId].life <= 0) {
        Rune.gameOver();
      }
    },
    addProjectile: ({ projectile }, { game }) => {
      game.playerProjectiles.push(projectile);
      // console.log("Updated playerProjectiles:", game.playerProjectiles);
      //
      // game.playerState[opponentPlayerId].life -= amount;
      // if (game.playerState[opponentPlayerId].life <= 0) {
      //   Rune.gameOver();
      // }
    },
    deleteProjectile: ({ id }, { game }) => {
      game.playerProjectiles.filter((item) => item.id !== id);
      console.log("Updated playerProjectiles:", game.playerProjectiles);

      // game.playerState[opponentPlayerId].life -= amount;
      // if (game.playerState[opponentPlayerId].life <= 0) {
      //   Rune.gameOver();
      // }
    },
  },
  update: ({ game }) => {
    if (game && game.playerProjectiles.length > 0) {
      const updatedProjectiles = game.playerProjectiles
        .map((p: PlayerProjectile) => {
          let newVx = p.vx;
          let newVy = p.vy;

          // Calculate new position
          const newX = p.x + p.vx;
          const newY = p.y + p.vy;

          // Bounce off left wall
          if (newX - p.radius <= 0) {
            newVx = Math.abs(p.vx);
          }

          // Bounce off right wall
          if (newX + p.radius >= innerWidth) {
            newVx = -Math.abs(p.vx);
          }

          // Bounce off bottom wall
          if (newY + p.radius >= innerHeight) {
            newVy = -Math.abs(p.vy);
          }

          return { ...p, x: newX, y: newY, vx: newVx, vy: newVy };
        })
        .filter((p) => {
          if (p.y + p.radius > 0) {
            return true;
          } else {
            // Rune.actions.decreaseLife({
            //   opponentPlayerId: opponentPlayerId,
            //   amount: 1,
            // });
          }
        }); // Despawn when out of the top boundary

      game.playerProjectiles = updatedProjectiles;
    }
  },
  updatesPerSecond: 30,
});
