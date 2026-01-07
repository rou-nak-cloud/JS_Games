const keyboardDiv = document.querySelector(".keyboard")
const wordDisplayDiv = document.querySelector(".wordDisplay")
const gameModal = document.querySelector(".gameModal")
const playAgainBtn = document.querySelector(".playAgain")
const guessTextDiv = document.querySelector(".guessText b")
const hangmanImageDiv = document.querySelector(".hangmanBox img")

let currentWord, wrongGuessed, currentLetters;
const maxGuessed=6;

// Generating small characters
for(let i=97;i<=122;i++){
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target,String.fromCharCode(i)))
}
const initGame = (button,clickedLetter) => {
    // checking if there is letter in that word
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,idx)=>{
            if(letter === clickedLetter){
                currentLetters.push(letter)
                wordDisplayDiv.querySelectorAll("li")[idx].innerText = letter;
                wordDisplayDiv.querySelectorAll("li")[idx].classList.add("guessed");
            }
        })
    } else{
        wrongGuessed++;
        // adding images based on the wrong guess count number..
        hangmanImageDiv.src = `assets/hangman-${wrongGuessed}.svg`
    }
    // update the guess score
    guessTextDiv.innerText = `${wrongGuessed} | ${maxGuessed}`
    // disable the button
    button.disabled = true

    // checking for game modal
    if(wrongGuessed === maxGuessed) return gameOver(false)
    if(currentLetters.length === currentWord.length) return gameOver(true)
}
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `assets/${isVictory ? "victory" : "lost"}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? "Congrats!" : "Game Over!"}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 200); 
}

// random words with hint
import { wordList } from "./words.js"
const getRandomWord = () => {
    const { word,hint } = wordList[Math.floor(Math.random()*wordList.length)]
    // putting words
    document.querySelector(".hintText b").innerText = hint
    wordDisplayDiv.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("")
    currentWord = word
    // console.log(word)
    resetGame();
}
const resetGame = ()=> {
    currentLetters = []; // Reset currentLetters
    wrongGuessed = 0;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false); // Enable all keyboard buttons
    hangmanImageDiv.src = `assets/hangman-${wrongGuessed}.svg`
    guessTextDiv.innerText = `${wrongGuessed} | ${maxGuessed}`
    gameModal.classList.remove("show")
}
getRandomWord();
// play Again
playAgainBtn.addEventListener("click", getRandomWord);
