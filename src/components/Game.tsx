import { Stage, Container, Text, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import { HomeBase } from "./HomeBase";
import { GameState } from "../logic.ts";
import { useEffect, useState } from "react";
import { Projectile } from "./Projectile.tsx";
import { ProjectileInverted } from "./ProjectileInverted.tsx";
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
      <HomeBase {...baseProps} />
      {thisPlayer !== undefined && thisPlayer === 0
        ? game.playerProjectiles.map((projectile, index) => (
            <Projectile
              props={projectile}
              offset={game.baseOffset}
              key={index}
            />
          ))
        : game.playerProjectiles.map((projectile, index) => (
            <ProjectileInverted
              props={projectile}
              key={index}
              gameWidth={gameWidth}
              gameHeight={gameHeight}
            />
          ))}
      <Text text={thisPlayer?.toString()} anchor={0.5} x={20} y={20} />
    </Stage>
  );
}
