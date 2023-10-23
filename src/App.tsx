import { useEffect, useState } from "react";
import reactLogo from "./assets/rune.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GameState } from "./logic.ts";
import { PixiTest } from "./components/PixiTest.tsx";
import { Game } from "./components/Game.tsx";

function App() {
  return (
    <>
      {/* <PixiTest />  */}
      <Game />
    </>
  );
}

export default App;
