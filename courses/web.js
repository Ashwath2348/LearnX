const questions = [
  { q: "Print even numbers from 1 to 10 using a loop.", a: "for" },
  { q: "Check if a number is positive or negative.", a: "if" },
  { q: "Store names in order using linear structure.", a: "queue" },
  { q: "Reverse a string using a data structure.", a: "stack" },
  { q: "Repeat until input equals 5.", a: "while" }
];

let score = 0;

function showFeature(id) {
  document.querySelectorAll('.feature-section').forEach(div => div.style.display = 'none');
  document.getElementById(id).style.display = 'block';

  if (id === 'logic') {
    loadQuestions();
  }
}

function loadQuestions() {
  const container = document.getElementById("questionsContainer");
  container.innerHTML = '';
  score = 0;

  questions.forEach((item, idx) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `
      <p>${item.q}</p>
      <input type="text" id="ans${idx}" placeholder="Enter keyword logic..." />
      <button onclick="checkAnswer(${idx})">Submit</button>
      <p id="res${idx}"></p>
    `;
    container.appendChild(qDiv);
  });

  document.getElementById("scoreDisplay").innerText = '';
}

function checkAnswer(idx) {
  const userAns = document.getElementById("ans" + idx).value.trim().toLowerCase();
  const correct = questions[idx].a;
  const resEl = document.getElementById("res" + idx);

  if (userAns === correct) {
    score++;
    resEl.innerText = "✅ Correct!";
  } else {
    resEl.innerText = "❌ Incorrect. Hint: Think of logic used.";
  }

  document.getElementById("scoreDisplay").innerText = `Score: ${score} / ${questions.length}`;
}
