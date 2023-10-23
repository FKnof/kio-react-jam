import { Graphics } from "@pixi/react";
import { useCallback } from "react";

export function HomeBaseBackground(props: any) {
  const { width, pointerdown } = props;
  const background = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill("#ff0000");
      g.drawRect(0, 0, width, window.innerHeight);
    },
    [width]
  );
  return (
    <Graphics
      draw={background}
      eventMode={"static"}
      pointerdown={() => {
        console.log("kaboom");
        pointerdown();
      }}
    />
  );
}
