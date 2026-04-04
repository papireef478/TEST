// ========== POINTS & REWARDS ==========
function addPoints(points, reason = '') {
  // Update global state
  totalPoints += points;
  updatePointsDisplay();
  
  // Show celebration animation
  showCelebration(`+${points} pts! ${reason}`);
}

function showCelebration(msg) {
  const div = document.createElement('div');
  div.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    background:linear-gradient(135deg,#fa709a,#fee140);color:white;padding:30px 50px;
    border-radius:20px;font-size:2rem;font-weight:bold;z-index:5000;
    box-shadow:0 10px 40px rgba(0,0,0,0.3);animation:pop 0.5s;`;
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 2000);
}

function updatePointsDisplay() {
  const el = document.getElementById('totalPoints');
  if (el) el.textContent = totalPoints;
  localStorage.setItem('totalPoints', totalPoints);
}

function showRewardPreview() {
  const modal = document.getElementById('rewardPreviewModal');
  if (modal) {
    document.getElementById('previewPoints').textContent = totalPoints;
    modal.classList.add('active');
  }
}

function closeRewardPreview() {
  document.getElementById('rewardPreviewModal').classList.remove('active');
}

function redeemReward(cost, name) {
  if (totalPoints >= cost) {
    if (confirm(`Redeem ${name} for ${cost} points?`)) {
      totalPoints -= cost;
      updatePointsDisplay();
      alert(`✅ ${name} redeemed! 🎉`);
      closeRedeemModal();
    }
  } else {
    alert(`❌ Not enough points! You need ${cost - totalPoints} more.`);
  }
}

function closeRedeemModal() {
  document.getElementById('redeemModal').classList.remove('active');
}

// ========== ACHIEVEMENTS ==========
function unlockAchievement(achievementId, points) {
  if (!achievements[achievementId]) {
    achievements[achievementId] = true;
    localStorage.setItem('achievements', JSON.stringify(achievements));
    addPoints(points, 'Achievement Unlocked!');
    const el = document.getElementById(`ach-${achievementId.replace(/([A-Z])/g,'-$1').toLowerCase()}`);
    if (el) el.classList.remove('locked');
  }
}

function updateAchievements() {
  const map = { firstQuiz: 'ach-first-quiz', mathMaster: 'ach-math-master', readingStar: 'ach-reading-star' };
  for (const [key, id] of Object.entries(map)) {
    if (achievements[key]) {
      const el = document.getElementById(id);
      if (el) el.classList.remove('locked');
    }
  }
}