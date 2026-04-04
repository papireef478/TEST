// ========== QUIZ DEFINITIONS ==========
window.quizList = [
  { id: "math_mult", name: "Multiplication", standard: "4.NBT.B.5", max: 2, saveKey: "math_mult" },
  { id: "math_frac", name: "Equivalent Fractions", standard: "4.NF.A.1", max: 1, saveKey: "math_frac" },
  { id: "ela_main", name: "Main Idea", standard: "4.RL.KID.2", max: 1, saveKey: "ela_main" },
  { id: "ela_verb", name: "Subject-Verb Agreement", standard: "4.L.CSE.1", max: 1, saveKey: "ela_verb" },
  { id: "science_planet", name: "Solar System", standard: "4.ESS1.1", max: 1, saveKey: "science_planet" },
  { id: "science_camel", name: "Animal Adaptations", standard: "4.LS2.2", max: 1, saveKey: "science_camel" },
  { id: "social_rev", name: "Declaration Author", standard: "4.19", max: 1, saveKey: "social_rev" },
  { id: "social_capital", name: "Tennessee Capital", standard: "4.10", max: 1, saveKey: "social_capital" },
  { id: "gym_activity", name: "Gym Activity Log", standard: "Health/PE", max: 1, saveKey: "gym_activity" },
  { id: "spanish_vocab", name: "Spanish Vocabulary", standard: "World Language", max: 1, saveKey: "spanish_vocab" },
  { id: "art_project", name: "Art Project Completion", standard: "Visual Arts", max: 1, saveKey: "art_project" }
];

// ========== SAVE SCORE ==========
window.saveScore = function(key, earned, total) {
  const stored = localStorage.getItem(key);
  const best = stored ? parseInt(stored.split('/')[0]) : 0;
  const newBest = Math.max(best, earned);
  
  localStorage.setItem(key, `${newBest}/${total}`);
  
  if (earned > 0) {
    appState.quizzesCompleted++;
    localStorage.setItem('quizzesCompleted', appState.quizzesCompleted);
    addPoints(earned * 20, 'Quiz Complete!');
    
    if (appState.quizzesCompleted === 1) unlockAchievement('firstQuiz', 50);
    if (earned === total) unlockAchievement('perfectScore', 150);
  }
  
  if (window.updateClassroomProgress) window.updateClassroomProgress();
};

// ========== PROGRESS TRACKING ==========
window.updateClassroomProgress = function() {
  let totalEarned = 0, totalPossible = 0;
  
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (quizList.some(q => q.saveKey === k)) {
      const val = localStorage.getItem(k);
      const parts = val?.split('/') || [0, 1];
      if (parts.length === 2) {
        totalEarned += parseInt(parts[0]);
        totalPossible += parseInt(parts[1]);
      }
    }
  }
  
  const percent = totalPossible === 0 ? 0 : Math.floor((totalEarned / totalPossible) * 100);
  
  const miniBar = document.getElementById('miniProgress');
  const percentSpan = document.getElementById('progressPercent');
  const teacherMsg = document.getElementById('teacherMessage');
  
  if (miniBar) miniBar.style.width = percent + '%';
  if (percentSpan) percentSpan.innerText = `✨ ${percent}% mastery ✨`;
  
  if (teacherMsg) {
    if (percent < 20) {
      teacherMsg.innerHTML = `"You're doing great! Let's try a fun quiz together. 🍎"`;
    } else if (percent >= 80) {
      teacherMsg.innerHTML = `"WOW! You're a superstar! I'm so proud. 🌟"`;
    } else {
      teacherMsg.innerHTML = `"Keep clicking on the classroom stations! Every quiz helps."`;
    }
  }
};

