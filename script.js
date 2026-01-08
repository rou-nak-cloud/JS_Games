// snake food
const playBoard = document.querySelector(".playBoard");
const controls = document.querySelectorAll(".controls i");
const scoreBoard = document.querySelector(".score");
const highScoreBoard = document.querySelector(".highScore");

const gameOverModal = document.querySelector(".gameOverModal");
const finalScoreText = document.querySelector(".finalScore");
const restartBtn = document.querySelector(".restartBtn");


let gameOver = false;
let foodX, foodY;
let snakeX = 5,
    snakeY = 10;
let snakeBody = [];
let velocityX=0,
    velocityY = 0;
let setIntervalId;
let score =0;
let highScore = localStorage.getItem("highScore") || 0;
 highScoreBoard.innerText = `High Score: ${highScore}`;
const changeFoodPosition = () => {
  // passing random value from 1 - 30
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeSnakeMovement = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
// controls
controls.forEach((key) => {
    key.addEventListener("click", ()=> changeSnakeMovement({key: key.dataset.key}))
})

// Game over modal
const handleGameOver = () => {
  clearInterval(setIntervalId);
  finalScoreText.innerText = score;
  gameOverModal.classList.add("active");
};
restartBtn.addEventListener("click", () => {
  location.reload();
});


const initGame = () => {
    if(gameOver) return handleGameOver();
  let htmlMarkup = `<div class='food' style="grid-area: ${foodY} / ${foodX}"></div>`;
  // htmlMarkup += `<div class='head' style="grid-area: ${snakeY} / ${snakeX}"></div>`

  // Updating the snake based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  // change food after eaten
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); // update body += food
    // console.log(snakeBody);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("highScore", highScore);
    highScoreBoard.innerText = `High Score: ${highScore}`;
    scoreBoard.innerText = `Score: ${score}`;
  }

//   1. Move body from tail to head
//   for each body part from tail to neck: move it to where the previous part was
  for (let i = snakeBody.length - 1; i > 0; i--) {
    // shifting forward the values one by one
    snakeBody[i] = snakeBody[i - 1];
  }
// 2. Move head
  snakeBody[0] = [snakeX, snakeY]; // setting first (no food eaten) default position of the snake

  for (let i = 0; i < snakeBody.length; i++) {
    // snake body according to snakeBody array
    // grid-area: row / column;
    // grid-area: Y / X => [i]1 && [i]0
    htmlMarkup += `<div class='head' style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    // self collision
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
        gameOver = true;
    }
  }

// collision with wall
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) return gameOver = true;
    
  playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setIntervalId = setInterval(initGame, 120);

// snake movement
document.addEventListener("keydown", changeSnakeMovement);
