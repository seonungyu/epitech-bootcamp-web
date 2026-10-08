// =========================================================
// Seon-ung YU - Online resume: interactive parts
//   1. language switch (EN / KO)
//   2. mobile menu
//   3. sections appearing on scroll
//   4. flip cards (Interests)
//   5. mini hangman game
//   6. contact form (opens the e-mail application)
// =========================================================

// tells the css that javascript is running (used by the scroll animation)
document.documentElement.classList.add("js");

// ---------- 1. Language switch ----------
const langButtons = document.querySelectorAll(".lang-btn");

// texts written by javascript (game and form messages)
const messages = {
    en: {
        title: "Seon-ung YU - Resume",
        hint: "Hint: ",
        won: "Well played! You found it.",
        lost: "Lost! The word was ",
        lives: " lives left",
        sent: "Your e-mail application is opening. Thank you for your message!"
    },
    ko: {
        title: "유선웅 - 이력서",
        hint: "힌트: ",
        won: "정답입니다! 잘하셨어요.",
        lost: "아쉬워요! 정답은 ",
        lives: "번 남았어요",
        sent: "메일 앱이 열립니다. 메시지 감사합니다!"
    }
};

let currentLang = "en";

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = messages[lang].title;

    langButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", button.dataset.lang === lang ? "true" : "false");
    });

    // placeholders and <option> labels cannot contain <span>, so they are swapped here
    document.querySelectorAll("[data-placeholder-" + lang + "]").forEach(function (field) {
        field.placeholder = field.dataset["placeholder" + capitalize(lang)];
    });
    document.querySelectorAll("[data-label-" + lang + "]").forEach(function (option) {
        option.textContent = option.dataset["label" + capitalize(lang)];
    });

    updateGameTexts();

    try {
        localStorage.setItem("resume-lang", lang);
    } catch (error) {
        // storage blocked (private window): the page still works
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        setLanguage(button.dataset.lang);
    });
});

// ---------- 2. Mobile menu ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// close the menu after choosing a section
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

// ---------- 3. Sections appearing on scroll ----------
const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(function (section) {
    revealObserver.observe(section);
});

// ---------- 4. Flip cards (click / tap for touch screens) ----------
document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("click", function () {
        const flipped = card.classList.toggle("flipped");
        card.setAttribute("aria-pressed", flipped ? "true" : "false");
    });
});

// ---------- 5. Mini hangman ----------
const words = [
    { word: "PITSTOP", en: "Formula 1, a few seconds in the garage", ko: "F1, 몇 초 만에 끝나는 정비" },
    { word: "PARIS", en: "Where I live now", ko: "지금 사는 도시" },
    { word: "DAEGU", en: "My hometown", ko: "내 고향" },
    { word: "TENNIS", en: "My favorite sport", ko: "가장 좋아하는 스포츠" },
    { word: "PYTHON", en: "My first programming language", ko: "처음 배운 프로그래밍 언어" },
    { word: "ENGINE", en: "The heart of a car", ko: "자동차의 심장" },
    { word: "EPITECH", en: "My school", ko: "나의 학교" }
];
const maxErrors = 6;

const parts = document.querySelectorAll(".gallows .part");
const wordDisplay = document.getElementById("game-word");
const hintDisplay = document.getElementById("game-hint");
const statusDisplay = document.getElementById("game-status");
const keyboard = document.getElementById("keyboard");

let secret = null;
let found = [];
let errors = 0;
let gameOver = false;

// one button per letter, created once
for (let code = 65; code <= 90; code++) {
    const letter = String.fromCharCode(code);
    const key = document.createElement("button");
    key.type = "button";
    key.className = "key";
    key.textContent = letter;
    key.addEventListener("click", function () {
        guess(letter);
    });
    keyboard.appendChild(key);
}

function newGame() {
    let next = words[Math.floor(Math.random() * words.length)];
    // avoid getting the same word twice in a row
    while (secret && next.word === secret.word) {
        next = words[Math.floor(Math.random() * words.length)];
    }
    secret = next;
    found = [];
    errors = 0;
    gameOver = false;

    parts.forEach(function (part) {
        part.classList.remove("shown");
    });
    keyboard.querySelectorAll(".key").forEach(function (key) {
        key.disabled = false;
        key.classList.remove("good");
    });
    updateGameTexts();
}

function guess(letter) {
    if (gameOver || found.includes(letter)) {
        return;
    }
    found.push(letter);

    const key = Array.from(keyboard.children).find(function (button) {
        return button.textContent === letter;
    });
    key.disabled = true;

    if (secret.word.includes(letter)) {
        key.classList.add("good");
    } else {
        parts[errors].classList.add("shown");
        errors++;
    }

    const allFound = secret.word.split("").every(function (char) {
        return found.includes(char);
    });
    if (allFound || errors === maxErrors) {
        gameOver = true;
        keyboard.querySelectorAll(".key").forEach(function (button) {
            button.disabled = true;
        });
    }
    updateGameTexts();
}

function updateGameTexts() {
    if (!secret) {
        return;
    }
    const text = messages[currentLang];
    const lost = gameOver && errors === maxErrors;

    wordDisplay.textContent = secret.word.split("").map(function (char) {
        return found.includes(char) || lost ? char : "_";
    }).join(" ");
    hintDisplay.textContent = text.hint + secret[currentLang];

    statusDisplay.classList.toggle("lost", lost);
    if (lost) {
        statusDisplay.textContent = text.lost + secret.word;
    } else if (gameOver) {
        statusDisplay.textContent = text.won;
    } else {
        statusDisplay.textContent = (maxErrors - errors) + text.lives;
    }
}

document.getElementById("game-restart").addEventListener("click", newGame);

// physical keyboard, only when the game is visible on screen
document.addEventListener("keydown", function (event) {
    const letter = event.key.toUpperCase();
    const gameBox = keyboard.getBoundingClientRect();
    const onScreen = gameBox.top < window.innerHeight && gameBox.bottom > 0;
    const typingInForm = event.target.closest("input, textarea, select");

    if (onScreen && !typingInForm && /^[A-Z]$/.test(letter)) {
        guess(letter);
    }
});

// ---------- 6. Contact form ----------
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const subject = form.elements.subject.value;
    const message = form.elements.message.value.trim();

    const body = message + "\n\n— " + name + " (" + email + ")";
    const link = "mailto:seon-ung.yu@epitech.eu"
        + "?subject=" + encodeURIComponent("[Resume] " + subject)
        + "&body=" + encodeURIComponent(body);

    window.location.href = link;
    document.getElementById("form-status").textContent = messages[currentLang].sent;
    form.reset();
});

// ---------- Start ----------
// language: ?lang=ko in the address first, then the last choice, then English
let savedLang = new URLSearchParams(window.location.search).get("lang");
if (!savedLang) {
    try {
        savedLang = localStorage.getItem("resume-lang");
    } catch (error) {
        savedLang = null;
    }
}
newGame();
setLanguage(savedLang === "ko" ? "ko" : "en");
