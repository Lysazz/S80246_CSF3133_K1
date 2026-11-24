
// Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        answer: "CSS"
    },
    {
        question: "Which tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<href>",
            "<a>",
            "<url>"
        ],
        answer: "<a>"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "//",
            "##",
            "<!-- -->",
            "**"
        ],
        answer: "//"
    },
    {
        question: "Which method displays a message in the browser console?",
        options: [
            "print()",
            "console.log()",
            "display()",
            "show()"
        ],
        answer: "console.log()"
    }
];

// Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let answered = false;

// Shuffle Questions
function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

// Start Timer
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;

    document.getElementById("timer").textContent = timeLeft;

    timer = setInterval(function () {
        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            answered = true;

            document.getElementById("feedback").textContent =
                "Time's up! The correct answer is: " +
                questions[currentQuestion].answer;

            disableOptions();
        }
    }, 1000);
}

// Display Question
function displayQuestion() {
    answered = false;

    const questionData = questions[currentQuestion];

    document.getElementById("question-number").textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    document.getElementById("question").textContent =
        questionData.question;

    document.getElementById("feedback").textContent = "";

    const optionsContainer = document.getElementById("answer-options");

    optionsContainer.innerHTML = "";

    questionData.options.forEach(function (option) {

        const button = document.createElement("button");

        button.textContent = option;

        button.onclick = function () {
            checkAnswer(option, button);
        };

        optionsContainer.appendChild(button);
    });

    document.getElementById("next-btn").textContent =
        currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next Question";

    startTimer();
}

// Check Answer
function checkAnswer(selectedAnswer, selectedButton) {
    if (answered) {
        return;
    }

    answered = true;

    clearInterval(timer);

    const correctAnswer = questions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {

        score++;

        selectedButton.classList.add("correct");

        document.getElementById("feedback").textContent =
            "Correct Answer! Well Done!";

    } else {

        selectedButton.classList.add("incorrect");

        document.getElementById("feedback").textContent =
            "Incorrect! Correct answer: " + correctAnswer;

    }

    disableOptions();
}

// Disable Answer Options
function disableOptions() {
    const buttons = document.querySelectorAll("#answer-options button");

    buttons.forEach(function (button) {

        button.disabled = true;

        if (button.textContent === questions[currentQuestion].answer) {
            button.classList.add("correct");
        }

    });
}

// Next Question
function nextQuestion() {
    if (!answered) {
        document.getElementById("feedback").textContent =
            "Please select an answer first!";
        return;
    }

    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {

        displayQuestion();

    } else {

        finishQuiz();

    }
}

// Finish Quiz

function finishQuiz() {
    clearInterval(timer);

    document.getElementById("quiz-section").style.display = "none";

    document.getElementById("score-section").style.display = "block";

    document.getElementById("score-section").innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${score} / ${questions.length}</p>
        <p>Thank you for completing the quiz!</p>
    `;
}


// Start Quiz
function startQuiz() {
    shuffleQuestions();

    currentQuestion = 0;
    score = 0;

    document.getElementById("score-section").style.display = "none";

    displayQuestion();
}

// Run Quiz
startQuiz();
