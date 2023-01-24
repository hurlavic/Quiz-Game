const highscores = document.getElementById("highscores");
const clear = document.getElementById("clear");

const allScores = localStorage.getItem("data");
const newLi = document.createElement("li");
newLi.textContent = allScores;
highscores.appendChild(newLi);
clear.addEventListener("click", function() {
    highscores.removeChild(newLi);
    localStorage.clear();

});