const canvas = document.querySelector("canvas");
const audio = document.querySelector("audio");
const buttons = document.querySelectorAll("footer button");
const pauseButton = buttons[0];
const stopButton = buttons[1];

const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(6, 6);
ctx.lineTo(14, 10);
ctx.lineTo(6, 14);
ctx.closePath();
ctx.fillStyle = "white";
ctx.fill();
ctx.lineWidth = 1;
ctx.strokeStyle = "white";
ctx.stroke();

audio.src = "https://universal-soundbank.com/sounds/13631.mp3";

canvas.addEventListener("click", function () {
    audio.play();
});

pauseButton.addEventListener("click", function () {
    audio.pause();
});

stopButton.addEventListener("click", function () {
    audio.pause();
    audio.currentTime = 0;
});
