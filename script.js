const quizData = [
  {
    question: "Which data structure operates on a Last In, First Out (LIFO) basis?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    answer: 1
  },
  {
    question: "What is the time complexity of searching an element in a balanced Binary Search Tree?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: 2
  },
  {
    question: "Which of the following is NOT a fundamental principle of Object-Oriented Programming?",
    options: ["Encapsulation", "Compilation", "Inheritance", "Polymorphism"],
    answer: 1
  },
  {
    question: "In Python, which keyword is used to create a generator function?",
    options: ["return", "yield", "generate", "async"],
    answer: 1
  },
  {
    question: "Which HTTP status code signifies that a resource was successfully created?",
    options: ["200 OK", "201 Created", "204 No Content", "404 Not Found"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-container');
const progressEl = document.getElementById('progress');
const nextBtn = document.getElementById('next-btn');
const quizBody = document.getElementById('quiz-body');
const quizFooter = document.querySelector('.quiz-footer');
const resultScreen = document.getElementById('result-screen');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;
  progressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  optionsEl.innerHTML = '';
  nextBtn.disabled = true;

  current.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => selectOption(index, btn));
    optionsEl.appendChild(btn);
  });
}

function selectOption(selectedIndex, selectedBtn) {
  const correctIndex = quizData[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll('.option-btn');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) {
      btn.classList.add('correct');
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizBody.classList.add('hidden');
  quizFooter.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreText.textContent = `You scored ${score} out of ${quizData.length}! (${Math.round((score / quizData.length) * 100)}%)`;
}

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  quizBody.classList.remove('hidden');
  quizFooter.classList.remove('hidden');
  resultScreen.classList.add('hidden');
  loadQuestion();
});

loadQuestion();
