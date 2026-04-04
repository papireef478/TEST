// ========== TCAP QUESTION BANK ==========
window.tcapQuestions = {
  math: [
    { q: "84 ÷ 7 = ?", options: ["10", "12", "14", "16"], answer: "12" },
    { q: "Greater fraction: 3/4 or 2/3?", options: ["3/4", "2/3", "Equal"], answer: "3/4" },
    { q: "Area 5x3?", options: ["8", "15", "16"], answer: "15 cm²" },
    { q: "Round 478 to nearest ten:", options: ["470", "480", "500"], answer: "480" }
  ],
  ela: [
    { q: "Noun? (run, happiness, quickly)", options: ["run", "happiness", "quickly"], answer: "happiness" },
    { q: "Main idea of dolphins?", options: ["Fish", "Smart mammals", "Fast swimmers"], answer: "Dolphins are intelligent mammals" },
    { q: "'Group ___ ready.'", options: ["is", "are"], answer: "is" },
    { q: "'Infer' means?", options: ["Guess based on clues", "Read aloud", "Skip"], answer: "To guess based on clues" }
  ],
  science: [
    { q: "Plants make food via?", options: ["respiration", "photosynthesis", "digestion"], answer: "photosynthesis" },
    { q: "Closest to Sun?", options: ["Venus", "Mercury", "Earth"], answer: "Mercury" },
    { q: "Camel humps store?", options: ["Water", "Fat", "Food"], answer: "Fat" },
    { q: "Causes day/night?", options: ["Orbit", "Rotation", "Moon"], answer: "Earth's rotation" }
  ],
  social: [
    { q: "Declaration author?", options: ["Washington", "Jefferson", "Franklin"], answer: "Thomas Jefferson" },
    { q: "TN Capital?", options: ["Memphis", "Nashville", "Chattanooga"], answer: "Nashville" },
    { q: "Law-making branch?", options: ["Executive", "Legislative", "Judicial"], answer: "Legislative" },
    { q: "TN nickname?", options: ["Sunshine", "Volunteer", "Empire"], answer: "The Volunteer State" }
  ]
};

// ========== TCAP STATE ==========
window.tcapTimer = null;
window.selectedTestOption = null;
window.selectedSubjects = [];

