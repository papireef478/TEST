document.addEventListener('DOMContentLoaded', () => {
  // Only run on parent.html
  if (!document.getElementById('passwordGate')) return;

  // Password Gate
  window.checkParentPassword = () => {
    const pwd = document.getElementById('parentPassword').value;
    if (pwd === 'TCAP2025') {
      document.getElementById('passwordGate').style.display = 'none';
      document.getElementById('dashboardContent').style.display = 'block';
      initDashboard();
    } else {
      document.getElementById('passwordError').style.display = 'block';
    }
  };

  // Tab Switching
  window.switchTab = (tab) => {
    document.querySelectorAll('.parent-section').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`${tab}Section`).style.display = 'block';
    document.getElementById(`tab-${tab}`).classList.add('active');
    
    // Re-render section content when tab is activated
    if(tab === 'planner') renderPlanner();
    if(tab === 'gradebook') renderGradebook();
    if(tab === 'rewards') renderRewards();
    if(tab === 'settings') renderSettings();
  };
});

function initDashboard() {
  document.getElementById('totalPointsParent').textContent = localStorage.getItem('totalPoints') || 0;
  document.getElementById('quizzesCompleted').textContent = localStorage.getItem('quizzesCompleted') || 0;
  document.getElementById('loginStreak').textContent = localStorage.getItem('loginStreak') || 0;
  renderPlanner();
  renderGradebook();
  renderRewards();
  renderSettings();
}

/* ========== PLANNER LOGIC ========== */
let currentPlannerSubj = 'math';
const subjects = ['math','ela','science','social','spanish','gym','art'];
const days = ['monday','tuesday','wednesday','thursday','friday'];
const standardsMap = {
  math: ['4.NBT.B.5','4.NBT.B.6','4.NF.A.1','4.OA.A.1'],
  ela: ['4.RL.KID.2','4.L.CSE.1','4.RF.4','4.W.TT.1'],
  science: ['4.ESS1.1','4.LS2.2','4.PS3.2','4.ESS2.1'],
  social: ['4.19','4.10','4.12','4.15']
};
const subjIcons = {math:'🧮',ela:'📖',science:'🔬',social:'🏛️',spanish:'🗣️',gym:'💪',art:'🎨'};

function renderPlanner() {
  const sec = document.getElementById('plannerSection');
  sec.innerHTML = `
    <h3 style="margin-bottom:15px;">📚 Weekly Lesson Planner</h3>
    <div class="subject-grid" id="plannerSubjects">
      ${subjects.map(s => `<button class="sub-btn ${s===currentPlannerSubj?'active':''}" onclick="switchPlannerSubject('${s}')">${subjIcons[s]} ${s.charAt(0).toUpperCase()+s.slice(1)}</button>`).join('')}
    </div>
    <div id="plannerFormContainer" style="margin-top:20px;"></div>
    <button onclick="savePlanner()" class="action-btn" style="width:100%; margin-top:20px; padding:12px;">💾 Save Weekly Plan</button>
  `;
  loadPlannerForm();
}

window.switchPlannerSubject = (subj) => {
  currentPlannerSubj = subj;
  renderPlanner();
};

function loadPlannerForm() {
  const container = document.getElementById('plannerFormContainer');
  const saved = JSON.parse(localStorage.getItem(`plan_${currentPlannerSubj}`) || '{}');
  
  let html = `<div style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap;">
    <input type="text" id="plannerQuote" value="${saved.quote||''}" placeholder="Quote of the week..." style="flex:2; padding:8px; border-radius:8px; border:2px solid #e2e8f0; font-family:inherit;">
    <input type="text" id="plannerAuthor" value="${saved.author||''}" placeholder="Author" style="flex:1; padding:8px; border-radius:8px; border:2px solid #e2e8f0; font-family:inherit;">
  </div>`;

  days.forEach(d => {
    const dayData = saved[d] || {standards:[{c:'',w:20}], urls:['']};
    html += `<div class="planner-day"><strong style="text-transform:capitalize;">${d}</strong>`;
    
    // Standards section
    html += `<div style="margin:8px 0;"><strong>📋 Standards:</strong>`;
    dayData.standards.forEach(s => {
      html += `<div class="planner-row">
        <select class="std-code" style="flex:2;"><option value="">Select</option>${(standardsMap[currentPlannerSubj]||['Custom']).map(x=>`<option value="${x}" ${x===s.c?'selected':''}>${x}</option>`).join('')}</select>
        <input type="number" value="${s.w}" style="width:60px;" placeholder="min">
        <button onclick="this.parentElement.remove()" style="background:#ff6b6b; color:white; border:none; padding:4px 8px; border-radius:8px; cursor:pointer;">✕</button>
      </div>`;
    });
    html += `<button class="planner-btn-add" onclick="addPlannerRow('${d}','std')">➕ Standard</button></div>`;
    
    // Resources section
    html += `<div style="margin:8px 0;"><strong>🎬 Resources:</strong>`;
    dayData.urls.forEach(u => {
      html += `<div class="planner-row"><input type="url" value="${u}" placeholder="URL" style="flex:1; font-family:inherit;"><button onclick="this.parentElement.remove()" style="background:#ff6b6b; color:white; border:none; padding:4px 8px; border-radius:8px; cursor:pointer;">✕</button></div>`;
    });
    html += `<button class="planner-btn-add" onclick="addPlannerRow('${d}','url')">➕ Link</button></div></div>`;
  });
  container.innerHTML = html;
}

