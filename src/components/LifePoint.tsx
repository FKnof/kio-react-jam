import { Graphics } from "@pixi/react";
import { useCallback } from "react";

export function LifePoint(props: any) {
  const { x, y, active } = props;
  let color = "";
  console.log(active);
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
      <Graphics draw={lifePoint} />
    </>
  );
}
