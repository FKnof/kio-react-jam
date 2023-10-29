import { Graphics } from "@pixi/react";
import { useCallback } from "react";

export default function LoadingScreen(props: any) {
  const { gameWidth, gameHeight } = props;
  const loadingScreen = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill("#130C5F");
      g.drawRect(0, 0, gameWidth, gameHeight);
      g.drawR;
    },
    [gameWidth, gameHeight]
  );
  return <Graphics draw={loadingScreen} anchor={[0.5, 0.5]} />;
}
