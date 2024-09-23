import PokerChip from "./PokerChip";

function ChipsPanel({ onClick }) {
  return (
    <div className="flex flex-auto flex-wrap gap-2.5 content-center justify-center">
      <PokerChip
        onClick={onClick}
        value={5}
        className={"bg-teal-50 text-neutral-950 border-neutral-950"}
      />
      <PokerChip onClick={onClick} value={10} className={"bg-red-500"} />
      <PokerChip onClick={onClick} value={20} className={"bg-green-500"} />
      <PokerChip onClick={onClick} value={50} className={"bg-sky-500"} />
      <PokerChip onClick={onClick} value={100} className={"bg-fuchsia-900"} />
    </div>
  );
}

export default ChipsPanel;
