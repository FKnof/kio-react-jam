import { Container, Graphics, Text, Sprite } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import CharacterSprite from "./sprites/character";

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
  const { x, y, type, ownerId } = props;

  let rotation = 0;
  if (ownerId !== yourPlayerId) {
    rotation = 3;
  } else {
    rotation = 0;
  }
  return (
    <Container x={x} y={y - offset}>
      <CharacterSprite
        characterTextures={characterTextures}
        type={type}
        rotation={rotation}
      />
    </Container>
  );
}
