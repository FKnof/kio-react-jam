import { Stage, Text } from "@pixi/react";
import { HomeBase } from "./HomeBase";
import { GameState } from "../logic.ts";
import { useEffect, useState } from "react";
import { Projectile } from "./Projectile.tsx";
import { ProjectileInverted } from "./ProjectileInverted.tsx";
import { loadTextures } from "./TextureLoader";
import { Collision } from "./Collision.tsx";

export function Game() {
  const [game, setGame] = useState<GameState>();
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [yourPlayerId, setYourPlayerId] = useState<string>("");
  const [thisPlayer, setThisPlayer] = useState<number>();
  const [opponentPlayerId, setOpponentPlayerId] = useState<string>("");
  const [players, setPlayers] = useState<any>();
  const [characterTextures, setCharacterTextures] = useState<any>();
  const [environmentTextures, setEnvironmentTextures] = useState<any>();
  const [backgroundTextures, setBackgroundTextures] = useState<any>();
  const [healthbarTextures, sethealthbarTextures] = useState<any>();
  const [collisionTextures, setCollisionTextures] = useState<any>();

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
    characterTextures,
    environmentTextures,
    backgroundTextures,
    healthbarTextures,
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

    loadTextures().then((textures) => {
      setCharacterTextures(textures.characterTextures);
      setEnvironmentTextures(textures.environmentTextures);
      setBackgroundTextures(textures.backgroundTextures);
      sethealthbarTextures(textures.healthbarTextures);
      setCollisionTextures(textures.collisionTextures);
    });

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("touchmove", touchMoveHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("touchmove", touchMoveHandler);
    };
  }, []);
  // console.log(backgroundTextures);
  const mouseMoveHandler = (event: any) => {
    setMouseCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const touchMoveHandler = (event: any) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      setMouseCoordinates({
        x: touch.clientX,
        y: touch.clientY,
      });
    }
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

      {game.collisionObjects.length > 0 &&
        game.collisionObjects.map((collision, index) => (
          <Collision
            collision={collision}
            game={game}
            key={index}
            collisionTextures={collisionTextures}
            gameHeight={gameHeight}
            gameWidth={gameWidth}
            thisPlayer={thisPlayer}
          />
        ))}

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
              gameWidth={gameWidth}
              gameHeight={gameHeight}
              characterTextures={characterTextures}
              yourPlayerId={yourPlayerId}
            />
          ))}
      <Text text={thisPlayer?.toString()} anchor={0.5} x={20} y={20} />
    </Stage>
  );
}
