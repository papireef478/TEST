document.addEventListener('DOMContentLoaded', () => {
  bindQuizzes();
  updateClassroomProgress();
  updateAchievements();
});

// ========== QUIZ BINDINGS ==========
function bindQuizzes() {
  // Math Quizzes
  document.getElementById('checkMathMult')?.addEventListener('click', () => {
    const q1 = parseInt(document.getElementById('math_q1').value) === 204;
    const q2 = parseInt(document.getElementById('math_q2').value) === 228;
    const score = (q1 ? 1 : 0) + (q2 ? 1 : 0);
    document.getElementById('mathMultFB').textContent = score === 2 ? '✅ Perfect! 🎉' : '💪 Keep practicing!';
    if (score === 2) addPoints(40, 'Math Quiz');
    unlockAchievement('mathMaster', 100);
  });

  // Reading Quizzes
  document.getElementById('checkMainIdea')?.addEventListener('click', () => {
    const sel = document.querySelector('input[name="mainIdea"]:checked');
    const correct = sel && sel.value === 'b';
    document.getElementById('elaMainFB').textContent = correct ? '✅ Correct! 📚' : '❌ Reread the passage!';
    if (correct) {
      addPoints(20, 'Reading Quiz');
      unlockAchievement('readingStar', 100);
    }
  });

  document.getElementById('checkVerb')?.addEventListener('click', () => {
    const sel = document.querySelector('input[name="verb"]:checked');
    const correct = sel && sel.value === 'is';
    document.getElementById('verbFB').textContent = correct ? '✅ Correct!' : '❌ Remember "group" is singular.';
    if (correct) addPoints(20, 'Grammar Quiz');
  });

  // Science Quizzes
  document.getElementById('checkPlanet')?.addEventListener('click', () => {
    const sel = document.querySelector('input[name="planet"]:checked');
    const correct = sel && sel.value === 'Mercury';
    document.getElementById('planetFB').textContent = correct ? '✅ Mercury! 🔬' : '❌ Closer to the Sun!';
    if (correct) addPoints(20, 'Science Quiz');
  });

  document.getElementById('checkCamel')?.addEventListener('click', () => {
    const sel = document.querySelector('input[name="camel"]:checked');
    const correct = sel && sel.value === 'desert';
    document.getElementById('camelFB').textContent = correct ? '✅ Desert! 🌵' : '❌ They store fat for dry places.';
    if (correct) addPoints(20, 'Science Quiz');
  });

  // History Quizzes
  document.getElementById('checkAuthor')?.addEventListener('click', () => {
    const sel = document.querySelector('input[name="author"]:checked');
    const correct = sel && sel.value === 'thomas';
    document.getElementById('authorFB').textContent = correct ? '✅ Thomas Jefferson! 🏛️' : '❌ Try again.';
    if (correct) addPoints(20, 'History Quiz');
  });

  document.getElementById('checkCapital')?.addEventListener('click', () => {
    const sel = document.querySelector('input[name="capital"]:checked');
    const correct = sel && sel.value === 'nashville';
    document.getElementById('capitalFB').textContent = correct ? '✅ Nashville! 🎸' : '❌ Music City!';
    if (correct) addPoints(20, 'History Quiz');
  });

  // Spanish Quiz
  document.getElementById('checkSpanishQ1')?.addEventListener('click', () => {
    const sel = document.querySelector('input[name="spanish_q1"]:checked');
    const correct = sel && sel.value === 'hola';
    const fb = document.getElementById('spanishQ1FB');
    fb.textContent = correct ? '✅ ¡Correcto! 🎉' : '❌ Hint: Starts with H';
    if (correct) addPoints(15, 'Spanish Quiz');
  });
}

// ========== ACTIVITY LOGGING ==========
function logActivity(activity, minutes) {
  addPoints(10, `${activity} completed`);
  alert(`✅ Great job! +10 points for ${minutes} mins of ${activity}! 💪`);
}

function logArtProject(projectType) {
  addPoints(25, `Art project: ${projectType}`);
  alert(`🎨 Amazing work! +25 pts for ${projectType}!`);
}

// ========== PROGRESS BAR ==========
function updateClassroomProgress() {
  // Simple progress for demo (counts quizzes taken)
  const pct = Math.min(quizzesCompleted * 10, 100);
  const bar = document.getElementById('miniProgress');
  const label = document.getElementById('progressPercent');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = `✨ ${pct}% mastery ✨`;
}