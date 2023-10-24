export const calculateVelocity = (
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  speedFactor: number,
  maxSpeed: number
) => {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const length = Math.sqrt(dx * dx + dy * dy);
  let speed = length * speedFactor;

  if (speed > maxSpeed) speed = maxSpeed;
  return {
    vx: (dx / length) * speed,
    vy: (dy / length) * speed,
  };
};
