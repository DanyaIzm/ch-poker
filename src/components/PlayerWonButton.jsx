function PlayerWonButton({ playerNumber, onClick, className }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={`bg-indigo-200 p-4 w-40 flex content-center justify-center rounded-xl text-xl font-semibold ${className}`}
        onClick={onClick}
      >
        Player {playerNumber} won?
      </div>
    </div>
  );
}

export default PlayerWonButton;
