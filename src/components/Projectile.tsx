import { Graphics } from "@pixi/react";
import { useCallback } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";

export function Projectile({ props }: { props: PlayerProjectile }) {
  const { x, y, radius, color } = props;

  const projectile = useCallback(
    (g: any) => {
      g.clear();
      g.lineStyle(2, color, 1);
      g.beginFill("#fefefe");
      g.drawCircle(x, y, radius);
    },
    [color, radius, x, y]
  );

  return <Graphics draw={projectile} />;
}
