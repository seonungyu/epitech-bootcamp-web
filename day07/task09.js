const button = document.querySelector("button");

button.addEventListener("click", function () {
    const paragraphs = document.querySelectorAll("p");
    for (const paragraph of paragraphs) {
        paragraph.style.display = "none";
    }
});
