import { Sprite } from "@pixi/react";

export default function CharacterSprite({
  rotation,
  characterTextures,
  type,
  x,
  y,
}: {
  rotation: number;
  characterTextures: any;
  type: string;
  x?: number;
  y?: number;
}) {
  let characterTexture;

  // console.log(characterTextures, type);
  switch (type) {
    case "paper":
      characterTexture = characterTextures.paper;
      break;
    case "rock":
      characterTexture = characterTextures.stone;
      break;
    case "scissors":
      characterTexture = characterTextures.scissors;
      break;
    default:
      characterTexture = characterTextures.paper;
      break;
  }

  if (rotation) {
    rotation = 3;
  } else {
    rotation = 0;
  }

  return (
    <Sprite
      texture={characterTexture}
      scale={{ x: 0.5, y: 0.5 }}
      rotation={rotation}
      anchor={0.5}
      x={x ? x : 0}
      y={y ? y : 0}
    />
  );
}
