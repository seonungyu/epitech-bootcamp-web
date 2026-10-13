const boxes = document.querySelectorAll("footer div");
const area = boxes[0];
const output = boxes[1];
const square = document.querySelector("canvas");
let dragging = false;
let grabX = 0;
let grabY = 0;

const startX = square.offsetLeft - area.offsetLeft;
const startY = square.offsetTop - area.offsetTop;
area.style.position = "relative";
square.style.position = "absolute";
square.style.margin = "0";
square.style.left = startX + "px";
square.style.top = startY + "px";

square.addEventListener("mousedown", function (event) {
    dragging = true;
    grabX = event.clientX - square.offsetLeft;
    grabY = event.clientY - square.offsetTop;
    event.preventDefault();
});

document.addEventListener("mousemove", function (event) {
    if (!dragging) {
        return;
    }
    let x = event.clientX - grabX;
    let y = event.clientY - grabY;
    x = Math.max(0, Math.min(x, area.clientWidth - square.offsetWidth));
    y = Math.max(0, Math.min(y, area.clientHeight - square.offsetHeight));
    square.style.left = x + "px";
    square.style.top = y + "px";
    output.textContent = "New coordinates => {x:" + x + ", y:" + y + "}";
});

document.addEventListener("mouseup", function () {
    dragging = false;
});
