import { wordList } from "./words.js";

const inputs = document.querySelector(".inputs")
const resetBtn = document.querySelector(".reset-btn")
const hintSpan = document.querySelector(".hint span")
const guessLeftSpan = document.querySelector(".guessLeft span")
const wrongLetterSpan = document.querySelector(".wrongLetter span")
const typingInput = document.querySelector(".input-typing")

let word = null,
    maxGuess = null;
let wrongLetters = []
let correctLetters = []


function ranWord(){
    let randObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = randObj.word;
    let hint = randObj.hint;
    maxGuess = 8;
    correctLetters = [];
    wrongLetters = [];
    console.log(word)

    hintSpan.innerText = hint;
    wrongLetterSpan.innerText = wrongLetters.join(", ");
    guessLeftSpan.innerText = maxGuess;

    // adding every input tag for every word
    let html = ""
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled />`;
    }
    inputs.innerHTML = html;
}
function initGame(e){
    let key = e.currentTarget.value;
    if(key.match(/^[a-zA-Z]$/) && !wrongLetters.includes(` ${key}`) && !correctLetters.includes(key)){
        if(word.includes(key)){
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key){
                    // Set removes duplicates, but also guard it:
                    if (!correctLetters.includes(key)) {
                        correctLetters.push(key);
                        }
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else{
            // console.log("not found")
            maxGuess--;
            wrongLetters.push(key);
        }
    }else{
        e.currentTarget.value = ""
        // alert("Please enter a valid number")
    }
    wrongLetterSpan.innerText = wrongLetters.join(", ");
    guessLeftSpan.innerText = maxGuess;
    typingInput.value = "" // to clear the input once user enter a value

    // user win and loose condition and give some delay to finish the input process
    setTimeout(() => {
        // Anything that depends on gameplay state must be calculated INSIDE the game logic, not globally
        // unique guesses
        let uniqueCorrectLetters = [...new Set(correctLetters)]. length;
        let uniqueWordLetters = new Set(word).size;
            // or
        // const uniqueWordLetters = [...new Set(word).size].length;

        if(uniqueCorrectLetters === uniqueWordLetters){
        alert(`Congrats! You found the word ${word.toUpperCase()}`)
        ranWord();
    }// maxValue === 0
     else if(maxGuess < 1){
        alert("Game Over! You didn't find the word")
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }
    },400)
}


ranWord();
resetBtn.addEventListener("click", ranWord);
typingInput.addEventListener("input", initGame);
// for mobile devices
inputs.addEventListener("click", () => typingInput.focus())
// focusing on typing input means what user is typing
document.addEventListener("keydown", () => typingInput.focus())