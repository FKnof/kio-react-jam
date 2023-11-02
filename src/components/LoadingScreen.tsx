import { Container, Graphics, Sprite } from "@pixi/react";
import { useCallback } from "react";

export default function LoadingScreen(props: any) {
  const { gameWidth, gameHeight } = props;
  const loadingScreen = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill("#130c5f");
      g.drawRect(0, 0, gameWidth, gameHeight);
      g.drawR;
    },
    [gameWidth, gameHeight],
  );
  return (
    <>
      <Container x={0} y={0}>
        <Sprite
          width={gameWidth}
          height={gameHeight}
          image={"./loadingscreen.jpg"}
          scale={{ x: 1, y: 1 }}
          rotation={0}
          anchor={0}
          x={0}
          y={0}
        />
      </Container>
    </>
  );
}
