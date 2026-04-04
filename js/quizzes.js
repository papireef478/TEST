// ========== QUIZ SYSTEM ==========
const quizList = [
  { id: "math_mult", name: "Multiplication", standard: "4.NBT.B.5", max: 2,
    getScore: () => (parseInt(document.getElementById('math_q1')?.value)===204?1:0)+(parseInt(document.getElementById('math_q2')?.value)===228?1:0), saveKey: "math_mult" },
  { id: "math_frac", name: "Equivalent Fractions", standard: "4.NF.A.1", max:1,
    getScore: () => {
      const checks = document.querySelectorAll('#mathPage .quiz input[type="checkbox"]');
      const selected = Array.from(checks).filter(cb=>cb.checked).map(cb=>cb.value);
      return (selected.includes('2/4')&&selected.includes('3/6')&&selected.includes('4/8')&&selected.length===3)?1:0;
    }, saveKey: "math_frac" },
  { id: "ela_main", name: "Main Idea", standard: "4.RL.KID.2", max:1,
    getScore: () => { const sel=document.querySelector('input[name="mainIdea"]:checked'); return (sel&&sel.value==='b')?1:0; }, saveKey: "ela_main" },
  { id: "ela_verb", name: "Subject-Verb Agreement", standard: "4.L.CSE.1", max:1,
    getScore: () => { const sel=document.querySelector('input[name="verb"]:checked'); return (sel&&sel.value==='is')?1:0; }, saveKey: "ela_verb" },
  { id: "science_planet", name: "Solar System", standard: "4.ESS1.1", max:1,
    getScore: () => { const sel=document.querySelector('input[name="planet"]:checked'); return (sel&&sel.value==='Mercury')?1:0; }, saveKey: "science_planet" },
  { id: "science_camel", name: "Animal Adaptations", standard: "4.LS2.2", max:1,
    getScore: () => { const sel=document.querySelector('input[name="camel"]:checked'); return (sel&&sel.value==='desert')?1:0; }, saveKey: "science_camel" },
  { id: "social_rev", name: "Declaration Author", standard: "4.19", max:1,
    getScore: () => { const sel=document.querySelector('input[name="author"]:checked'); return (sel&&sel.value==='thomas')?1:0; }, saveKey: "social_rev" },
  { id: "social_capital", name: "Tennessee Capital", standard: "4.10", max:1,
    getScore: () => { const sel=document.querySelector('input[name="capital"]:checked'); return (sel&&sel.value==='nashville')?1:0; }, saveKey: "social_capital" },
  { id: "gym_activity", name: "Gym Activity Log", standard: "Health/PE", max:1, getScore: () => 1, saveKey: "gym_activity" },
  { id: "spanish_vocab", name: "Spanish Vocabulary", standard: "World Language", max:1,
    getScore: () => (document.querySelector('input[name="spanish_q1"]:checked')?.value === 'hola') ? 1 : 0, saveKey: "spanish_vocab" },
  { id: "art_project", name: "Art Project Completion", standard: "Visual Arts", max:1, getScore: () => 1, saveKey: "art_project" }
];

function saveScore(key, earned, total) {
  const stored = localStorage.getItem(key);
  const best = stored ? parseInt(stored.split('/')[0]) : 0;
  localStorage.setItem(key, `${Math.max(best, earned)}/${total}`);
  if (earned > 0) {
    quizzesCompleted++;
    localStorage.setItem('quizzesCompleted', quizzesCompleted);
    addPoints(earned * 20, 'Quiz Complete!');
    if (quizzesCompleted === 1) unlockAchievement('firstQuiz', 50);
    if (earned === total) unlockAchievement('perfectScore', 150);
  }
  updateClassroomProgress();
}

