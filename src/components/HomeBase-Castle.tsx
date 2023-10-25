import { Graphics, Container, Text, useTick } from "@pixi/react";
import { fontstyle } from "../ui/fontstyle";
import { useCallback, useState } from "react";

export function HomeBaseCastle(props: any) {
  const {
    height,
    width,
    graphicsColor,
    slots,
    handleSelection,
    setSelectedWeapon,
    selectedWeapon,
    mouseCoordinates,
    respawnWeapon,
    setRespawnWeapon,
    weaponSlot,
    setWeaponSlot,
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

  return (
    <>
      <Graphics
        draw={castle}
        pointerdown={() => {
          console.log("pointer down");
        }}
        eventMode={"static"}
      />
      {slots.map((slot, index: number) => {
        return (
          <Container
            key={index}
            x={index * (spacer + width / 5)}
            y={0}
            width={width / 5}
            height={width / 5}
            eventMode={"static"}
            pointerdown={() => {
              handleSelection(index);
            }}
          >
            <Graphics draw={slotGraphic} key={index} eventMode={"static"} />
            <Text
              text={slot.charAt(0) !== "e" ? slots[index].charAt(0) : ""}
              anchor={0}
              x={20}
              eventMode={"static"}
              style={fontstyle}
            />
          </Container>
        );
      })}
    </>
  );
}