window.addPlannerRow = (day, type) => {
  const btn = document.querySelector(`[onclick="addPlannerRow('${day}','${type}')"]`);
  const row = document.createElement('div'); 
  row.className = 'planner-row';
  
  if(type==='std') {
    row.innerHTML = `<select class="std-code" style="flex:2;"><option value="">Select</option>${(standardsMap[currentPlannerSubj]||['Custom']).map(x=>`<option value="${x}">${x}</option>`).join('')}</select><input type="number" value="20" style="width:60px;" placeholder="min"><button onclick="this.parentElement.remove()" style="background:#ff6b6b;color:white;border:none;padding:4px 8px;border-radius:8px;cursor:pointer;">✕</button>`;
  } else {
    row.innerHTML = `<input type="url" placeholder="URL" style="flex:1; font-family:inherit;"><button onclick="this.parentElement.remove()" style="background:#ff6b6b;color:white;border:none;padding:4px 8px;border-radius:8px;cursor:pointer;">✕</button>`;
  }
  btn.parentElement.insertBefore(row, btn);
};

window.savePlanner = () => {
  const data = { 
    quote: document.getElementById('plannerQuote')?.value || '', 
    author: document.getElementById('plannerAuthor')?.value || '' 
  };
  
  document.querySelectorAll('.planner-day').forEach((dayEl, idx) => {
    const d = days[idx];
    const stds = Array.from(dayEl.querySelectorAll('.std-code')||[]).map(sel => ({
      c: sel.value, 
      w: sel.parentElement.querySelector('input[type=number]')?.value || 20
    })).filter(s => s.c);
    
    const urls = Array.from(dayEl.querySelectorAll('input[type=url]')||[]).map(inp => inp.value).filter(v=>v);
    data[d] = { standards: stds, urls };
  });
  
  localStorage.setItem(`plan_${currentPlannerSubj}`, JSON.stringify(data));
  alert(`✅ ${currentPlannerSubj.toUpperCase()} plan saved!`);
};

/* ========== GRADEBOOK ========== */
function renderGradebook() {
  const sec = document.getElementById('gradebookSection');
  const grades = JSON.parse(localStorage.getItem('mock_grades') || '[]');
  const avg = grades.length ? Math.round(grades.reduce((a,g)=>a+g.score,0)/grades.length) : '--';
  
  sec.innerHTML = `
    <h3 style="margin-bottom:15px;">📈 Detailed Gradebook</h3>
    <p style="text-align:center; background:#f0f8ff; padding:15px; border-radius:10px; margin-bottom:20px;">
      Overall Average: <strong style="font-size:1.5rem; color:#667eea;">${avg}%</strong>
    </p>
    <div style="overflow-x:auto;">
      <table><thead><tr><th>Assignment</th><th>Subject</th><th>Score</th><th>Date</th><th>Action</th></tr></thead>
      <tbody>
        ${grades.length ? grades.map(g => `<tr><td>${g.name}</td><td>${g.subject}</td><td style="color:${g.score>=80?'#4ecdc4':'#ff6b6b'}; font-weight:bold;">${g.score}%</td><td>${g.date}</td><td><button onclick="deleteGrade(${g.id})" style="background:#ff6b6b; color:white; border:none; padding:4px 8px; border-radius:8px; cursor:pointer;">🗑️</button></td></tr>`).join('') : '<tr><td colspan="5" style="text-align:center; padding:20px;">No grades recorded yet.</td></tr>'}
      </tbody></table>
    </div>
    <button onclick="addMockGrade()" class="action-btn" style="margin-top:15px;">➕ Add Mock Grade</button>
  `;
}

