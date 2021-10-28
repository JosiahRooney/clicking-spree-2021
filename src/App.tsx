import React, { useCallback } from "react";
import { useInterval } from "usehooks-ts";

import "./App.css";

import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import { randomIntInRange } from "./utils";

import GameData from "./data/GameData";
import { TGameState } from "./data/Types";

function App() {
  const { gameState, setGameState, addKills, addStats, addUnit } = GameData();

  const addUnitKills = useCallback(() => {
    const { units } = gameState;
    let kills = 0;

    // loop over units object
    for (const [, unit] of Object.entries(units)) {
      // base damage
      kills +=
        unit.count *
        randomIntInRange(unit.attackPower.low, unit.attackPower.high);
      // crit damage
      if (
        randomIntInRange(1, 100) <=
        randomIntInRange(unit.critChance.low, unit.critChance.high)
      ) {
        kills +=
          unit.count *
          (randomIntInRange(unit.attackPower.low, unit.attackPower.high) * 3);
      }
    }

    return kills;
  }, [gameState]);

  const setUnitDisplay = useCallback((gameState: TGameState) => {
    const { units } = gameState;
    for (const [, unit] of Object.entries(units)) {
      if (unit.cost <= gameState.kills) {
        unit.displayed = true;
      }
    }
    return units;
  }, []);

  useInterval(() => {
    setGameState((prevGameState) => ({
      ...prevGameState,
      kills:
        prevGameState.kills + prevGameState.killsPerSecond + addUnitKills(),
      units: setUnitDisplay(prevGameState),
    }));
  }, 10 * gameState.stats.speed.value);

  return (
    <div className="App">
      <Header gameState={gameState} addStats={addStats} addKills={addKills} />
      {10 * gameState.stats.speed.value}
      <Game gameState={gameState} addUnit={addUnit} addStats={addStats} />
    </div>
  );
}

export default App;
