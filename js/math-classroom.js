// ========== MATH PAGE FUNCTIONS ==========

// Modal handlers
window.openMathModal = function(id) {
  document.getElementById(id)?.classList.add('active');
  if (id === 'poster-modal') updateNumberOfTheDay();
  if (id === 'laptop-modal') {
    document.getElementById('drill-result').innerHTML = '';
    document.getElementById('drill-start').style.display = 'inline-block';
    document.getElementById('drill-submit').style.display = 'none';
  }
  if (id === 'calendar-modal') renderWeeklyPlan();
  if (id === 'gradebook-modal') renderGradebook();
};

window.closeMathModal = function(id) {
  document.getElementById(id)?.classList.remove('active');
};

// Number of the Day
window.updateNumberOfTheDay = function() {
  const num = localStorage.getItem('nod') || 6;
  const dn = document.getElementById('display-number');
  const dr = document.getElementById('drill-num');
  if (dn) dn.textContent = num;
  if (dr) dr.textContent = num;
};

// Analog Clock Drawing
window.currentClockTime = { h: 0, m: 0 };
window.drawClock = function() {
  const cv = document.getElementById('analog-clock');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  ctx.clearRect(0, 0, 200, 200);
  
  // Clock face
  ctx.beginPath();
  ctx.arc(100, 100, 90, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 4;
  ctx.stroke();
  
  // Numbers
  ctx.font = '16px Arial';
  ctx.fillStyle = '#1e40af';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 1; i <= 12; i++) {
    let a = (i - 3) * Math.PI / 6;
    ctx.fillText(i.toString(), 100 + 75 * Math.cos(a), 100 + 75 * Math.sin(a));
  }
  
  // Random time
  currentClockTime.h = Math.floor(Math.random() * 12) + 1;
  currentClockTime.m = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  
  // Hands
  const ma = (currentClockTime.m / 60) * 2 * Math.PI - Math.PI / 2;
  const ha = ((currentClockTime.h + currentClockTime.m / 60) / 12) * 2 * Math.PI - Math.PI / 2;
  
  // Hour hand
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(100 + 50 * Math.cos(ha), 100 + 50 * Math.sin(ha));
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 5;
  ctx.stroke();
  
  // Minute hand
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(100 + 65 * Math.cos(ma), 100 + 65 * Math.sin(ma));
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 3;
  ctx.stroke();
};

window.checkClock = function() {
  const a = document.getElementById('time-ans').value.replace(':', '');
  const expected = currentClockTime.h.toString() + (currentClockTime.m < 10 ? '0' + currentClockTime.m : currentClockTime.m.toString());
  const fb = document.getElementById('clock-fb');
  if (a === expected) {
    fb.textContent = '✅ Correct! Great time-telling! 🎉';
    fb.style.color = '#4ecdc4';
    addPoints(15, 'Time Practice');
  } else {
    fb.textContent = `❌ Try again! The time is ${currentClockTime.h}:${currentClockTime.m < 10 ? '0' + currentClockTime.m : currentClockTime.m}`;
    fb.style.color = '#ff6b6b';
  }
};

// Math Drills
window.drillAnswers = [];
window.startDrill = function() {
  const n = parseInt(localStorage.getItem('nod')) || 6;
  const c = document.getElementById('drill-cont');
  c.innerHTML = '';
  drillAnswers = [];
  document.getElementById('drill-start').style.display = 'none';
  document.getElementById('drill-submit').style.display = 'inline-block';
  
  for (let i = 0; i < 5; i++) {
    const m = Math.floor(Math.random() * 12) + 1;
    drillAnswers.push(n * m);
    c.innerHTML += `<div style="margin:8px 0;">${n} × ${m} = <input type="number" id="da${i}" style="width:80px;"></div>`;
  }
};

