import React from "react";
import { TUnit, TUnitId } from "../../data/Types";

import { formatNumber } from "../../utils";

interface IUnitProps {
  addUnit: (unitId: TUnitId) => void;
  kills: number;
  unit: TUnit;
}

const Unit: React.FC<IUnitProps> = ({ unit, kills, addUnit }) => {
  if (!unit.displayed) {
    return null;
  }

  return (
    <div>
      <h2>{unit.displayName}</h2>
      <p>{unit.count} total</p>
      <p>
        {formatNumber(unit.attackPower.low * unit.count)} -{" "}
        {formatNumber(unit.attackPower.high * unit.count)} kps
      </p>

      <button disabled={kills < unit.cost} onClick={() => addUnit(unit.id)}>
        Cost: {formatNumber(unit.cost)} kills
      </button>
    </div>
  );
};

export default Unit;
