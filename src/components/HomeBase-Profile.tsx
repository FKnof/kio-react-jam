import { Container, Text, Graphics, Sprite } from "@pixi/react";
import React, { useCallback, useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { LifePoint } from "./LifePoint";

export interface PlayerState {
  [yourPlayerId: string]: {
    color: string;
    life: number;
    playerIndex: number;
  };
}

export function Profile({
  playerState,
  yourPlayerId,
  x,
  y,
  opponentPlayerId,
  allPlayer,
  maxLife,
}: {
  playerState: PlayerState;
  yourPlayerId: string;
  x: number;
  y: number;
  opponentPlayerId: string;
  allPlayer: any;
  maxLife: number;
}) {
  function createHealthbar(
    HPofPlayer: number,
    position: { x: number; y: number },
    opponent: boolean
  ) {
    let xOffset = 0;
    const itemList = Array(maxLife)
      .fill(null)
      .map((_, index) => {
        if (opponent) {
          xOffset = 20 * index * -1;
        } else {
          xOffset = 20 * index;
        }
        if (index < HPofPlayer) {
          return (
            <LifePoint
              key={index}
              x={position.x + xOffset}
              active={true}
              y={position.y}
            />
          );
        } else {
          return (
            <LifePoint
              key={index}
              x={position.x + xOffset}
              active={false}
              y={position.y}
            />
          );
        }
      });

    return itemList;
  }
  // console.log(createHealthbar());
  return (
    <>
      <Container position={{ x: x, y: y }}>
        <Sprite
          image={allPlayer[yourPlayerId].avatarUrl}
          scale={{ x: 0.1, y: 0.1 }}
          anchor={[0, 0]}
          x={6}
          y={0}
        />
        <Text
          text={`P${
            allPlayer[yourPlayerId].displayName !== undefined
              ? allPlayer[yourPlayerId].displayName
              : "0"
          }`}
          anchor={0}
          x={60}
          y={2}
          style={
            new PIXI.TextStyle({
              align: "left",
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 15,
              fontWeight: "400",
              fill: playerState[yourPlayerId].color, // gradient
              stroke: "#000000",

              wordWrap: true,
              wordWrapWidth: 440,
            })
          }
        />
        {createHealthbar(
          playerState[yourPlayerId].life,
          { x: 66, y: 35 },
          false
        )}
        <Sprite
          image={allPlayer[opponentPlayerId].avatarUrl}
          scale={{ x: 0.1, y: 0.1 }}
          anchor={[1, 0]}
          x={innerWidth - 6}
          y={0}
        />
        <Text
          text={`P${
            allPlayer[opponentPlayerId].displayName !== undefined
              ? allPlayer[opponentPlayerId].displayName.toString()
              : "0"
          }`}
          anchor={[1, 0]}
          x={innerWidth - 60}
          y={2}
          style={
            new PIXI.TextStyle({
              align: "right",
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 15,
              fontWeight: "400",
              fill: playerState[opponentPlayerId].color, // gradient
              stroke: "#000000",

              wordWrap: true,
              wordWrapWidth: 440,
            })
          }
        />
        {createHealthbar(
          playerState[opponentPlayerId].life,
          {
            x: innerWidth - 66,
            y: 35,
          },
          true
        )}
      </Container>
    </>
  );
}

export default Profile;
