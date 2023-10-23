import { Graphics } from "@pixi/react";
import { useCallback } from "react";

export function HomeBaseAim(props: any) {
  const { width, mouseCoordinates, y } = props;

  const aim = useCallback(
    (g: any) => {
      g.clear();
      g.lineStyle(2, "#000000", 1);
      g.moveTo(width * 0.5, y);
      g.lineTo(mouseCoordinates.x, mouseCoordinates.y);
    },
    [width, mouseCoordinates, y]
  );

  return <Graphics draw={aim} />;
}
