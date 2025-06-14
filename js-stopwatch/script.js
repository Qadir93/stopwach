var [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
var display = document.getElementById("display");
var timer = null;
var laps = document.getElementById("laps");

function updateDisplay() {
    var h = hours < 10 ? "0" + hours : hours;
    var m = minutes < 10 ? "0" + minutes : minutes;
    var s = seconds < 10 ? "0" + seconds : seconds;
    var ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;
    display.innerText = `${h}:${m}:${s}.${ms}`;
}

function stopwatch() {
    milliseconds += 1;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    updateDisplay();
}

document.getElementById("startStop").addEventListener("click", function () {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
        this.innerText = "Start";
    } else {
        timer = setInterval(stopwatch, 10);
        this.innerText = "Pause";
    }
});

document.getElementById("reset").addEventListener("click", function () {
    clearInterval(timer);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    updateDisplay();
    document.getElementById("startStop").innerText = "Start";
    timer = null;
    laps.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", function () {
    if (timer !== null) {
        const lapTime = display.innerText;
        const lap = document.createElement("div");
        lap.textContent = lapTime;
        laps.prepend(lap);
    }
});