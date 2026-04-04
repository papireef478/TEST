// ========== MATH CLASSROOM & PLANNER ==========
function openMathModal(id) {
  document.getElementById(id).classList.add('active');
  if(id === 'poster-modal') updateNumberOfTheDay();
  if(id === 'calendar-modal') renderWeeklyPlan();
  if(id === 'laptop-modal') {
    document.getElementById('drill-result').innerHTML = '';
    document.getElementById('start-drill-btn').style.display = 'inline-block';
    document.getElementById('grade-drill-btn').style.display = 'none';
    document.getElementById('drill-questions').innerHTML = '<p style="color:#666;">Click "Start Drill" to begin!</p>';
  }
}
function closeMathModal(id) { document.getElementById(id).classList.remove('active'); }

function updateNumberOfTheDay() {
  const num = localStorage.getItem('math_numberOfDay') || 3;
  const dn = document.getElementById('display-number'), dr = document.getElementById('drill-number');
  if(dn) dn.textContent = num; if(dr) dr.textContent = num;
}

let currentClockTime = { h: 0, m: 0 };
function drawClock() {
  const canvas = document.getElementById('analog-clock-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,200,200);
  ctx.beginPath(); ctx.arc(100,100,90,0,2*Math.PI); ctx.fillStyle='white'; ctx.fill();
  ctx.strokeStyle='#2563eb'; ctx.lineWidth=4; ctx.stroke();
  ctx.font='16px Arial'; ctx.fillStyle='#1e40af'; ctx.textAlign='center'; ctx.textBaseline='middle';
  for(let i=1;i<=12;i++){ let a = (i-3)*Math.PI/6; ctx.fillText(i.toString(), 100+75*Math.cos(a), 100+75*Math.sin(a)); }
  currentClockTime.h = Math.floor(Math.random()*12)+1;
  currentClockTime.m = [0,15,30,45][Math.floor(Math.random()*4)];
  const minA = (currentClockTime.m/60)*2*Math.PI - Math.PI/2;
  const hrA = ((currentClockTime.h + currentClockTime.m/60)/12)*2*Math.PI - Math.PI/2;
  ctx.beginPath(); ctx.moveTo(100,100); ctx.lineTo(100+50*Math.cos(hrA),100+50*Math.sin(hrA)); ctx.strokeStyle='#1e40af'; ctx.lineWidth=5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(100,100); ctx.lineTo(100+65*Math.cos(minA),100+65*Math.sin(minA)); ctx.strokeStyle='#dc2626'; ctx.lineWidth=3; ctx.stroke();
}

function checkTime() {
  const input = document.getElementById('time-answer').value.trim().replace(':','');
  let expected = currentClockTime.h.toString() + (currentClockTime.m < 10 ? '0'+currentClockTime.m : currentClockTime.m.toString());
  const fb = document.getElementById('time-feedback');
  if(input === expected) { fb.innerHTML = `<span class="math-correct">✅ Correct! It's ${currentClockTime.h}:${currentClockTime.m<10?'0':''}${currentClockTime.m}</span>`; addGrade('Time Practice', 100); }
  else fb.innerHTML = `<span class="math-wrong">❌ Try again! Hint: Look at the short hand for hours.</span>`;
}

let drillAnswers = [];
function generateDrill() {
  const num = parseInt(localStorage.getItem('math_numberOfDay') || 3);
  const container = document.getElementById('drill-questions'); container.innerHTML = ''; drillAnswers = [];
  document.getElementById('start-drill-btn').style.display = 'none'; document.getElementById('grade-drill-btn').style.display = 'inline-block';
  for(let i=0; i<5; i++){
    const type = i < 3 ? 'mult' : 'div', rand = Math.floor(Math.random()*10)+1;
    let qText, ans;
    if(type === 'mult') { qText = `${num} × ${rand} = ?`; ans = num * rand; }
    else { ans = num; const mult = Math.floor(Math.random()*9)+2; qText = `${mult*num} ÷ ${mult} = ?`; }
    drillAnswers.push(ans);
    container.innerHTML += `<div class="math-question">${i+1}. ${qText} <input type="number" class="math-input" id="q${i}" style="width:100px; display:inline-block;"></div>`;
  }
}

function gradeDrill() {
  let correct = 0;
  for(let i=0; i<5; i++){
    const val = parseInt(document.getElementById(`q${i}`).value);
    if(val === drillAnswers[i]) correct++;
    document.getElementById(`q${i}`).style.borderColor = (val === drillAnswers[i]) ? '#16a34a' : '#dc2626';
  }
  const pct = Math.round((correct/5)*100);
  document.getElementById('drill-result').innerHTML = `<span class="${pct>=80?'math-correct':'math-wrong'}">Score: ${correct}/5 (${pct}%)</span>`;
  addGrade(`Drill (${localStorage.getItem('math_numberOfDay')||3}s)`, pct);
  document.getElementById('grade-drill-btn').style.display = 'none';
  document.getElementById('start-drill-btn').style.display = 'inline-block';
  document.getElementById('start-drill-btn').textContent = 'New Drill';
}

function renderWeeklyPlan() {
  const plan = JSON.parse(localStorage.getItem('math_weeklyPlan') || '{}');
  const container = document.getElementById('weekly-plan-display');
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
  let html = '<ul style="list-style:none; padding:0;">';
  days.forEach(day => { html += `<li style="background:#f8fafc; padding:10px; margin:5px 0; border-left:4px solid var(--math-primary);"><strong>${day}:</strong> ${plan[day.toLowerCase()] || 'No plans yet.'}</li>`; });
  container.innerHTML = html + '</ul>';
}

function addGrade(name, score) {
  let grades = JSON.parse(localStorage.getItem('math_grades') || '[]');
  grades.push({ name, score, date: new Date().toLocaleDateString() });
  localStorage.setItem('math_grades', JSON.stringify(grades));
  renderGradebook();
}

function renderGradebook() {
  const grades = JSON.parse(localStorage.getItem('math_grades') || '[]');
  const list = document.getElementById('assignment-list');
  if(grades.length === 0) { list.innerHTML = '<p style="color:#666;">No assignments graded yet.</p>'; document.getElementById('overall-grade').textContent = '--%'; return; }
  let html = '<table style="width:100%; border-collapse:collapse; margin-top:5px;"><tr style="background:var(--math-bg);"><th style="padding:8px;text-align:left;">Assignment</th><th style="padding:8px;">Score</th><th style="padding:8px;">Date</th></tr>';
  grades.slice().reverse().forEach(g => { html += `<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:8px;">${g.name}</td><td style="padding:8px;text-align:center;" class="${g.score>=80?'math-correct':'math-wrong'}">${g.score}%</td><td style="padding:8px;text-align:center;">${g.date}</td></tr>`; });
  list.innerHTML = html + '</table>';
  document.getElementById('overall-grade').textContent = Math.round(grades.reduce((a,b)=>a+b.score,0)/grades.length) + '%';
}

// ✅ FIXED WEEKLY PLANNER FUNCTIONS
function openLessonPlan() {
  document.getElementById('lessonPlanModal').classList.add('active');
  initMathPlanner();
}
function closeLessonPlan() { document.getElementById('lessonPlanModal').classList.remove('active'); }

function initMathPlanner() {
  const container = document.getElementById('daily-plans');
  const plan = JSON.parse(localStorage.getItem('math_weeklyPlan') || '{}');
  container.innerHTML = '';
  ['monday','tuesday','wednesday','thursday','friday'].forEach(d => {
    container.innerHTML += `<label style="display:block; margin-top:8px; background:#f8f9fa; padding:10px; border-radius:8px;"><strong style="text-transform:capitalize;">${d}:</strong><input type="text" class="math-input plan-day-input" data-day="${d}" value="${plan[d]||''}" placeholder="Task..." style="margin-top:5px; width:100%;"></label>`;
  });
  document.getElementById('planner-numOfDay').value = localStorage.getItem('math_numberOfDay') || '';
}

function savePlanner() {
  const num = document.getElementById('planner-numOfDay').value;
  if(!num) return alert("⚠️ Please enter a Number of the Day.");
  localStorage.setItem('math_numberOfDay', num);
  const plan = {};
  document.querySelectorAll('.plan-day-input').forEach(i => { plan[i.dataset.day] = i.value; });
  localStorage.setItem('math_weeklyPlan', JSON.stringify(plan));
  alert('✅ Weekly Plan Saved! Student overlays updated.');
  closeLessonPlan();
}