const start = document.getElementById("start");
const questions = document.getElementById("questions");
const startScreen = document.getElementById("start-screen");
const questionTitle = document.getElementById("question-title");
const choices = document.getElementById("choices");
const correct = document.getElementById("correct");
const correctAudio = document.getElementById("correct-audio");
const incorrectAudio = document.getElementById("incorrect-audio");
const incorrect = document.getElementById("incorrect");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const submit = document.getElementById("submit");
const initials = document.getElementById("initials");
const feedback = document.getElementById("feedback");
const time = document.getElementById("time");




start.addEventListener("click", startQuiz);

function startQuiz() {
    start.classList.add("hide");
    startScreen.classList.add("hide");
    questions.classList.remove("hide");
    setTime();
    getQuestion();
}

function setTime() {
    time.textContent = 75;
    let timerInterval = setInterval(function() {
        time.textContent = time.textContent - 1;
        if (time.textContent <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
        if (questionElements.length === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function getQuestion() {
    questionTitle.textContent = questionElements[0].title;
    questionElements[0].choices.forEach(function(choice) {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", checkAnswer);
        choices.appendChild(button);
    });
}

function checkAnswer() {
    if (this.textContent === questionElements[0].answer) {
        correct.classList.remove("hide");
        correctAudio.play();
        setTimeout(function() {
            correct.classList.add("hide");
        }, 500);
    } else {
        incorrect.classList.remove("hide");
        time.textContent = time.textContent - 10;
        incorrectAudio.play();
        setTimeout(function() {
            incorrect.classList.add("hide");
        }, 500);
    }
    nextQuestion();
}

function nextQuestion() {
    questionElements.shift();
    choices.innerHTML = "";
    if (questionElements.length === 0) {
        endQuiz();
    } else {
        getQuestion();
    }
}

function endQuiz() {
    questions.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScore.textContent = time.textContent;
}

submit.addEventListener("click", function() {
    let initialValue = initials.value
    if (initialValue === "") {
        feedback.classList.remove("hide");
        feedback.textContent = "Initials cannot be blank.";
    } else {
        feedback.classList.remove("hide");
        feedback.textContent = "Initials saved.";
        const data = initialValue + " - " + time.textContent;
        localStorage.setItem("data", data);
        console.log(data);
        setTimeout(function() {
            window.location.href = "highscores.html";
        }, 100);
    }
});