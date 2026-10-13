const buttons = document.querySelectorAll("footer button");
const plus = buttons[0];
const minus = buttons[1];
const colors = document.querySelector("footer select");
let fontSize = parseFloat(getComputedStyle(document.body).fontSize);

plus.addEventListener("click", function () {
    fontSize += 2;
    document.body.style.fontSize = fontSize + "px";
});

minus.addEventListener("click", function () {
    if (fontSize > 4) {
        fontSize -= 2;
        document.body.style.fontSize = fontSize + "px";
    }
});

colors.addEventListener("change", function () {
    if (colors.value !== "") {
        document.body.style.backgroundColor = colors.value;
    }
});
