import { useState } from "react";
import { BettingManager } from "./domain/bettingManager";
import AnteBalanceSettingPage from "./pages/AnteBalanceSettingPage";
import GamePage from "./pages/GamePage";
import WinnerPage from "./pages/WinnerPage";

function App() {
  const [isAnteAndBalanceSelected, setIsAnteAndBalanceSelected] =
    useState(false);
  const [bettingManager, setBettingManager] = useState(null);
  const [winner, setWinner] = useState(null);

  const createBettingManager = (ante, balance) => {
    const manager = new BettingManager(ante, balance);
    setBettingManager(manager);
    setIsAnteAndBalanceSelected(true);
  };

  return (
    <div className="bg-indigo-950 ">
      {!isAnteAndBalanceSelected ? (
        <AnteBalanceSettingPage doneCallback={createBettingManager} />
      ) : !winner ? (
        <GamePage bettingManager={bettingManager} />
      ) : (
        <WinnerPage winner={winner} />
      )}
    </div>
  );
}

export default App;
