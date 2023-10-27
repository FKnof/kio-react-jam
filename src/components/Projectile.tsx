import { Container, Graphics, Text, Sprite } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
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
  const { x, y, type, ownerId, color } = props;
  const rotation = ownerId == yourPlayerId ? 0 : 3;

  return (
    <Container x={x} y={y - offset}>
      <CharacterSprite
        characterTextures={characterTextures}
        type={type}
        rotation={rotation}
        color={color}
      />
    </Container>
  );
}
