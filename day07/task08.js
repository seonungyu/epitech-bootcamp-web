const links = document.querySelectorAll('a:not([target="_blank"])');

for (const link of links) {
    link.style.opacity = "0.5";
}
