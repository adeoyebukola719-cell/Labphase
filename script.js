const questions = [
  {
    question: "Who is known as the great sage who defies heaven?",
    answers: [ 
      { text: "Sun Wukong, the Monkey King", correct: true },
      { text: "Goku the Saiyan", correct: false },
      { text: "Fenrir the World Wolf", correct: false },
      { text: "Jormungandr the Serpent", correct: false },
    ]
  },
  {
    question: "What is an example of an offensive racial slur?",
    answers: [
      { text: "A harmful insult based on race", correct: true },
      { text: "A compliment", correct: false },
      { text: "A nickname", correct: false },
      { text: "A polite title", correct: false },
    ]
  },
  {
    question: "Who sucks the most in Free Fire?",
    answers: [ 
      { text: "Salem", correct: true },
      { text: "Giovanni", correct: false },
      { text: "Melvin", correct: false },
      { text: "Tofunmi", correct: false },
    ]
  },
  {
    question: "Who was the actor in The Amazing Spider-Man 2?",
    answers: [ 
      { text: "Dude", correct: false },
      { text: "Tobey Maguire", correct: false },
      { text: "Andrew Garfield", correct: true },
      { text: "Charlotte Flair", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  let message = "";
  if (score === 4) {
    message = "Good job! Harvard should probably give you admission.";
  } else if (score === 3) {
    message = "Well, you tried!";
  } else if (score === 2) {
    message = "Better luck next time, brochacho.";
  } else {
    message = "Please leave 😭";
  }

  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br>${message}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
