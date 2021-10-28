import React from "react";
import { TUnitId } from "../../data/Types";
import Unit from "./Unit";

interface IProps {
  gameState: any;
  addUnit: (unitId: TUnitId) => void;
}

const Units: React.FC<IProps> = ({ gameState, addUnit }) => {
  return (
    <div>
      <h2>Units</h2>

      <Unit unit={gameState.units.recruit} addUnit={addUnit} />
    </div>
  );
};

export default Units;
