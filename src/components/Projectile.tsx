import { Container, Graphics, Text, Sprite, AnimatedSprite } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import CharacterSprite from "./sprites/Character";
import { Assets } from "pixi.js";

export function Projectile({
  props,
  offset,
  characterTextures,
  yourPlayerId,
}: {
  props: PlayerProjectile;
  offset: number;
  characterTextures: any;
  yourPlayerId: string;
}) {
  const { x, y, vx, vy, type, ownerId, color } = props;

  const [renderedActionLine, setRenderedActionLine] = useState<any>();

  // Calculate the angle in radians
  const baseRotation = Math.PI / 2;
  const movementRotation = Math.atan2(vy, vx);
  const adjustedRotation =
    ownerId === yourPlayerId
      ? baseRotation + movementRotation
      : baseRotation - movementRotation;

  const scale = ownerId == yourPlayerId ? 1 : -1;

  useEffect(() => {
    async function loadTextures() {
      const actionLinePaper = await Assets.load(
        "./Animations/ActionLine_Paper.json"
      );

      const actionLineStone = await Assets.load(
        "./Animations/ActionLines_Stone.json"
      );

      const actionLineScissor = await Assets.load(
        "./Animations/ActionLine_Scissor.json"
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
      x={x}
      y={y - offset}
      rotation={adjustedRotation * scale}
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
