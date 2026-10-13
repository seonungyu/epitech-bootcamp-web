const addForm = document.querySelector("#addForm");
const textInput = document.querySelector("#text");
const typeSelect = document.querySelector("#type");
const list = document.querySelector("#list");
const searchForm = document.querySelector("#searchForm");
const searchType = document.querySelector("#searchType");

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

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    for (const item of list.children) {
        item.hidden = !item.classList.contains(searchType.value);
    }
});

searchForm.addEventListener("reset", function () {
    for (const item of list.children) {
        item.hidden = false;
    }
});
