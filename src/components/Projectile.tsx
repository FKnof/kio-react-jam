import { Container } from "@pixi/react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import CharacterSprite from "./sprites/Character";

export function Projectile({
  props,
  offset,
  characterTextures,
  yourPlayerId,
}: {
  props: PlayerProjectile;
  offset: number;
  characterTextures: any;
  yourPlayerId: string;
}) {
  const { x, y, vx, vy, type, ownerId, color } = props;

  // Calculate the angle in radians
  const baseRotation = Math.PI / 2;
  const movementRotation = Math.atan2(vy, vx);

  const adjustedRotation =
    ownerId === yourPlayerId
      ? baseRotation + movementRotation
      : baseRotation - movementRotation;

  const scale = ownerId == yourPlayerId ? 1 : -1;
  return (
    <Container
      x={x}
      y={y - offset}
      rotation={adjustedRotation * scale}
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
