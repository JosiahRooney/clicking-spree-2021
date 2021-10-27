export type TStatId = "attackPower" | "critChance" | "recon" | "speed";

export interface TStat {
  id: TStatId;
  displayName: string;
  value: number;
}

export type TUnitId =
  | "recruit"
  | "marksman"
  | "crewWeapon"
  | "infantryFightingVehicle"
  | "specialForcesOperative"
  | "heavyArmor"
  | "f15FighterJet"
  | "b1LancerBomber";

export type TUnit = {
  id: string;
  displayName: string;
  count: number;
  cost: number;
  baseCost: number;
  baseCostIncrease: number;
  attackPower: {
    low: number;
    high: number;
  };
  critChance: {
    low: number;
    high: number;
  };
  unitCost: {
    cost: number;
    unit: string;
  };
};
