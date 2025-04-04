// quiz.js
const quizData = [
    { question: "Quel pays a gagné 7 titres de la CAN ?", answer: "Égypte" },
    { question: "Quel pays a gagné la CAN en 1984 et 1988 ?", answer: "Cameroun" },
    { question: "Quel pays a gagné la CAN en 1963, 1965, 1978 et 1982 ?", answer: "Ghana" },
    { question: "Quel pays a gagné la CAN en 1980 ?", answer: "Nigeria" },
    { question: "Quel pays a gagné la CAN en 1992 et 2015 ?", answer: "Côte d'Ivoire" },
    { question: "Quel pays a gagné la CAN en 1990 et 2019 ?", answer: "Algérie" },
    { question: "Quel pays a gagné la CAN en 1968 ?", answer: "RD Congo" },
    { question: "Quel pays a gagné la CAN en 2004 ?", answer: "Tunisie" },
    { question: "Quel pays a gagné la CAN en 2012 ?", answer: "Zambie" },
    { question: "Quel pays a gagné la CAN en 1996 ?", answer: "Afrique du Sud" },
    { question: "Quel pays a gagné la CAN en 1976 ?", answer: "Maroc" },
    { question: "Quel pays a gagné la CAN en 1972 ?", answer: "Congo" },
    { question: "Quel pays a gagné la CAN en 1970 ?", answer: "Soudan" },
    { question: "Quel pays a gagné la CAN en 1962 ?", answer: "Éthiopie" },
    { question: "Quel pays a gagné la CAN en 2022 ?", answer: "Sénégal" },
    { question: "Quel pays a gagné la CAN en 2023 ?", answer: "Cote d'Ivoire" }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;

    // Afficher les options (ici, un champ de saisie pour deviner le pays)
    optionsElement.innerHTML = `
        <input type="text" id="answer-input" placeholder="Entrez le nom du pays">
        <button onclick="checkAnswer()">Valider</button>
    `;
}

function normalizeString(str) {
    // Supprime les espaces en trop et normalise la casse
    return str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer-input").value;
    const correctAnswer = quizData[currentQuestion].answer;

    // Normaliser les réponses pour ignorer la casse et les accents
    const normalizedUserAnswer = normalizeString(userAnswer);
    const normalizedCorrectAnswer = normalizeString(correctAnswer);

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
        score++;
        resultElement.innerText = "Correct !";
        // Appliquer l'effet de clignotement vert
        resultElement.classList.add("correct-blink");
    } else {
        resultElement.innerText = `Faux ! La réponse correcte était ${correctAnswer}.`;
        // Appliquer l'effet de clignotement rouge
        resultElement.classList.add("incorrect-blink");
    }

    // Supprimer les classes après l'animation
    setTimeout(() => {
        resultElement.classList.remove("correct-blink", "incorrect-blink");
    }, 500); // 500ms correspond à la durée de l'animation

    // Passer à la question suivante
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.innerText = `Quiz terminé ! Votre score est de ${score}/${quizData.length}.`;
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
}

nextButton.addEventListener("click", loadQuestion);

// Charger la première question au démarrage
loadQuestion();