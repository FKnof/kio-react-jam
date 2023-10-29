import { Graphics } from "@pixi/react";
import { useCallback } from "react";

export function HomeBaseAim(props: any) {
  const { x, mouseCoordinates, y, selectedWeapon } = props;

  const aim = useCallback(
    (g: any) => {
      g.clear();
      g.lineStyle(2, "#000000", 1);
      g.moveTo(x, y);
      g.lineTo(mouseCoordinates.x, mouseCoordinates.y);
    },
    [x, mouseCoordinates, y]
  );

  if (selectedWeapon !== "empty" && mouseCoordinates.y < y)
    return <Graphics draw={aim} />;
}
