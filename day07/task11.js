const paragraphs = document.querySelectorAll("p");

for (const paragraph of paragraphs) {
    paragraph.addEventListener("mouseenter", function () {
        paragraph.classList.add("blue");
    });
    paragraph.addEventListener("mouseleave", function () {
        paragraph.classList.remove("blue");
    });
    paragraph.addEventListener("click", function () {
        paragraph.classList.toggle("highlighted");
    });
}
