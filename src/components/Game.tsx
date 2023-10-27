import { Stage, Container, Text, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import { HomeBase } from "./HomeBase";
import { GameState } from "../logic.ts";
import { useEffect, useState } from "react";
import { Projectile } from "./Projectile.tsx";
import { ProjectileInverted } from "./ProjectileInverted.tsx";
import { useTextureStore } from "../util/store";
import { HomeBaseBackground } from "./HomeBase-Background.tsx";

export function Game() {
  const [game, setGame] = useState<GameState>();
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [yourPlayerId, setYourPlayerId] = useState<string>("");
  const [thisPlayer, setThisPlayer] = useState<number>();
  const [opponentPlayerId, setOpponentPlayerId] = useState<string>("");
  const [players, setPlayers] = useState<any>();

  const gameWidth = 430;
  const gameHeight = 932;
  const scaleX = window.innerWidth / gameWidth;
  const scaleY = window.innerHeight / gameHeight;
  const [characterTextures, setCharacterTextures] = useState<any>();
  const [environmentTextures, setEnvironmentTextures] = useState<any>();

  const stageProps = {
    width: gameWidth,
    height: gameHeight,
    // scale: new PIXI.Point(scaleX, scaleY),
    options: {
      backgroundAlpha: 0,
      antialias: true,
    },
  };
  const baseHeightPercentage = 0.175;
  const baseProps = {
    width: gameWidth,
    height: gameHeight * baseHeightPercentage,
    gameHeight,
    x: 0,
    y: gameHeight * (1 - baseHeightPercentage),
    mouseCoordinates: {
      x: mouseCoordinates.x / scaleX,
      y: mouseCoordinates.y / scaleY,
    },
    scaleX,
    scaleY,
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
      bluePaper: "./src/assets/paper_blue.png",
      blueStone: "./src/assets/stone_blue.png",
      blueScissors: "./src/assets/scissors_blue.png",
      redPaper: "./src/assets/paper_red.png",
      redStone: "./src/assets/stone_red.png",
      redScissors: "./src/assets/scissors_red.png",
    });

    PIXI.Assets.addBundle("environment", {
      dragLine: "./src/assets/drag-to-shoot.png",
      menuBot: "./src/assets/menu_bot_separator.png",
      menuTop: "./src/assets/menu_top_separator.png",
      selectionBox: "./src/assets/selection_box_bonus.png",
      selectionBoxBonus: "./src/assets/selection_box_bonus.png",
      selectionMenu: "./src/assets/selection_menu.png",
      warningSign: "./src/assets/warning_sign.png",
    });

    async function getTextures() {
      try {
        const characterTextures = await PIXI.Assets.loadBundle("characters");
        const environmentTextures = await PIXI.Assets.loadBundle("environment");
        setCharacterTextures(characterTextures);
        setEnvironmentTextures(environmentTextures);
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
    <Stage
      {...stageProps}
      style={{
        transform: "scale(" + scaleX + "," + scaleY + ")",
        transformOrigin: "top left",
      }}
    >
      <HomeBase
        {...baseProps}
        characterTextures={characterTextures}
        thisPlayer={thisPlayer}
        environmentTextures={environmentTextures}
      />
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
              gameWidth={gameWidth}
              gameHeight={gameHeight}
            />
          ))}
      <Text text={thisPlayer?.toString()} anchor={0.5} x={20} y={20} />
    </Stage>
  );
}
