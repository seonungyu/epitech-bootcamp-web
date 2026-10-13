const footer = document.querySelector("footer");
const message = footer.querySelector("div");
const okLink = message.querySelector("a");
let deleteBox = null;

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            return value;
        }
    }
    return null;
}

function showAccepted() {
    message.style.display = "none";
    deleteBox = document.createElement("div");
    const button = document.createElement("button");
    button.textContent = "Delete the cookie";
    button.addEventListener("click", deleteCookie);
    deleteBox.appendChild(button);
    footer.appendChild(deleteBox);
}

function deleteCookie() {
    document.cookie = "acceptsCookies=; max-age=0; path=/";
    deleteBox.remove();
    deleteBox = null;
    message.style.display = "";
}

okLink.addEventListener("click", function (event) {
    event.preventDefault();
    document.cookie = "acceptsCookies=true; max-age=86400; path=/";
    showAccepted();
});

if (getCookie("acceptsCookies") === "true") {
    showAccepted();
}
