import React from "react";

interface IProps {
  gameState: any;
  addKills: (delta?: number) => void;
  addExperience: (delta?: number) => void;
}

const Header: React.FC<IProps> = ({ gameState, addKills }) => {

  return <div className="Header">
    <div className="Header-title">
      <h1>Clicking Spree</h1>
      <div className="Header-actions">
        <button className="Header-action" onClick={() => addKills(0)}>Attack</button>
      </div>
      <div className="Header-stats">
        <div className="Header-stat">
          <span className="Header-stat-label">Kills</span>
          <span className="Header-stat-value">{gameState.kills}</span>
        </div>
      </div>
    </div>
  </div>
};

export default Header;
