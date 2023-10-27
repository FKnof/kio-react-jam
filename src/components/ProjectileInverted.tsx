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
  const { x, y, type, ownerId, color, radius } = props;
  const width = gameWidth;
  const height = gameHeight;
  const rotation = ownerId == yourPlayerId ? 0 : 3;

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
