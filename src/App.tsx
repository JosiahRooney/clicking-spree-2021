import React, { useEffect } from "react";
import "./App.css";

import Game from "./components/Game/Game";
import Header from "./components/Header/Header";

import GameData from "./data/GameData";

function App() {
  const { gameState, setGameState, addKills, addStats, addUnit } = GameData();

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prevGameState) => ({
        ...prevGameState,
        kills: prevGameState.kills + prevGameState.killsPerSecond,
      }));
    }, 10 * gameState.stats.speed.value);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Header gameState={gameState} addStats={addStats} addKills={addKills} />
      {10 * gameState.stats.speed.value}
      <Game gameState={gameState} addUnit={addUnit} addStats={addStats} />
    </div>
  );
}

export default App;
