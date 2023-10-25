import "@pixi/events";
import { Container, Graphics, Sprite, Text, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useEffect, useState } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import { Projectile } from "./Projectile";
import { GameState } from "../logic.ts";
import { HomeBaseCannon } from "./HomeBase-Cannon";
import { HomeBaseCastle } from "./HomeBase-Castle";
import { HomeBaseAim } from "./HomeBase-Aim";
import { HomeBaseBackground } from "./HomeBase-Background";
import { addPlayerProjectile } from "../util/addPlayerProjectile";
import { detectProjectileCollision } from "../util/detectProjectileCollision";
import { checkTypeWeakness } from "../util/checkTypeWeakness";
import { ProjectileInverted } from "./ProjectileInverted.tsx";
import Profile from "./HomeBase-Profile.tsx";

export function HomeBase(props: any) {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<string>("");
  const [thisPlayer, setThisPlayer] = useState<number>();
  const [opponentPlayerId, setOpponentPlayerId] = useState<string>("");
  const [players, setPlayers] = useState<any>();
  const { x, y, height, width } = props;
  const colors = ["#ffff00", "#00ffff"];

  const [playerProjectiles, setPlayerProjectiles] = useState<
    Array<PlayerProjectile>
  >([]);

  const cannonHeight = 40;
  const [graphicsColor, setGraphicsColor] = useState("#0000ff");
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [projectileId, setProjectileId] = useState(0);
  const mouseMoveHandler = (event: any) => {
    setMouseCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
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

  const handleShot = () => {
    const col = thisPlayer !== undefined ? colors[thisPlayer] : "#000000";
    const {
      newId,
      newProjectile,
    }: { newId: number; newProjectile: PlayerProjectile } = addPlayerProjectile(
      width,
      window.innerHeight,
      mouseCoordinates,
      projectileId,
      yourPlayerId,
      col,
      thisPlayer !== undefined ? thisPlayer : 0,
      game ? game.baseOffset : 0
    );
    setProjectileId(newId);
    Rune.actions.addProjectile({ projectile: newProjectile });
  };

  if (!game) {
    return (
      <Text
        text="...Lade"
        anchor={0.5}
        x={innerWidth / 2}
        y={100}
        style={
          new PIXI.TextStyle({
            align: "center",
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: 50,
            fontWeight: "400",
            fill: "#ffffff", // gradient
            stroke: "#000000",
            strokeThickness: 5,
            letterSpacing: 20,

            wordWrap: true,
            wordWrapWidth: 440,
          })
        }
      />
    );
  }
  console.log(game.playerState);
  console.log(game.playerState[yourPlayerId].life.toString());
  return (
    <>
      <HomeBaseBackground width={width} pointerdown={handleShot} />
      <HomeBaseAim y={y} width={width} mouseCoordinates={mouseCoordinates} />
      <Container
        x={x}
        y={y}
        width={width}
        eventMode={"static"}
        pointerdown={() => {
          console.log("click");
          setGraphicsColor("#00ff00");
        }}
      >
        <HomeBaseCastle
          height={height}
          width={width}
          graphicsColor={graphicsColor}
        />
        <HomeBaseCannon
          width={width}
          playerId={yourPlayerId}
          cannonHeight={cannonHeight}
        />
      </Container>

      {/* Mein Profil durch Übergabe der "yourPlayerId" */}
      <Profile
        playerState={game.playerState}
        playerId={yourPlayerId}
        x={width - 50}
        y={window.innerHeight - game.baseOffset}
      ></Profile>

      {/* Gegnerisches Profil durch Übergabe der "opponentPlayerId" */}
      <Profile
        playerState={game.playerState}
        playerId={opponentPlayerId}
        x={width - 50}
        y={6}
      ></Profile>

      {thisPlayer !== undefined && thisPlayer === 0
        ? game.playerProjectiles.map((projectile, index) => (
            <Projectile
              props={projectile}
              offset={game.baseOffset}
              key={index}
            />
          ))
        : game.playerProjectiles.map((projectile, index) => (
            <ProjectileInverted props={projectile} key={index} />
          ))}
    </>
  );
}
