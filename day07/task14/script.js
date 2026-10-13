const addForm = document.querySelector("#addForm");
const textInput = document.querySelector("#text");
const typeSelect = document.querySelector("#type");
const list = document.querySelector("#list");
const searchForm = document.querySelector("#searchForm");
const searchType = document.querySelector("#searchType");
const searchMode = document.querySelector("#searchMode");
const searchWord = document.querySelector("#searchWord");

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

function matches(item) {
    const type = searchType.value;
    if (type !== "" && !item.classList.contains(type)) {
        return false;
    }
    const word = searchWord.value.trim().toLowerCase();
    if (word === "") {
        return true;
    }
    const contains = item.textContent.toLowerCase().includes(word);
    return searchMode.value === "with" ? contains : !contains;
}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    for (const item of list.children) {
        item.hidden = !matches(item);
    }
});

searchForm.addEventListener("reset", function () {
    for (const item of list.children) {
        item.hidden = false;
    }
});
