// Game class which is called with each instance of the boggle game.
class Boggle {
  // Constructor defines three class variables: word, totalScore, and wordsArray.
  constructor(word = null, totalScore = 0, wordsArray = []) {
    this.word = word;
    this.totalScore = totalScore;
    this.wordsArray = wordsArray;
  }

  // On form submission,
  async checkWord(word) {
    word = word.toLowerCase();
    // checks to make sure the word has not already been played.
    if (word == this.wordsArray.filter(() => word)) {
      return window.alert("Word has already been guessed!");
    }
    // Warns the user that a word must be at least 3 letters long.
    this.wordsArray.push(word);
    if (word.length < 3) {
      return window.alert("Word must be at least 3 letters!");
    }
    // Sends the word to the server to be checked by Python for validity. If statements notify the user of
    // invalid words.
    const response = await axios.get("/check-word", { params: { text: word } });
    if (response.data == "not-word") {
      return window.alert("Word not valid!");
    }
    if (response.data == "not-on-board") {
      return window.alert("Word is not playable!");
    }
    this.createList(word);
    return this.gameScore();
  }

  // Sends the word to be scored and put in an HTML list on the page.
  createList(word) {
    let score = 0;
    if (word.length === 3) {
      score = 1;
    }
    if (word.length === 4) {
      score = 1;
    }
    if (word.length === 5) {
      score = 2;
    }
    if (word.length === 6) {
      score = 3;
    }
    if (word.length === 7) {
      score = 5;
    }
    if (word.length > 7) {
      score = 11;
    }
    this.totalScore += score;
    $("#wordsList").append(
      `<li id="words"><b>${word}</b> is ${score} point(s)</li>`
    );
    return score;
  }

  // Displays the score of the game.
  gameScore() {
    $("#score").text(`Total Score = ${this.totalScore}`);
  }

  // At the end of the game, sends the score to the server to determine if the final score is a new high score.
  // Notifies the user.
  async recordScore() {
    let score = this.totalScore;
    await axios.post("/recordscore", { score: score });
    const highScore = await axios.get("/highscore");
    if (score > highScore) {
      return window.alert(`You got the high score of ${score}`);
    }
    return console.log(highScore.data);
  }
}

// A class that tracks the time for the game and starts the end game when time has expired.
class Timer {
  constructor() {
    this.timer();
  }

  // Sets and tracks the game time. Calls the endGame function when time has expired.
  timer() {
    const gameEnd = this.endGame;
    let time = 60;
    let interval = setInterval(function () {
      time -= 1;
      $("#clock").text(`Timer: ${time}`);
      if (time === -1) {
        clearInterval(interval);
        window.alert("Gameover");
        return gameEnd();
      }
    }, 1000);
  }

  // When time has expired, calls the recordScore function, asks the user if they want to restart the game, and
  // reloads the page to start a new game.
  async endGame() {
    currentGame.recordScore();
    window.alert("restart game?");
    window.location.reload();
  }
}

// Defines the current instance of the boggle game as current game.
let currentGame = new Boggle();

// Click event for the form used to input a word.
$("#input button").on("click", function (event) {
  event.preventDefault();
  let word = $("#word").val();
  currentGame.checkWord(word);
});

// Calls Class Boggle at the start of the game.
currentGame;
// Calls Class Timer at the start of the game.
new Timer();
