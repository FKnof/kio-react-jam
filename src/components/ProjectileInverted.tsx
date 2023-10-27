import { Container, Graphics, Text } from "@pixi/react";
import { useCallback } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import { Sprite } from "@pixi/react";
import CharacterSprite from "./sprites/character";

export function ProjectileInverted({
  props,
  textures,
  yourPlayerId,
}: {
  props: PlayerProjectile;
  textures: any;
  yourPlayerId: string;
}) {
  const { x, y, type, ownerId } = props;
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
      <CharacterSprite textures={textures} type={type} rotation={rotation} />
    </Container>
  );
}
