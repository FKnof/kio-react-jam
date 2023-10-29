import { Container, Sprite } from "@pixi/react";
import { useEffect, useState } from "react";

export function Healthbar(props: any) {
  const {
    x,
    y,
    healthbarTextures,
    maxLife,
    yourPlayerId,
    playerState,
    forPlayer,
    gameWidth,
  } = props;
  const [healthbar, setHealthbar] = useState<any>([]);

  useEffect(() => {
    const itemList = Array(maxLife)
      .fill(null)
      .map((_, index) => {
        if (index === 0) {
          if (index < playerState[forPlayer].life) {
            if (forPlayer === yourPlayerId) {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[0, 0]}
                  texture={healthbarTextures.greenLeft}
                  x={index * 15}
                  y={0}
                />
              );
            } else {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[1, 0]}
                  texture={healthbarTextures.greenRight}
                  x={gameWidth}
                  y={0}
                />
              );
            }
          } else {
            if (forPlayer === yourPlayerId) {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[0, 0]}
                  texture={healthbarTextures.redLeft}
                  x={index * 15}
                  y={0}
                />
              );
            } else {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[1, 0]}
                  texture={healthbarTextures.redRight}
                  x={gameWidth}
                  y={0}
                />
              );
            }
          }
        } else if (index === maxLife - 1) {
          if (index < playerState[forPlayer].life) {
            if (forPlayer === yourPlayerId) {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[0, 0]}
                  texture={healthbarTextures.greenRight}
                  x={index * 15}
                  y={0}
                />
              );
            } else {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[1, 0]}
                  texture={healthbarTextures.greenLeft}
                  x={gameWidth - index * 15}
                  y={0}
                />
              );
            }
          } else {
            if (forPlayer === yourPlayerId) {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[0, 0]}
                  texture={healthbarTextures.redRight}
                  x={index * 15}
                  y={0}
                />
              );
            } else {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[1, 0]}
                  texture={healthbarTextures.redLeft}
                  x={gameWidth - index * 15}
                  y={0}
                />
              );
            }
          }
        } else {
          if (index < playerState[forPlayer].life) {
            if (forPlayer === yourPlayerId) {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[0, 0]}
                  texture={healthbarTextures.greenCenter}
                  x={index * 15}
                  y={0}
                />
              );
            } else {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[1, 0]}
                  texture={healthbarTextures.greenCenter}
                  x={gameWidth - index * 15}
                  y={0}
                />
              );
            }
          } else {
            if (forPlayer === yourPlayerId) {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[0, 0]}
                  texture={healthbarTextures.redCenter}
                  x={index * 15}
                  y={0}
                />
              );
            } else {
              return (
                <Sprite
                  key={index}
                  width={15}
                  height={25}
                  anchor={[1, 0]}
                  texture={healthbarTextures.redCenter}
                  x={gameWidth - index * 15}
                  y={0}
                />
              );
            }
          }
        }
      });

    setHealthbar(itemList);
  }, [
    forPlayer,
    gameWidth,
    healthbarTextures.greenCenter,
    healthbarTextures.greenLeft,
    healthbarTextures.greenRight,
    healthbarTextures.redCenter,
    healthbarTextures.redLeft,
    healthbarTextures.redRight,
    maxLife,
    playerState,
    yourPlayerId,
  ]);

  return (
    <>
      <Container position={{ x: x, y: y }}>{healthbar}</Container>
    </>
  );
}
