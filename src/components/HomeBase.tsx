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

export function HomeBase(props: any) {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<string>("");
  const [players, setPlayers] = useState<any>();
  const { x, y, height, width } = props;

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
        setPlayers(players);
      },
    });

    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  const handleShot = () => {
    const { newId, newProjectile } = addPlayerProjectile(
      width,
      y,
      mouseCoordinates,
      projectileId
    );
    setProjectileId(newId);
    setPlayerProjectiles([...playerProjectiles, newProjectile]);
  };

  useTick((delta) => {
    if (playerProjectiles.length > 0) {
      const updatedProjectiles = playerProjectiles
        .map((p: PlayerProjectile) => {
          // check for collisions
          let newLevel = p.level;
          playerProjectiles.forEach((target) => {
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

          // Get old Velocity
          let newVx = p.vx;
          let newVy = p.vy;

          // Calculate new position
          const newX = p.x + p.vx * delta;
          const newY = p.y + p.vy * delta;

          // Bounce off left wall
          if (newX - p.radius <= 0) {
            newVx = Math.abs(p.vx);
          }

          // Bounce off right wall
          if (newX + p.radius >= width) {
            newVx = -Math.abs(p.vx);
          }

          // Bounce off bottom wall
          if (newY + p.radius >= height) {
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
            return true;
          } else {
            Rune.actions.decreaseLife({
              opponentPlayerId: opponentPlayerId,
              amount: 1,
            });
          }
        }); // Despawn when out of the top boundary

      setPlayerProjectiles(updatedProjectiles);
    }
  });

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
  console.log("MyId: " + yourPlayerId);
  console.log("OpponentId: " + opponentPlayerId);
  console.log(players);
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
      {playerProjectiles.map((projectile, index) => (
        <Projectile props={projectile} key={index} />
      ))}
    </>
  );
}
