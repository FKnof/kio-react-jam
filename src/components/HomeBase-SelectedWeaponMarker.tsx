import { Sprite, Text } from "@pixi/react";
import { fontstyle } from "../ui/fontstyle";
import { HomeBaseCannon } from "./HomeBase-Cannon";
import { useEffect } from "react";
import CharacterSprite from "./sprites/character";
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
    characterTextures,
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
  // console.log(characterTextures);
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

        {/* <CharacterSprite
          characterTextures={characterTextures}
          type={selectedWeapon}
          rotation={0}
          x={selectionFrozen ? selectedPosition.x : mouseCoordinates.x}
          y={selectionFrozen ? selectedPosition.y : mouseCoordinates.y}
        /> */}
      </>
    );
}
