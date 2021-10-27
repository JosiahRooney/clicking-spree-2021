import React from "react";
import { TStatId, TUnitId } from "../../data/Types";
import Stats from "../Stats/Stats";

interface IProps {
  gameState: any;
  addUnit: (id: TUnitId) => void;
  addStats: (id: TStatId, value: number) => void;
}

const Game: React.FC<IProps> = ({ gameState, addUnit, addStats }) => {
  return (
    <div className="Game">
      <Stats gameState={gameState} addStats={addStats} />
    </div>
  );
};

export default Game;
