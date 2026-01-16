let categories = [
  {
    name: "Table Tennis",
    questions: [
      { q:"a", value: 100 },
      { q:"b", value: 200 },
      { q:"c", value: 300 },
      { q:"d", value: 400 },
      { q:"e", value: 500 }
    ]
  },
 {
    name: "Table Tennis",
    questions: [
      { q:"a", value: 100 },
      { q:"b", value: 200 },
      { q:"c", value: 300 },
      { q:"d", value: 400 },
      { q:"e", value: 500 }
    ]
  },
 {
    name: "Table Tennis",
    questions: [
      { q:"a", value: 100 },
      { q:"b", value: 200 },
      { q:"c", value: 300 },
      { q:"d", value: 400 },
      { q:"e", value: 500 }
    ]
  },
 {
    name: "Table Tennis",
    questions: [
      { q:"a", value: 100 },
      { q:"b", value: 200 },
      { q:"c", value: 300 },
      { q:"d", value: 400 },
      { q:"e", value: 500 }
    ]
  },
  {
    name: "Table Tennis",
    questions: [
      { q:"a", value: 100 },
      { q:"b", value: 200 },
      { q:"c", value: 300 },
      { q:"d", value: 400 },
      { q:"e", value: 500 }
    ]
  },
 {
    name: "Table Tennis",
    questions: [
      { q:"a", value: 100 },
      { q:"b", value: 200 },
      { q:"c", value: 300 },
      { q:"d", value: 400 },
      { q:"e", value: 500 }
    ]
  }
];

let currentValue = 0;
const players = [];

const board = document.getElementById("board");
const currentValueEl = document.getElementById("currentValue");

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
      cell.onclick = () => selectQuestion(cell, cat.questions[i]);
      board.appendChild(cell);
    });
  }
}

function selectQuestion(cell, question) {
  currentValue = question.value;
  currentValueEl.textContent = question.value;

  alert(question.q); // or modal later

  cell.textContent = "";
  cell.onclick = null;
}


const playersDiv = document.getElementById("players");

function addPlayer() {
  const player = {
    name: "",
    score: 0
  };
  players.push(player);
  renderPlayers();
}

function renderPlayers() {
  playersDiv.innerHTML = "";

  players.forEach((player, index) => {
    const div = document.createElement("div");
    div.className = "player";

    div.innerHTML = `
      <input placeholder="Name" 
        onchange="players[${index}].name = this.value">
      <div class="score">$${player.score}</div>
      <div class="score-buttons">
        <button onclick="updateScore(${index}, 1)">+</button>
        <button onclick="updateScore(${index}, -1)">−</button>
      </div>
    `;

    playersDiv.appendChild(div);
  });
}

function updateScore(playerIndex, direction) {
  if (currentValue === 0) return;

  players[playerIndex].score += direction * currentValue;
  renderPlayers();
}

function loadGame(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);

      if (!Array.isArray(data.categories)) {
        throw new Error("Invalid format");
      }

      categories = data.categories;
      resetBoard();
    } catch (err) {
      alert("Invalid JSON file");
      console.error(err);
    }
  };

  reader.readAsText(file);
}

function resetBoard() {
  board.innerHTML = "";
  currentValue = 0;
  currentValueEl.textContent = "0";
  buildBoard();
}

buildBoard();
