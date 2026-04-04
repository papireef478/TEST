// ========== REWARD SYSTEM ==========
function checkLoginStreak() {
  const today = new Date().toDateString();
  if (lastLoginDate !== today) {
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    if (lastLoginDate === yesterday.toDateString()) loginStreak++;
    else if (lastLoginDate !== today) loginStreak = 1;
    
    localStorage.setItem('lastLoginDate', today);
    localStorage.setItem('loginStreak', loginStreak);
    if (loginStreak >= 5 && !achievements.weekWarrior) unlockAchievement('weekWarrior', 200);
  }
}

function updatePointsDisplay() {
  const el = document.getElementById('totalPoints');
  if(el) el.textContent = totalPoints;
  localStorage.setItem('totalPoints', totalPoints);
}

function addPoints(points, reason = '') {
  totalPoints += points;
  updatePointsDisplay();
  showCelebration(`+${points} points! ${reason}`);
}

function showCelebration(message) {
  const celebration = document.createElement('div');
  celebration.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    background:linear-gradient(135deg,#fa709a,#fee140);color:white;padding:30px 50px;
    border-radius:20px;font-size:2rem;font-weight:bold;z-index:5000;
    box-shadow:0 10px 40px rgba(0,0,0,0.3);animation:celebratePop 0.5s ease;`;
  celebration.textContent = message;
  document.body.appendChild(celebration);
  setTimeout(() => celebration.remove(), 2000);
}

function unlockAchievement(achievementId, points) {
  if (!achievements[achievementId]) {
    achievements[achievementId] = true;
    localStorage.setItem('achievements', JSON.stringify(achievements));
    addPoints(points, 'Achievement Unlocked!');
    const achElement = document.getElementById(`ach-${achievementId.replace(/([A-Z])/g,'-$1').toLowerCase()}`);
    if (achElement) achElement.classList.remove('locked');
  }
}

function showRewardPreview() {
  document.getElementById('previewPoints').textContent = totalPoints;
  document.getElementById('rewardPreviewModal').classList.add('active');
}
function closeRewardPreview() { document.getElementById('rewardPreviewModal').classList.remove('active'); }

function redeemReward(cost, rewardName) {
  if (totalPoints >= cost) {
    if (confirm(`Redeem ${rewardName} for ${cost} points?\nThis will deduct points from Alli's account.`)) {
      totalPoints -= cost;
      updatePointsDisplay();
      let redemptions = JSON.parse(localStorage.getItem('redemptions') || '[]');
      redemptions.push({ reward: rewardName, cost: cost, date: new Date().toLocaleDateString() });
      localStorage.setItem('redemptions', JSON.stringify(redemptions));
      alert(`✅ ${rewardName} redeemed!\nPoints remaining: ${totalPoints}\nMommy/Daddy will get this ready for Alli! 🎉`);
      closeRedeemModal();
    }
  } else {
    alert(`❌ Not enough points!\nAlli needs ${cost - totalPoints} more points for ${rewardName}.\nKeep learning! 💪`);
  }
}
function closeRedeemModal() { document.getElementById('redeemModal').classList.remove('active'); }

function checkTCAPPracticeAchievement() {
  const tcapResults = JSON.parse(localStorage.getItem('tcapResults') || '[]');
  if (tcapResults.length >= 2 && !achievements.tcapMaster) unlockAchievement('tcapMaster', 250);
}