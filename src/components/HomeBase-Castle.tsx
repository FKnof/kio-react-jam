import { useCallback, useState } from "react";
import { Graphics, Container, Text, Sprite } from "@pixi/react";
import CharacterSprite from "./sprites/Character";
import selectionBox from "../assets/Environment/selection_box.png";
import selectionBoxBonus from "../assets/Environment/selection_box_bonus.png";
export function HomeBaseCastle(props: any) {
  const {
    height,
    width,
    graphicsColor,
    slots,
    handleSelection,
    selectedWeapon,
    slotsCooldown,
    maxCooldown,
    characterTextures,
    environmentTextures,
    color,
    gameHeight,
    playerState,
    yourPlayerId,
  } = props;

  const spacer = width / 5 / 8;
  const cooldownGraphic = useCallback(
    (g: any, cooldown: number) => {
      const height = (cooldown / maxCooldown) * (width / 5 - 20);
      g.clear();
      g.beginFill("#ffffff", 0.75);
      g.lineStyle(1, "#ffffff");
      g.drawRect(9, width / 5 - height - 10, width / 5 - 18, height);
    },
    [width, maxCooldown],
  );

  return (
    <>
      <Sprite
        anchor={[0, 1]}
        image={environmentTextures.selectionMenu}
        x={0}
        y={gameHeight}
        width={width}
        height={height * 0.6}
      />
      <Sprite
        anchor={[0, 1]}
        image={environmentTextures.menuBot}
        x={0}
        y={gameHeight - height * 0.6}
        width={width}
        height={height * 0.4}
      />

      {playerState[yourPlayerId] !== undefined && (
        <Sprite
          anchor={[0, 1]}
          image={environmentTextures.dragLine}
          x={0}
          y={gameHeight - height}
          width={width}
          height={height * 0.2}
        />
      )}

      {playerState[yourPlayerId] !== undefined &&
        slots.map((slot: string, index: number) =>
          index !== 3 ? (
            <Container
              key={index}
              x={spacer + index * (width / 5 + spacer)}
              y={gameHeight * 0.85}
              eventMode={"static"}
              pointerup={() =>
                selectedWeapon != "empty" && handleSelection(index)
              }
              pointerdown={() =>
                selectedWeapon == "empty" && handleSelection(index)
              }
            >
              <Sprite
                anchor={[0, 0]}
                image={selectionBox}
                width={width / 5}
                height={width / 5}
                x={0}
                y={0}
              />
              <CharacterSprite
                type={slot}
                rotation={0}
                x={width / 5 / 2}
                y={width / 5 / 2}
                color={color}
              />
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
              pointerup={() =>
                selectedWeapon != "empty" && handleSelection(index)
              }
              pointerdown={() =>
                selectedWeapon == "empty" && handleSelection(index)
              }
            >
              <Sprite
                anchor={[0, 0]}
                image={selectionBoxBonus}
                width={width / 5}
                height={width / 5}
                x={0}
                y={0}
              />
              <CharacterSprite
                type={slot}
                rotation={0}
                x={width / 5 / 2}
                y={width / 5 / 2}
                color={color}
              />
              {slotsCooldown[index] > 0 && (
                <Graphics
                  draw={(g) => cooldownGraphic(g, slotsCooldown[index])}
                  eventMode={"static"}
                />
              )}
            </Container>
          ),
        )}
    </>
  );
}
