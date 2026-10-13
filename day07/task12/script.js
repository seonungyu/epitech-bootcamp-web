const addForm = document.querySelector("#addForm");
const textInput = document.querySelector("#text");
const typeSelect = document.querySelector("#type");
const list = document.querySelector("#list");

addForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = textInput.value.trim();
    if (text === "") {
        return;
    }
    const item = document.createElement("li");
    item.textContent = text;
    item.classList.add(typeSelect.value);
    list.appendChild(item);
    textInput.value = "";
});
