import "@pixi/events";
import { Container, Sprite, Text, useTick } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { fontstyle } from "../ui/fontstyle.ts";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import { HomeBaseCastle } from "./HomeBase-Castle";
import { HomeBaseAim } from "./HomeBase-Aim";
import { HomeBaseBackground } from "./HomeBase-Background";
import { addPlayerProjectile } from "../util/addPlayerProjectile";
import Profile from "./HomeBase-Profile.tsx";
import { SelectedWeaponMarker } from "./HomeBase-SelectedWeaponMarker.tsx";
import { sounds } from "./MusicLoader";

export function HomeBase(props: any) {
  const {
    x,
    y,
    height,
    width,
    gameHeight,
    mouseCoordinates,
    scaleX,
    scaleY,
    players,
    yourPlayerId,
    opponentPlayerId,
    thisPlayer,
    game,
    characterTextures,
    environmentTextures,
    backgroundTextures,
    healthbarTextures,
  } = props;

  const colors = ["red", "blue"];
  const [selectedPosition, setSelectedPosition] = useState({ x: 0, y: y });
  const [selectedWeapon, setSelectedWeapon] = useState<string>("empty");
  const [selectionFrozen, setSelectionFrozen] = useState(false);
  const [weaponSlot, setWeaponSlot] = useState(0);
  const [respawnWeapon, setRespawnWeapon] = useState(false);
  const cannonHeight = 30;
  const [graphicsColor, setGraphicsColor] = useState("#0000ff");

  const [slots, setSlots] = useState<Array<string>>([
    "rock",
    "paper",
    "scissors",
    "empty",
  ]);
  const [slotsCooldown, setSlotsCooldown] = useState([0, 0, 0, 0]);

  const [localGameTime, setLocalGameTime] = useState(0);
  const respawnSeconds = 5;
  const respawnFrames = 60 * respawnSeconds;

  useTick((delta) => {
    const newSlotsCooldown = [...slotsCooldown];
    for (let i = 0; i < newSlotsCooldown.length; i++) {
      if (newSlotsCooldown[i] > 0) {
        newSlotsCooldown[i]--;
      }
    }
    setSlotsCooldown(newSlotsCooldown);
  });

  const handleRespawn = useCallback(() => {
    const newSlots = [...slots];
    const newSlotsCooldown = [...slotsCooldown];
    let updated = 0;
    for (let i = 0; i < newSlots.length - 1; i++) {
      if (newSlots[i] === "empty" && updated < 3) {
        const weapon =
          Math.random() < 0.33
            ? "rock"
            : Math.random() < 0.66
            ? "paper"
            : "scissors";
        newSlots[i] = weapon;
        newSlotsCooldown[i] = respawnFrames;
        updated++;
      }
    }
    setSlots(newSlots);
    setSlotsCooldown(newSlotsCooldown);
    setRespawnWeapon(false);
  }, [respawnFrames, slots, slotsCooldown]);

  useEffect(() => {
    if (respawnWeapon) {
      handleRespawn();
    }
  }, [respawnWeapon, handleRespawn]);

  const handleSelection = (index: number) => {
    if (slotsCooldown[index] > 0) {
      //console.log("cooldown");
      return;
    }
    //index = schere, stein,. papier, halde
    const oldSelectedWeapon = selectedWeapon; // speichere zwischen, welche Waffe gerade ausgewählt war. empty = keine ausgewählt
    const oldSlot = weaponSlot; // speichere den Alten weaponSlot zwischen
    const newSelectedWeapon = slots[index]; // speichere die neue Waffe, die ausgewählt werden soll
    setWeaponSlot(index); // Notiere, aus welchem Slot die neu ausgewählte Waffe kommt
    setSelectedWeapon(newSelectedWeapon); // Aktualisiere, welche Waffe ausgewählt ist
    const newSlots = [...slots]; // Kopie des Slots-Arrays
    newSlots[index] = oldSelectedWeapon; // setze die alte Waffe in den Slot, aus dem die neue Waffe kommt
    setSlots(newSlots); // Aktualisiere das Slots-Array

    if (
      index == 3 &&
      newSelectedWeapon == "empty" &&
      oldSelectedWeapon != "empty"
    ) {
      setRespawnWeapon(true);
    }
  };

  const handleSelectionFrozen = () => {
    setSelectionFrozen(false);
  };
  const handleSelectionPosition = () => {
    setSelectedPosition({ x: mouseCoordinates.x, y: y });
    setSelectionFrozen(true);
  };

  const handleAbortedShot = () => {
    handleSelection(weaponSlot);
  };

  const handleShot = () => {
    if (selectedWeapon == "empty") return;
    if (mouseCoordinates.y > y) {
      handleAbortedShot();
      return;
    }
    const col = thisPlayer !== undefined ? colors[thisPlayer] : "no color";
    const {
      newId,
      newProjectile,
    }: { newId: number; newProjectile: PlayerProjectile } = addPlayerProjectile(
      selectedWeapon,
      width,
      gameHeight,
      selectedPosition,
      mouseCoordinates,
      0,
      yourPlayerId,
      col,
      thisPlayer !== undefined ? thisPlayer : 0,
      game ? game.baseOffset : 0
    );
    Rune.actions.addProjectile({ projectile: newProjectile });
    sounds.shoot.play();
    setSelectedWeapon("empty");
    if (weaponSlot < 3) {
      handleRespawn();
    }
  };

  if (
    !game ||
    !characterTextures ||
    !environmentTextures ||
    !backgroundTextures ||
    !healthbarTextures
  ) {
    return (
      <Text
        text="...Lade"
        anchor={0.5}
        x={width / 2}
        y={100}
        style={fontstyle}
      />
    );
  }
  // console.log(backgroundTextures);
  // console.log(backgroundTextures);
  return (
    <>
      <HomeBaseBackground
        width={width}
        height={gameHeight}
        scaleY={scaleY}
        pointerup={handleShot}
        environmentTextures={environmentTextures}
        backgroundTextures={backgroundTextures}
      />
      <HomeBaseAim
        y={y}
        x={selectedPosition.x}
        mouseCoordinates={mouseCoordinates}
        selectedWeapon={selectedWeapon}
      />

      <HomeBaseCastle
        height={height}
        width={width}
        graphicsColor={graphicsColor}
        slots={slots}
        handleSelection={handleSelection}
        selectedWeapon={selectedWeapon}
        slotsCooldown={slotsCooldown}
        maxCooldown={respawnFrames}
        characterTextures={characterTextures}
        environmentTextures={environmentTextures}
        color={colors[thisPlayer]}
        gameHeight={gameHeight}
      />
      {/* </Container> */}

      {/* Mein Profil durch Übergabe der "yourPlayerId" */}
      <Profile
        playerState={game.playerState}
        yourPlayerId={yourPlayerId}
        x={0}
        y={10}
        opponentPlayerId={opponentPlayerId}
        allPlayer={players}
        maxLife={game.maxlife}
        environmentTextures={environmentTextures}
        healthbarTextures={healthbarTextures}
        gameHeight={gameHeight}
        gameWidth={width}
      />
      <SelectedWeaponMarker
        mouseCoordinates={mouseCoordinates}
        y={y}
        selectedWeapon={selectedWeapon}
        selectionFrozen={selectionFrozen}
        handleSelectionFrozen={handleSelectionFrozen}
        handleSelectionPosition={handleSelectionPosition}
        cannonHeight={cannonHeight}
        selectedPosition={selectedPosition}
        characterTextures={characterTextures}
        color={colors[thisPlayer]}
      />
    </>
  );
}
