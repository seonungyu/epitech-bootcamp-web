const addForm = document.querySelector("#addForm");
const textInput = document.querySelector("#text");
const typeSelect = document.querySelector("#type");
const list = document.querySelector("#list");
const searchForm = document.querySelector("#searchForm");
const searchMode = document.querySelector("#searchMode");
const searchWords = document.querySelector("#searchWords");
const withTags = document.querySelector("#withTags");
const withoutTags = document.querySelector("#withoutTags");

function splitWords(value) {
    return value
        .toLowerCase()
        .split(/[\s,]+/)
        .filter(function (word) {
            return word !== "";
        });
}

function getTags(item) {
    return Array.from(item.querySelectorAll(".tag")).map(function (tag) {
        return tag.textContent;
    });
}

function addTag(item, name) {
    if (getTags(item).includes(name)) {
        return;
    }
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = name;
    item.querySelector(".tags").appendChild(tag);
}

function createItem(text, type) {
    const item = document.createElement("li");
    item.classList.add(type);
    item.dataset.type = type;

    const label = document.createElement("span");
    label.className = "text";
    label.textContent = text;

    const tags = document.createElement("div");
    tags.className = "tags";

    const tagForm = document.createElement("form");
    tagForm.className = "tag-form";
    const tagInput = document.createElement("input");
    tagInput.type = "text";
    tagInput.placeholder = "new tag(s)";
    const tagButton = document.createElement("button");
    tagButton.type = "submit";
    tagButton.textContent = "Add tag";
    tagForm.append(tagInput, tagButton);

    tagForm.addEventListener("submit", function (event) {
        event.preventDefault();
        for (const name of splitWords(tagInput.value)) {
            addTag(item, name);
        }
        tagInput.value = "";
    });

    item.append(label, tags, tagForm);
    return item;
}

addForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = textInput.value.trim();
    if (text === "") {
        return;
    }
    list.appendChild(createItem(text, typeSelect.value));
    textInput.value = "";
});

function matches(item) {
    const checked = searchForm.querySelectorAll("input[name=types]:checked");
    const types = Array.from(checked).map(function (box) {
        return box.value;
    });
    if (types.length > 0 && !types.includes(item.dataset.type)) {
        return false;
    }

    const words = splitWords(searchWords.value);
    if (words.length > 0) {
        const text = item.querySelector(".text").textContent.toLowerCase();
        const contains = words.some(function (word) {
            return text.includes(word);
        });
        if (searchMode.value === "with" ? !contains : contains) {
            return false;
        }
    }

    const tags = getTags(item);
    for (const tag of splitWords(withTags.value)) {
        if (!tags.includes(tag)) {
            return false;
        }
    }
    for (const tag of splitWords(withoutTags.value)) {
        if (tags.includes(tag)) {
            return false;
        }
    }
    return true;
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
