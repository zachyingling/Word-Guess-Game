var numGuesses = 12;
var currentWins = 0;
var listOfGames = ["OVERWATCH", "HALO", "BATTLEFIELD"];
var letterPresses = [];
var currentLetter = true;
var currentWord = "";
var restart = false;
var winIndicator = false;

renderWord();
updateWins();

function renderWord() {
  var randomNumber = Math.floor(Math.random() * 5);
  currentWord = listOfGames[randomNumber];
  var blankWord = "";
  for (var i = 0; i < currentWord.length; i++) {
    blankWord = blankWord + "_ ";
  }
  document.querySelector("#current-word").innerHTML = blankWord;
}

function updateWins() {
  // Updates number of wins if won
  document.querySelector("#win-number").innerHTML = currentWins.toString();
  currentWins++;
}

function updateGuesses(letter) {
  // Updates number of guess and letters guessed

  // Scans through current games letter presses
  for (var i = 0; i < letterPresses.length; i++) {
    if (letter.key.toUpperCase() === letterPresses[i]) {
      // False meaning don't use current letter
      currentLetter = false;
      break;
    } else {
      currentLetter = true;
    }
  }

  if (currentLetter === true) {
    numGuesses--;
    document.querySelector("#guess-number").innerHTML = numGuesses.toString();
    document
      .querySelector("#letters-guessed")
      .append(letter.key.toUpperCase() + ", ");
    letterPresses.push(letter.key.toUpperCase());
    if (numGuesses === 0) {
      numGuesses = 12;
      letterPresses = [];
      document.querySelector("#guess-number").innerHTML = numGuesses.toString();
      document.querySelector("#letters-guessed").innerHTML = "";
    }
  }
}

document.onkeypress = function(event) {
  updateGuesses(event);
};
