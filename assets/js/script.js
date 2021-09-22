let timerCount = document.querySelector('.timer-count');
let quizStart = document.querySelector('#quizSummary');
let quizMain = document.querySelector('#quizMain');
let quizTitle = document.querySelector('#quizTitle');
let quizInfo = document.querySelector('#quizInfo');
let quizQuestion = document.querySelector('#question');
let quizAnswer = document.querySelector('.answers');
let startBttn = document.querySelector(".start-button");
let highScoreCapture = document.querySelector('#highScoreSubmit');
let storeScore = document.querySelector('#intialsSubmit');
let timeLeft;
let timeInterval;

//Question answer objects
let quiz1 = {
    question: 'What CSS selector do you use to get an element by "id"?',
    answers: ["#", ".", "*", ":"],
    answerCorrect: 0
}
let quiz2 = {
    question: 'How many parameters can you have in a function?',
    answers: ["0", "1", "As many as you want", "All of the above"],
    answerCorrect: 3
}
let quiz3 = {
    question: 'How do you declare an array in JavaScript?',
    answers: ["{}", "()", "[]", "<>"],
    answerCorrect: 2
}

let quiz4 = {
    question: 'What does CSS stand for?',
    answers: ["Cansei de Ser Sexy", "Centralized Standard Style", "Conforming Style System", "Cascading Style Sheets"],
    answerCorrect: 3
}

let quizObjectArray = [quiz1, quiz2, quiz3, quiz4]

//Funciton to start timer and show first question
//removed timeLeft as var
function timer() {
    timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 0) {
            timeLeft--;
            timerCount.textContent = timeLeft;
            // If timer reaches 0 before end of quiz, throw failure message to start over
        } else {
            timesUp();
        }
    }, 1000);
}

function timesUp() {
    clearInterval(timeInterval);
    deleteQuestion();
    quizStart.setAttribute("style", "display:block");
    quizTitle.textContent = "Times Up!";
    quizInfo.textContent = "You weren't able to finish on time. You should try again."
    highScoreCapture.setAttribute("style", "display:none");
}

function startQuiz() {
    //Hide quiz start
    quizStart.setAttribute("style", "display:none");
    timeLeft = 20;
    timer();
    //Show random question/answer combo on page
    displayQuestion(0);
}

//Create function to set listner on answer button that knows the button id, the index of the answer and the quiz object its part of
function addButtonListner(buttonId, buttonIndex, quiz) {
    document.querySelector(buttonId).addEventListener("click", function () {
        checkAnswer(buttonIndex, quiz);
    });
}
//define the answer button text/html
function createAnswerButton(ansNum, ansText) {
    return '<button id="ansBttn' + ansNum + '">' + ansText + '</button>';
}

function deleteQuestion() {
    quizQuestion.textContent = "";
    quizAnswer.innerHTML = "";
}

function displayQuestion(quizArrayIndex) {
    if (quizArrayIndex === quizObjectArray.length) {
        endQuiz();
        return;
    } 
    let quiz = quizObjectArray[quizArrayIndex];
    quizQuestion.textContent = quiz.question;
    for (var i = 0; i < quiz.answers.length; i++) {
        //create an li in answers ul (defined in index)
        let ans = document.createElement("li");
        quizAnswer.appendChild(ans);
        //in the li, put the content and create the button
        ans.innerHTML = createAnswerButton(i, quiz.answers[i]);
        //create trhe event listener for answer selection
    }
    //Making an assumption about answers, their position in the quiz and applying a unique id to each
    addButtonListner("#ansBttn0", 0, quizArrayIndex);
    addButtonListner("#ansBttn1", 1, quizArrayIndex);
    addButtonListner("#ansBttn2", 2, quizArrayIndex);
    addButtonListner("#ansBttn3", 3, quizArrayIndex);
}

//Function to find and state and store correct or wrong
function checkAnswer(ansNumSelected, quizArrayIndex) {
    console.log("");
    console.log("user selected"+ ansNumSelected);
    //take in question
    let quiz = quizObjectArray[quizArrayIndex];
    console.log("quiz answer" + quiz.answerCorrect);
    console.log(ansNumSelected);
    //if li answer is equal to the answer index
    if (ansNumSelected === quiz.answerCorrect) {
        document.querySelector("#result").innerHTML = "<hr> Correct!";
    } else {
        document.querySelector("#result").innerHTML = "<hr> Wrong!";
        timeLeft = timeLeft - 5;
        timerCount.textContent = timeLeft;
    }
    //local storage for time and output score
    deleteQuestion();
    quizArrayIndex++;
    displayQuestion(quizArrayIndex);
    console.log("new quiz" + quizArrayIndex);
    if (timeLeft <= 0) {
        timesUp();
        timeLeft = 0;
        timerCount.textContent = timeLeft;
    }
}
// Function for last question
function endQuiz() {
    clearInterval(timeInterval);
    localStorage.setItem("Final Score", timeLeft);
    deleteQuestion();
    quizStart.setAttribute("style", "display:block");
    startBttn.setAttribute("style", "display:none");
    quizTitle.textContent = "All Done!";
    //show score and capture name, and persist in local storage
    quizInfo.textContent = "Give your initials for your high score of " + localStorage.getItem("Final Score");
    highScoreCapture.setAttribute("style", "display:block");
}

//Include persistent storage for end result
storeScore.addEventListener("click", function (event) {
    event.preventDefault();
    let userName = document.querySelector("#initials").value.trim();
    var allScores = JSON.parse(localStorage.getItem("allScores"));
    if (allScores == null) {
        allScores = [];
    }
    localStorage.setItem("Initials", userName);
    var userScore = {
        user: localStorage.getItem("Initials"),
        score: localStorage.getItem("Final Score")
    }
    localStorage.setItem("userScore", JSON.stringify(userScore));
    allScores.push(userScore);
    localStorage.setItem("allScores", JSON.stringify(allScores));
    location.href = "./highscore/highscore.html";
});

//Event to kick everything off
startBttn.addEventListener("click", function () {
    startQuiz();
});

