import React from "react";
import "./App.css";

import Game from "./components/Game/Game";
import Header from "./components/Header/Header";

import GameData from "./data/GameData";

function App() {
  const {
    gameState, 
    addKills,
    addExperience,
    addLevel,
    addStats,
    addUnit,
  } = GameData();

  return (
    <div className="App">
      <Header gameState={gameState} addKills={addKills} addExperience={addExperience} />
      <Game gameState={gameState} addUnit={addUnit} />
    </div>
  );
}

export default App;
