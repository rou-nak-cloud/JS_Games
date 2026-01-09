const body = document.querySelector("body")
 hourHand = document.querySelector(".hour")
 minuteHand = document.querySelector(".minute")
 secondHand = document.querySelector(".second")
 modeSwitch = document.querySelector(".modeSwitch")

//  check in local storage
    if(localStorage.getItem("mode") === "Dark"){
        body.classList.add("dark")
        modeSwitch.textContent = "Light Mode"
    }

// toggle dark mode
modeSwitch.addEventListener("click", ()=>{
    body.classList.toggle("dark")
    const isDarkMode = body.classList.contains("dark")
    modeSwitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode"
    // localStorage
    localStorage.setItem("mode", isDarkMode ? "Dark" : "Light")
})

const updateTime = ()=>{
    // get current time and calculate deg fro clock hands respect to date
    let date = new Date(),
    secToDeg = (date.getSeconds()/60)*360,
    minToDeg = (date.getMinutes()/60)*360,
    hrToDeg = (date.getHours()/12)*360;
   
    secondHand.style.transform = `rotate(${secToDeg}deg)`
    minuteHand.style.transform = `rotate(${minToDeg}deg)`
    hourHand.style.transform = `rotate(${hrToDeg}deg)`

}

//  call updateTime to set clock hands every second
setInterval(updateTime,1000);

// call update time function on page load
updateTime();