// ========== TEST OPTION SELECTION ==========
window.selectTestOption = function(option) {
  selectedTestOption = option;
  
  document.querySelectorAll('.tcap-option').forEach(opt => opt.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  
  const sel = document.getElementById('subjectSelection');
  const single = document.getElementById('singleSubjectOptions');
  const two = document.getElementById('twoSubjectOptions');
  const timer = document.getElementById('tcap-timer-display');
  const sample = document.getElementById('sampleQuestions');
  const questions = document.getElementById('tcapQuestions');
  const results = document.getElementById('tcapResults');
  
  results?.classList.remove('active');
  questions?.classList.remove('active');
  
  if (option === 'full-week') {
    sel?.classList.remove('active');
    timer.style.display = 'block';
    sample?.classList.remove('active');
    startCountdown(7200);
    alert('📅 Full Week timer started (2 hours). Complete one subject per day!');
  } else if (option === 'one-subject') {
    sel?.classList.add('active');
    single.style.display = 'block';
    two.style.display = 'none';
    timer.style.display = 'none';
    sample?.classList.add('active');
  } else if (option === 'two-subjects') {
    sel?.classList.add('active');
    single.style.display = 'none';
    two.style.display = 'block';
    timer.style.display = 'none';
    sample?.classList.add('active');
  }
};

// ========== START SELECTED TEST ==========
window.startSelectedTest = function() {
  selectedSubjects = [];
  
  if (selectedTestOption === 'one-subject') {
    const c = document.querySelector('input[name="tcap-subject-single"]:checked');
    if (!c) return alert('⚠️ Select ONE subject.');
    selectedSubjects.push(c.value);
  } else {
    const cbs = document.querySelectorAll('#twoSubjectOptions input[type="checkbox"]:checked');
    if (cbs.length !== 2) return alert('⚠️ Select EXACTLY 2 subjects.');
    cbs.forEach(cb => selectedSubjects.push(cb.value));
  }
  
  startCountdown(selectedSubjects.length * 7200);
  generateTCAPQuestions();
  
  document.getElementById('sampleQuestions')?.classList.remove('active');
  document.getElementById('subjectSelection')?.classList.remove('active');
  document.getElementById('tcapQuestions')?.classList.add('active');
  document.getElementById('tcap-timer-display').style.display = 'block';
  
  localStorage.setItem('tcapTestState', JSON.stringify({
    startTime: Date.now(),
    duration: selectedSubjects.length * 7200,
    subjects: selectedSubjects
  }));
};

// ========== GENERATE QUESTIONS ==========
window.generateTCAPQuestions = function() {
  const cont = document.getElementById('questionsContainer');
  if (!cont) return;
  cont.innerHTML = '';
  
  selectedSubjects.forEach((sub, si) => {
    const qs = [...tcapQuestions[sub]].sort(() => Math.random() - 0.5).slice(0, 3);
    qs.forEach((qObj, qi) => {
      const id = `tcap_${sub}_${si}_${qi}`;
      cont.innerHTML += `
        <div class="tcap-question" data-subject="${sub}" data-qid="${id}">
          <p class="question">${qObj.q}</p>
          ${qObj.options.map(o => `<label><input type="radio" name="${id}" value="${o}"> ${o}</label>`).join('')}
        </div>
      `;
    });
  });
};

// ========== COUNTDOWN TIMER ==========
window.startCountdown = function(seconds) {
  clearInterval(tcapTimer);
  let rem = seconds;
  
  const saved = JSON.parse(localStorage.getItem('tcapTestState') || '{}');
  if (saved.startTime && saved.duration) {
    rem = Math.max(0, saved.duration - Math.floor((Date.now() - saved.startTime) / 1000));
  }
  
  function tick() {
    const h = Math.floor(rem / 3600);
    const m = Math.floor((rem % 3600) / 60);
    const s = rem % 60;
    document.getElementById('countdown').textContent = 
      `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    
    if (rem <= 0) {
      clearInterval(tcapTimer);
      if (document.getElementById('tcapQuestions')?.classList.contains('active')) {
        alert('⏰ Time\'s up! Submitting test...');
        submitTCAPTest();
      }
      return;
    }
    rem--;
  }
  
  tick();
  tcapTimer = setInterval(tick, 1000);
};

// ========== SUBMIT TEST ==========
window.submitTCAPTest = function() {
  clearInterval(tcapTimer);
  localStorage.removeItem('tcapTestState');
  
  let results = [], correct = 0;
  
  document.querySelectorAll('.tcap-question').forEach(q => {
    const sub = q.dataset.subject;
    const id = q.dataset.qid;
    const qObj = tcapQuestions[sub].find(x => x.q === q.querySelector('.question').textContent);
    const ans = document.querySelector(`input[name="${id}"]:checked`)?.value || 'No answer';
    const ok = ans === qObj.answer;
    if (ok) correct++;
    results.push({ question: qObj.q, subject: sub, studentAnswer: ans, correctAnswer: qObj.answer, isCorrect: ok });
  });
  
  const testRes = {
    date: new Date().toLocaleString(),
    subjects: selectedSubjects,
    total: results.length,
    correct: correct,
    score: Math.round((correct / results.length) * 100),
    details: results
  };
  
  let all = JSON.parse(localStorage.getItem('tcapResults') || '[]');
  all.push(testRes);
  localStorage.setItem('tcapResults', JSON.stringify(all));
  
  addPoints(50 * selectedSubjects.length, 'TCAP Complete!');
  
  if (correct === results.length) unlockAchievement('perfectScore', 150);
  if (selectedSubjects.length >= 2) unlockAchievement('tcapMaster', 250);
  
  showStudentResults(correct, results.length);
};

// ========== SHOW RESULTS ==========
window.showStudentResults = function(correct, total) {
  document.getElementById('tcapQuestions')?.classList.remove('active');
  const res = document.getElementById('tcapResults');
  if (!res) return;
  
  res.classList.add('active');
  const pct = Math.round((correct / total) * 100);
  
  res.innerHTML = `
    <h3 style="text-align:center;margin-bottom:20px;">📊 Test Complete!</h3>
    <div style="text-align:center;font-size:3rem;margin:20px 0;">
      ${pct >= 80 ? '🌟' : pct >= 60 ? '✨' : '💪'}
    </div>
    <p style="text-align:center;font-size:1.3rem;">${correct}/${total} correct (${pct}%)</p>
    <button onclick="resetTCAPPage()" style="display:block;margin:20px auto;">🔄 Take Another</button>
  `;
};

window.resetTCAPPage = function() {
  document.getElementById('tcapResults')?.classList.remove('active');
  document.getElementById('sampleQuestions')?.classList.add('active');
  document.getElementById('tcap-timer-display').style.display = 'none';
  document.querySelectorAll('.tcap-option').forEach(o => o.classList.remove('selected'));
  selectedTestOption = null;
  selectedSubjects = [];
};

// ========== ACHIEVEMENT CHECK ==========
window.checkTCAPPracticeAchievement = function() {
  const tcap = JSON.parse(localStorage.getItem('tcapResults') || '[]');
  if (tcap.length >= 2 && !appState.achievements.tcapPractice) {
    unlockAchievement('tcapPractice', 200);
  }
};