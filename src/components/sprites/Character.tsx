import { Sprite } from "@pixi/react";

export default function CharacterSprite({
  rotation,
  textures,
  type,
}: {
  rotation: number;
  textures: any;
  type: string;
}) {
  let characterTexture;

  console.log(textures, type);
  switch (type) {
    case "paper":
      characterTexture = textures.paper;
      break;
    case "rock":
      characterTexture = textures.stone;
      break;
    case "scissors":
      characterTexture = textures.scissors;
      break;
    default:
      characterTexture = textures.paper;
      break;
  }
  console.log(characterTexture);

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
      x={0}
      y={0}
    />
  );
}
