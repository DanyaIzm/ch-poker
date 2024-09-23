import Balance from "./Balance";
import BetControlButton from "./BetControlButton";
import ChipsPanel from "./ChipsPanel";

function BettingTable({
  balance,
  isActive,
  bet,
  onBet,
  onCancel,
  onMove,
  onPass,
  className,
}) {
  return (
    <div className={`flex content-center justify-center flex-col ${className}`}>
      <Balance value={balance} className={"my-4 m-auto"} />
      <div className="grid grid-cols-4 px-4">
        <button
          className="text-white bg-indigo-600 p-4 w-full rounded-xl text-xl font-semibold m-auto"
          onClick={onCancel}
        >
          Cancel
        </button>
        <BetControlButton
          active={isActive}
          value={bet}
          onMove={onMove}
          className={"my-4 m-auto col-span-2"}
        />
        <button
          className="text-white bg-red-500 p-4 w-full rounded-xl text-xl font-semibold m-auto"
          onClick={onPass}
        >
          Pass
        </button>
      </div>
      <ChipsPanel onClick={onBet} />
    </div>
  );
}

export default BettingTable;
