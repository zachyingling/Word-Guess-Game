var numGuesses = 12;
var currentWins = 0;
var listOfGames = ["OVERWATCH", "HALO", "SKYRIM"];
var eachCharacterOfGames = [];
var letterPresses = [];
var images = [
  "assets/images/overwatch.jpg",
  "assets/images/halo.jpg",
  "assets/images/skyrim.jpg"
];
var currentImage = "";
var characterFound = false;
var currentLetter = true;
var currentWord = "";
var updatedWord = [];
var wordOutput = "";
var randomNumber = 0;
var temp = 0;

updateWins();
renderWord();

function renderWord() {
  randomNumber = Math.floor(Math.random() * 3);
  currentWord = listOfGames[randomNumber];
  currentImage = images[randomNumber];
  for (var i = 0; i < currentWord.length; i++) {
    eachCharacterOfGames.push(currentWord.charAt(i));
    updatedWord.push("_");
    wordOutput += updatedWord[i] + " ";
  }

  document.querySelector("#current-word").innerHTML = wordOutput;
}

function updateImage() {
  document.querySelector("#game-image").src = currentImage;
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
  updatedWord = [];
  wordOutput = "";
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
    if (
      eachCharacterOfGames[i] === letter.key.toUpperCase() &&
      !letterPresses.includes(letter.key.toUpperCase())
    ) {
      characterFound = true;
      break;
    } else {
      characterFound = false;
    }
  }

  if (characterFound === true) {
    numGuesses++;
    document.querySelector("#guess-number").innerHTML = numGuesses.toString();
    wordOutput = "";
    updatedWord[i] = eachCharacterOfGames[i];
    for (var j = 0; j < updatedWord.length; j++) {
      wordOutput += updatedWord[j] + " ";
    }
    document.querySelector("#current-word").innerHTML = wordOutput;
  }
}

document.onkeypress = function(event) {
  updateWord(event);
  updateGuesses(event);
  if (!updatedWord.includes("_")) {
    alert("You won! The word was (" + wordOutput + ")");
    updateImage();
    updateWins();
    restartGame();
  }
};
