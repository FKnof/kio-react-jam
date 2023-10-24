import { calculateVelocity } from "./calculateVelocity";
export const addPlayerProjectile = (
  width: number,
  y: number,
  mouseCoordinates: { x: number; y: number },
  projectileId: number,
  ownerId: string,
  color: string
) => {
  // for testing only
  const typeDecision =
    projectileId % 3 == 0
      ? "rock"
      : projectileId % 3 == 1
      ? "paper"
      : "scissors";
  const speedFactor = 0.1; // Wie sehr sich die Geschwindigkeit an der Entfernung orientiert
  const maxSpeed = 2;
  const velocity = calculateVelocity(
    width * 0.5,
    y,
    mouseCoordinates.x,
    mouseCoordinates.y,
    speedFactor,
    maxSpeed
  );
  const newProjectile = {
    x: width * 0.5,
    y: y,
    vx: velocity.vx,
    vy: velocity.vy,
    radius: 20,
    color: color,
    type: typeDecision,
    level: 1,
    id: projectileId,
    ownerId: ownerId,
  };
  const newId = projectileId + 1;
  return { newProjectile, newId };
};
