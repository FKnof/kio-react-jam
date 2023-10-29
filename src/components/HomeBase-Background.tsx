import { Container, Graphics, Sprite } from "@pixi/react";
import { useCallback } from "react";

export function HomeBaseBackground(props: any) {
  const { width, pointerup, height, backgroundTextures } = props;
  const background = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill("#130C5F");
      g.drawRect(0, 0, width, height);
    },
    [width, height]
  );

  // console.log(backgroundTextures);
  return (
    <>
      <Graphics
        draw={background}
        eventMode={"static"}
        pointerup={() => {
          // console.log("kaboom");
          pointerup();
        }}
      />
      <Container position={[0, 0]}>
        <Sprite
          anchor={0}
          scale={1}
          x={0}
          y={0}
          texture={backgroundTextures.fullBG}
        />
      </Container>
    </>
  );
}
