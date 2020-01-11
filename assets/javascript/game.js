var numGuesses = 12;
var currentWins = 0;
var listOfGames = ["OVERWATCH", "HALO", "BATTLEFIELD"];
var eachCharacterOfGames = [];
var letterPresses = [];
var currentLetter = true;
var currentWord = "";
var restart = false;
var winIndicator = false;
var blankWord = "";
var randomNumber = 0;

// renderWord();
// updateWins();

function renderWord() {
  randomNumber = Math.floor(Math.random() * 3);
  blankWord = "";
  currentWord = listOfGames[randomNumber];
  for (var i = 0; i < currentWord.length; i++) {
    eachCharacterOfGames.push(currentWord.charAt(i));
    blankWord = blankWord + "_ ";
  }
  document.querySelector("#current-word").innerHTML = blankWord;
}

function updateWins() {
  // Updates number of wins if won
  document.querySelector("#win-number").innerHTML = currentWins.toString();
  currentWins++;
}

function restartGame() {
  numGuesses = 12;
  letterPresses = [];
  eachCharacterOfGames = [];
  document.querySelector("#guess-number").innerHTML = numGuesses.toString();
  document.querySelector("#letters-guessed").innerHTML = "";
  renderWord();
}

// Updates number of guess and letters guessed
function updateGuesses(letter) {
  // Scans through current games letter presses
  for (var i = 0; i < letterPresses.length; i++) {
    if (
      letter.key.toUpperCase() === letterPresses[i] ||
      !letter.key.toUpperCase().match(/^[A-Z]+$/)
    ) {
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
      .append(letter.key.toUpperCase() + " ");
    letterPresses.push(letter.key.toUpperCase());

    if (numGuesses === 0) {
      restartGame();
    }
  }
}

function updateWord(letter) {
  for (var i = 0; i < eachCharacterOfGames.length; i++) {
    if (eachCharacterOfGames[i] === letter.key) {
    } else {
      return;
    }
  }
}

document.onkeypress = function(event) {
  updateGuesses(event);
  updateWord(event);
};
