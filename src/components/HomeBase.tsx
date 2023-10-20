import "@pixi/events";
import { Container, Graphics, Sprite, Text, useTick } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import { Projectile } from "./Projectile";

export function HomeBase(props: any) {
  const bunny =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png";
  const height = props.height;
  const width = props.width;
  const x = props.x;
  const y = props.y;

  const [playerProjectiles, setPlayerProjectiles] = useState<
    Array<PlayerProjectile>
  >([]);

  const cannonHeight = 40;
  const homeBaseHeight = height + cannonHeight;
  const [graphicsColor, setGraphicsColor] = useState("#ff0000");
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

  const addPlayerProjectile = () => {
    const newProjectile = {
      x: width * 0.5,
      y: y,
      vx: 0,
      vy: 0,
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

  const deleteOldProjectiles = (id: number) => {
    setPlayerProjectiles(
      playerProjectiles.filter((projectile) => projectile.id !== id)
    );
    console.log("deleted: " + id + playerProjectiles);
  };

  useTick((delta) => {
    if (playerProjectiles.length > 0) {
      const updatedProjectiles = playerProjectiles
        .map((p) => {
          return { ...p, y: p.y - delta * 0.5 };
        })
        .filter((p) => p.y >= 0); // Filter out any projectiles with y less than 0

      setPlayerProjectiles(updatedProjectiles);
    }
  });

  return (
    <>
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
