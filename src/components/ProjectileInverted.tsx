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
export function ProjectileInverted({
  props,
  gameHeight,
  gameWidth,
}: {
  props: PlayerProjectile;
  gameHeight: number;
  gameWidth: number;
}) {
  const { x, y, radius, color, type } = props;
  const width = gameWidth;
  const height = gameHeight;

  const projectile = useCallback(
    (g: any) => {
      g.clear();
      g.lineStyle(2, color, 1);
      g.beginFill("#fefefe");
      g.drawCircle(0, 0, radius);
    },
    [color, radius]
  );

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
