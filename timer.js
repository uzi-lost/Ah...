// New Year target — Pakistan Time (UTC +5)
const targetUTC = Date.UTC(2026, 0, 1, 19, 0, 0);

const timerEl = document.getElementById("timer");
const celebration = document.getElementById("celebration");

// Countdown function
function updateTimer() {
  const now = new Date().getTime();
  const diff = targetUTC - now;

  if (diff <= 0) {
    timerEl.textContent = "00 : 00 : 00 : 00";
    celebration.classList.add("show");
    clearInterval(interval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timerEl.textContent =
    `${String(days).padStart(2,"0")} : ` +
    `${String(hours).padStart(2,"0")} : ` +
    `${String(minutes).padStart(2,"0")} : ` +
    `${String(seconds).padStart(2,"0")}`;
}

// Start countdown
updateTimer();
const interval = setInterval(updateTimer, 1000);

// Preview button
document.getElementById("previewBtn").addEventListener("click", function() {
  celebration.classList.add("show");
});
