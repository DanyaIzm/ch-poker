export const GameStates = {
  roundStart: "roundStart",
  startPlayerBet: "startPlayerBet",
  otherPlayerBet: "otherPlayerBet",
  startPlayerCalls: "startPlayerCalls",
  roundEnd: "roundEnd",
  revealCards: "revealCards",
  gameEnd: "gameEnd",
};

export class BettingManager {
  constructor(ante, playerBalance) {
    this.ante = ante;
    this.player1Balance = playerBalance;
    this.player2Balance = playerBalance;
    this.currentPlayer = 1;
    this.lastPlayer = 2;
    this.roundBalance = 0;
    this.player1Bet = 0;
    this.player2Bet = 0;
    this.currentBetHistory = [];
    this.absoluteWinner = null;
    this.winner = null;
    this.state = GameStates.roundStart;
  }

  _prepareNewRound() {
    if (this.lastPlayer === 1) {
      this.lastPlayer = 2;
      this.currentPlayer = 1;
    } else {
      this.lastPlayer = 1;
      this.currentPlayer = 2;
    }

    this.currentBetHistory = [];
    this.roundBalance = 0;
    this.player1Bet = 0;
    this.player2Bet = 0;
    this.winner = null;

    this.state = GameStates.roundStart;
  }

  _startRound() {
    this.roundBalance = 2 * this.ante;
    this.player1Balance -= this.ante;
    this.player2Balance -= this.ante;
  }

  step() {
    if (this.state === GameStates.roundStart) {
      this._startRound();
      this.state = GameStates.startPlayerBet;
    } else if (this.state === GameStates.startPlayerBet) {
      this._makeBet();
      this.state = GameStates.otherPlayerBet;
    } else if (this.state === GameStates.otherPlayerBet) {
      this._makeBet();

      if (this.player1Bet === this.player2Bet) {
        this._flushBets();
        this.state = GameStates.revealCards;
      } else {
        this.state = GameStates.startPlayerCalls;
      }
    } else if (this.state === GameStates.startPlayerCalls) {
      this._makePlayerCall();
      this._flushBets();
      this.state = GameStates.revealCards;
    } else if (this.state === GameStates.revealCards) {
      this._giveMoneyToWinner();
      this.state = GameStates.roundEnd;
    } else if (this.state === GameStates.roundEnd) {
      if (!this._tryFinishGame()) {
        this._prepareNewRound();
      } else {
        this.state = GameStates.gameEnd;
      }
    } else {
      throw new Error("Invalid game state");
    }
  }

  _flushBets() {
    this.roundBalance += this.player1Bet;
    this.roundBalance += this.player2Bet;
    this.player1Bet = 0;
    this.player2Bet = 0;
  }

  _giveMoneyToWinner() {
    if (!this.winner) {
      throw new Error("No winner to give money to");
    }

    if (this.winner === 1) {
      this.player1Balance += this.roundBalance;
    } else if (this.winner === 2) {
      this.player2Balance += this.roundBalance;
    } else {
      throw new Error("Invalid winner value. Must be 1 or 2");
    }
  }

  _tryFinishGame() {
    if (this.player1Balance < this.ante) {
      this.absoluteWinner = 2;
      return true;
    } else if (this.player2Balance < this.ante) {
      this.absoluteWinner = 1;
      return true;
    }

    return false;
  }

  _makeBet() {
    const currentBet = this.getCurrentBet();

    // TODO: refactor
    if (this.currentPlayer === 1) {
      if (currentBet > this.player1Balance) {
        throw new Error("Can't make a bet");
      }

      if (currentBet < this.player2Bet) {
        throw new Error("Bet can't be less than another's player bet");
      }

      if (currentBet > this.player2Bet + this.player2Balance) {
        throw new Error("Another player will have no balance left to bet");
      }

      this.player1Balance -= currentBet;
      this.player1Bet = currentBet;
    } else {
      if (currentBet > this.player2Balance) {
        throw new Error("Can't make a bet");
      }

      if (currentBet < this.player1Bet) {
        throw new Error("Bet can't be less than another's player bet");
      }

      if (currentBet > this.player1Bet + this.player1Balance) {
        throw new Error("Another player will have no balance left to bet");
      }

      this.player2Balance -= currentBet;
      this.player2Bet = currentBet;
    }

    this.currentBetHistory = [];
    this._switchPlayer();
  }

  _makePlayerCall() {
    if (this.currentPlayer === 1) {
      const difference = this.player2Bet - this.player1Bet;
      this.player1Balance -= difference;
      this.player1Bet = this.player2Bet;
    } else {
      const difference = this.player1Bet - this.player2Bet;
      this.player2Balance -= difference;
      this.player2Bet = this.player1Bet;
    }
  }

  pass() {
    // TODO: make it correct only in MOVE steps
    this._flushBets();
    this.setWinner(this.currentPlayer === 1 ? 2 : 1);
    this._giveMoneyToWinner();
    this.state = GameStates.roundEnd;
  }

  bet(amount) {
    if (
      this.state != GameStates.startPlayerBet &&
      this.state != GameStates.otherPlayerBet
    ) {
      throw new Error("Can't make bet in this state");
    }

    this.currentBetHistory.push(amount);
  }

  cancelLastBet() {
    this.currentBetHistory.pop();
  }

  getCurrentBet() {
    return this.currentBetHistory.reduce((sum, chip) => sum + chip, 0);
  }

  setWinner(winner) {
    if (winner === 1) {
      this.winner = 1;
    } else if (winner === 2) {
      this.winner = 2;
    } else {
      throw new Error("Invalid winner value. Must be 1 or 2");
    }
  }

  _switchPlayer() {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }
}
