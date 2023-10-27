import { Container, Graphics, Text } from "@pixi/react";
import { useCallback } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";

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
      <Graphics draw={projectile} />
      <Text text={type.charAt(0)} anchor={0.5} x={0} y={0} />
    </Container>
  );
}
