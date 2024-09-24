import { useState } from "react";
import "./PokerChip.css";

function PokerChip({ value, onClick, className }) {
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    setRotation(rotation + 360);
    onClick(parseInt(value));
  };

  return (
    <div
      onClick={handleClick}
      className={`chip h-24 w-24 ${className}`}
      style={{ rotate: `${rotation}deg` }}
    >
      {value}$
    </div>
  );
}

export default PokerChip;
