const isOdd = function (roll) {
  return roll % 2 === 0;
};
const isBrowser = typeof window !== "undefined" && window !== null;

exports = isBrowser ? window : global;
exports.Game = function Game() {
  // Initialize game variables
  let players = [];
  let places = [];
  let purses = [];
  let inPenaltyBox = [];
  let popQuestions = [];
  let scienceQuestions = [];
  let sportsQuestions = [];
  let rockQuestions = [];
  let currentPlayer = 0;
  let isGettingOutOfPenaltyBox = false;

  // Constant Values
  const COINS_TO_WIN = 6;
  const NUMBER_OF_QUESTIONS = 50;
  const END_OF_BOARD = 11;

  // Create questions for the game
  for (var i = 0; i < NUMBER_OF_QUESTIONS; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push("Rock Question " + i);
  }

  this.roll = function (roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);
    if (inPenaltyBox[currentPlayer]) {
      if (isOdd(roll)) {
        isGettingOutOfPenaltyBox = true;
        console.log(players[currentPlayer] + " is getting out of the penalty box");
        this.movePlayer(roll);
        this.askQuestion();
      } else {
        isGettingOutOfPenaltyBox = false;
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
      }
    } else {
      this.movePlayer(roll);
      this.askQuestion();
    }
  };

  this.askQuestion = function () {
    console.log("The category is " + this.currentCategory());
    switch (this.currentCategory()) {
      case "Pop":
        console.log(popQuestions.shift());
        break;
      case "Science":
        console.log(scienceQuestions.shift());
        break;
      case "Sports":
        console.log(sportsQuestions.shift());
        break;
      case "Rock":
        console.log(rockQuestions.shift());
        break;
      default:
        throw `No questions for ${this.currentCategory()}`;
    }
  };

  this.movePlayer = function (roll) {
    places[currentPlayer] = places[currentPlayer] + roll;
    if (places[currentPlayer] > END_OF_BOARD) {
      places[currentPlayer] = places[currentPlayer] - 12;
    }
    console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
  };

  this.correctAnswer = function () {
    let isGameOver = false;
    if (inPenaltyBox[currentPlayer] && !isGettingOutOfPenaltyBox) {
      return isGameOver;
    } else {
      this.rewardPlayer();
      isGameOver = this.didPlayerWin(purses[currentPlayer]);
    }
    this.nextRound();
    return isGameOver;
  };

  this.wrongAnswer = function () {
    console.log("Question was incorrectly answered");
    console.log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;
    this.nextRound();
  };

  this.rewardPlayer = function () {
    console.log("Answer was correct!!!!");
    purses[currentPlayer] += 1;
    console.log(players[currentPlayer] + " now has " + purses[currentPlayer] + " Gold Coins.");
  };

  this.nextRound = function () {
    currentPlayer += 1;
    if (this.isLastPlayer(currentPlayer)) currentPlayer = 0;
  };

  this.addPlayer = function (playerName) {
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + this.howManyPlayers());
  };

  this.currentCategory = function () {
    const popQuestions = [0, 4, 8];
    const scienceQuestions = [1, 5, 9];
    const sportsQuestions = [2, 6, 10];
    if (popQuestions.includes(places[currentPlayer])) return "Pop";
    if (scienceQuestions.includes(places[currentPlayer])) return "Science";
    if (sportsQuestions.includes(places[currentPlayer])) return "Sports";
    return "Rock";
  };

  this.howManyPlayers = function () {
    return players.length;
  };

  this.isPlayable = function () {
    return this.howManyPlayers() >= 2;
  };

  this.isLastPlayer = function (player) {
    return this.howManyPlayers() === player;
  };

  this.didPlayerWin = function (purse) {
    return purse === COINS_TO_WIN;
  };
};

runGame = function () {
  let hasAWinner = false;
  const game = new Game();
  const randomDie = () => Math.floor(Math.random() * 10);
  const wrongAnswerCheck = () => Math.floor(Math.random() * 10) === 7;
  game.addPlayer("Chet");
  game.addPlayer("Pat");
  game.addPlayer("Sue");
  do {
    game.roll(randomDie());
    if (wrongAnswerCheck()) {
      game.wrongAnswer();
      hasAWinner = false;
    } else {
      hasAWinner = game.correctAnswer();
    }
  } while (!hasAWinner && game.isPlayable());
};

runGame();
