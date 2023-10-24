import { Graphics } from "@pixi/react";
import { useCallback } from "react";

export function HomeBaseCannon(props: any) {
  const { width, cannonHeight } = props;
  const cannon = useCallback(
    (g: any) => {
      g.clear();
      g.lineStyle(2, "#000000", 1);
      g.beginFill("#fefefe");
      g.drawCircle(width * 0.5, 0, cannonHeight);
    },
    [width, cannonHeight]
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
