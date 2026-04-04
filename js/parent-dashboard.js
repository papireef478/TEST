document.addEventListener('DOMContentLoaded', () => {
  // Parent Dashboard Entry
  document.getElementById('showParentBtn')?.addEventListener('click', () => {
    const pwd = prompt("🔐 Enter Parent Password:");
    if (pwd === "TCAP2025") {
      renderParentDashboard();
      document.getElementById('parentModal').classList.add('active');
    } else if (pwd !== null) alert("Incorrect password.");
  });
  document.getElementById('closeParentModal')?.addEventListener('click', () => closeParentModal());
  window.addEventListener('click', (e) => { if (e.target.id === 'parentModal') closeParentModal(); });

  // Planner & Gradebook Buttons
  document.getElementById('plannerBtn')?.addEventListener('click', openLessonPlan);
  document.getElementById('gradebookBtn')?.addEventListener('click', openGradebook);
  document.getElementById('redeemBtn')?.addEventListener('click', openRedeemModal);
  document.getElementById('resetAllBtn')?.addEventListener('click', resetAllData);
  document.getElementById('exportCSVBtn')?.addEventListener('click', exportCSV);

  // Init Mock Grades if empty
  if (!localStorage.getItem('mock_grades')) {
    const mock = [
      {id:1, name:'Multiplication Drill (6s)', subject:'math', score:85, date:'4/1/2025'},
      {id:2, name:'Main Idea Quiz', subject:'ela', score:92, date:'4/2/2025'},
      {id:3, name:'Solar System Test', subject:'science', score:78, date:'4/3/2025'},
      {id:4, name:'Tennessee History', subject:'social', score:95, date:'4/4/2025'}
    ];
    localStorage.setItem('mock_grades', JSON.stringify(mock));
  }
});

function closeParentModal() { document.getElementById('parentModal').classList.remove('active'); }

/* ========== DASHBOARD RENDERING ========== */
function renderParentDashboard() {
  const container = document.getElementById('parentDashboardContent');
  const quizKeys = ['math_mult','ela_main','science_planet','social_rev','spanish_vocab','gym_activity','art_project'];
  let html = `<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:20px;border-radius:20px;margin-bottom:20px;text-align:center;">
    <h3>📈 Overall Mastery</h3>
    <p>Total Points: <strong>${localStorage.getItem('totalPoints')||0} ⭐</strong></p>
  </div>
  <table><thead><tr><th>Topic</th><th>Score</th></tr></thead><tbody>`;
  
  quizKeys.forEach(k => {
    const val = localStorage.getItem(k) || '0/1';
    const pct = Math.round((parseInt(val.split('/')[0])/parseInt(val.split('/')[1]))*100);
    html += `<tr><td>${k.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</td><td style="color:${pct>=70?'#4ecdc4':'#ff6b6b'};font-weight:bold;">${val} (${pct}%)</td></tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

/* ========== LESSON PLANNER ========== */
let currentPlannerSubj = 'math';
const subjects = ['math','ela','science','social','spanish','gym','art'];
const days = ['monday','tuesday','wednesday','thursday','friday'];
const standards = {
  math:['4.NBT.B.5','4.NBT.B.6','4.NF.A.1'],
  ela:['4.RL.KID.2','4.L.CSE.1'],
  science:['4.ESS1.1','4.LS2.2'],
  social:['4.19','4.10'],
  gym:['PE.4.1'], art:['VA.4.1']
};

function openLessonPlan() {
  document.getElementById('plannerModal').classList.add('active');
  switchPlannerTab('math');
}
function closePlanner() { document.getElementById('plannerModal').classList.remove('active'); }

function switchPlannerTab(subj) {
  currentPlannerSubj = subj;
  document.querySelectorAll('.planner-tab').forEach(b => b.classList.remove('active'));
  document.querySelector(`.planner-tab[data-subj="${subj}"]`).classList.add('active');
  renderPlannerDays();
  renderSubjectSpecific();
}

function renderPlannerDays() {
  const c = document.getElementById('planner-days-container');
  const saved = JSON.parse(localStorage.getItem(`plan_${currentPlannerSubj}`) || '{}');
  c.innerHTML = '';
  days.forEach(d => {
    const data = saved[d] || {standards:[{c:'',w:20}], urls:['']};
    let stds = data.standards.map((s,i)=>`<div class="planner-row"><select><option value="">Select Standard</option>${(standards[currentPlannerSubj]||['Custom']).map(x=>`<option value="${x}" ${x===s.c?'selected':''}>${x}</option>`).join('')}</select><input type="number" value="${s.w}" style="width:60px;"><button onclick="this.parentElement.remove()">✕</button></div>`).join('');
    let urls = data.urls.map(u=>`<div class="planner-row"><input type="url" value="${u}" placeholder="YouTube URL"><button onclick="this.parentElement.remove()">✕</button></div>`).join('');
    c.innerHTML += `<div class="planner-day"><h4>${d.charAt(0).toUpperCase()+d.slice(1)}</h4>
      <h5>📋 Standards:</h5><div id="stds-${d}">${stds}</div><button class="planner-btn-add" onclick="addPlannerRow('${d}','std')">➕ Add Standard</button>
      <h5 style="margin-top:10px;">🎬 YouTube:</h5><div id="urls-${d}">${urls}</div><button class="planner-btn-add" onclick="addPlannerRow('${d}','url')">➕ Add URL</button></div>`;
  });
  // Load quote/author
  document.getElementById('plan-quote').value = saved.quote || '';
  document.getElementById('plan-author').value = saved.author || '';
}

function addPlannerRow(day, type) {
  const id = type==='std' ? `stds-${day}` : `urls-${day}`;
  const el = document.getElementById(id);
  const row = document.createElement('div');
  row.className = 'planner-row';
  if(type==='std') row.innerHTML = `<select><option value="">Select Standard</option>${(standards[currentPlannerSubj]||['Custom']).map(x=>`<option value="${x}">${x}</option>`).join('')}</select><input type="number" value="20" style="width:60px;"><button onclick="this.parentElement.remove()">✕</button>`;
  else row.innerHTML = `<input type="url" placeholder="YouTube URL"><button onclick="this.parentElement.remove()">✕</button>`;
  el.appendChild(row);
}

function renderSubjectSpecific() {
  const c = document.getElementById('planner-subject-specific');
  if (currentPlannerSubj === 'math') {
    c.innerHTML = `<div class="subject-section"><h4>🔢 Math-Specific</h4><label>Number of the Day (0-12):</label><input type="number" id="math-nod" min="0" max="12" value="${localStorage.getItem('nod')||6}" style="width:80px;"></div>`;
  } else if (currentPlannerSubj === 'ela') {
    c.innerHTML = `<div class="subject-section"><h4>📖 ELA-Specific</h4><label>Activity Focus:</label><select id="ela-focus"><option>Reading Log</option><option>Writing Prompt</option><option>Grammar Drill</option></select></div>`;
  } else if (currentPlannerSubj === 'spanish') {
    c.innerHTML = `<div class="subject-section"><h4>🗣️ Spanish (No TN Standards)</h4><p>Focus on vocabulary, pronunciation, and culture. Use the URL field for pronunciation videos.</p></div>`;
  } else {
    c.innerHTML = `<div class="subject-section"><p style="color:#666;">Configure standards & videos above. Subject-specific fields coming soon!</p></div>`;
  }
}

function savePlanner() {
  const data = { quote: document.getElementById('plan-quote').value, author: document.getElementById('plan-author').value };
  if (currentPlannerSubj === 'math' && document.getElementById('math-nod')) {
    localStorage.setItem('nod', document.getElementById('math-nod').value);
  }
  days.forEach(d => {
    const stds = Array.from(document.querySelectorAll(`#stds-${d} .planner-row`)).map(r => ({
      c: r.querySelector('select').value,
      w: parseInt(r.querySelector('input[type=number]')?.value)||20
    }));
    const urls = Array.from(document.querySelectorAll(`#urls-${d} input`)).map(i => i.value).filter(u=>u);
    data[d] = { standards: stds, urls };
  });
  localStorage.setItem(`plan_${currentPlannerSubj}`, JSON.stringify(data));
  alert(`✅ ${currentPlannerSubj.toUpperCase()} plan saved!`);
  closePlanner();
}

