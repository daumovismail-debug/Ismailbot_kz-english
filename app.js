const tasks = {
  speaking: [
    "Describe your perfect weekend in 5-6 sentences.",
    "Talk about your favorite app and why you use it.",
    "Introduce yourself as if it's your first day at work."
  ],
  reading: [
    "Anna wakes up at 6 AM, drinks tea, and walks to school. Q: What does she drink?",
    "Tom has two cats. They sleep on the sofa all day. Q: How many cats does Tom have?",
    "The library closes at 8 PM on weekdays. Q: When does the library close?"
  ],
  writing: [
    "Write 4-5 sentences about your daily routine.",
    "Write a short message to invite a friend to a movie.",
    "Write a mini-story: 'My first trip abroad'."
  ],
  listening: [
    "Could you tell me where the nearest station is?",
    "I usually practice English for thirty minutes every evening.",
    "Let's meet at the café after work tomorrow."
  ]
};

function pickRandom(skill) {
  const arr = tasks[skill];
  return arr[Math.floor(Math.random() * arr.length)];
}

function renderAll() {
  document.getElementById("speakingTask").textContent = pickRandom("speaking");
  document.getElementById("readingTask").textContent = pickRandom("reading");
  document.getElementById("writingTask").textContent = pickRandom("writing");
  document.getElementById("listeningTask").textContent = pickRandom("listening");
}

function speak(text) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.95;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

document.getElementById("startBtn").addEventListener("click", renderAll);

Array.from(document.querySelectorAll(".refresh")).forEach((btn) => {
  btn.addEventListener("click", () => {
    const skill = btn.dataset.skill;
    document.getElementById(`${skill}Task`).textContent = pickRandom(skill);
  });
});

document.getElementById("playListening").addEventListener("click", () => {
  const text = document.getElementById("listeningTask").textContent;
  if (text) speak(text);
});

document.getElementById("checkWriting").addEventListener("click", () => {
  const input = document.getElementById("writingInput").value.trim();
  const feedback = document.getElementById("writingFeedback");

  if (!input) {
    feedback.textContent = "Сначала напиши текст.";
    return;
  }

  const sentenceCount = input.split(/[.!?]+/).filter(Boolean).length;
  if (sentenceCount < 3) {
    feedback.textContent = "Добавь больше предложений (минимум 3).";
  } else {
    feedback.textContent = "Отлично! Структура хорошая: есть несколько предложений.";
  }
});

renderAll();
