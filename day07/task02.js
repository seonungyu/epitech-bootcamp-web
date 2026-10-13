const box = document.querySelector("footer div");

box.addEventListener("click", function () {
    let name = prompt("What's your name ?");
    while (name === null || name.trim() === "") {
        name = prompt("What's your name ?");
    }
    if (confirm("Are you sure that " + name + " is your name ?")) {
        alert("Hello " + name + " !");
        box.textContent = "Hello " + name + " !";
    }
});
