import { useEffect, useState, useCallback } from "react";
import spellList from "../datas/spellList";


const Enemy = ({lifeLeft, lifeTotal}) => {

  useEffect(() => {
    
  }, [])

  return (
    <div className="enemyContainer">
      <div className="lifeContainer">
        <div className="lifeWrapper">
          <div className="lifeInner" style={{width: lifeLeft/2 - 4}}></div>
        </div>
        <p className="lifeScore">{lifeLeft}/{lifeTotal}</p>
      </div>
    </div>
  );
};

export default Enemy;