// PennyKenny Coding
//  canvas board
let board;
let boardWidth = 360,
    boardHeight = 640;
let context;

// bird size and placement
// width/height ratio = 408/228 = 17/12 and result will be ratio * 2
let birdWidth = 34, 
    birdHeight = 24;
let birdX = boardWidth/8,
    birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

// pipes
let pipeArr = [];
let pipeWidth = 64, // width/height ratio = 384/3072 = 1/8
    pipeHeight = 512;
let pipeX = boardWidth,
    pipeY = 0;
let topPipeImg;
let bottomPipeImg;

let gameOver = false
let score = 0


// physics for pipes as they only move not the bird
let velocityX = -1 // moving pipe in left direction (2px to the left)
let velocityY = 0 // for bird jump speed initially 0 means stationery
let gravity = 0.25 // as foe velocityY it will go upwards forever if not define gravity

let pipeInterval;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // to draw in the board

    // draw the bird rectangle
    // context.fillStyle = 'blue';
    // context.fillRect(bird.x,bird.y,bird.width,bird.height);

    // load bird image
    birdImg = new Image();
    birdImg.src = './assets/flappybird0.png'
    // now draw it on onLoading function to load it everyReload
    birdImg.onload = function() {
        context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height)
    }

    topPipeImg = new Image();
    topPipeImg.src = './assets/toppipe.png';
    
    bottomPipeImg = new Image();
    bottomPipeImg.src = './assets/bottompipe.png';
    
    requestAnimationFrame(update); // start button to reRender
    pipeInterval = setInterval(placePipes, 1500); // every 1.5 seconds

    // for bird movement
    document.addEventListener("keydown", e => {
        if(!e.repeat) moveBird(e) // continue pressing space
    });
}
// main game Loop to draw the context over and over again
function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    // top left corner (0,0) and dimensions
    context.clearRect(0,0, board.width, board.height) 

    // bird
    velocityY += gravity; // to make fall 
    // bird.y += velocityY; // to change the direction before draw
    bird.y = Math.max(bird.y + velocityY, 0) // Ensures bird never goes above top (-10 -> 0) , limit to top
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height)

    // falling down of bird game over
    if(bird.y > board.height){
        gameOver = true;
        clearInterval(pipeInterval);
    }

    // pipe
    for (let i = 0; i < pipeArr.length; i++) {
        let pipe = pipeArr[i];
        pipe.x += velocityX;
        // draw that pipe with that index no
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height)

        if(!pipe.passed && bird.x > pipe.x + pipe.width){ // bird.x > left corner of pipe and right corner
            pipe.passed = true;
            score += 0.5; // there are two pipes! so 0.5 *2 = 1; 1 for each pipe
        }

        // collision checking
        if(detectCollision(bird,pipe)){
            gameOver = true;
            clearInterval(pipeInterval);
        }
    }

    // clear pipes
    while(pipeArr.length > 0 && pipeArr[0].x < -pipeWidth){
        pipeArr.shift(); // removes first element from the array
    }

    // score
    context.fillStyle = "White";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if(gameOver){
        // context.fillText("Game Over",5,90);
        context.fillText("Space to Restart", 5, 135);
    }
}

function placePipes() {
    if(gameOver){
        return;
    }
    /**
     * pipeY - pipeHeight/4 -> this is for the max level can go down then down pipe
     * (0-1)
     * o -> 0 - 128 - 0 (2nd level)
     * 1 -> 0 - 128 - 256 = -384 (1st level)
     */
    let randomPipeY = pipeY - pipeHeight/4 - Math.floor(Math.random() * (pipeHeight/2))
    let openingSpace = board.height/4;

    let topPipe = {
        img:topPipeImg,
        x:pipeX,
        y:randomPipeY,
        width:pipeWidth,
        height:pipeHeight,
        passed:false
    }
    pipeArr.push(topPipe)

    let bottomPipe = {
        img: bottomPipeImg,
        x:pipeX,
        y:randomPipeY + pipeHeight + openingSpace,
        width:pipeWidth,
        height:pipeHeight,
        passed:false
    }
    pipeArr.push(bottomPipe)
}

function moveBird(e) {
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX") {
        // jump
        velocityY = -5;

        // reset game
        if(gameOver){
            bird.y = birdY;
            pipeArr = [];
            score = 0;
            gameOver = false;

            pipeInterval = setInterval(placePipes, 1500); // to restart the pipe draw
        }
    }
}    

// detect collision
// Axis-Aligned Bounding Box (AABB) collision detection.
function detectCollision(a,b){
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}