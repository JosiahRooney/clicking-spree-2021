import { useState } from "react";
import levels from "./levels";
import { TUnit, TStat, TStatId, TUnitId } from "./Types";

const GameData = () => {
  const [gameState, setGameState] = useState({
    kills: 0,
    killsTotal: 0,
    killsPerSecond: 1,
    killsPerClick: 1,
    experience: 0,
    level: 1,
    skillPoints: 10,
    skillPointsSpent: 0,
    expToNextLevel: levels[2].exp + 1,
    expPerClick: 1,
    stats: {
      attackPower: {
        id: "attackPower",
        displayName: "Attack Power",
        description: "Increases your attack power (increases kills per click)",
        value: 0,
      } as TStat,
      critChance: {
        id: "critChance",
        displayName: "Critical Chance",
        description:
          "Increases your critical chance (earn triple kills from one attack)",
        value: 0,
      } as TStat,
      recon: {
        id: "recon",
        displayName: "Recon",
        description: "Increases the amount of experience you earn per click",
        value: 0,
      } as TStat,
      speed: {
        id: "speed",
        displayName: "Speed",
        description: "Increases the rate at which you earn kills automatically",
        value: 100,
      } as TStat,
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
      } as TUnit,
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
      } as TUnit,
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
      } as TUnit,
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
      } as TUnit,
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
      } as TUnit,
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
      } as TUnit,
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
      } as TUnit,
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
      } as TUnit,
    },
  });

  const addKills = (delta?: number) => {
    const kills =
      gameState.kills +
      gameState.killsPerClick +
      gameState.stats.attackPower.value +
      (delta || 0);
    let experience =
      gameState.experience +
      gameState.expPerClick +
      gameState.stats.recon.value +
      (delta || 0);
    let expToNextLevel = levels[gameState.level + 1].exp - gameState.experience;
    let level = gameState.level;
    let skillPoints = gameState.skillPoints;

    if (expToNextLevel <= 0) {
      // add level
      level += 1;
      // reset experience
      experience = 0;
      // reset expToNextLevel
      expToNextLevel = levels[level + 1].exp + 1;
      // add skill points
      skillPoints += 1;
    }

    setGameState({
      ...gameState,
      kills,
      experience,
      expToNextLevel,
      level,
      skillPoints,
    });
  };

  const addStats = (stat: TStatId, value?: number) => {
    setGameState({
      ...gameState,
      skillPoints: gameState.skillPoints - 1,
      skillPointsSpent: gameState.skillPointsSpent + 1,
      stats: {
        ...gameState.stats,
        [stat]: {
          ...gameState.stats[stat],
          value: gameState.stats[stat].value + (value || 0),
        },
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
    setGameState,
    addKills,
    addStats,
    addUnit,
  };
};
export default GameData;
