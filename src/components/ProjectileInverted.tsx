import { AnimatedSprite, Container, Graphics, Text } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import { Sprite } from "@pixi/react";
import CharacterSprite from "./sprites/Character";
import { Assets } from "pixi.js";

export function ProjectileInverted({
  props,
  characterTextures,
  yourPlayerId,
  gameHeight,
  gameWidth,
}: {
  props: PlayerProjectile;
  characterTextures: any;
  yourPlayerId: string;
  gameHeight: number;
  gameWidth: number;
}) {
  const { x, y, vx, vy, type, ownerId, color, radius } = props;
  const width = gameWidth;
  const height = gameHeight;
  const [renderedActionLine, setRenderedActionLine] = useState<any>();
  const baseRotation = Math.PI / 2;
  const movementRotation = Math.atan2(vy, vx);

  const adjustedRotation =
    ownerId === yourPlayerId
      ? (baseRotation - movementRotation) * -1
      : baseRotation + movementRotation;
  const scale = ownerId == yourPlayerId ? 1 : -1;

  useEffect(() => {
    async function loadTextures() {
      const actionLinePaper = await Assets.load(
        "./src/assets/Animations/ActionLine_Paper.json"
      );

      const actionLineStone = await Assets.load(
        "./src/assets/Animations/ActionLines_Stone.json"
      );

      const actionLineScissor = await Assets.load(
        "./src/assets/Animations/ActionLine_Scissor.json"
      );
      if (props.type === "paper") {
        setRenderedActionLine(actionLinePaper.animations.ActionLines3);
      } else if (props.type === "rock") {
        setRenderedActionLine(actionLineStone.animations.ActionLines2);
      } else {
        setRenderedActionLine(actionLineScissor.animations.ActionLines1);
      }
    }
    loadTextures();
  }, []);

  if (!renderedActionLine) {
    return null;
  }

  return (
    <Container
      x={width - x}
      y={height - y}
      rotation={adjustedRotation}
      scale={{ x: 1, y: scale }}
    >
      <AnimatedSprite
        anchor={[0.5, 1]}
        rotation={3.1}
        scale={0.3}
        textures={renderedActionLine}
        isPlaying={true}
        initialFrame={0}
        animationSpeed={0.1}
      />
      <CharacterSprite
        characterTextures={characterTextures}
        type={type}
        rotation={0}
        color={color}
      />
    </Container>
  );
}
