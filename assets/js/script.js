
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question object
var quizQuestions = [{
  question: "What command is used to create a new branch in the terminal?",
  choiceA: "add branch",
  choiceB: "git branch",
  choiceC: "git checkout -b",
  choiceD: "git checkout -d",
  correctAnswer: "c"},
{
  question: "What is the difference between console.log() and console.dir()?",
  choiceA: "console.log() returns the object in its string represnetation and console.dir() recognizes the object just as an object and outputs its properties",
  choiceB: "console.dir() returns the object in its string represnetation and console.log() recognizes the object just as an object and outputs its properties",
  choiceC: "console.dir() displays an XML/HTML element representation of the specified object if possible",
  choiceD: "they are both the same things and are used interchangeably",
  correctAnswer: "a"},
 {
  question: "What is the DOM?",
  choiceA: "returns a string representing the base URL of the document containing the Node",
  choiceB: "the data representation of the objects that comprise the structure and content of document on the web",
  choiceC: "the most general based class from which all element objects in a document inherit",
  choiceD: "DOM stands for Document Objective Model",
  correctAnswer: "b"},
  {
  question: "Which of the following statements about the Textarea element is NOT true?",
  choiceA: "it is an HTMl element",
  choiceB: "it represents a multi-line plain text editing control",
  choiceC: "is useful when you want to allow users to enter free-form text",
  choiceD: "is the same as form input;",
  correctAnswer: "d"},
  {
  question: "what does the attribute autocomplete do?",
  choiceA: "indicated whether the value of the control can be automatically completed by the browser",
  choiceB: "indicates whether or not to activate automatic spelling correcting and text substitutes",
  choiceC: "controls whether and how the text value should automatically capitalize as it is entered/edited by the user",
  choiceD: "lets you specify that a form control should have input focus when the page loads",
  correctAnswer: "a"},  

    ];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft =80;
var timerInterval;
var score = 0;
var correct;

// generates questions and answers
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// the start buttion goes away and the first question appears along with the timer 
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
        }, 1000);

    quizBody.style.display = "block";
}
// end of the game where you score is displayed 
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// saves highscore once initials are intered 
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// clears your highscore 
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

//shows highscores
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// clears highscore 
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// replay game and clears scores
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 80;
    score = 0;
    currentQuestionIndex = 0;
}

//  checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        
        currentQuestionIndex++;
        generateQuizQuestion();
        //shown when the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        timeLeft -= 20
        currentQuestionIndex++;
        generateQuizQuestion();
        //shown when the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);
