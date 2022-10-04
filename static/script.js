let currentGame;

class Boggle {
  constructor(word, totalScore = 0, wordsArray = []) {
    this.totalScore = totalScore;
    this.wordsArray = wordsArray;
    this.checkWord(word);
  }

  async checkWord(word) {
    word = word.toLowerCase();
    if (word == this.wordsArray.filter(() => word)) {
      return window.alert("Word has already been guessed!");
    }
    this.wordsArray.push(word);
    if (word.length < 3) {
      return window.alert("Word must be at least 3 letters!");
    }
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
    $("#wordsList").append(`<li><b>${word}</b> is ${score} point(s)</li>`);
    return score;
  }

  gameScore() {
    $("#score").text(`Total Score = ${this.totalScore}`);
  }
}

class Timer {
  constructor() {
    this.timer();
  }

  timer() {
    let time = 60;
    let interval = setInterval(function () {
      time -= 1;
      $("#clock").text(`Timer: ${time}`);
      console.log(time);
      if (time === -1) {
        clearInterval(interval);
        window.alert("Gameover");
        return this.endGame();
      }
    }, 1000);
  }
  endGame() {
    console.log(currentGame.wordsArray);
  }
}

$("#input button").on("click", function (event) {
  event.preventDefault();
  let word = $("#word").val();
  currentGame = new Boggle(word);
  return currentGame;
});

new Timer();
