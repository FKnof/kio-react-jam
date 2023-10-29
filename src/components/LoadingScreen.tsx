import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { useCallback } from "react";
import { fontstyle, fontstyleSmall } from "../ui/fontstyle";

export default function LoadingScreen(props: any) {
  const { gameWidth, gameHeight } = props;
  const loadingScreen = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill("#130c5f");
      g.drawRect(0, 0, gameWidth, gameHeight);
      g.drawR;
    },
    [gameWidth, gameHeight]
  );
  const missionText =
    "Drag your rocks, papers, and scissors to the edge of your base and score points against your opponent! \n \nDon’t forget about your extra slot on the right: stash something away for difficult times!";
  return (
    <>
      <Graphics draw={loadingScreen} anchor={[0.5, 0.5]} />
      {/* <Text
        text={"Mission:\nProtect your base!"}
        anchor={[0]}
        style={fontstyle}
        x={10}
        y={40}
        width={gameWidth - 30}
      />
      <Text
        text={missionText}
        style={fontstyleSmall}
        x={10}
        y={280}
        width={gameWidth - 30}
      /> */}
      <Container x={0} y={0}>
        <Sprite
          width={gameWidth}
          height={gameHeight}
          image={"./loadingscreen.jpg"}
          scale={{ x: 1, y: 1 }}
          rotation={0}
          anchor={0}
          x={0}
          y={0}
        />
      </Container>
    </>
  );
}
