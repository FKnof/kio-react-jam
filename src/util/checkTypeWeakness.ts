import { PlayerProjectile } from "../interfaces/PlayerProjectiles";

export function checkTypeWeakness(type1: string, type2: string) {
  if (type1 === "rock" && type2 === "scissors") {
    return true;
  }
  if (type1 === "scissors" && type2 === "paper") {
    return true;
  }
  if (type1 === "paper" && type2 === "rock") {
    return true;
  }
  if (type1 === type2) {
    return true;
  }
  return false;
}