// ========== BIND QUIZ HANDLERS ==========
window.bindQuizzes = function() {
  // Math Multiplication
  document.getElementById('checkMathMult')?.addEventListener('click', () => {
    const q1 = parseInt(document.getElementById('math_q1')?.value);
    const q2 = parseInt(document.getElementById('math_q2')?.value);
    const score = (q1 === 204 ? 1 : 0) + (q2 === 228 ? 1 : 0);
    saveScore('math_mult', score, 2);
    document.getElementById('mathMultFB').innerHTML = `✅ ${score}/2. ${score === 2 ? 'Perfect! 🎉' : 'Keep practicing! 💪'}`;
    if (score === 2) unlockAchievement('mathMaster', 100);
  });
  
  // Math Fractions
  document.getElementById('checkFractions')?.addEventListener('click', () => {
    const checks = document.querySelectorAll('.math-page input[type="checkbox"]');
    const selected = Array.from(checks).filter(cb => cb.checked).map(cb => cb.value);
    const score = (selected.includes('2/4') && selected.includes('3/6') && selected.includes('4/8') && selected.length === 3) ? 1 : 0;
    saveScore('math_frac', score, 1);
    document.getElementById('mathFracFB').innerHTML = score ? "🎉 All equivalent to 1/2!" : "❌ 2/4, 3/6, 4/8 = 1/2. Try again!";
  });
  
  // ELA Main Idea
  document.getElementById('checkMainIdea')?.addEventListener('click', () => {
    const sel = document.querySelector('.ela-page input[name="mainIdea"]:checked');
    const score = (sel && sel.value === 'b') ? 1 : 0;
    saveScore('ela_main', score, 1);
    document.getElementById('elaMainFB').innerHTML = score ? "✅ Correct! Great reading! 📚" : "❌ Reread - dolphins are smart mammals!";
    if (score === 1) unlockAchievement('readingStar', 100);
  });
  
  // ELA Subject-Verb
  document.getElementById('checkVerb')?.addEventListener('click', () => {
    const sel = document.querySelector('.ela-page input[name="verb"]:checked');
    const score = (sel && sel.value === 'is') ? 1 : 0;
    saveScore('ela_verb', score, 1);
    document.getElementById('verbFB').innerHTML = score ? "✅ 'group' is singular, so 'is' is correct! ✨" : "❌ Use 'is' because 'group' is singular!";
  });
  
  // Science Planet
  document.getElementById('checkPlanet')?.addEventListener('click', () => {
    const sel = document.querySelector('.science-page input[name="planet"]:checked');
    const score = (sel && sel.value === 'Mercury') ? 1 : 0;
    saveScore('science_planet', score, 1);
    document.getElementById('planetFB').innerHTML = score ? "✅ Mercury! You're a science star! 🔬" : "❌ Mercury is closest. Review the solar system!";
  });
  
  // Science Camel
  document.getElementById('checkCamel')?.addEventListener('click', () => {
    const sel = document.querySelector('.science-page input[name="camel"]:checked');
    const score = (sel && sel.value === 'desert') ? 1 : 0;
    saveScore('science_camel', score, 1);
    document.getElementById('camelFB').innerHTML = score ? "✅ Camels live in deserts! 🌵" : "❌ Desert is the habitat. Try again!";
  });
  
  // Social Author
  document.getElementById('checkAuthor')?.addEventListener('click', () => {
    const sel = document.querySelector('.social-page input[name="author"]:checked');
    const score = (sel && sel.value === 'thomas') ? 1 : 0;
    saveScore('social_rev', score, 1);
    document.getElementById('authorFB').innerHTML = score ? "✅ Thomas Jefferson! History hero! 🏛️" : "❌ Thomas Jefferson wrote it. Review your notes!";
  });
  
  // Social Capital
  document.getElementById('checkCapital')?.addEventListener('click', () => {
    const sel = document.querySelector('.social-page input[name="capital"]:checked');
    const score = (sel && sel.value === 'nashville') ? 1 : 0;
    saveScore('social_capital', score, 1);
    document.getElementById('capitalFB').innerHTML = score ? "✅ Nashville is the capital! 🎸" : "❌ The capital is Nashville. Remember Music City!";
  });
};