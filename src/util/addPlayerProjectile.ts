import { calculateVelocity } from "./calculateVelocity";
export const addPlayerProjectile = (
  width: number,
  y: number,
  mouseCoordinates: { x: number; y: number },
  projectileId: number,
  ownerId: string,
  color: string,
  playerIndex: number
) => {
  const height = window.innerHeight;
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
  const newProjectile =
    playerIndex == 0
      ? {
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
        }
      : {
          x: width * 0.5,
          y: height - y,
          vx: velocity.vx * -1,
          vy: velocity.vy * -1,
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
