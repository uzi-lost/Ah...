/* timer.js
   Sets accurate Pakistan timezone target and manages UI.
*/
document.addEventListener('DOMContentLoaded', () => {
  const timerEl = document.getElementById('timer');
  const previewBtn = document.getElementById('previewBtn');
  const celebration = document.getElementById('celebration');
  const hnyTitle = document.getElementById('hnyTitle');
  const hnyMessage = document.getElementById('hnyMessage');

  // change this message to what you want shown when time's up
  const PERSONAL_MESSAGE = "May this year bring you peace, joy and success.";

  // target time in Pakistan timezone (PKT = UTC+5)
  // Use ISO with timezone offset to avoid local timezone issues:
  const targetTime = new Date('2026-01-01T00:00:00+05:00').getTime();

  function update() {
    const now = Date.now();
    let diff = targetTime - now;

    if (diff <= 0) {
      timerEl.textContent = "00 : 00 : 00 : 00";
      // show celebration
      if (!celebration.classList.contains('show')) {
        // set messages
        hnyTitle.textContent = "🎉 Happy New Year! 🎉";
        hnyMessage.textContent = PERSONAL_MESSAGE;
        // show overlay and start animations
        if (typeof window.startCelebration === 'function') {
          window.startCelebration();
        } else {
          celebration.classList.add('show');
        }
      }
      clearInterval(interval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000*60*60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000*60);
    const seconds = Math.floor(diff / 1000);

    timerEl.textContent = `${String(days).padStart(2,'0')} : ${String(hours).padStart(2,'0')} : ${String(minutes).padStart(2,'0')} : ${String(seconds).padStart(2,'0')}`;
  }

  // run immediately then every second
  update();
  const interval = setInterval(update, 1000);

  // preview button (shows overlay + starts effects)
  previewBtn?.addEventListener('click', () => {
    // set custom preview text if wanted
    hnyTitle.textContent = "🎉 Happy New Year! 🎉";
    hnyMessage.textContent = PERSONAL_MESSAGE;
    if (typeof window.startCelebration === 'function') window.startCelebration();
    else document.getElementById('celebration').classList.add('show');
  });

}); // DOMContentLoaded
