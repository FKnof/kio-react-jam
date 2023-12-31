import type { RuneClient } from "rune-games-sdk/multiplayer";
import { detectProjectileCollision } from "./util/detectProjectileCollision";
import { checkTypeWeakness } from "./util/checkTypeWeakness";

export interface GameState {
  playerState: {
    [playerId: string]: {
      color: string;
      life: number;
      playerIndex: number;
      playerScreenSize: { x: number; y: number };
    };
  };
  playerProjectiles: PlayerProjectile[];
  collisionObjects: { x: number; y: number; age: number }[];
  absoluteProjectileIds: number;
  baseOffset: number;
  maxlife: number;
  maxCollisionAge: number;
  reset: boolean;
  collisionSound: boolean;
  destructionSound: boolean;
}
export const colors = ["blue", "red"];

type GameActions = {
  decreaseLife: (params: {
    opponentPlayerId: string | undefined;
    amount: number;
  }) => void;
  addProjectile: (params: { projectile: PlayerProjectile }) => void;
  deleteProjectile: (params: { id: number }) => void;
  setScreenSize: (params: {
    width: number;
    height: number;
    yourPlayerId: string;
  }) => void;
  setReset: (params: { res: boolean }) => void;
  setCollisionSound: (params: { setting: boolean }) => void;
  setDestructionSound: (params: { setting: boolean }) => void;
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
  tookALife: boolean;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export function getlife(game: GameState, playerId: string) {
  return game.playerState[playerId].life;
}
const maxlife = 5;

const setGameOver = (winner: string, loser: string) => {
  Rune.gameOver({
    players: {
      [winner]: "WON",
      [loser]: "LOST",
    },
    delayPopUp: false,
  });
};

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (players): GameState => {
    const playerState: {
      [playerId: string]: {
        color: string;
        life: number;
        playerIndex: number;
        playerScreenSize: { x: number; y: number };
      };
    } = {};
    players.forEach((player, index) => {
      playerState[player] = {
        playerIndex: index,
        color: colors[index],
        life: maxlife,
        playerScreenSize: { x: 0, y: 0 },
      };
    });
    return {
      playerState: playerState,
      playerProjectiles: [],
      collisionObjects: [],
      absoluteProjectileIds: 0,
      baseOffset: 163, // BaseHeight = 0,175* 932px
      maxlife: maxlife,
      maxCollisionAge: 30,
      reset: true,
      collisionSound: false,
      destructionSound: false,
    };
  },
  actions: {
    decreaseLife: ({ opponentPlayerId, amount }, { game }) => {
      if (opponentPlayerId == undefined) return;
      game.playerState[opponentPlayerId].life -= amount;

      if (game.playerState[opponentPlayerId].life <= 0) {
        Rune.gameOver();
      }
    },
    addProjectile: ({ projectile }, { game }) => {
      const newProjectile = { ...projectile, id: game.absoluteProjectileIds };
      //console.log("Adding projectile:", newProjectile);
      game.playerProjectiles.push(newProjectile);
      game.absoluteProjectileIds++;
    },
    deleteProjectile: ({ id }, { game }) => {
      game.playerProjectiles = game.playerProjectiles.filter(
        (item) => item.id !== id
      );
      //console.log("Updated playerProjectiles:", game.playerProjectiles);
    },
    setScreenSize: ({ width, height, yourPlayerId }, { game }) => {
      game.playerState[yourPlayerId].playerScreenSize.x = width;
      game.playerState[yourPlayerId].playerScreenSize.y = height;

      // for (const playerId in game.playerState) {
      //   const player = game.playerState[playerId];
      //   const screenSize = player.playerScreenSize;
      //   const screenSizeArea = screenSize.x * screenSize.y;

      //   if (screenSizeArea < smallestSize) {
      //     smallestSize = screenSizeArea;
      //     playerIdWithSmallestSize = playerId;
      //   }
      // }
    },
    setReset: ({ res }, { game }) => {
      game.reset = res;
    },
    setCollisionSound: ({ setting }, { game }) => {
      game.collisionSound = setting;
    },
    setDestructionSound: ({ setting }, { game }) => {
      game.destructionSound = setting;
    },
  },
  update: ({ game }) => {
    if (game.playerState[Object.keys(game.playerState)[0]].life <= 0) {
      const winner = Object.keys(game.playerState)[1];
      const loser = Object.keys(game.playerState)[0];
      setGameOver(winner, loser);
    }
    if (game.playerState[Object.keys(game.playerState)[1]].life <= 0) {
      const winner = Object.keys(game.playerState)[0];
      const loser = Object.keys(game.playerState)[1];
      setGameOver(winner, loser);
    }

    if (game && game.playerProjectiles.length > 0) {
      const updatedProjectiles = game.playerProjectiles
        .map((p: PlayerProjectile) => {
          let newLevel = p.level;
          game.playerProjectiles.forEach((target) => {
            if (
              target.ownerId !== p.ownerId &&
              target.id !== p.id &&
              detectProjectileCollision(p, target) &&
              checkTypeWeakness(target.type, p.type)
            ) {
              newLevel = p.level - 1;
              if (p.type == target.type) game.collisionSound = true;
              if (p.type !== target.type) game.destructionSound = true;
              game.collisionObjects.push({ x: p.x, y: p.y, age: 0 });
            }
          });
          let newVx = p.vx;
          const newVy = p.vy;

          // Calculate new position
          const newX = p.x + p.vx;
          const newY = p.y + p.vy;

          // Bounce off left wall
          if (newX - p.radius <= 0) {
            newVx = Math.abs(p.vx);
          }

          // Bounce off right wall
          if (newX + p.radius >= 430) {
            newVx = -Math.abs(p.vx);
          }

          // // Bounce off bottom wall
          // if (newY + p.radius >= innerHeight) {
          //   newVy = -Math.abs(p.vy);
          // }

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
          const opponentPlayerId: string =
            Object.keys(game.playerState).find(
              (playerId) => playerId !== p.ownerId
            ) ?? "";

          if (
            game.playerState[p.ownerId].playerIndex == 0 &&
            p.y + p.radius > game.baseOffset &&
            p.level > 0
          ) {
            return true;
          } else if (
            game.playerState[p.ownerId].playerIndex == 1 &&
            p.y - p.radius < 932 &&
            p.level > 0
          ) {
            return true;
          } else {
            if (p.level <= 0) {
              return false;
            }
            if (!p.tookALife) {
              game.playerState[opponentPlayerId].life -= 1;
              p.tookALife = true;
            }
          }
        }); // Despawn when out of the top boundary

      game.playerProjectiles = updatedProjectiles;
    }

    if (game && game.collisionObjects.length > 0) {
      const updatedCollisions = game.collisionObjects
        .map((collision) => {
          const newAge = collision.age + 1;
          return { ...collision, age: newAge };
        })
        .filter((collision) => {
          if (collision.age > game.maxCollisionAge) {
            return false;
          }
          return true;
        });
      game.collisionObjects = updatedCollisions;
    }
  },
  updatesPerSecond: 30,
});
