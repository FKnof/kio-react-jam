import { Text } from "@pixi/react";
import React from "react";
import * as PIXI from "pixi.js";

export interface PlayerState {
  [playerId: string]: {
    color: string;
    life: number;
    playerIndex: number;
  };
}

export function Profile({
  playerState,
  playerId,
  x,
  y,
}: {
  playerState: PlayerState;
  playerId: string;
  x: number;
  y: number;
}) {
  const life = playerState[playerId].life;
  console.log(life);
  return (
    <>
      <Text
        text={playerState[playerId].life.toString()}
        anchor={0}
        x={x}
        y={y}
        style={
          new PIXI.TextStyle({
            align: "center",
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: 50,
            fontWeight: "400",
            fill: "#ffffff", // gradient
            stroke: "#000000",
            strokeThickness: 5,
            letterSpacing: 20,

            wordWrap: true,
            wordWrapWidth: 440,
          })
        }
      />
      <Text
        text={`P${playerId !== undefined ? playerId.toString() : "0"}`}
        anchor={0}
        x={x - 150}
        y={y + 50}
        style={
          new PIXI.TextStyle({
            align: "center",
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: 20,
            fontWeight: "400",
            fill: playerState[playerId].color, // gradient
            stroke: "#000000",
            strokeThickness: 5,
            letterSpacing: 5,

            wordWrap: true,
            wordWrapWidth: 440,
          })
        }
      />
    </>
  );
}

export default Profile;
