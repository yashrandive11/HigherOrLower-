const currentNumberElement = document.getElementById("current-number");
const higherButton = document.getElementById("higher");
const lowerButton = document.getElementById("lower");
const scoreElement = document.getElementById("score");
const chancesElement = document.getElementById("chances");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart");
const bootstrapAlert = document.getElementById("bootstrap-alert-restart");


let randomNumber = Math.floor(Math.random() * 50) + 1; // Initial random number
let previousNumber = randomNumber; // Holds the previous number
console.log(randomNumber);
chancesElement.classList.add("normal");
let score = 0;
let chances = 3;
// const restartSound = document.getElementById("restart-sound");
const loseSound = document.getElementById("losepoint-sound");
const winSound = document.getElementById("winpoint-sound");
const gameoverSound = document.getElementById("lose-sound");
bootstrapAlert.style.display="none";

function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

function updateChances() {
  chancesElement.textContent = ` ${chances}`;

  if (chances === 2) {
    chancesElement.classList.add("critical");
  } else if (chances === 1) {
    chancesElement.classList.add("warning");
  }
}

function checkGuess(guess) {
  if (guess === "higher" && randomNumber < previousNumber) {
    loseLife();
  } else if (guess === "lower" && randomNumber > previousNumber) {
    loseLife();
  } else {
    score++;
    updateScore();
    winSound.play();
    previousNumber = randomNumber; // Update previous number on correct guess
    generateNewNumber();
  }
}

function loseLife() {
  chances--;
  updateChances();
  loseSound.play();

  if (chances === 0) {
    loseGame();
  }
}

function generateNewNumber() {
  randomNumber = Math.floor(Math.random() * 50) + 1;
  console.log(randomNumber);

  // Display previous number if guess was correct
  if (previousNumber !== randomNumber) {
    currentNumberElement.textContent = previousNumber;
  } else {
    currentNumberElement.textContent = randomNumber;
  }
}

function loseGame() {
  bootstrapAlert.style.display="block";
  bootstrapAlert.textContent = "Game Over! You lost.";
  higherButton.disabled = true;
  lowerButton.disabled = true;
  gameoverSound.play();
  // restartButton.style.display = "block";
}

function restartGame() {
  bootstrapAlert.style.display="none";
  higherButton.disabled = false;
  lowerButton.disabled = false;
  randomNumber = Math.floor(Math.random() * 50) + 1;
  previousNumber = randomNumber; // Reset previous number on restart
  console.log(randomNumber);
  

  currentNumberElement.textContent = randomNumber;
  score = 0;
  chances = 3;
  updateScore();
  updateChances();
  messageElement.textContent = "";
  
  // restartButton.style.display = "none";
  //restartSound.play();
}

higherButton.addEventListener("click", () => checkGuess("higher"));
lowerButton.addEventListener("click", () => checkGuess("lower"));
restartButton.addEventListener("click", restartGame);

generateNewNumber();
updateScore();
updateChances();