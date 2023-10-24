import { Graphics } from "@pixi/react";
import { useCallback } from "react";

export function HomeBaseCastle(props: any) {
  const { height, width, graphicsColor } = props;

  const castle = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill(graphicsColor);
      g.drawRect(0, 0, width, height);
    },
    [height, width, graphicsColor]
  );
  return (
    <Graphics
      draw={castle}
      pointerdown={() => {
        console.log("pointer down");
      }}
      eventMode={"static"}
    />
  );
}
