import { Sprite, Text } from "@pixi/react";
import { fontstyle } from "../ui/fontstyle";
import { useState } from "react";
import { Resource, Texture } from "pixi.js";
export function Collision(props: any) {
  const {
    collision,
    game,
    collisionTextures,
    gameHeight,
    gameWidth,
    thisPlayer,
    index,
  } = props;
  const textureArray: Texture<Resource>[] = Object.values(collisionTextures);
  const [texture, setTexture] = useState<Texture<Resource> | undefined>(
    textureArray[Math.floor(Math.random() * textureArray.length)]
  );
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

  return (
    <Sprite
      width={150}
      height={150}
      texture={texture}
      alpha={alpha}
      // scale={{ x: 1, y: 1 }}
      rotation={0}
      anchor={0.5}
      x={x ? x : 0}
      y={y ? y : 0}
    />
  );
}
