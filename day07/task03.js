const box = document.querySelector("footer div");
let typed = "";

box.style.whiteSpace = "pre";

document.addEventListener("keydown", function (event) {
    if (event.key.length !== 1) {
        return;
    }
    typed = (typed + event.key).slice(-42);
    box.textContent = typed;
});
