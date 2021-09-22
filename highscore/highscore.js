let highscoresList = document.querySelector('.scores');
let noScore = document.querySelector('#noScore');
let clearScore = document.querySelector('#clearScores');

function scoreRender() {
    //take the array for all scores from local storage
    let allScores = JSON.parse(localStorage.getItem("allScores"));
    if (allScores === null){
        allScores = [];
        highscoresList.innerHTML = "";
        noScore.textContent = "No scores yet. Go quiz.";
    }
    allScores.sort(compare);
    //cycle through each item in the array and publish the line to the page
    for (var i = 0; i < allScores.length; i++) {
        let scoreItem = document.createElement("li");
        highscoresList.appendChild(scoreItem);
        let scoreContent = allScores[i];
        let userName = scoreContent.user;
        let scoreValue = scoreContent.score;
        scoreItem.textContent = userName + " - " + scoreValue;
    }
}
function compare(scoreObj1, scoreObj2) {
    if (parseInt(scoreObj1.score) < parseInt(scoreObj2.score)) {
        return 1;
    }
    if (parseInt(scoreObj1.score) > parseInt(scoreObj2.score)) {
        return -1;
    }
    return 0;
}

scoreRender();

clearScore.addEventListener("click", function () {
    localStorage.clear();
    scoreRender();
});