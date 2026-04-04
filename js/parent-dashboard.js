// ========== PARENT DASHBOARD ==========
function renderParentDashboard() {
  const container = document.getElementById('parentDashboardContent');
  let rows = [], totalEarned=0, totalPossible=0;
  for(let q of quizList) {
    const stored = localStorage.getItem(q.saveKey);
    const earned = stored ? parseInt(stored.split('/')[0]) : 0;
    const total = stored ? parseInt(stored.split('/')[1]) : q.max;
    totalEarned += earned; totalPossible += total;
    const pct = Math.floor((earned/total)*100);
    rows.push({ name: q.name, standard: q.standard, score: `${earned}/${total}`, pct, weak: pct<70 });
  }
  const overall = totalPossible===0?0:Math.floor((totalEarned/totalPossible)*100);
  let html = `<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:20px;border-radius:20px;margin-bottom:20px;text-align:center;">
    <h3>📈 Overall Mastery: ${overall}%</h3>
    <p>Points: <strong>${totalPoints} ⭐</strong> | Quizzes: <strong>${quizzesCompleted}</strong> | Streak: <strong>${loginStreak}🔥</strong></p>
  </div>
  <table><thead><tr><th>Topic</th><th>Standard</th><th>Best Score</th><th>Mastery</th></tr></thead><tbody>`;
  rows.forEach(r => { html += `<tr><td>${r.name}</td><td>${r.standard}</td><td>${r.score}</td><td style="color:${r.pct>=70?'#4ecdc4':'#ff6b6b'};font-weight:bold;">${r.pct}%</td></tr>`; });
  html += `</tbody></table>`;
  
  const weak = rows.filter(r=>r.weak);
  if(weak.length>0) { html += `<div class="weak-area"><h3>⚠️ Needs Support:</h3><ul>${weak.map(w=>`<li><strong>${w.name}</strong> – ${w.score}</li>`).join('')}</ul></div>`; }
  container.innerHTML = html;
}

function exportCSV() {
  let rows = [["Topic","Standard","Score","Max","Percentage"]];
  for(let q of quizList) { const s = localStorage.getItem(q.saveKey)?.split('/')||[0,q.max]; rows.push([q.name, q.standard, s[0], s[1], Math.floor((s[0]/s[1])*100)+"%"]); }
  const blob = new Blob([rows.map(r=>r.join(",")).join("\n")], {type:"text/csv"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "alli_progress.csv"; a.click();
}

function resetAllScores() {
  if(confirm("⚠️ Erase ALL data? This cannot be undone.")) {
    ['totalPoints','achievements','quizzesCompleted','tcapResults','redemptions','loginStreak','lastLoginDate','math_weeklyPlan','math_numberOfDay','math_grades'].forEach(k => localStorage.removeItem(k));
    for(let q of quizList) localStorage.removeItem(q.saveKey);
    totalPoints=0; quizzesCompleted=0; loginStreak=0; achievements={firstQuiz:false,mathMaster:false,readingStar:false,perfectScore:false,weekWarrior:false,tcapMaster:false};
    updatePointsDisplay(); updateClassroomProgress(); renderParentDashboard();
    alert('✅ Reset complete.');
  }
}

// Parent Modal Setup
const parentModal = document.getElementById('parentModal');
document.getElementById('showParentBtn').addEventListener('click', () => {
  if(prompt("🔐 Enter Parent Password:") === "TCAP2025") {
    document.getElementById('redeemPoints').textContent = totalPoints;
    renderParentDashboard(); parentModal.style.display = 'flex';
  }
});
document.getElementById('closeParentModal').addEventListener('click', () => parentModal.style.display = 'none');
window.addEventListener('click', (e) => { if(e.target === parentModal) parentModal.style.display = 'none'; });
document.getElementById('resetAllScoresBtn')?.addEventListener('click', resetAllScores);
document.getElementById('exportCSVBtn')?.addEventListener('click', exportCSV);
document.getElementById('redeemRewardBtn')?.addEventListener('click', () => {
  document.getElementById('redeemPoints').textContent = totalPoints;
  document.getElementById('redeemModal').classList.add('active');
});
document.getElementById('lessonPlanBtn')?.addEventListener('click', openLessonPlan);