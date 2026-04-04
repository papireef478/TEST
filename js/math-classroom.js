// ========== MATH MODALS ==========
function openMathModal(id) {
  document.getElementById(id).classList.add('active');
  if (id === 'poster-modal') updateNumberOfTheDay();
  if (id === 'laptop-modal') document.getElementById('drill-result').innerHTML = '';
}
function closeMathModal(id) { document.getElementById(id).classList.remove('active'); }

// Number of the Day
function updateNumberOfTheDay() {
  const num = localStorage.getItem('nod') || 6;
  const dn = document.getElementById('display-number');
  const dr = document.getElementById('drill-num');
  if (dn) dn.textContent = num;
  if (dr) dr.textContent = num;
}

// Time Quiz
let currentClockTime = { h: 0, m: 0 };
function drawClock() {
  const cv = document.getElementById('analog-clock');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  ctx.clearRect(0, 0, 200, 200);
  ctx.beginPath(); ctx.arc(100, 100, 90, 0, 2 * Math.PI); ctx.fillStyle = 'white'; ctx.fill();
  ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 4; ctx.stroke();
  ctx.font = '16px Arial'; ctx.fillStyle = '#1e40af'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let i = 1; i <= 12; i++) {
    let a = (i - 3) * Math.PI / 6;
    ctx.fillText(i.toString(), 100 + 75 * Math.cos(a), 100 + 75 * Math.sin(a));
  }
  currentClockTime.h = Math.floor(Math.random() * 12) + 1;
  currentClockTime.m = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  const ma = (currentClockTime.m / 60) * 2 * Math.PI - Math.PI / 2;
  const ha = ((currentClockTime.h + currentClockTime.m / 60) / 12) * 2 * Math.PI - Math.PI / 2;
  ctx.beginPath(); ctx.moveTo(100, 100); ctx.lineTo(100 + 50 * Math.cos(ha), 100 + 50 * Math.sin(ha)); ctx.strokeStyle = '#1e40af'; ctx.lineWidth = 5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(100, 100); ctx.lineTo(100 + 65 * Math.cos(ma), 100 + 65 * Math.sin(ma)); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.stroke();
}

function checkClock() {
  const a = document.getElementById('time-ans').value.replace(':', '');
  const t = new Date(); const h = t.getHours() % 12 || 12; const m = t.getMinutes();
  const expected = h.toString() + (m < 10 ? '0' + m : m.toString());
  document.getElementById('clock-fb').textContent = a === expected ? '✅ Correct!' : '❌ Try again';
}

// Drills
let drillAnswers = [];
function startDrill() {
  const n = parseInt(localStorage.getItem('nod')) || 6;
  const c = document.getElementById('drill-cont'); c.innerHTML = ''; drillAnswers = [];
  document.getElementById('drill-start').style.display = 'none';
  document.getElementById('drill-submit').style.display = 'inline-block';
  for (let i = 0; i < 5; i++) {
    const m = Math.floor(Math.random() * 12) + 1;
    drillAnswers.push(n * m);
    c.innerHTML += `<div style="margin:8px 0;">${n} × ${m} = <input type="number" id="da${i}" style="width:80px;"></div>`;
  }
}

function gradeDrill() {
  let c = 0;
  for (let i = 0; i < 5; i++) if (parseInt(document.getElementById(`da${i}`).value) === drillAnswers[i]) c++;
  document.getElementById('drill-res').textContent = `Score: ${c}/5`;
  document.getElementById('drill-submit').style.display = 'none';
  document.getElementById('drill-start').style.display = 'inline-block';
  document.getElementById('drill-start').textContent = 'New Drill';
}

// Gradebook & Weekly Plan
function renderWeeklyPlan() {
  const pl = JSON.parse(localStorage.getItem('math_weeklyPlan') || '{}');
  const c = document.getElementById('weekly-plan-display');
  const ds = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  let h = '<ul style="list-style:none; padding:0;">';
  ds.forEach(d => {
    const t = pl[d.toLowerCase()] || 'No plans yet.';
    h += `<li style="background:#f8fafc; padding:10px; margin:5px 0; border-left:4px solid var(--math-primary);"><strong>${d}:</strong> ${t}</li>`;
  });
  c.innerHTML = h + '</ul>';
}

function addGrade(name, score) {
  let g = JSON.parse(localStorage.getItem('math_grades') || '[]');
  g.push({ name, score, date: new Date().toLocaleDateString() });
  localStorage.setItem('math_grades', JSON.stringify(g));
  renderGradebook();
}

function renderGradebook() {
  const g = JSON.parse(localStorage.getItem('math_grades') || '[]');
  const l = document.getElementById('assignment-list');
  if (g.length === 0) {
    l.innerHTML = '<p style="color:#666;">No assignments graded yet.</p>';
    document.getElementById('overall-grade').textContent = '--%';
    return;
  }
  let h = '<table style="width:100%;border-collapse:collapse;margin-top:5px;"><tr style="background:var(--math-bg);"><th style="padding:8px;text-align:left;">Assignment</th><th style="padding:8px;">Score</th><th style="padding:8px;">Date</th></tr>';
  g.slice().reverse().forEach(gr => {
    h += `<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:8px;">${gr.name}</td><td style="padding:8px;text-align:center;" class="${gr.score>=80?'math-correct':'math-wrong'}">${gr.score}%</td><td style="padding:8px;text-align:center;">${gr.date}</td></tr>`;
  });
  l.innerHTML = h + '</table>';
  document.getElementById('overall-grade').textContent = Math.round(g.reduce((a,b)=>a+b.score,0)/g.length) + '%';
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('math-clock')) {
    drawClock();
    updateNumberOfTheDay();
    renderGradebook();
  }
});