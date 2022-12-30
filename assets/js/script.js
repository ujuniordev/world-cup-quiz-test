const questions = [
  {
    question: "When did the first World Cup edition happen?",
    choices: [ "1930", "1936", "1935", "1932" ],
    // This is the index of the answer in choices above.
    answerIndex: 0,
  },
  {
    question: "In which country did the first World Cup happen?",
    choices: [ "Germany", "Brazil", "England", "Uruguay" ],
    answerIndex: 3,
  },
  {
    question: "As of 2022, which country has the most World Cup wins?",
    choices: [ "Italy", "France", "Brazil", "Germany" ],
    answerIndex: 2,
  },
];

const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const questionCounter = document.getElementById("question-counter");
const startGameButton = document.getElementById("start-game-button");
const gameOverContainer = document.getElementById("game-over-container");

// Declare this without a value. Will initialize the value in startGame()
let currentQuestionIndex;
let correctAnswers;

startGameButton.addEventListener("click", startGame);

/*
0. When the user clicks on the start game button, load the first question.
2. When they click on one of the answers, either:
  - tell them if it's correct or wrong
  - don't tell them anything and wait until the end
3. Update the score and load the next question, if there is one. If there isn't the game is over.
4. When the game is over, show them the game over page with results
*/

function startGame(event) {
  console.log(event)
  // Reset this and everything else that needs to be reset at the start of the game
  currentQuestionIndex = 0;
  correctAnswers = 0;

  questionsCounter();
  showNextQuestion();
  gameOverContainer.innerHTML = "";

  startGameButton.textContent = "Restart Game";
}

function questionsCounter() {
  
  var questionList = '<ul>';
  let i = 1;
  questions.forEach(function(question){

    questionList += '<li id="question' + i + '">' + i + '</li>';
    i++;
  });
  
  questionList += '</ul>';
  questionCounter.innerHTML = questionList;
}

function showNextQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endGame();
  }
  let currentQuestion = questions[currentQuestionIndex];
  
  questionContainer.textContent = currentQuestion.question;


  // Clear the container in case it's got buttons from the previous
  // round/question.
  choicesContainer.innerHTML = "";

  for (let choice of currentQuestion.choices) {
    let choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.classList.add("answer-button");

    // We're encoding the answer in the id, but this is not a good way
    // to do this.
    // Read about the dataset API on the MDN website.
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
    // the alternative here would be something like choiceButton.dataset.choice = choice
    // we would retrieve this in the same way in checkAnswer (see what I've done there)

    choiceButton.id = choice;

    choiceButton.addEventListener("click", checkAnswer);

    choicesContainer.appendChild(choiceButton);
  }
}

function checkAnswer(event) {
  let clickedButton = event.currentTarget;

  // If using the dataset API, we would get the answer as follows"
  // clickedButton.dataset.value
  let userAnswer = clickedButton.id;

  let currentQuestion = questions[currentQuestionIndex];
  let currentCounterOption = `question${currentQuestionIndex +1}`;

  let currentQuestionAnswer =
    currentQuestion.choices[currentQuestion.answerIndex];

  if (userAnswer === currentQuestionAnswer) {
    // Don't use browser alerts.
    // You could use custom alerts such as
    //  https://sweetalert2.github.io/
    // as these look the same across browsers and operating systems
    // Alternatively, for better UX -- it's annoying to have to dismiss alerts
    // after every question, have some non-intrusive indicator that shows
    // them whether they got the answer correct or wrong and goes away
    // after a short delay before moving on to the next question.
    correctAnswers++;
    console.log(currentCounterOption);
    document.getElementById(currentCounterOption).style.background = 'green';
  } else {
    document.getElementById(currentCounterOption).style.background = 'red';
  }

  // Update this to point at the next question.
  // the shorthand for this is currentQuestionIndex + 1 or currentQuestionIndex++
  currentQuestionIndex = currentQuestionIndex + 1;
  showNextQuestion();
}

function endGame() {
  //alert("Game over");
  gameOverContainer.innerHTML = `You scored ${correctAnswers} out of ${questions.length}`;

  // Clean up the question and choices
  questionContainer.innerHTML = "";
  choicesContainer.innerHTML = "";

  startGameButton.textContent = "Play Again";
}

// <section id="quiz-container">
//       <h2 id="question-container">Who is the president of Brazil?</h2>

//       <div id="choices-container">
//         <button class="answer-button">
//           Obama
//         </button>
//         <button class="answer-button">
//           Biden
//         </button>
//         <button class="answer-button">
//           Lula
//         </button>
//         <button class="answer-button">
//           Bolsonaro
//         </button>
//       </div>
//     </section>
