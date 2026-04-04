// ========== GLOBAL STATE ==========
let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
let achievements = JSON.parse(localStorage.getItem('achievements')) || {
  firstQuiz: false, mathMaster: false, readingStar: false, perfectScore: false, weekWarrior: false
};
let quizzesCompleted = parseInt(localStorage.getItem('quizzesCompleted')) || 0;

// ========== INIT ON LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
  updatePointsDisplay();
  updateAchievements();
  updateProgress();
});

// ========== POINTS SYSTEM ==========
function updatePointsDisplay() {
  const el = document.getElementById('totalPoints');
  if (el) el.textContent = totalPoints;
  localStorage.setItem('totalPoints', totalPoints);
}

function addPoints(points, reason = '') {
  totalPoints += points;
  updatePointsDisplay();
  showCelebration(`+${points} ${reason}`);
}

function showCelebration(msg) {
  const div = document.createElement('div');
  div.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    background:linear-gradient(135deg,#fa709a,#fee140);color:white;padding:20px 40px;
    border-radius:20px;font-size:1.8rem;font-weight:bold;z-index:9999;box-shadow:0 10px 30px rgba(0,0,0,0.3);`;
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 1500);
}

// ========== ACHIEVEMENTS ==========
function updateAchievements() {
  const map = { firstQuiz: 'ach-first-quiz', mathMaster: 'ach-math-master', readingStar: 'ach-reading-star' };
  for (const [key, id] of Object.entries(map)) {
    if (achievements[key]) {
      const el = document.getElementById(id);
      if (el) el.classList.remove('locked');
    }
  }
}

function unlockAchievement(key, points) {
  if (!achievements[key]) {
    achievements[key] = true;
    localStorage.setItem('achievements', JSON.stringify(achievements));
    addPoints(points, 'Achievement!');
    updateAchievements();
  }
}

// ========== PROGRESS TRACKING ==========
function updateProgress() {
  const pct = Math.min(quizzesCompleted * 10, 100);
  const bar = document.getElementById('miniProgress');
  const label = document.getElementById('progressPercent');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = `✨ ${pct}% mastery ✨`;
}

// Helper: Spanish Quiz Feedback
function checkSpanishQ1() {
  const answer = document.querySelector('input[name="spanish_q1"]:checked')?.value;
  const feedback = document.getElementById('spanishQ1FB');
  if (answer === 'hola') {
    feedback.innerHTML = '✅ ¡Correcto! "Hola" means hello! 🎉';
    feedback.style.background = 'linear-gradient(135deg, #4ecdc4, #44a08d)';
    addPoints(15, 'Spanish vocabulary');
  } else {
    feedback.innerHTML = '❌ Try again! Hint: It starts with "H" 👋';
    feedback.style.background = 'linear-gradient(135deg, #ffecd2, #fcb69f)';
  }
}

// Helper: Gym Activity Log
function logActivity(activity, minutes) {
  addPoints(10, `${activity} completed`);
  alert(`✅ Great job! +10 points for ${minutes} minutes of ${activity}! 💪`);
}

// Helper: Art Project Log
function logArtProject(projectType) {
  addPoints(25, `Art project: ${projectType}`);
  alert(`🎨 Amazing work on your ${projectType} project! +25 creativity points!`);
}