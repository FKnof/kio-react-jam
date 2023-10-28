import { Graphics, Sprite } from "@pixi/react";
import { useCallback } from "react";

export function LifePoint(props: any) {
  const { x, y, active, healthbarTextures } = props;
  let color = "";

  switch (active) {
    case true:
      color = "00FF1A";
      break;
    case false:
      color = "D8D8D8";
      break;
  }
  const lifePoint = useCallback(
    (g: any) => {
      g.clear();
      g.lineStyle(2, "#000000", 1);
      g.beginFill(color);
      g.drawCircle(x, y, 8);
    },
    [x, y, color]
  );

  return (
    <>
      <Sprite
        anchor={[0, 1]}
        texture={healthbarTextures.greenCenter}
        x={0}
        y={50}
        width={20}
        height={20}
      />
    </>
  );
}
