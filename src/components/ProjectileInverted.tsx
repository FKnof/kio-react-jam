import { Container, Graphics, Text } from "@pixi/react";
import { useCallback } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import { Sprite } from "@pixi/react";
import CharacterSprite from "./sprites/character";

export function ProjectileInverted({
  props,
  characterTextures,
  yourPlayerId,
}: {
  props: PlayerProjectile;
  characterTextures: any;
  yourPlayerId: string;
}) {
  const { x, y, type, ownerId, color } = props;
  const width = window.innerWidth;
  const height = window.innerHeight;
  let rotation = 0;
  if (ownerId !== yourPlayerId) {
    rotation = 3;
  } else {
    rotation = 0;
  }

  return (
    <Container x={width - x} y={height - y}>
      <CharacterSprite
        characterTextures={characterTextures}
        type={type}
        rotation={rotation}
        color={color}
      />
    </Container>
  );
}
