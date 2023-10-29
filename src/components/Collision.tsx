import { Text } from "@pixi/react";
import { fontstyle } from "../ui/fontstyle";
export function Collision(props: any) {
  const {
    collision,
    game,
    collisionTextures,
    gameHeight,
    gameWidth,
    thisPlayer,
  } = props;
  const x = thisPlayer == 0 ? collision.x : gameWidth - collision.x;
  const pureY = collision.y - game.baseOffset;
  const y = thisPlayer == 0 ? pureY : gameHeight - collision.y;
  return <Text text={"X"} anchor={0.5} x={x} y={y} style={fontstyle} />;
}
