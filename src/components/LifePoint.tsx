import { Graphics } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";

export function LifePoint(props: any) {
  const { x, y, active } = props;
  const [color, setColor] = useState("#000000");
  // console.log(active);
  useEffect(() => {
    switch (active) {
      case true:
        setColor("#00FF1A");
        break;
      case false:
        setColor("#D8D8D8");
        break;
    }
  }, [active]);

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
