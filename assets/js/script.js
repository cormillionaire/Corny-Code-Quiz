let timerCount = document.querySelector('.timer-count');
let quizStart = document.querySelector('#quizSummary');
let quizMain = document.querySelector('#quizMain');
let quizTitle = document.querySelector('#quizTitle');
let quizInfo = document.querySelector('#quizInfo');
let quizQuestion = document.querySelector('#question');
let quizAnswer = document.querySelector('.answers');
let startBttn = document.querySelector(".start-button");
let highScoreCapture = document.querySelector('#highScoreSubmit');
let timeLeft = 10;
let timeInterval;

//Question answer objects
let quiz1 = {
    question: 'How many?',
    answers: ["correct", "1wrong1", "1wrong2", "1wrong3"],
    answerCorrect: 0
}
let quiz2 = {
    question: 'second one?',
    answers: ["2wrong1", "2wrong2", "2wrong3", "2correct"],
    answerCorrect: 3
}
let quiz3 = {
    question: 'third one?',
    answers: ["3wrong1", "3wrong2", "3wrong3", "3correct"],
    answerCorrect: 3
}

let quiz4 = {
    question: 'fourth one?',
    answers: ["4wrong1", "4wrong2", "4correct", "4wrong3"],
    answerCorrect: 2
}

let quizObjectArray = [quiz1, quiz2, quiz3, quiz4]

//Funciton to start timer and show first question
function timer(timeLeft) {
    timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft >= 0) {
            timerCount.textContent = timeLeft;
            timeLeft--;
            // If timer reaches 0 before end of quiz, throw failure message to start over
        } else {
            clearInterval(timeInterval);
            deleteQuestion();
            quizStart.setAttribute("style", "display:block");
            quizTitle.textContent = "Times Up!";
            quizInfo.textContent = "You weren't able to finish on time. You should try again."
        }
    }, 1000);
    console.log("timer running")
    console.log(timeLeft)
}

function stopTimer(){
    clearInterval(timeInterval);
}

function startQuiz() {
    //Hide quiz start
    quizStart.setAttribute("style", "display:none");
    timer(timeLeft);
    console.log("start quiz running")
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
    if (quizArrayIndex === quizObjectArray.length - 1) {
        console.log("quiz#" + quizArrayIndex)
        console.log("num" + quizObjectArray.length)
        endQuiz();
        return;
    }
    //take in question
    let quiz = quizObjectArray[quizArrayIndex];
    console.log("quiz num" + quiz);
    console.log("quiz answer" + quiz.answerCorrect);
    console.log(ansNumSelected);
    //if li answer is equal to the answer index
    if (ansNumSelected === quiz.answerCorrect) {
        document.querySelector("#result").textContent = "Correct!";
    } else {
        document.querySelector("#result").textContent = "Wrong!";
        timeLeft = timeLeft - 10;
    }
    //local storage for time and output score
    localStorage.setItem("Score", timeLeft);
    deleteQuestion();
    quizArrayIndex++;
    displayQuestion(quizArrayIndex);
    console.log("new quiz" + quizArrayIndex);
}
// Function for last question
function endQuiz() {
    localStorage.setItem("Final Score", timeLeft);
    stopTimer();
    deleteQuestion();
    quizStart.setAttribute("style", "display:block");
    startBttn.setAttribute("style", "display:none");
    quizTitle.textContent = "All Done!";
    quizInfo.textContent = "Give your initials for your high score";
    highScoreCapture.setAttribute("style", "display:block");
    
}

//Include persistent storage for end result

//Function to show score and capture name, and persist in local storage

//Event to kick everything off
startBttn.addEventListener("click", function () {
    startQuiz();
});

//**High Scores**//