/* ========== GRADEBOOK ========== */
function openGradebook() { document.getElementById('gradebookModal').classList.add('active'); renderGrades(); }
function closeGradebook() { document.getElementById('gradebookModal').classList.remove('active'); }

function renderGrades() {
  const grades = JSON.parse(localStorage.getItem('mock_grades') || '[]');
  const tbody = document.getElementById('grades-tbody');
  if (grades.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:20px;">No grades yet.</td></tr>';
    document.getElementById('overall-grade').textContent = '--%';
    return;
  }
  const avg = Math.round(grades.reduce((a,g)=>a+g.score,0)/grades.length);
  document.getElementById('overall-grade').textContent = avg + '%';
  tbody.innerHTML = grades.map(g => `<tr><td>${g.name}</td><td>${g.subject}</td><td>${g.score}%</td><td>${g.date}</td><td><button onclick="deleteGrade(${g.id})" style="background:#ff6b6b;padding:4px 8px;font-size:0.8rem;">🗑️</button></td></tr>`).join('');
}

function addMockGrade() {
  const n = prompt('Assignment name:'); const s = prompt('Subject (math,ela,science,social,gym,art):'); const sc = prompt('Score (0-100):');
  if (!n||!s||!sc) return;
  const grades = JSON.parse(localStorage.getItem('mock_grades') || '[]');
  grades.push({ id: Date.now(), name:n, subject:s.toLowerCase(), score:Math.min(100,Math.max(0,parseInt(sc))), date:new Date().toLocaleDateString() });
  localStorage.setItem('mock_grades', JSON.stringify(grades));
  renderGrades();
}
function deleteGrade(id) {
  let grades = JSON.parse(localStorage.getItem('mock_grades') || '[]');
  grades = grades.filter(g => g.id !== id);
  localStorage.setItem('mock_grades', JSON.stringify(grades));
  renderGrades();
}

/* ========== UTILS ========== */
function openRedeemModal() { document.getElementById('redeemModal').classList.add('active'); }
function closeRedeemModal() { document.getElementById('redeemModal').classList.remove('active'); }
function redeemReward(cost, name) {
  let pts = parseInt(localStorage.getItem('totalPoints')||0);
  if (pts >= cost && confirm(`Spend ${cost} pts on ${name}?`)) {
    localStorage.setItem('totalPoints', pts - cost);
    alert(`✅ ${name} redeemed!`);
    closeRedeemModal();
  } else if (pts < cost) alert('❌ Not enough points!');
}
function resetAllData() {
  if (confirm('⚠️ Erase ALL progress & settings?')) {
    localStorage.clear();
    location.reload();
  }
}
function exportCSV() {
  let csv = 'Subject,Score\n';
  ['math','ela','science','social'].forEach(s => {
    const k = s+'_quiz'; //