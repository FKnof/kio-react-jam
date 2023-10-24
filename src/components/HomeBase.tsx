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

export function HomeBase(props: any) {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<string>("");
  const [thisPlayer, setThisPlayer] = useState<number>();
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
        if (yourPlayerId != undefined)
          setThisPlayer(game.playerState[yourPlayerId].playerIndex);
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
      y,
      mouseCoordinates,
      projectileId,
      yourPlayerId,
      col,
      thisPlayer !== undefined ? thisPlayer : 0
    );
    setProjectileId(newId);
    Rune.actions.addProjectile({ projectile: newProjectile });
  };

  let opponentPlayerId = "";

  for (const item in players) {
    if (item !== yourPlayerId) {
      opponentPlayerId = item;
      break; // Assuming it's a two-player game, exit the loop once you find the opponent.
    }
  }
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
        <HomeBaseCannon width={width} cannonHeight={cannonHeight} />
      </Container>

      <Text
        text={game.playerState[opponentPlayerId].life.toString()}
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

      <Text
        text={`P${thisPlayer !== undefined ? thisPlayer.toString() : "0"}`}
        anchor={0}
        x={10}
        y={5}
        style={
          new PIXI.TextStyle({
            align: "center",
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: 20,
            fontWeight: "400",
            fill: colors[thisPlayer !== undefined ? thisPlayer : 0], // gradient
            stroke: "#000000",
            strokeThickness: 5,
            letterSpacing: 5,

            wordWrap: true,
            wordWrapWidth: 440,
          })
        }
      />
      <Text
        text={game.playerState[yourPlayerId].life.toString()}
        anchor={0.5}
        x={25}
        y={600}
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
      {thisPlayer !== undefined && thisPlayer === 0
        ? game.playerProjectiles.map((projectile, index) => (
            <Projectile props={projectile} key={index} />
          ))
        : game.playerProjectiles.map((projectile, index) => (
            <ProjectileInverted props={projectile} key={index} />
          ))}
    </>
  );
}
