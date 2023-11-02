import { Sprite, Text } from "@pixi/react";
import { useState, useEffect } from "react";
import { ImageSource } from "pixi.js";
export function Collision(props: any) {
  const {
    collision,
    game,
    collisionTextures,
    gameHeight,
    gameWidth,
    thisPlayer,
  } = props;

  const textureArray: ImageSource[] = Object.values(collisionTextures);
  const [collisionTexture, setCollisionTexture] = useState<
    ImageSource | undefined
  >(textureArray[0]);
  useEffect(() => {
    const newTexture =
      textureArray[Math.floor(Math.random() * textureArray.length)];
    setCollisionTexture(newTexture);
  }, []);
  const x = thisPlayer == 0 ? collision.x : gameWidth - collision.x;
  const pureY = collision.y - game.baseOffset;
  const y = thisPlayer == 0 ? pureY : gameHeight - collision.y;

  const alpha = mapAlpha(collision.age);

  function mapAlpha(input: number) {
    const inputMin = 0;
    const inputMax = game.maxCollisionAge; // max Duration
    const outputMin = 1;
    const outputMax = 0;

    return (
      ((input - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
      outputMin
    );
  }

  if (collisionTexture == undefined) {
    return;
  }

  return (
    <Sprite
      width={150}
      height={150}
      image={collisionTexture.toString()}
      alpha={alpha}
      // scale={{ x: 1, y: 1 }}
      rotation={0}
      anchor={0.5}
      x={x ? x : 0}
      y={y ? y : 0}
    />
  );
}
