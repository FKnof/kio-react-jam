import { useCallback, useState } from "react";
import { Graphics, Container, Text } from "@pixi/react";
import CharacterSprite from "./sprites/Character";
export function HomeBaseCastle(props: any) {
  const {
    height,
    width,
    graphicsColor,
    slots,
    handleSelection,
    slotsCooldown,
    maxCooldown,
    characterTextures,
    color,
  } = props;

  const spacer = width / 5 / 5;

  const castle = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill(graphicsColor);
      g.drawRect(0, 0, width, height);
    },
    [height, width, graphicsColor]
  );

  const slotGraphic = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill("#000000");
      g.lineStyle(1, "#ffffff");
      g.drawRect(spacer, 20, width / 5, width / 5);
    },
    [spacer, width]
  );

  const cooldownGraphic = useCallback(
    (g: any, cooldown: number) => {
      const height = (cooldown / maxCooldown) * (width / 5);
      g.clear();
      g.beginFill("#ffffff", 0.75);
      g.lineStyle(1, "#ffffff");
      g.drawRect(spacer, 20 + (width / 5 - height), width / 5, height);
    },
    [spacer, width, maxCooldown]
  );
  return (
    <>
      <Graphics draw={castle} eventMode={"static"} />

      {slots.map((slot: string, index: number) => (
        <Container
          key={index}
          x={index * (spacer + width / 5)}
          y={0}
          width={width / 5}
          height={width / 5}
          eventMode={"static"}
          pointerdown={() => handleSelection(index)}
        >
          <Graphics draw={slotGraphic} eventMode={"static"} />
          <CharacterSprite
            characterTextures={characterTextures}
            type={slot}
            rotation={0}
            x={0}
            y={0}
            color={color}
          />
          {/* <Text
            text={slot.charAt(0) !== "e" ? slots[index].charAt(0) : ""}
            anchor={0}
            x={20}
            eventMode={"static"}
            style={fontstyle}
          /> */}
          {slotsCooldown[index] > 0 && (
            <Graphics
              draw={(g) => cooldownGraphic(g, slotsCooldown[index])}
              eventMode={"static"}
            />
          )}
        </Container>
      ))}
    </>
  );
}
