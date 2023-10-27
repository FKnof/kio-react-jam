import { Sprite } from "@pixi/react";

export default function CharacterSprite({
  rotation,
  characterTextures,
  type,
  x,
  y,
  color,
}: {
  rotation: number;
  characterTextures: any;
  type: string;
  x?: number;
  y?: number;
  color?: string;
}) {
  let characterTexture;
  // console.log(color);
  // console.log(characterTextures, type);

  switch (type) {
    case "paper":
      if (color === "red") {
        characterTexture = characterTextures.redPaper;
      } else {
        characterTexture = characterTextures.bluePaper;
      }
      break;
    case "rock":
      if (color === "red") {
        characterTexture = characterTextures.redStone;
      } else {
        characterTexture = characterTextures.blueStone;
      }
      break;
    case "scissors":
      if (color === "red") {
        characterTexture = characterTextures.redScissors;
      } else {
        characterTexture = characterTextures.blueScissors;
      }
      break;
    default:
      if (color === "red") {
        characterTexture = characterTextures.redScissors;
      } else {
        characterTexture = characterTextures.blueScissors;
      }

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
      scale={{ x: 1, y: 1 }}
      rotation={rotation}
      anchor={0.5}
      x={x ? x : 0}
      y={y ? y : 0}
    />
  );
}
