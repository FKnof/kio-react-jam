import "@pixi/events";
import { Container, Graphics, Sprite, Text, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useCallback, useEffect, useState } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import { Projectile } from "./Projectile";
import { GameState } from "../logic.ts";

export function HomeBase(props: any) {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<string>("");
  const [players, setPlayers] = useState<any>();
  const height = props.height;
  const width = props.width;
  const x = props.x;
  const y = props.y;

  const [playerProjectiles, setPlayerProjectiles] = useState<
    Array<PlayerProjectile>
  >([]);

  const cannonHeight = 40;
  const homeBaseHeight = height + cannonHeight;
  const [graphicsColor, setGraphicsColor] = useState("#0000ff");
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [projectileId, setProjectileId] = useState(0);
  const [tidyUp, setTidyUp] = useState([]);

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

  useEffect(() => {
    if (tidyUp.length > 0) {
      const newProjectiles = playerProjectiles.filter(
        (projectile) => projectile.id != 0
      );
      setPlayerProjectiles(newProjectiles);
      setTidyUp([]);
    }
  }, [tidyUp, setTidyUp, playerProjectiles]);

  const castle = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill(graphicsColor);
      g.drawRect(0, 0, width, height);
    },
    [height, width, graphicsColor]
  );

  const cannon = useCallback(
    (g: any) => {
      g.clear();
      g.lineStyle(2, "#000000", 1);
      g.beginFill("#fefefe");
      g.drawCircle(width * 0.5, 0, cannonHeight);
    },
    [width]
  );

  const aim = useCallback(
    (g: any) => {
      g.clear();
      g.lineStyle(2, "#000000", 1);
      g.moveTo(width * 0.5, y);
      g.lineTo(mouseCoordinates.x, mouseCoordinates.y);
    },
    [width, mouseCoordinates, y]
  );

  const background = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill("#ff0000");
      g.drawRect(0, 0, width, window.innerHeight);
    },
    [width]
  );

  const calculateVelocity = (
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    speedFactor: number,
    maxSpeed: number
  ) => {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const length = Math.sqrt(dx * dx + dy * dy);
    let speed = length * speedFactor;

    if (speed > maxSpeed) speed = maxSpeed;
    return {
      vx: (dx / length) * speed,
      vy: (dy / length) * speed,
    };
  };

  const addPlayerProjectile = () => {
    const speedFactor = 0.1; // Wie sehr sich die Geschwindigkeit an der Entfernung orientiert
    const maxSpeed = 4;
    const velocity = calculateVelocity(
      width * 0.5,
      y,
      mouseCoordinates.x,
      mouseCoordinates.y,
      speedFactor,
      maxSpeed
    );
    const newProjectile = {
      x: width * 0.5,
      y: y,
      vx: velocity.vx,
      vy: velocity.vy,
      radius: 5,
      color: "#000000",
      type: "scissors",
      level: 1,
      id: projectileId,
    };
    const newId = projectileId + 1;
    setProjectileId(newId);
    setPlayerProjectiles([...playerProjectiles, newProjectile]);
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
      <Graphics
        draw={background}
        eventMode={"static"}
        pointerdown={() => {
          addPlayerProjectile();
        }}
      />
      <Graphics draw={aim} />
      <Container
        x={x}
        y={y}
        width={width}
        pointerdown={() => {
          console.log("click");
          setGraphicsColor("#00ff00");
        }}
        eventMode={"static"}
      >
        <Graphics
          draw={castle}
          pointerdown={() => {
            console.log("pointer down");
          }}
          eventMode={"static"}
        />
        <Graphics
          draw={cannon}
          pointerdown={() => {
            console.log("cannon shot");
            addPlayerProjectile();
          }}
          eventMode={"static"}
        />
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
        y={400}
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
      {game.playerProjectiles.map((p, index) => (
        <Projectile props={p} key={index} />
      ))}
    </>
  );
}
