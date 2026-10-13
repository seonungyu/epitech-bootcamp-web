const input = document.querySelector("#listItem");
const button = document.querySelector("button");
let last = input;

button.addEventListener("click", function () {
    if (input.value.trim() === "") {
        return;
    }
    const item = document.createElement("div");
    item.textContent = input.value;
    last.after(item);
    last = item;
    input.value = "";
});
