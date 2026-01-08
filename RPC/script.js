const gameContainer = document.querySelector(".container")
 userResult = document.querySelector(".userResult img")
 cpuResult = document.querySelector(".cpuResult img")
 result = document.querySelector(".result")
 optionImages = document.querySelectorAll(".optionimage")

// loop through each image
optionImages.forEach((img,idx) => {
    img.addEventListener("click", (e)=> {
        img.classList.add("active")

        // again loop as to match which img is selected
        optionImages.forEach((img2,idx2) => {
            // console.log(idx, idx2) 0,0 0,1 0,2 like this
            // if the current idx not matched with the click index then remove the classlist
            idx !== idx2 && img2.classList.remove("active")
        })
        let imgSrc = e.currentTarget.querySelector("img").src // to avoid setTimeout callback function delay

        gameContainer.classList.add("start")
        userResult = cpuResult.src = "assets/rock.png"
        
        // Timeout to delay the result calculation
        let timer = setTimeout(()=>{
        gameContainer.classList.remove("start")
        // select the user image and show it
        // userResult.src = e.target.src
        /**Best Practice */
        
        userResult.src = imgSrc;
        //  currentTarget → element that has the eventlistener
        //  target → element that was actually clicked

        // generate random number between 0-2
        let randomNum = Math.floor(Math.random()*3)

        // create array for cpu images and store that img based on the randomNum
        let cpuImages = ["assets/rock.png", "assets/paper.png","assets/scissors.png"]
        cpuResult.src = cpuImages[randomNum];

        // Assign a letter value to the cpu option
        let cpuValue = ["R","P","S"][randomNum]
        // Assign a letter value to the user option
        let userValue = ["R","P","S"][idx]

        // create an object with all possible outcomes
        let outComes = {
            RR: "Draw",
            RP: "Cpu",
            RS: "User",
            PP: "Draw",
            PR: "User",
            PS: "Cpu",
            SS: "Draw",
            SR: "Cpu",
            SP: "User",
        }
        let outComesValue = outComes[userValue + cpuValue]
        // console.log(outComesValue)

        // display the result
        result.textContent = userValue === cpuValue ? "It's a Draw!" : outComesValue === "User" ? "You Win!" : "You Lose!";
        },2000)


    })
})
