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
  // console.log(color);
  // console.log(characterTextures, type);
  const characterTexture = getCharacterTexture(type, color, characterTextures);

  function getCharacterTexture(
    type: string,
    color: string | undefined,
    characterTextures: any
  ) {
    if (color == undefined) return;
    switch (type) {
      case "paper":
        if (color === "red") {
          return characterTextures.redPaper;
        } else {
          return characterTextures.bluePaper;
        }
        break;
      case "rock":
        if (color === "red") {
          return characterTextures.redStone;
        } else {
          return characterTextures.blueStone;
        }
        break;
      case "scissors":
        if (color === "red") {
          return characterTextures.redScissors;
        } else {
          return characterTextures.blueScissors;
        }
        break;
      default:
        return undefined;

        break;
    }
  }

  if (!characterTexture) return null;

  return (
    <Sprite
      width={50}
      height={50}
      texture={characterTexture}
      // scale={{ x: 1, y: 1 }}
      rotation={0}
      anchor={0.5}
      x={x ? x : 0}
      y={y ? y : 0}
    />
  );
}
