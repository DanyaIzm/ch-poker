import { useEffect, useReducer } from "react";
import Bank from "../components/Bank";
import BettingTable from "../components/BettingTable";
import { GameStates } from "../domain/bettingManager";
import CallTable from "../components/CallTable";
import PlayerWonButton from "../components/PlayerWonButton";

function GamePage({ bettingManager }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const onBet = (bet) => {
    bettingManager.bet(bet);
    forceUpdate();
  };

  const onCancel = () => {
    bettingManager.cancelLastBet();
    forceUpdate();
  };

  const onPass = () => {
    bettingManager.pass();
    bettingManager.step();
    forceUpdate();
  };

  const onMove = () => {
    bettingManager.step();
    forceUpdate();
  };

  const onCall = () => {
    bettingManager.step();
    forceUpdate();
  };

  const onPlayerWon = (playerNumber) => {
    bettingManager.setWinner(playerNumber);
    bettingManager.step();
    bettingManager.step();
    forceUpdate();
  };

  if (bettingManager.state === GameStates.roundStart) {
    bettingManager.step();
    forceUpdate();
  }

  console.log(bettingManager.lastPlayer);

  return (
    <div className="h-screen flex content-center justify-center flex-col select-none">
      {bettingManager.state === GameStates.revealCards ? (
        <>
          <PlayerWonButton
            playerNumber={2}
            className={"rotate-180"}
            onClick={() => onPlayerWon(2)}
          />
          <hr />
          <div className="flex items-center px-4">
            <Bank
              value={bettingManager.roundBalance}
              className={`my-4 m-auto ${"rotate-180"}`}
            />
            <Bank
              value={bettingManager.roundBalance}
              className={`my-4 m-auto`}
            />
          </div>
          <hr />
          <PlayerWonButton playerNumber={1} onClick={() => onPlayerWon(1)} />
        </>
      ) : (
        <>
          {bettingManager.state === GameStates.startPlayerCalls &&
          bettingManager.lastPlayer !== 1 ? (
            <CallTable
              balance={bettingManager.player1Balance}
              onCall={onCall}
              onPass={onPass}
              className={"rotate-180"}
            />
          ) : (
            <BettingTable
              balance={bettingManager.player1Balance}
              bet={
                bettingManager.currentPlayer === 1
                  ? bettingManager.getCurrentBet()
                  : bettingManager.player1Bet
              }
              isActive={bettingManager.currentPlayer === 1}
              onBet={bettingManager.currentPlayer === 1 ? onBet : () => {}}
              onCancel={
                bettingManager.currentPlayer === 1 ? onCancel : () => {}
              }
              onPass={bettingManager.currentPlayer === 1 ? onPass : () => {}}
              onMove={bettingManager.currentPlayer === 1 ? onMove : () => {}}
              className={"rotate-180"}
            />
          )}
          <hr />
          <div className="flex justify-center items-center px-4">
            <div className="text-slate-200 text-lg font-semibold flex gap-1">
              <div>1P:</div>
              <div
                className="text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]
font-semibold animated-background transition-all"
              >
                {bettingManager.player1Bet}
              </div>
            </div>
            <Bank
              value={bettingManager.roundBalance}
              className={`my-4 m-auto ${
                bettingManager.currentPlayer === 1 ? "rotate-180" : ""
              }`}
            />
            <div className="text-slate-200 text-lg font-semibold flex gap-1 rotate-180">
              <div>2P:</div>
              <div
                className="text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]
font-semibold animated-background transition-all"
              >
                {bettingManager.player2Bet}
              </div>
            </div>
          </div>
          <hr />
          {bettingManager.state === GameStates.startPlayerCalls &&
          bettingManager.lastPlayer !== 2 ? (
            <CallTable
              balance={bettingManager.player2Balance}
              onPass={onPass}
              onCall={onCall}
            />
          ) : (
            <BettingTable
              balance={bettingManager.player2Balance}
              bet={
                bettingManager.currentPlayer === 2
                  ? bettingManager.getCurrentBet()
                  : bettingManager.player2Bet
              }
              isActive={bettingManager.currentPlayer === 2}
              onBet={bettingManager.currentPlayer === 2 ? onBet : () => {}}
              onCancel={
                bettingManager.currentPlayer === 2 ? onCancel : () => {}
              }
              onPass={bettingManager.currentPlayer === 2 ? onPass : () => {}}
              onMove={bettingManager.currentPlayer === 2 ? onMove : () => {}}
            />
          )}
        </>
      )}
    </div>
  );
}

export default GamePage;
