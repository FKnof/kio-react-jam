import { Container, Graphics, Sprite, useTick } from "@pixi/react";
import { useCallback, useState } from "react";

export function HomeBaseBackground(props: any) {
  const {
    width,
    pointerup,
    scaleY,
    height,
    environmentTextures,
    backgroundTextures,
  } = props;
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
          console.log("kaboom");
          pointerup();
        }}
      />
      <Container position={[0, 0]}>
        <Sprite
          anchor={0.5}
          scale={1}
          x={60}
          y={120}
          texture={backgroundTextures.moon}
        />
        <Sprite
          anchor={0.5}
          scale={1}
          x={230}
          y={200}
          texture={backgroundTextures.stars}
        />
        <Sprite
          anchor={0.5}
          scale={1}
          x={270}
          y={110}
          texture={backgroundTextures.starVariation1}
        />
        <Sprite
          anchor={0.5}
          scale={1}
          x={330}
          y={310}
          texture={backgroundTextures.starVariation2}
        />
        <Sprite
          anchor={0.5}
          scale={1}
          x={240}
          y={420}
          texture={backgroundTextures.starVariation3}
        />
        <Sprite
          anchor={0.5}
          scale={1}
          x={70}
          y={320}
          texture={backgroundTextures.starVariation4}
        />
        <Sprite
          anchor={0.5}
          scale={1}
          x={150}
          y={60}
          texture={backgroundTextures.starVariation5}
        />
        <Sprite
          anchor={0.5}
          scale={1}
          x={130}
          y={210}
          texture={backgroundTextures.starVariation6}
        />
        <Sprite
          anchor={0.5}
          scale={1}
          x={50}
          y={450}
          texture={backgroundTextures.starVariation7}
        />
      </Container>
    </>
  );
}
