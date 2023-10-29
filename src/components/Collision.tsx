import { Sprite, Text } from "@pixi/react";
import { fontstyle } from "../ui/fontstyle";
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
  const x = thisPlayer == 0 ? collision.x : gameWidth - collision.x;
  const pureY = collision.y - game.baseOffset;
  const y = thisPlayer == 0 ? pureY : gameHeight - collision.y;
  const textureArray = Object.values(collisionTextures);
  const texture = textureArray[Math.floor(Math.random() * textureArray.length)];
  console.log(texture);
  return (
    <Sprite
      width={150}
      height={150}
      texture={texture}
      // scale={{ x: 1, y: 1 }}
      rotation={0}
      anchor={0.5}
      x={x ? x : 0}
      y={y ? y : 0}
    />
  );
}
