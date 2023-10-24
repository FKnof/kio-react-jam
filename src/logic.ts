import type { RuneClient } from "rune-games-sdk/multiplayer";
import { detectProjectileCollision } from "./util/detectProjectileCollision";
import { checkTypeWeakness } from "./util/checkTypeWeakness";

export interface GameState {
  playerState: {
    [playerId: string]: {
      color: string;
      life: number;
      playerIndex: number;
    };
  };
  playerProjectiles: PlayerProjectile[];
  absoluteProjectileIds: number;
}
export const colors = ["#BCFE00", "#10D4FF"];

type GameActions = {
  decreaseLife: (params: { opponentPlayerId: string; amount: number }) => void;
  addProjectile: (params: { projectile: PlayerProjectile }) => void;
  deleteProjectile: (params: { id: number }) => void;
};

export type PlayerProjectile = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  type: string;
  level: number;
  id: number;
  ownerId: string;
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
    const playerState: {
      [playerId: string]: { color: string; life: number; playerIndex: number };
    } = {};
    players.forEach((player, index) => {
      playerState[player] = {
        playerIndex: index,
        color: colors[index],
        life: 3,
      };
    });
    return {
      playerState: playerState,
      playerProjectiles: [],
      absoluteProjectileIds: 0,
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
      const newProjectile = { ...projectile, id: game.absoluteProjectileIds };
      console.log("Adding projectile:", newProjectile);
      game.playerProjectiles.push(newProjectile);
      game.absoluteProjectileIds++;
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
          let newLevel = p.level;
          game.playerProjectiles.forEach((target) => {
            if (
              target.id !== p.id &&
              detectProjectileCollision(p, target) &&
              checkTypeWeakness(target.type, p.type)
            ) {
              newLevel = p.level - 1;
              console.log(
                "Collision detected: ",
                p.id + ": " + newLevel,
                target.id
              );
            }
          });
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

          return {
            ...p,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            level: newLevel,
          };
        })
        .filter((p) => {
          if (p.y + p.radius > 0 && p.level > 0) {
            console.log("filtered ", p.id);
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
