import { useEffect, useState } from "react"
import reactLogo from "./assets/rune.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { GameState } from "./logic.ts"
import { PixiTest } from "./components/PixiTest.tsx"
import { Game } from "./components/Game.tsx"

function App() {
  const [game, setGame] = useState<GameState>()
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game)
      },
    })
  }, [])

  if (!game) {
    return <div>Lade...</div>
  }

  return (
    <>
    {/* <PixiTest />  */}
    <Game />
    </>
  )
}

export default App
