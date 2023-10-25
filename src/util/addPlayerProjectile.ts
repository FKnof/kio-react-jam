import { calculateVelocity } from "./calculateVelocity";
export const addPlayerProjectile = (
  weapon: string,
  width: number,
  projectileCoordinates: { x: number; y: number },
  mouseCoordinates: { x: number; y: number },
  projectileId: number,
  ownerId: string,
  color: string,
  playerIndex: number,
  offset: number
) => {
  const height = window.innerHeight;
  // for testing only
  const speedFactor = 0.1; // Wie sehr sich die Geschwindigkeit an der Entfernung orientiert
  const maxSpeed = 2;
  const velocity = calculateVelocity(
    projectileCoordinates.x,
    projectileCoordinates.y,
    mouseCoordinates.x,
    mouseCoordinates.y,
    speedFactor,
    maxSpeed
  );
  const newProjectile =
    playerIndex == 0
      ? {
          x: projectileCoordinates.x,
          y: projectileCoordinates.y + offset,
          vx: velocity.vx,
          vy: velocity.vy,
          radius: 20,
          color: color,
          type: weapon,
          level: 1,
          id: projectileId,
          ownerId: ownerId,
          tookALife: false,
        }
      : {
          x: width - projectileCoordinates.x,
          y: height - projectileCoordinates.y,
          vx: velocity.vx * -1,
          vy: velocity.vy * -1,
          radius: 20,
          color: color,
          type: weapon,
          level: 1,
          id: projectileId,
          ownerId: ownerId,
          tookALife: false,
        };
  const newId = projectileId + 1;
  return { newProjectile, newId };
};
