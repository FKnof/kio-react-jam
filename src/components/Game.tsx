import { Stage, Container, Sprite, Text, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import { HomeBase } from "./HomeBase";
import { GameState } from "../logic.ts";
import { useEffect, useState } from "react";
import { Projectile } from "./Projectile.tsx";
import { ProjectileInverted } from "./ProjectileInverted.tsx";
import { useTextureStore } from "../util/store";

export function Game() {
  const [game, setGame] = useState<GameState>();
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [yourPlayerId, setYourPlayerId] = useState<string>("");
  const [thisPlayer, setThisPlayer] = useState<number>();
  const [opponentPlayerId, setOpponentPlayerId] = useState<string>("");
  const [players, setPlayers] = useState<any>();
  const [characterTextures, setCharacterTextures] = useState<any>();

  const stageProps = {
    width: window.innerWidth,
    height: window.innerHeight,
    options: {
      backgroundAlpha: 0,
      antialias: true,
    },
  };
  const baseHeightPercentage = 0.175;
  const baseProps = {
    width: stageProps.width,
    height: stageProps.height * baseHeightPercentage,
    x: 0,
    y: stageProps.height * (1 - baseHeightPercentage),
    mouseCoordinates,
    yourPlayerId,
    opponentPlayerId,
    players,
    thisPlayer,
    game,
  };

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId, players }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId || ""); // provide a default value for yourPlayerId
        if (yourPlayerId != undefined) {
          setThisPlayer(game.playerState[yourPlayerId].playerIndex);
          const enemyId = Object.keys(game.playerState).find(
            (playerId) => playerId !== yourPlayerId
          );
          setOpponentPlayerId(enemyId || "");
        }
        setPlayers(players);
      },
    });

    PIXI.Assets.addBundle("characters", {
      paper: "./src/assets/paper_blue.png",
      stone: "./src/assets/stone_blue.png",
      scissors: "./src/assets/scissors_blue.png",
    });

    async function getTextures() {
      try {
        const characterTextures = await PIXI.Assets.loadBundle("characters");
        setCharacterTextures(characterTextures);
      } catch (err) {
        console.log(err);
      }
    }
    getTextures();

    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  const mouseMoveHandler = (event: any) => {
    setMouseCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  };

  if (!game) return "Lade...";

  return (
    <Stage {...stageProps}>
      <HomeBase {...baseProps} characterTextures={characterTextures} />
      {thisPlayer !== undefined && thisPlayer === 0
        ? game.playerProjectiles.map((projectile, index) => (
            <Projectile
              props={projectile}
              offset={game.baseOffset}
              key={index}
              characterTextures={characterTextures}
              yourPlayerId={yourPlayerId}
            />
          ))
        : game.playerProjectiles.map((projectile, index) => (
            <ProjectileInverted
              props={projectile}
              key={index}
              characterTextures={characterTextures}
              yourPlayerId={yourPlayerId}
            />
          ))}
      <Text text={thisPlayer?.toString()} anchor={0.5} x={20} y={20} />
    </Stage>
  );
}
