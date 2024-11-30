// Questions Array
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: 2,
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
    correct: 0,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let isAnswered = false; // Flag to prevent multiple inputs for a question

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {
  const questionData = questions[currentQuestion];
  questionElement.textContent = questionData.question;

  // Reset the options and the answered state
  optionsElement.innerHTML = "";
  isAnswered = false;

  // Dynamically load the options
  questionData.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option", "btn", "btn-light");
    button.onclick = () => selectAnswer(button, index);
    optionsElement.appendChild(button);
  });

  // Hide Next button initially
  nextButton.style.display = "none";
}

function selectAnswer(button, selectedIndex) {
  // Prevent multiple selections
  if (isAnswered) return;

  isAnswered = true; // Mark question as answered
  document.querySelectorAll(".option").forEach(option => option.classList.remove("selected"));
  button.classList.add("selected"); // Highlight selected option

  const questionData = questions[currentQuestion];
  if (selectedIndex === questionData.correct) {
    score++; // Increment score only on the first valid input
  }

  // Show the Next button after a valid selection
  nextButton.style.display = "block";
}

nextButton.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion(); // Load the next question
  } else {
    showResult(); // Show results when quiz is finished
  }
};

function showResult() {
  // Hide the quiz container and show the result
  document.getElementById("quiz").style.display = "none";
  resultContainer.style.display = "block";
  scoreElement.textContent = `Your Score: ${score}/${questions.length}`;
}

restartButton.onclick = () => {
  // Reset the quiz state
  currentQuestion = 0;
  score = 0;
  resultContainer.style.display = "none";
  document.getElementById("quiz").style.display = "block";
  loadQuestion(); // Reload the first question
};

// Initialize Quiz
loadQuestion();
