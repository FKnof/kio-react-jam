import { Container, Graphics, Text, Sprite, AnimatedSprite } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { PlayerProjectile } from "../interfaces/PlayerProjectiles";
import CharacterSprite from "./sprites/Character";
import actionLineStone1 from "../assets/Animations/ActionLines_Stone_1.png";
import actionLineStone2 from "../assets/Animations/ActionLines_Stone_2.png";
import actionLineStone3 from "../assets/Animations/ActionLines_Stone_3.png";
import actionLinePaper1 from "../assets/Animations/ActionLines_Paper_1.png";
import actionLinePaper2 from "../assets/Animations/ActionLines_Paper_2.png";
import actionLinePaper3 from "../assets/Animations/ActionLines_Paper_3.png";
import actionLineScissors1 from "../assets/Animations/ActionLines_Scissors_1.png";
import actionLineScissors2 from "../assets/Animations/ActionLines_Scissors_2.png";
import actionLineScissors3 from "../assets/Animations/ActionLines_Scissors_3.png";
import { Assets } from "pixi.js";

export function Projectile({
  props,
  offset,
  yourPlayerId,
}: {
  props: PlayerProjectile;
  offset: number;
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
    if (props.type === "paper") {
      setRenderedActionLine([
        actionLinePaper1,
        actionLinePaper2,
        actionLinePaper3,
      ]);
    } else if (props.type === "rock") {
      setRenderedActionLine([
        actionLineStone1,
        actionLineStone2,
        actionLineStone3,
      ]);
    } else {
      setRenderedActionLine([
        actionLineScissors1,
        actionLineScissors2,
        actionLineScissors3,
      ]);
    }
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
        images={renderedActionLine}
        isPlaying={true}
        initialFrame={0}
        animationSpeed={0.1}
      />
      <CharacterSprite type={type} rotation={0} color={color} />
    </Container>
  );
}
