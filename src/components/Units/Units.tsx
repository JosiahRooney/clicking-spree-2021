import React from "react";
import { TGameState, TUnitId } from "../../data/Types";
import Unit from "./Unit";

interface IProps {
  gameState: TGameState;
  addUnit: (unitId: TUnitId) => void;
}

const Units: React.FC<IProps> = ({ gameState, addUnit }) => {
  const units = [];
  for (const [, unit] of Object.entries(gameState.units)) {
    units.push(
      <Unit
        key={unit.id}
        unit={unit}
        addUnit={addUnit}
        kills={gameState.kills}
      />
    );
  }

  return (
    <div>
      <h2>Units</h2>

      <div className="units">{units}</div>
    </div>
  );
};

export default Units;
