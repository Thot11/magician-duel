import { useEffect, useState, useCallback } from "react";
import spellList from "../datas/spellList";

function SpellCard({ spell }) {
  return (
    <div className={`spellCardContainer ${spell.attribut}CardContainer`}>
      <div className="headerCard">{spell.name}</div>
      <div className="spellStats">
        <p>
          type: <span>{spell.type}</span>
        </p>
        <p>
          damage: <span>{spell.damage}</span>
        </p>
        <p>
          shield: <span>{spell.shield}</span>
        </p>
        <p>
          elementalShield: <span>{spell.elementalShield}</span>
        </p>
        <p>
          attribut: <span>{spell.attribut}</span>
        </p>
      </div>
    </div>
  );
}

export default SpellCard;
