import { Text } from "@pixi/react";
import { fontstyle } from "../ui/fontstyle";
import { useState } from "react";
import { HomeBaseCannon } from "./HomeBase-Cannon";
export function SelectedWeaponMarker(props: any) {
  const {
    mouseCoordinates,
    y,
    selectedWeapon,
    setSelectedPosition,
    cannonHeight,
  } = props;
  const [selectionFrozen, setSelectionFrozen] = useState(false);
  const [thisPosition, setThisPosition] = useState({ x: 0, y: 0 });

  const handleSelectionPosition = () => {
    setSelectedPosition({ x: mouseCoordinates.x, y: y });
    setThisPosition({ x: mouseCoordinates.x, y: y });
    setSelectionFrozen(true);
  };

  if (selectedWeapon !== "empty" && !selectionFrozen && mouseCoordinates.y < y)
    handleSelectionPosition();

  if (selectedWeapon !== "empty" && selectionFrozen && mouseCoordinates.y > y)
    setSelectionFrozen(false);

  if (selectedWeapon !== "empty")
    return (
      <>
        {selectionFrozen && (
          <HomeBaseCannon
            x={thisPosition.x}
            y={thisPosition.y}
            cannonHeight={cannonHeight}
          />
        )}
        <Text
          text={selectedWeapon.charAt(0)}
          anchor={0.5}
          x={selectionFrozen ? thisPosition.x : mouseCoordinates.x}
          y={selectionFrozen ? thisPosition.y : mouseCoordinates.y}
          style={fontstyle}
        />
      </>
    );
}
