import React from "react";
import { TUnit, TUnitId } from "../../data/Types";

import { formatNumber } from "../../utils";

import "./Unit.scss";

interface IUnitProps {
  addUnit: (unitId: TUnitId) => void;
  kills: number;
  unit: TUnit;
  units: {
    [key: string]: TUnit;
  };
}

const Unit: React.FC<IUnitProps> = ({ unit, units, kills, addUnit }) => {
  if (!unit.displayed) {
    return null;
  }

  let canAffordUnitCost = true;
  if (unit.unitCost) {
    canAffordUnitCost = units[unit.unitCost.unit].count >= unit.unitCost.cost;
  }
  let buttonDisabled = [kills < unit.cost, !canAffordUnitCost];

  return (
    <div className="Unit">
      <button
        disabled={buttonDisabled.some((predicate) => predicate === true)}
        onClick={() => addUnit(unit.id)}
      >
        Cost: {formatNumber(unit.cost)} kills{" "}
        {unit.unitCost &&
          `(${unit.unitCost.cost} ${units[unit.unitCost.unit].displayName})`}
      </button>
      <p className="Unit-displayName">{unit.displayName}</p>
      <p>{unit.count} total</p>
      <p>
        {formatNumber(unit.attackPower.low * unit.count)} -{" "}
        {formatNumber(unit.attackPower.high * unit.count)} kps
      </p>
    </div>
  );
};

export default Unit;
