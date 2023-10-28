import { Container, Graphics, Text } from "@pixi/react";
import { useCallback } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import { Sprite } from "@pixi/react";
import CharacterSprite from "./sprites/Character";

export function ProjectileInverted({
  props,
  characterTextures,
  yourPlayerId,
  gameHeight,
  gameWidth,
}: {
  props: PlayerProjectile;
  characterTextures: any;
  yourPlayerId: string;
  gameHeight: number;
  gameWidth: number;
}) {
  const { x, y, vx, vy, type, ownerId, color, radius } = props;
  const width = gameWidth;
  const height = gameHeight;

  const baseRotation = Math.PI / 2;
  const movementRotation = Math.atan2(vy, vx);

  const adjustedRotation =
    ownerId === yourPlayerId
      ? (baseRotation - movementRotation) * -1
      : baseRotation + movementRotation;
  const scale = ownerId == yourPlayerId ? 1 : -1;

  return (
    <Container
      x={width - x}
      y={height - y}
      rotation={adjustedRotation}
      scale={{ x: 1, y: scale }}
    >
      <CharacterSprite
        characterTextures={characterTextures}
        type={type}
        rotation={0}
        color={color}
      />
    </Container>
  );
}
