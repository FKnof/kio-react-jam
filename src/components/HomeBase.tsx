import "@pixi/events";
import { Container, Graphics, Sprite, Text, useTick } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import { Projectile } from "./Projectile";

export function HomeBase(props: any) {
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
    console.log(playerProjectiles);
  };

  useTick((delta) => {
    if (playerProjectiles.length > 0) {
      const updatedProjectiles = playerProjectiles
        .map((p: PlayerProjectile) => {
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

          return { ...p, x: newX, y: newY, vx: newVx, vy: newVy };
        })
        .filter((p) => p.y + p.radius > 0); // Despawn when out of the top boundary

      setPlayerProjectiles(updatedProjectiles);
    }
  });

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

      {playerProjectiles.map((p, index) => (
        <Projectile props={p} key={index} />
      ))}
    </>
  );
}
