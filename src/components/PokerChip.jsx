import "./PokerChip.css";

function PokerChip({ value, onClick, className }) {
  const handleClick = () => {
    onClick(parseInt(value));
  };

  return (
    <div onClick={handleClick} className={`chip h-24 w-24 ${className}`}>
      {value}$
    </div>
  );
}

export default PokerChip;
