const cards = document.querySelectorAll(".card")
const cardsContainer = document.querySelector(".cards");

const timeTag = document.getElementById("time");
const flipTag = document.getElementById("flips");
const refreshBtn = document.getElementById("refresh");

const modal = document.querySelector(".game-modal");
const modalTitle = document.querySelector(".modal-title");
const modalText = document.querySelector(".modal-text");
const modalBtn = document.getElementById("modal-btn");


let cardOne = null;
let cardTwo = null;
let disableDeck = false;

let matchedCard = 0;
let flips = 0;
let timeLeft = 30;
let timer;
let gameStarted = false;
let gameOver = false;

// Timer 
function startTimer() {
  if (gameStarted) return;
  gameStarted = true;

  timer = setInterval(() => {
    timeLeft--;
    timeTag.innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
       gameOver = true;
      disableDeck = true;  
      cardsContainer.classList.add("lock");
      showModal("Time's Up ⏰", "You ran out of time. Try again!");
    }
  }, 1000);
}

// game logic
function flipCards(e){
    if (gameOver) return; // stop game
    let clickedCard = e.currentTarget; // getting user card
    if(clickedCard === cardOne || disableDeck) return;

    startTimer();
    clickedCard.classList.add("flip")

    flips++;
    flipTag.innerText = flips;

    if(!cardOne){ // initially null, then
        return cardOne = clickedCard; 
        // first card clicked then exist as returned (if cardOne does NOT exist)
    }
    cardTwo = clickedCard 
    disableDeck = true // disable till cards matched
    // console.log(cardOne,cardTwo)
    cardsContainer.classList.add("lock");

    let cardOneImg = cardOne.querySelector("img").src,
    cardTwoImg = cardTwo.querySelector("img").src;
    // console.log(cardOneImg,cardTwoImg)
    matchCards(cardOneImg,cardTwoImg,cardOne,cardTwo);

}

function matchCards(img1,img2,firstCard,secondCard){
    if(img1 === img2){
        matchedCard++;
        if(matchedCard === 8){
            clearInterval(timer);
            // console.log(matchedCard)
            setTimeout(() => {
                showModal("You Win!", "Congratulations! You matched all cards.");
                resetGame();
            }, 400);
            return;
        }
        firstCard.removeEventListener("click",flipCards)
        secondCard.removeEventListener("click",flipCards)
       // resetting
        resetCards();
        return;
        // below code doesn't run
    }
    // to add only shake for .4s
    setTimeout(()=>{
        firstCard.classList.add("shake")
        secondCard.classList.add("shake")
    },400)
    // to remove both shake and flip class after 1.2s
    setTimeout(()=>{
        firstCard.classList.remove("shake", "flip")
        secondCard.classList.remove("shake", "flip")
        resetCards();
    },1000)
}

function shuffleCard(){
    matchedCard = 0
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,] // 8 unique images twice
    arr.sort(()=> Math.random() > 0.5 ? 1 : -1) // sort the array randomly
    disableDeck = false; 
    cards.forEach((card,idx)=> {
        card.classList.remove("flip")
        let imgTag = card.querySelector("img")
        imgTag.src = `assets/img-${arr[idx]}.png`;
        card.addEventListener("click", flipCards)
    })
}


function resetGame() {
  clearInterval(timer);
  timeLeft = 30;
  flips = 0;
  matchedCard = 0;
  gameStarted = false;
  gameOver = false;
  disableDeck = false;

  timeTag.innerText = timeLeft;
  flipTag.innerText = flips;

  cardsContainer.classList.remove("lock");
  shuffleCard();
}

refreshBtn.addEventListener("click", resetGame);
shuffleCard(); // call twice when user win and refresh the browser

function resetCards() {
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
   cardsContainer.classList.remove("lock");
}

function showModal(title, text) {
  modalTitle.innerText = title;
  modalText.innerText = text;
  modal.classList.remove("hidden");
  disableDeck = true;
  cardsContainer.classList.add("lock");
}

function hideModal() {
  modal.classList.add("hidden");
  resetGame();
}
modalBtn.addEventListener("click", hideModal);

cards.forEach((card)=> {
    // card.classList.add("flip") // for testing purpose
    card.addEventListener("click", flipCards)
})