function updateClassroomProgress() {
  let totalEarned = 0, totalPossible = 0;
  for(let i=0;i<localStorage.length;i++) {
    const k = localStorage.key(i);
    if(quizList.some(q=>q.saveKey===k)) {
      const parts = localStorage.getItem(k)?.split('/') || [0,1];
      if(parts.length===2) { totalEarned += parseInt(parts[0]); totalPossible += parseInt(parts[1]); }
    }
  }
  const percent = totalPossible===0 ? 0 : Math.floor((totalEarned/totalPossible)*100);
  const miniBar = document.getElementById('miniProgress');
  const percentSpan = document.getElementById('progressPercent');
  if(miniBar) miniBar.style.width = percent+'%';
  if(percentSpan) percentSpan.innerText = `✨ ${percent}% mastery ✨`;
  
  const msg = document.getElementById('teacherMessage');
  if(msg) {
    if(percent<20) msg.innerHTML = `"You're doing great! Let's try a fun quiz together. 🍎"`;
    else if(percent>=80) msg.innerHTML = `"WOW! You're a superstar! I'm so proud. 🌟"`;
    else msg.innerHTML = `"Keep clicking on the classroom stations! Every quiz helps."`;
  }
}

function bindQuizzes() {
  document.getElementById('checkMathMult')?.addEventListener('click',()=>{
    const score = quizList.find(q=>q.saveKey==='math_mult').getScore();
    saveScore('math_mult', score, 2);
    document.getElementById('mathMultFB').innerHTML = `✅ You got ${score}/2. ${score===2?'Perfect! 🎉':'Keep practicing! 💪'}`;
    if(score===2) unlockAchievement('mathMaster',100);
  });
  document.getElementById('checkFractions')?.addEventListener('click',()=>{
    const score = quizList.find(q=>q.saveKey==='math_frac').getScore();
    saveScore('math_frac', score, 1);
    document.getElementById('mathFracFB').innerHTML = score ? "🎉 All equivalent to 1/2!" : "❌ 2/4, 3/6, 4/8 = 1/2. Try again!";
  });
  document.getElementById('checkMainIdea')?.addEventListener('click',()=>{
    const score = quizList.find(q=>q.saveKey==='ela_main').getScore();
    saveScore('ela_main', score, 1);
    document.getElementById('elaMainFB').innerHTML = score ? "✅ Correct! Great reading! 📚" : "❌ Reread - dolphins are smart mammals!";
    if(score===1) unlockAchievement('readingStar',100);
  });
  document.getElementById('checkVerb')?.addEventListener('click',()=>{
    const score = quizList.find(q=>q.saveKey==='ela_verb').getScore();
    saveScore('ela_verb', score, 1);
    document.getElementById('verbFB').innerHTML = score ? "✅ 'group' is singular, so 'is' is correct! ✨" : "❌ Use 'is' because 'group' is singular!";
  });
  document.getElementById('checkPlanet')?.addEventListener('click',()=>{
    const score = quizList.find(q=>q.saveKey==='science_planet').getScore();
    saveScore('science_planet', score, 1);
    document.getElementById('planetFB').innerHTML = score ? "✅ Mercury! You're a science star! 🔬" : "❌ Mercury is closest. Review the solar system!";
  });
  document.getElementById('checkCamel')?.addEventListener('click',()=>{
    const score = quizList.find(q=>q.saveKey==='science_camel').getScore();
    saveScore('science_camel', score, 1);
    document.getElementById('camelFB').innerHTML = score ? "✅ Camels live in deserts! 🌵" : "❌ Desert is the habitat. Try again!";
  });
  document.getElementById('checkAuthor')?.addEventListener('click',()=>{
    const score = quizList.find(q=>q.saveKey==='social_rev').getScore();
    saveScore('social_rev', score, 1);
    document.getElementById('authorFB').innerHTML = score ? "✅ Thomas Jefferson! History hero! 🏛️" : "❌ Thomas Jefferson wrote it. Review your notes!";
  });
  document.getElementById('checkCapital')?.addEventListener('click',()=>{
    const score = quizList.find(q=>q.saveKey==='social_capital').getScore();
    saveScore('social_capital', score, 1);
    document.getElementById('capitalFB').innerHTML = score ? "✅ Nashville is the capital! 🎸" : "❌ The capital is Nashville. Remember Music City!";
  });
}

function logActivity(activity, minutes) {
  addPoints(10, `${activity} completed`);
  alert(`✅ Great job! +10 points for ${minutes} minutes of ${activity}! 💪`);
}
function logArtProject(projectType) {
  addPoints(25, `Art project: ${projectType}`);
  alert(`🎨 Amazing work on your ${projectType} project! +25 creativity points!`);
}
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