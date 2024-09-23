function BetControlButton({ active, value, onMove, className }) {
  return (
    <div
      className={`${
        active ? "bg-amber-300" : "bg-slate-200"
      } p-4 w-40 flex content-center justify-center rounded-xl text-xl font-semibold transition-colors duration-500	${className}`}
      onClick={onMove}
    >
      {value}
    </div>
  );
}

export default BetControlButton;
