export type TStatId = "attackPower" | "critChance" | "recon" | "speed";

export interface TStat {
  id: TStatId;
  displayName: string;
  description: string;
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
  id: TUnitId;
  displayed: boolean;
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
    unit: TUnitId;
    unitDisplayName: string;
  };
};

export type TGameState = {
  kills: number;
  killsTotal: number;
  killsPerSecond: {
    low: number;
    high: number;
  };
  killsPerClick: number;
  experience: number;
  level: number;
  skillPoints: number;
  skillPointsSpent: number;
  expToNextLevel: number;
  expPerClick: number;
  stats: {
    attackPower: TStat;
    critChance: TStat;
    recon: TStat;
    speed: TStat;
  };
  units: {
    recruit: TUnit;
    marksman: TUnit;
    crewWeapon: TUnit;
    infantryFightingVehicle: TUnit;
    specialForcesOperative: TUnit;
    heavyArmor: TUnit;
    f15FighterJet: TUnit;
    b1LancerBomber: TUnit;
  };
};
