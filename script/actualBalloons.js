// Check if balloonContainer is not defined before creating it
const balloonContainer = document.getElementById("balloon-container");

if (!balloonContainer) {
    console.error("Balloon container not found. Make sure the element exists and the ID is correct.");
}

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = random(5) + 5;
    return `
        background-color: rgba(${r},${g},${b},0.7);
        color: rgba(${r},${g},${b},0.7); 
        box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
        margin: ${mt}px 0 0 ${ml}px;
        animation: float ${dur}s ease-in infinite;
    `;
}

function createBalloon() {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloon.style.left = Math.random() * (100 - balloon.clientWidth) + "vw";
    balloonContainer.append(balloon);

    balloon.addEventListener('animationend', function() {
        balloon.remove();
    });
}

function startBalloonInterval() {
    if (document.getElementsByClassName("balloon").length === 0) {
        setInterval(createBalloon, 500);
        console.log("Balloon creation interval started");
    } else {
        console.log("Balloons are already present on the webpage");
    }
}

// Example usage:
startBalloonInterval(); // Call this to start the interval if no balloons are present
