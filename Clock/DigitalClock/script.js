const sectionElem = document.querySelector("section")
    icons = document.querySelector(".icons")

    // dark mode
    icons.addEventListener("click", ()=> {
        sectionElem.classList.toggle("dark")
    })

    setInterval(()=>{
        let date = new Date(),

        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();

        let d;
        d = hour < 12 ? "AM" : "PM"
        hour = hour > 12 ? hour-12 : hour
        hour = hour == 0 ? hour = 12 : hour

        const formatTime = (num) => String(num).padStart(2, "0");

        document.querySelector(".hourNum").innerText = formatTime(hour);
        document.querySelector(".minNum").innerText = formatTime(min);
        document.querySelector(".secNum").innerText = formatTime(sec);
        document.querySelector(".am_pm").innerText = d;

        },1000)