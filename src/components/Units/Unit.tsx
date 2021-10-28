import React from "react";
import { TUnit, TUnitId } from "../../data/Types";

interface IUnitProps {
  addUnit: (unitId: TUnitId) => void;
  unit: TUnit;
}

const Unit: React.FC<IUnitProps> = ({ unit, addUnit }) => {
  return (
    <div>
      <h2>{unit.displayName}</h2>
      <p>{unit.count}</p>

      <button onClick={() => addUnit(unit.id)}>Cost: {unit.cost} kills</button>
    </div>
  );
};

export default Unit;
