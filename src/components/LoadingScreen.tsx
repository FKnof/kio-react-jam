import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { useCallback } from "react";
import { fontstyle } from "../ui/fontstyle";
import background from "../assets/Background/Mond.png";

export default function LoadingScreen(props: any) {
  const { gameWidth, gameHeight, players, yourPlayerId, opponentPlayerId } =
    props;
  const loadingScreen = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill("#130C5F");
      g.drawRect(0, 0, gameWidth, gameHeight);
      g.drawR;
    },
    [gameWidth, gameHeight]
  );
  return (
    <>
      <Graphics draw={loadingScreen} anchor={[0.5, 0.5]} />
      <Container x={0} y={0}>
        <Sprite
          width={gameWidth * 0.9}
          height={gameHeight * 0.3}
          image={"./Loading.png"}
          scale={{ x: 1, y: 1 }}
          rotation={0}
          anchor={0}
          x={gameWidth * 0.05}
          y={gameHeight * 0.5}
        />

        <Sprite
          width={gameWidth * 0.35}
          height={gameHeight * 0.18}
          image={players[yourPlayerId].avatarUrl}
          // scale={{ x: 1, y: 1 }}
          rotation={0}
          anchor={0.5}
          x={gameWidth * 0.3}
          y={gameHeight * 0.3}
        />
        <Sprite
          width={gameWidth * 0.35}
          height={gameHeight * 0.18}
          image={players[opponentPlayerId].avatarUrl}
          // scale={{ x: 1, y: 1 }}
          rotation={0}
          anchor={0.5}
          x={gameWidth * 0.7}
          y={gameHeight * 0.3}
        />

        <Text
          text={players[yourPlayerId].displayName}
          anchor={[0.5, 0]}
          x={gameWidth * 0.3}
          y={gameHeight * 0.41}
          style={fontstyle}
        />
        <Text
          text={players[opponentPlayerId].displayName}
          anchor={[0.5, 0]}
          x={gameWidth * 0.7}
          y={gameHeight * 0.41}
          style={fontstyle}
        />
        <Text
          text={"VS"}
          anchor={[0.5, 0]}
          x={gameWidth * 0.5}
          y={gameHeight * 0.12}
          style={fontstyle}
        />
      </Container>
    </>
  );
}