window.addMockGrade = () => {
  const name = prompt('Assignment name:'); 
  const subj = prompt('Subject (math/ela/science/social/spanish/gym/art):').toLowerCase(); 
  const score = parseInt(prompt('Score (0-100):'));
  
  if(name && subj && !isNaN(score)) {
    const grades = JSON.parse(localStorage.getItem('mock_grades') || '[]');
    grades.push({ 
      id: Date.now(), 
      name, 
      subject: subj, 
      score: Math.min(100, Math.max(0, score)), 
      date: new Date().toLocaleDateString() 
    });
    localStorage.setItem('mock_grades', JSON.stringify(grades)); 
    renderGradebook();
  }
};

window.deleteGrade = (id) => {
  if(!confirm('Delete this grade?')) return;
  let grades = JSON.parse(localStorage.getItem('mock_grades') || '[]');
  grades = grades.filter(g => g.id !== id); 
  localStorage.setItem('mock_grades', JSON.stringify(grades)); 
  renderGradebook();
};

/* ========== REWARDS ========== */
function renderRewards() {
  const sec = document.getElementById('rewardsSection');
  const pts = parseInt(localStorage.getItem('totalPoints') || 0);
  const rewards = [
    {name:'Candy Bar', cost:500, icon:'🍫'},
    {name:'Roblox ($10)', cost:2000, icon:'🎮'},
    {name:'Movie Night', cost:750, icon:'🎬'},
    {name:'Art Supplies', cost:500, icon:'🎨'},
    {name:'New Book', cost:500, icon:'📚'},
    {name:'Special Prize', cost:5000, icon:'🏆'}
  ];
  
  sec.innerHTML = `
    <h3 style="margin-bottom:15px;">🎁 Reward Manager</h3>
    <p style="text-align:center; font-size:1.2rem; margin-bottom:20px;">
      Current Balance: <strong style="color:#667eea;">${pts} points</strong>
    </p>
    <div class="reward-grid">${rewards.map(r => `
      <div class="reward-card">
        <div class="icon">${r.icon}</div>
        <h4>${r.name}</h4>
        <p class="cost">${r.cost} pts</p>
        <button class="redeem-btn" onclick="redeemReward(${r.cost}, '${r.name}')">Redeem</button>
      </div>
    `).join('')}</div>
  `;
}

window.redeemReward = (cost, name) => {
  let pts = parseInt(localStorage.getItem('totalPoints') || 0);
  if(pts < cost) return alert('❌ Not enough points!');
  if(!confirm(`Redeem ${name} for ${cost} points?`)) return;
  
  localStorage.setItem('totalPoints', pts - cost);
  document.getElementById('totalPointsParent').textContent = pts - cost;
  
  // Track redemption history
  let redemptions = JSON.parse(localStorage.getItem('redemptions') || '[]');
  redemptions.push({ reward: name, cost, date: new Date().toLocaleDateString() });
  localStorage.setItem('redemptions', JSON.stringify(redemptions));
  
  alert(`✅ ${name} redeemed! Points remaining: ${pts - cost}`);
};

/* ========== SETTINGS ========== */
function renderSettings() {
  const sec = document.getElementById('settingsSection');
  sec.innerHTML = `
    <h3 style="margin-bottom:15px;">⚙️ Data Management</h3>
    <div class="settings-card">
      <p><strong>📎 Export Progress:</strong> Download all data as CSV.</p>
      <button onclick="exportCSV()" class="action-btn">Download CSV</button>
    </div>
    <div class="settings-card" style="border-color: #ff6b6b;">
      <p><strong>🗑️ Reset All:</strong> Erase points, grades, plans. Cannot be undone.</p>
      <button onclick="resetAllData()" class="danger-btn">Reset All Data</button>
    </div>
  `;
}

window.exportCSV = () => {
  let csv = 'Subject,Assignment,Score,Date\n';
  JSON.parse(localStorage.getItem('mock_grades') || '[]').forEach(g => 
    csv += `${g.subject},${g.name},${g.score}%,${g.date}\n`
  );
  csv += `\nTotal Points,${localStorage.getItem('totalPoints')||0}\nQuizzes Completed,${localStorage.getItem('quizzesCompleted')||0}`;
  
  const a = document.createElement('a'); 
  a.href = URL.createObjectURL(new Blob([csv], {type:'text/csv'})); 
  a.download = 'alli_progress.csv'; 
  a.click();
};

window.resetAllData = () => { 
  if(confirm('⚠️ Erase ALL data? Points, grades, plans, achievements... This cannot be undone.')) { 
    localStorage.clear(); 
    location.reload(); 
  } 
};