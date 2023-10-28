import { useCallback, useState } from "react";
import { Graphics, Container, Text, Sprite } from "@pixi/react";
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
    environmentTextures,
    color,
    gameHeight,
  } = props;
  console.log(height);

  const spacer = width / 5 / 8;

  const cooldownGraphic = useCallback(
    (g: any, cooldown: number) => {
      const height = (cooldown / maxCooldown) * (width / 5);
      g.clear();
      g.beginFill("#ffffff", 0.75);
      g.lineStyle(1, "#ffffff");
      g.drawRect(0, width / 5 - height, width / 5, height);
    },
    [width, maxCooldown]
  );
  return (
    <>
      {/* <Graphics draw={castle} eventMode={"static"} /> */}
      <Sprite
        anchor={[0, 1]}
        texture={environmentTextures.selectionMenu}
        x={0}
        y={gameHeight}
        width={width}
        height={height * 0.6}
      />
      <Sprite
        anchor={[0, 1]}
        texture={environmentTextures.menuBot}
        x={0}
        y={gameHeight - height * 0.6}
        width={width}
        height={height * 0.4}
      />
      <Sprite
        anchor={[0, 1]}
        texture={environmentTextures.dragLine}
        x={0}
        y={gameHeight - height}
        width={width}
        height={height * 0.2}
      />

      {slots.map((slot: string, index: number) =>
        index !== 3 ? (
          <Container
            key={index}
            x={spacer + index * (width / 5 + spacer)}
            y={gameHeight * 0.85}
            eventMode={"static"}
            pointerdown={() => handleSelection(index)}
          >
            {/* <Graphics draw={slotGraphic} eventMode={"static"} /> */}
            <Sprite
              anchor={[0, 0]}
              texture={environmentTextures.selectionBox}
              width={width / 5}
              height={width / 5}
              x={0}
              y={0}
            />
            <CharacterSprite
              characterTextures={characterTextures}
              type={slot}
              rotation={0}
              x={width / 5 / 2}
              y={width / 5 / 2}
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
        ) : (
          <Container
            key={index}
            x={spacer + index * (width / 5 + spacer) + spacer * 2}
            y={gameHeight * 0.85}
            eventMode={"static"}
            pointerdown={() => handleSelection(index)}
          >
            {/* <Graphics draw={slotGraphic} eventMode={"static"} /> */}
            <Sprite
              anchor={[0, 0]}
              texture={environmentTextures.selectionBoxBonus}
              width={width / 5}
              height={width / 5}
              x={0}
              y={0}
            />
            <CharacterSprite
              characterTextures={characterTextures}
              type={slot}
              rotation={0}
              x={width / 5 / 2}
              y={width / 5 / 2}
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
        )
      )}
    </>
  );
}
