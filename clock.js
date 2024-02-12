const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;

class Clock {
    constructor(color, width){
        this.color = color;
        this.width = width
    }
    shield(radius) {
        ctx.save();
        ctx.translate(150,150)
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = "black"
        ctx.lineWidth = 2
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    tick(time, height){
        ctx.save();
        ctx.rotate((time * Math.PI) / 30);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,-height);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.restore();
    }
    tickClear(){
        ctx.beginPath();
        ctx.arc(0, 0, 138, 0, 2 * Math.PI);
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1
        ctx.fill();
        ctx.stroke();
    }
}

//DRAWING ANALOG CLOCK
    const clockShield = new Clock("#ffffff", 5);
    clockShield.shield(140);

//CREATING TICKS AND CLEARER
    const hoursTick = new Clock("#000000", 5);
    const minutesTick = new Clock("#000000", 5);
    const secondsTick = new Clock("#000000", 2);
    const tickClear = new Clock("rgb(45, 93, 122, 1)", 1);
    const innerCircle = new Clock("#000000", 1)
    const tickLenght = { minutes: 105, hours: 70, seconds: 125
    }

//CREATING DIGITAL CLOCK
    let digital = document.getElementById("digital");
    let digitalHour;
    let digitalMinutes;
    let digitalSeconds;
    let digitalSpace = "<span style=\"color: #000000;\">|</span>";


const clockTicking = () => {

    // ACTUAL DATE
    let date = new Date();
    let thisSeconds = date.getSeconds() + (Math.floor(date.getMilliseconds() / 100) / 10) ;
    let seconds = thisSeconds
    let thisHour = date.getHours();
    let hour = thisHour * 5;
    let thisMinutes = date.getMinutes();
    let minutes = thisMinutes;
    
    //DRAWING TICKS
    ctx.translate(150,150)
    tickClear.tickClear();
    minutesTick.tick(minutes, tickLenght.minutes);
    hoursTick.tick(hour, tickLenght.hours);
    secondsTick.tick(seconds, tickLenght.seconds);
    ctx.translate(-150, -150);
    innerCircle.shield(3);

    //DRAWING DIGITAL
    if (thisHour < 10) { digitalHour = `0${thisHour}`} else {digitalHour = thisHour}
    if (thisMinutes < 10) { digitalMinutes = `0${thisMinutes}`} else {digitalMinutes = thisMinutes}
    if (thisSeconds < 10) { digitalSeconds = `0${Math.floor(thisSeconds)}`} else {digitalSeconds = Math.floor(thisSeconds)}

    digital.innerHTML = `${digitalHour} ${digitalSpace} ${digitalMinutes} ${digitalSpace} ${digitalSeconds}`
}

setInterval(clockTicking, 100);
ctx.setTransform(1, 0, 0, 1, 0 ,0);