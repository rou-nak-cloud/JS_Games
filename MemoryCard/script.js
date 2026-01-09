const cards = document.querySelectorAll(".card")
const cardsContainer = document.querySelector(".cards");

let cardOne = null;
let cardTwo = null;
let disableDeck = false;

let matchedCard = 0;
function flipCards(e){
    let clickedCard = e.currentTarget; // getting user card
    clickedCard.classList.add("flip")
    if(clickedCard !== cardOne && !disableDeck){
        if(!cardOne){ // initially null, then
        return cardOne = clickedCard 
        // first card clicked then exist as returned (if cardOne does NOT exist)
    } 
    cardTwo = clickedCard 
    disableDeck = true // disable till cards matched
    // console.log(cardOne,cardTwo)
    cardsContainer.classList.add("lock");
    }
    let cardOneImg = cardOne.querySelector("img").src,
    cardTwoImg = cardTwo.querySelector("img").src;
    // console.log(cardOneImg,cardTwoImg)
    matchCards(cardOneImg,cardTwoImg,cardOne,cardTwo);

}

function matchCards(img1,img2,firstCard,secondCard){
    if(img1 === img2){
        matchedCard++;
        if(matchedCard === 8){
            console.log(matchedCard)
            setTimeout(() => {
                alert("Congrats! You found all matching cards")
                shuffleCard();
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
    },1200)
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
shuffleCard(); // call twice when user win and refresh the browser

function resetCards() {
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
   cardsContainer.classList.remove("lock");
}

cards.forEach((card)=> {
    // card.classList.add("flip") // for testing purpose
    card.addEventListener("click", flipCards)
})