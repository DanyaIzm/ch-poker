import Balance from "./Balance";
import ChipsPanel from "./ChipsPanel";

function CallTable({ balance, onCall, onPass, className }) {
  return (
    <div className={`flex content-center justify-center flex-col ${className}`}>
      <Balance value={balance} className={"my-4 m-auto"} />
      <div className="grid grid-cols-4 px-4">
        <button
          className="text-white bg-indigo-600 p-4 w-40 flex content-center justify-center rounded-xl text-xl font-semibold transition-colors duration-500 my-4 m-auto col-span-2 col-start-2"
          onClick={onCall}
        >
          Call
        </button>
        <button
          className="text-white bg-red-500 p-4 w-full rounded-xl text-xl font-semibold m-auto"
          onClick={onPass}
        >
          Pass
        </button>
      </div>
      <ChipsPanel onClick={() => {}} />
    </div>
  );
}

export default CallTable;
