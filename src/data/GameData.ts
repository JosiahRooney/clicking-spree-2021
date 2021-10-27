import { useState } from "react";
import levels from "./levels";

type TStat = "attackPower" | "critChance" | "recon" | "speed" | "health" | "maxHealth" | "armor";
type TUnitId = "recruit" | "marksman" | "crewWeapon" | "infantryFightingVehicle" | "specialForcesOperative" | "heavyArmor" | "f15FighterJet" | "b1LancerBomber";
type TUnit = {
  id: string;
  displayName: string;
  count: number;
  cost: number;
  baseCost: number;
  baseCostIncrease: number;
  attackPower: {
    low: number;
    high: number;
  }
  critChance: {
    low: number;
    high: number;
  }
  unitCost: {
    cost: number;
    unit: string;
  }
}

const GameData = () => {
  const [gameState, setGameState] = useState({
    kills: 0,
    killsTotal: 0,
    killsPerSecond: 0,
    killsPerClick: 1,
    experience: 0,
    level: 1,
    expToNextLevel: 100,
    expPerClick: 1,
    stats: {
      attackPower: 1,
      critChance: 0,
      recon: 0,
      speed: 0,
      health: 100,
      maxHealth: 100,
      armor: 0,
    },
    units: {
      recruit: {
        id: "recruit",
        displayName: "Recruit",
        count: 0,
        cost: 15,
        baseCost: 15,
        baseCostIncrease: 1.07,
        attackPower: {
          low: 0,
          high: 0.1,
        },
        critChance: {
          low: 0,
          high: 0,
        },
      },
      marksman: {
        id: "marksman",
        displayName: "Marksman",
        count: 0,
        cost: 100,
        baseCost: 100,
        baseCostIncrease: 1.07,
        attackPower: {
          low: 0.5,
          high: 1,
        },
        critChance: {
          low: 0.1,
          high: 0.1,
        },
        unitCost: {
          cost: 1,
          unit: "recruit",
        },
      },
      crewWeapon: {
        id: "crewWeapon",
        displayName: "Crew Weapon",
        count: 0,
        cost: 1000,
        baseCost: 1000,
        baseCostIncrease: 1.07,
        attackPower: {
          low: 3.3,
          high: 4.5,
        },
        critChance: {
          low: 0.5,
          high: 0.5,
        },
        unitCost: {
          cost: 3,
          unit: "recruit",
        },
      },
      infantryFightingVehicle: {
        id: "infantryFightingVehicle",
        displayName: "Infantry Fighting Vehicle",
        count: 0,
        cost: 4200,
        baseCost: 4200,
        baseCostIncrease: 1.07,
        attackPower: {
          low: 10,
          high: 15,
        },
        critChance: {
          low: 0.5,
          high: 0.5,
        },
        unitCost: {
          cost: 5,
          unit: "recruit",
        },
      },
      specialForcesOperative: {
        id: "specialForcesOperative",
        displayName: "Special Forces Operative",
        count: 0,
        cost: 14000,
        baseCost: 14000,
        baseCostIncrease: 1.07,
        attackPower: {
          low: 40,
          high: 50,
        },
        critChance: {
          low: 10,
          high: 10,
        },
        unitCost: {
          cost: 1,
          unit: "marksman",
        },
      },
      heavyArmor: {
        id: "heavyArmor",
        displayName: "Heavy Armor",
        count: 0,
        cost: 60000,
        baseCost: 60000,
        baseCostIncrease: 1.07,
        attackPower: {
          low: 100,
          high: 150,
        },
        critChance: {
          low: 1,
          high: 1,
        },
        unitCost: {
          cost: 3,
          unit: "crewWeapon",
        },
      },
      f15FighterJet: {
        id: "f15FighterJet",
        displayName: "F-15 Fighter Jet",
        count: 0,
        cost: 300000,
        baseCost: 300000,
        baseCostIncrease: 1.07,
        attackPower: {
          low: 400,
          high: 500,
        },
        critChance: {
          low: 10,
          high: 10,
        },
        unitCost: {
          cost: 1,
          unit: "marksman",
        },
      },
      b1LancerBomber: {
        id: "b1LancerBomber",
        displayName: "B-1 Lancer Bomber",
        count: 0,
        cost: 1000000,
        baseCost: 1000000,
        baseCostIncrease: 1.07,
        attackPower: {
          low: 4000,
          high: 5000,
        },
        critChance: {
          low: 10,
          high: 10,
        },
        unitCost: {
          cost: 4,
          unit: "marksman",
        },
      },
    },
  });

  const addKills = (delta?: number) => {
    setGameState({
      ...gameState,
      kills: gameState.kills + gameState.killsPerClick + (delta || 0),
    });
  };

  const addExperience = (delta?: number) => {
    setGameState({
      ...gameState,
      experience: gameState.experience + gameState.expPerClick + (delta || 0),
    });
  };

  const addLevel = () => {
    setGameState({
      ...gameState,
      level: gameState.level + 1,
      expToNextLevel: gameState.expToNextLevel + levels[gameState.level].exp,
    });
  };

  const addStats = (stat: TStat, delta?: number) => {
    setGameState({
      ...gameState,
      stats: {
        ...gameState.stats,
        attackPower: gameState.stats[stat] + (delta || 0),
      },
    });
  };

  const addUnit = (id: TUnitId) => {
    const { kills } = gameState;
    const unit = gameState.units[id];
    const { cost, baseCost, baseCostIncrease } = unit;

    if (kills >= cost) {
      setGameState({
        ...gameState,
        kills: kills - cost,
        units: {
          ...gameState.units,
          [id]: {
            ...unit,
            count: unit.count + 1,
            cost: Math.floor(baseCost * Math.pow(baseCostIncrease, unit.count)),
          },
        },
      });
    }
  };

  return {
    gameState,
    addKills,
    addExperience,
    addLevel,
    addStats,
    addUnit,
  }
}
export default GameData;