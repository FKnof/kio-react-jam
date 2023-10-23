import { PlayerProjectile } from "../interfaces/PlayerProjectiles";

export function detectProjectileCollision(
  projectile1: PlayerProjectile,
  projectile2: PlayerProjectile
) {
  const dx = projectile1.x - projectile2.x;
  const dy = projectile1.y - projectile2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < projectile1.radius + projectile2.radius;
}
