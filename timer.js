document.addEventListener("DOMContentLoaded", () => {
  const timerEl = document.getElementById("timer");
  const previewBtn = document.getElementById("previewBtn");
  const celebration = document.getElementById("celebration");

  // Target: Pakistan time (UTC +5)
  const target = new Date("2026-01-01T00:00:00+05:00").getTime();

  function updateTimer() {
    const now = Date.now();
    let diff = target - now;

    if (diff <= 0) {
      timerEl.textContent = "00 : 00 : 00 : 00";
      showCelebration();
      clearInterval(loop);
      return;
    }

    const d = Math.floor(diff / 86400000);
    diff %= 86400000;
    const h = Math.floor(diff / 3600000);
    diff %= 3600000;
    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    timerEl.textContent =
      `${String(d).padStart(2,"0")} : ` +
      `${String(h).padStart(2,"0")} : ` +
      `${String(m).padStart(2,"0")} : ` +
      `${String(s).padStart(2,"0")}`;
  }

  function showCelebration() {
    if (!celebration.classList.contains("show")) {
      celebration.classList.add("show");
    }

    // safe call animation if it exists
    if (typeof window.startCelebration === "function") {
      window.startCelebration();
    }
  }

  previewBtn.addEventListener("click", showCelebration);

  updateTimer();
  const loop = setInterval(updateTimer, 1000);
});
