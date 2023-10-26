import "@pixi/events";
import { Container, Text, useTick } from "@pixi/react";
import { useState } from "react";
import { fontstyle } from "../ui/fontstyle.ts";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import { HomeBaseCannon } from "./HomeBase-Cannon";
import { HomeBaseCastle } from "./HomeBase-Castle";
import { HomeBaseAim } from "./HomeBase-Aim";
import { HomeBaseBackground } from "./HomeBase-Background";
import { addPlayerProjectile } from "../util/addPlayerProjectile";
import Profile from "./HomeBase-Profile.tsx";
import { SelectedWeaponMarker } from "./HomeBase-SelectedWeaponMarker.tsx";

export function HomeBase(props: any) {
  const {
    x,
    y,
    height,
    width,
    mouseCoordinates,
    yourPlayerId,
    thisPlayer,
    game,
  } = props;

  const colors = ["#ffff00", "#00ffff"];
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
  const [localGameTime, setLocalGameTime] = useState(0);
  const respawnSeconds = 1;
  const respawnFrames = 60 * respawnSeconds;

  // useTick((delta) => {
  //   setLocalGameTime(localGameTime + 1 * delta);
  // });

  const handleRespawn = () => {
    const weapon =
      Math.random() < 0.33
        ? "rock"
        : Math.random() < 0.5
        ? "paper"
        : "scissors";
    const newSlots = [...slots];
    newSlots[weaponSlot] = weapon;
    setSlots(newSlots);
    setRespawnWeapon(false);
  };

  const handleSelection = (index: number) => {
    //index = schere, stein,. papier, halde
    const newSelectedWeapon = selectedWeapon; // speichere zwischen, welche Waffe gerade ausgewählt war. empty = keine ausgewählt
    setWeaponSlot(index); // Notiere, aus welchem Slot die neu ausgewählte Waffe kommt
    setSelectedWeapon(slots[index]); // Aktualisiere, welche Waffe ausgewählt ist
    console.log("slot " + slots[index] + " clicked");
    const newSlots = [...slots]; // Kopie des Slots-Arrays
    newSlots[index] = newSelectedWeapon; // setze die alte Waffe in den Slot, aus dem die neue Waffe kommt
    setSlots(newSlots); // Aktualisiere das Slots-Array
  };

  const handleSelectionFrozen = () => {
    setSelectionFrozen(false);
  };
  const handleSelectionPosition = () => {
    setSelectedPosition({ x: mouseCoordinates.x, y: y });
    setSelectionFrozen(true);
  };

  const handleShot = () => {
    if (selectedWeapon == "empty") return;
    const col = thisPlayer !== undefined ? colors[thisPlayer] : "#000000";
    const {
      newId,
      newProjectile,
    }: { newId: number; newProjectile: PlayerProjectile } = addPlayerProjectile(
      selectedWeapon,
      width,
      selectedPosition,
      mouseCoordinates,
      0,
      yourPlayerId,
      col,
      thisPlayer !== undefined ? thisPlayer : 0,
      game ? game.baseOffset : 0
    );
    Rune.actions.addProjectile({ projectile: newProjectile });
    setSelectedWeapon("empty");
    if (weaponSlot < 3) {
      handleRespawn();
    }
  };

  if (respawnWeapon) {
    handleRespawn();
  }

  if (!game) {
    return (
      <Text
        text="...Lade"
        anchor={0.5}
        x={innerWidth / 2}
        y={100}
        style={fontstyle}
      />
    );
  }
  return (
    <>
      <HomeBaseBackground width={width} pointerdown={handleShot} />
      <HomeBaseAim
        y={y}
        x={selectedPosition.x}
        mouseCoordinates={mouseCoordinates}
        selectedWeapon={selectedWeapon}
      />
      <Container
        x={x}
        y={y}
        width={width}
        eventMode={"static"}
        pointerdown={() => {
          console.log("click");
          setGraphicsColor("#00ff00");
        }}
      >
        <HomeBaseCastle
          height={height}
          width={width}
          graphicsColor={graphicsColor}
          setSelectedWeapon={setSelectedWeapon}
          selectedWeapon={selectedWeapon}
          mouseCoordinates={mouseCoordinates}
          respawnWeapon={respawnWeapon}
          setRespawnWeapon={setRespawnWeapon}
          weaponSlot={weaponSlot}
          setWeaponSlot={setWeaponSlot}
          slots={slots}
          handleSelection={handleSelection}
        />
      </Container>

      {/* Mein Profil durch Übergabe der "yourPlayerId" */}
      {/* <Profile
        playerState={game.playerState}
        playerId={yourPlayerId}
        x={width - 50}
        y={window.innerHeight - game.baseOffset}
      ></Profile>

      {/* Gegnerisches Profil durch Übergabe der "opponentPlayerId" */}
      {/* <Profile
        playerState={game.playerState}
        playerId={opponentPlayerId}
        x={width - 50}
        y={6}
      ></Profile> */}
      <SelectedWeaponMarker
        mouseCoordinates={mouseCoordinates}
        y={y}
        selectedWeapon={selectedWeapon}
        selectionFrozen={selectionFrozen}
        handleSelectionFrozen={handleSelectionFrozen}
        handleSelectionPosition={handleSelectionPosition}
        cannonHeight={cannonHeight}
        selectedPosition={selectedPosition}
      />
    </>
  );
}
