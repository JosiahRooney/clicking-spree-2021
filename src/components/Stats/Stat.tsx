import React from "react";
import { TStatId } from "../../data/Types";

interface IProps {
  statId: TStatId;
  gameState: any;
  addStats: (statId: TStatId, value: number) => void;
}

const Stat: React.FC<IProps> = ({ statId, gameState, addStats }) => {
  const { stats, skillPoints } = gameState;
  const stat = stats[statId];

  const handleAddStats = () => {
    const delta = statId === "speed" ? -0.5 : 1;
    addStats(statId, delta);
  };

  return (
    <div className="Stat">
      <h3>{stat.displayName}</h3>
      <p>{stat.description}</p>
      <p>{stat.value}</p>
      {skillPoints > 0 && <button onClick={handleAddStats}>+1</button>}
    </div>
  );
};

export default Stat;
