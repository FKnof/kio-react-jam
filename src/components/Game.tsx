import { Stage, Container, Text, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import { HomeBase } from "./HomeBase";
import { GameState } from "../logic.ts";
import { useEffect, useState } from "react";
import { Projectile } from "./Projectile.tsx";
import { ProjectileInverted } from "./ProjectileInverted.tsx";
import { useTextureStore } from "../util/store";
import { HomeBaseBackground } from "./HomeBase-Background.tsx";
export function Game() {
  const [game, setGame] = useState<GameState>();
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [yourPlayerId, setYourPlayerId] = useState<string>("");
  const [thisPlayer, setThisPlayer] = useState<number>();
  const [opponentPlayerId, setOpponentPlayerId] = useState<string>("");
  const [players, setPlayers] = useState<any>();
  const [characterTextures, setCharacterTextures] = useState<any>();
  const [environmentTextures, setEnvironmentTextures] = useState<any>();
  const [backgroundTextures, setBackgroundTextures] = useState<any>();
  const [healthbarTextures, sethealthbarTextures] = useState<any>();

  const gameWidth = 430;
  const gameHeight = 932;
  const scaleX = window.innerWidth / gameWidth;
  const scaleY = window.innerHeight / gameHeight;

  const stageProps = {
    width: gameWidth,
    height: gameHeight,
    // scale: new PIXI.Point(scaleX, scaleY),
    options: {
      backgroundAlpha: 0,
      antialias: true,
    },
  };
  const baseHeightPercentage = 0.175;
  const baseProps = {
    width: gameWidth,
    height: gameHeight * baseHeightPercentage,
    gameHeight,
    x: 0,
    y: gameHeight * (1 - baseHeightPercentage),
    mouseCoordinates: {
      x: mouseCoordinates.x / scaleX,
      y: mouseCoordinates.y / scaleY,
    },
    scaleX,
    scaleY,
    yourPlayerId,
    opponentPlayerId,
    players,
    thisPlayer,
    game,
  };

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId, players }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId || ""); // provide a default value for yourPlayerId
        if (yourPlayerId != undefined) {
          setThisPlayer(game.playerState[yourPlayerId].playerIndex);
          const enemyId = Object.keys(game.playerState).find(
            (playerId) => playerId !== yourPlayerId
          );
          setOpponentPlayerId(enemyId || "");
        }
        setPlayers(players);
      },
    });

    PIXI.Assets.addBundle("characters", {
      bluePaper: "./src/assets/Character/paper_blue.png",
      blueStone: "./src/assets/Character/stone_blue.png",
      blueScissors: "./src/assets/Character/scissors_blue.png",
      redPaper: "./src/assets/Character/paper_red.png",
      redStone: "./src/assets/Character/stone_red.png",
      redScissors: "./src/assets/Character/scissors_red.png",
    });

    PIXI.Assets.addBundle("environment", {
      dragLine: "./src/assets/Environment/drag-to-shoot.png",
      menuBot: "./src/assets/Environment/menu_bot_separator.png",
      menuTop: "./src/assets/Environment/menu_top_separator.png",
      selectionBox: "./src/assets/Environment/selection_box.png",
      selectionBoxBonus: "./src/assets/Environment/selection_box_bonus.png",
      selectionMenu: "./src/assets/Environment/selection_menu.png",
      warningSign: "./src/assets/Environment/warning_sign.png",
    });
    PIXI.Assets.addBundle("background", {
      moon: "./src/assets/Background/Mond.png",
      stars: "./src/assets/Background/Stern.png",
      starVariation1: "./src/assets/Background/Sterne Variation_1.png",
      starVariation2: "./src/assets/Background/Sterne Variation_2.png",
      starVariation3: "./src/assets/Background/Sterne Variation_3.png",
      starVariation4: "./src/assets/Background/Sterne Variation_4.png",
      starVariation5: "./src/assets/Background/Sterne Variation_5.png",
      starVariation6: "./src/assets/Background/Sterne Variation_6.png",
      starVariation7: "./src/assets/Background/Sterne Variation_7.png",
    });
    PIXI.Assets.addBundle("healthbar", {
      greenLeft: "./src/assets/HealthBar/lifebar_gree_left.png",
      greenCenter: "./src/assets/HealthBar/lifebar_green_center.png",
      greenRight: "./src/assets/HealthBar/lifebar_green_right.png",
      redLeft: "./src/assets/HealthBar/lifebar_red_left.png",
      redCenter: "./src/assets/HealthBar/lifebar_red_center.png",
      redRight: "./src/assets/HealthBar/lifebar_red_right.png",
    });

    async function getTextures() {
      try {
        const characterTextures = await PIXI.Assets.loadBundle("characters");
        const environmentTextures = await PIXI.Assets.loadBundle("environment");
        const backgroundTextures = await PIXI.Assets.loadBundle("background");
        const healthbarTextures = await PIXI.Assets.loadBundle("healthbar");

        setCharacterTextures(characterTextures);
        setEnvironmentTextures(environmentTextures);
        setBackgroundTextures(backgroundTextures);
        sethealthbarTextures(healthbarTextures);
      } catch (err) {
        console.log(err);
      }
    }

    getTextures();

    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);
  // console.log(backgroundTextures);
  const mouseMoveHandler = (event: any) => {
    setMouseCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  };

  if (!game) return "Lade...";

  return (
    <Stage
      {...stageProps}
      style={{
        transform: "scale(" + scaleX + "," + scaleY + ")",
        transformOrigin: "top left",
      }}
    >
      <HomeBase
        {...baseProps}
        characterTextures={characterTextures}
        thisPlayer={thisPlayer}
        environmentTextures={environmentTextures}
        backgroundTextures={backgroundTextures}
        healthbarTextures={healthbarTextures}
      />
      {thisPlayer !== undefined && thisPlayer === 0
        ? game.playerProjectiles.map((projectile, index) => (
            <Projectile
              props={projectile}
              offset={game.baseOffset}
              key={index}
              characterTextures={characterTextures}
              yourPlayerId={yourPlayerId}
            />
          ))
        : game.playerProjectiles.map((projectile, index) => (
            <ProjectileInverted
              props={projectile}
              key={index}
              characterTextures={characterTextures}
              yourPlayerId={yourPlayerId}
              gameWidth={gameWidth}
              gameHeight={gameHeight}
              characterTextures={characterTextures}
              yourPlayerId={yourPlayerId}
            />
          ))}
      <Text text={thisPlayer?.toString()} anchor={0.5} x={20} y={20} />
    </Stage>
  );
}
