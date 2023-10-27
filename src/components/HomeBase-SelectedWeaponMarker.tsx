import { Sprite, Text } from "@pixi/react";
import { fontstyle } from "../ui/fontstyle";
import { HomeBaseCannon } from "./HomeBase-Cannon";
import { useEffect } from "react";
export function SelectedWeaponMarker(props: any) {
  const {
    mouseCoordinates,
    y,
    selectedWeapon,
    selectionFrozen,
    handleSelectionFrozen,
    handleSelectionPosition,
    cannonHeight,
    selectedPosition,
  } = props;

  useEffect(() => {
    if (
      selectedWeapon !== "empty" &&
      !selectionFrozen &&
      mouseCoordinates.y < y
    )
      handleSelectionPosition();

    if (selectedWeapon !== "empty" && selectionFrozen && mouseCoordinates.y > y)
      handleSelectionFrozen();
  }, [
    selectedWeapon,
    selectionFrozen,
    mouseCoordinates.y,
    y,
    handleSelectionPosition,
    handleSelectionFrozen,
  ]);

  if (selectedWeapon !== "empty")
    return (
      <>
        {selectionFrozen && (
          <HomeBaseCannon
            x={selectedPosition.x}
            y={selectedPosition.y}
            cannonHeight={cannonHeight}
          />
        )}
        {/* <Sprite
          texture={characterTexture}
          scale={{ x: 0.5, y: 0.5 }}
          anchor={0.5}
          x={0}
          y={0}
        /> */}
        {/* <Text
          text={selectedWeapon.charAt(0)}
          anchor={0.5}
          x={selectionFrozen ? selectedPosition.x : mouseCoordinates.x}
          y={selectionFrozen ? selectedPosition.y : mouseCoordinates.y}
          style={fontstyle}
        /> */}
      </>
    );
}
