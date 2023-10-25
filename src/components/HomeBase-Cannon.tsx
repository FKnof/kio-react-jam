import { Graphics, useTick } from "@pixi/react";
import { useCallback, useState } from "react";

export function HomeBaseCannon(props: any) {
  const { x, cannonHeight, y } = props;
  const [currentHeight, setCurrentHeight] = useState(0);
  const [currentAlpha, setCurrentAlpha] = useState(0);
  useTick((delta) => {
    if (currentHeight < cannonHeight) setCurrentHeight(currentHeight + 4);
    if (currentAlpha <= 1.1) setCurrentAlpha(currentAlpha + 0.1);
  });
  const cannon = useCallback(
    (g: any) => {
      g.clear();
      g.lineStyle(2, "#000000", currentAlpha);
      g.beginFill("#fefefe", currentAlpha);
      g.drawCircle(x, y, currentHeight);
    },
    [x, currentHeight, y]
  );
  return (
    <Graphics
      draw={cannon}
      pointerdown={() => {
        console.log("cannon shot");
      }}
      eventMode={"static"}
    />
  );
}
