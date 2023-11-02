import { Sprite } from "@pixi/react";

import bluePaper from "../../assets/Character/paper_blue.png";
import blueStone from "../../assets/Character/stone_blue.png";
import blueScissors from "../../assets/Character/scissors_blue.png";
import redPaper from "../../assets/Character/paper_red.png";
import redStone from "../../assets/Character/stone_red.png";
import redScissors from "../../assets/Character/scissors_red.png";
export default function CharacterSprite({
  rotation,
  type,
  x,
  y,
  color,
}: {
  rotation: number;
  type: string;
  x?: number;
  y?: number;
  color?: string;
}) {
  const characterTexture = getCharacterTexture(type, color);

  function getCharacterTexture(type: string, color: string | undefined) {
    if (color == undefined) return;
    switch (type) {
      case "paper":
        if (color === "red") {
          return redPaper;
        } else {
          return bluePaper;
        }
        break;
      case "rock":
        if (color === "red") {
          return redStone;
        } else {
          return blueStone;
        }
        break;
      case "scissors":
        if (color === "red") {
          return redScissors;
        } else {
          return blueScissors;
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
      image={characterTexture}
      // scale={{ x: 1, y: 1 }}
      rotation={0}
      anchor={0.5}
      x={x ? x : 0}
      y={y ? y : 0}
    />
  );
}
