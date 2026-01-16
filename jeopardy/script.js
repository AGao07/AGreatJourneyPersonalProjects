const categories = [
  {
    name: "Math",
    questions: [
      { q: "2 + 2", value: 100 },
      { q: "5 × 6", value: 200 },
      { q: "Square root of 81", value: 300 },
      { q: "12²", value: 400 },
      { q: "Value of π (approx)", value: 500 }
    ]
  },
  {
    name: "Science",
    questions: [
      { q: "Planet closest to sun", value: 100 },
      { q: "H2O is known as?", value: 200 },
      { q: "Gas we breathe", value: 300 },
      { q: "Speed of light unit", value: 400 },
      { q: "DNA stands for?", value: 500 }
    ]
  },
  // add 4 more categories...
];

let score = 0;
let currentValue = 0;

const board = document.getElementById("board");
const modal = document.getElementById("modal");
const questionEl = document.getElementById("question");
const scoreEl = document.getElementById("score");

function buildBoard() {
  categories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "category";
    header.textContent = cat.name;
    board.appendChild(header);
  });

  for (let i = 0; i < 5; i++) {
    categories.forEach(cat => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = `$${cat.questions[i].value}`;
      cell.onclick = () => showQuestion(cell, cat.questions[i]);
      board.appendChild(cell);
    });
  }
}

function showQuestion(cell, question) {
  questionEl.textContent = question.q;
  currentValue = question.value;
  modal.style.display = "block";
  cell.onclick = null;
  cell.textContent = "";
}

function answer(correct) {
  score += correct ? currentValue : -currentValue;
  scoreEl.textContent = `Score: $${score}`;
  modal.style.display = "none";
}

buildBoard();