window.gradeDrill = function() {
  let c = 0;
  for (let i = 0; i < 5; i++) {
    if (parseInt(document.getElementById(`da${i}`).value) === drillAnswers[i]) c++;
  }
  document.getElementById('drill-res').textContent = `Score: ${c}/5 ${c === 5 ? '🌟 Perfect!' : ''}`;
  document.getElementById('drill-submit').style.display = 'none';
  document.getElementById('drill-start').style.display = 'inline-block';
  document.getElementById('drill-start').textContent = 'New Drill';
  if (c >= 4) addPoints(20, 'Math Drill Master');
};

// Weekly Plan
window.renderWeeklyPlan = function() {
  const pl = JSON.parse(localStorage.getItem('math_weeklyPlan') || '{}');
  const c = document.getElementById('weekly-plan-display');
  const ds = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  let h = '<ul style="list-style:none; padding:0;">';
  ds.forEach(d => {
    const t = pl[d.toLowerCase()] || 'No plans yet.';
    h += `<li style="background:#f8fafc; padding:10px; margin:5px 0; border-left:4px solid #667eea;"><strong>${d}:</strong> ${t}</li>`;
  });
  c.innerHTML = h + '</ul>';
};

// Gradebook
window.addGrade = function(name, score) {
  let g = JSON.parse(localStorage.getItem('math_grades') || '[]');
  g.push({ name, score, date: new Date().toLocaleDateString() });
  localStorage.setItem('math_grades', JSON.stringify(g));
  renderGradebook();
};

window.renderGradebook = function() {
  const g = JSON.parse(localStorage.getItem('math_grades') || '[]');
  const l = document.getElementById('assignment-list');
  if (g.length === 0) {
    l.innerHTML = '<p style="color:#666;">No assignments graded yet.</p>';
    document.getElementById('overall-grade').textContent = '--%';
    return;
  }
  let h = '<table><tr><th>Assignment</th><th>Score</th><th>Date</th></tr>';
  g.slice().reverse().forEach(gr => {
    h += `<tr><td>${gr.name}</td><td class="${gr.score>=80?'math-correct':'math-wrong'}">${gr.score}%</td><td>${gr.date}</td></tr>`;
  });
  l.innerHTML = h + '</table>';
  document.getElementById('overall-grade').textContent = Math.round(g.reduce((a,b)=>a+b.score,0)/g.length) + '%';
};

// Initialize math page
document.addEventListener('DOMContentLoaded', () => {
  // Only run on math page
  if (!document.querySelector('.math-page')) return;
  
  // Draw clock if canvas exists
  if (document.getElementById('analog-clock')) {
    drawClock();
    updateNumberOfTheDay();
    renderGradebook();
  }
  
  // Bind overlay clicks
  document.querySelectorAll('.math-overlay-zone').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = el.id.replace('math-', '');
      openMathModal(`${target}-modal`);
    });
  });
  
  // Bind quiz check buttons
  document.getElementById('checkMathMult')?.addEventListener('click', () => {
    const q1 = parseInt(document.getElementById('math_q1')?.value);
    const q2 = parseInt(document.getElementById('math_q2')?.value);
    const score = (q1 === 204 ? 1 : 0) + (q2 === 228 ? 1 : 0);
    saveScore('math_mult', score, 2);
    document.getElementById('mathMultFB').innerHTML = `✅ ${score}/2. ${score === 2 ? 'Perfect! 🎉' : 'Keep practicing! 💪'}`;
    if (score === 2) unlockAchievement('mathMaster', 100);
  });
  
  document.getElementById('checkFractions')?.addEventListener('click', () => {
    const checks = document.querySelectorAll('.math-page input[type="checkbox"]');
    const selected = Array.from(checks).filter(cb => cb.checked).map(cb => cb.value);
    const score = (selected.includes('2/4') && selected.includes('3/6') && selected.includes('4/8') && selected.length === 3) ? 1 : 0;
    saveScore('math_frac', score, 1);
    document.getElementById('mathFracFB').innerHTML = score ? "🎉 All equivalent to 1/2!" : "❌ 2/4, 3/6, 4/8 = 1/2. Try again!";
  });
});