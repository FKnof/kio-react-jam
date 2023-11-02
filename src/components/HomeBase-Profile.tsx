import { Container, Text, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";
import { Healthbar } from "./Healthbar";

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
  environmentTextures,
  healthbarTextures,
  gameHeight,
  gameWidth,
}: {
  playerState: PlayerState;
  yourPlayerId: string;
  x: number;
  y: number;
  opponentPlayerId: string;
  allPlayer: any;
  maxLife: number;
  environmentTextures: any;
  healthbarTextures: any;
  gameHeight: number;
  gameWidth: number;
}) {
  // console.log(createHealthbar());
  const positionLeft = 20;
  const positionRight = gameWidth - 20;
  return (
    <>
      <Container position={{ x: x, y: y }}>
        <Sprite
          anchor={0}
          texture={environmentTextures.menuTop}
          x={0}
          y={-20}
          width={gameWidth}
          height={gameHeight * 0.13}
        />
        {/*<Sprite
          image={allPlayer[yourPlayerId].avatarUrl}
          scale={{ x: 0.1, y: 0.1 }}
          anchor={[0, 0]}
          x={6}
          y={0}
        />*/}
        <Text
          text={`${
            allPlayer[yourPlayerId].displayName !== undefined
              ? allPlayer[yourPlayerId].displayName
              : "0"
          }`}
          anchor={0}
          x={positionLeft}
          y={2}
          style={
            new PIXI.TextStyle({
              align: "left",
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 15,
              fontWeight: "400",
              fill: "#fff", // gradient
              stroke: "#000000",

              wordWrap: true,
              wordWrapWidth: 440,
            })
          }
        />
        <Healthbar
          playerState={playerState}
          x={positionLeft}
          y={30}
          healthbarTextures={healthbarTextures}
          yourPlayerId={yourPlayerId}
          maxLife={maxLife}
          gameWidth={gameWidth}
          gameHeight={gameHeight}
          forPlayer={yourPlayerId}
        />

        {/*        <Sprite
          image={allPlayer[opponentPlayerId].avatarUrl}
          scale={{ x: 0.1, y: 0.1 }}
          anchor={[1, 0]}
          x={gameWidth - 6}
          y={0}
        /> */}
        <Text
          text={`${
            allPlayer[opponentPlayerId].displayName !== undefined
              ? allPlayer[opponentPlayerId].displayName.toString()
              : "0"
          }`}
          anchor={[1, 0]}
          x={positionRight}
          y={2}
          style={
            new PIXI.TextStyle({
              align: "right",
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 15,
              fontWeight: "400",
              fill: "#fff", // gradient
              stroke: "#000000",

              wordWrap: true,
              wordWrapWidth: 440,
            })
          }
        />
        <Healthbar
          playerState={playerState}
          x={-20}
          y={30}
          healthbarTextures={healthbarTextures}
          yourPlayerId={yourPlayerId}
          maxLife={maxLife}
          gameWidth={gameWidth}
          gameHeight={gameHeight}
          forPlayer={opponentPlayerId}
        />
      </Container>
    </>
  );
}

export default Profile;
