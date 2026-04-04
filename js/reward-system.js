// ========== POINTS & REWARDS ==========

// Add points with celebration
window.addPoints = function(points, reason = '') {
  appState.totalPoints += points;
  updatePointsDisplay();
  showCelebration(`+${points} points! ${reason}`);
};

// Unlock achievement
window.unlockAchievement = function(achievementId, points) {
  if (!appState.achievements[achievementId]) {
    appState.achievements[achievementId] = true;
    localStorage.setItem('achievements', JSON.stringify(appState.achievements));
    addPoints(points, 'Achievement Unlocked!');
    
    // Update UI if element exists
    const id = `ach-${achievementId.replace(/([A-Z])/g,'-$1').toLowerCase()}`;
    const el = document.getElementById(id);
    if (el) el.classList.remove('locked');
  }
};

// Show reward preview (student view)
window.showRewardPreview = function() {
  const modal = document.getElementById('rewardPreviewModal');
  const pointsSpan = document.getElementById('previewPoints');
  
  if (pointsSpan) pointsSpan.textContent = appState.totalPoints;
  if (modal) modal.classList.add('active');
};

window.closeRewardPreview = function() {
  const modal = document.getElementById('rewardPreviewModal');
  if (modal) modal.classList.remove('active');
};

window.addPoints = function(points, reason = '') {
  appState.totalPoints += points;
  updatePointsDisplay();
  showCelebration(`+${points} points! ${reason}`);
};

// Redeem reward (parent only)
window.redeemReward = function(cost, rewardName) {
  if (appState.totalPoints >= cost) {
    if (confirm(`Redeem ${rewardName} for ${cost} points?\nPoints will be deducted.`)) {
      appState.totalPoints -= cost;
      updatePointsDisplay();
      
      // Track redemption history
      let redemptions = JSON.parse(localStorage.getItem('redemptions') || '[]');
      redemptions.push({
        reward: rewardName,
        cost: cost,
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem('redemptions', JSON.stringify(redemptions));
      
      alert(`✅ ${rewardName} redeemed!\nPoints remaining: ${appState.totalPoints}`);
      closeRedeemModal();
    }
  } else {
    alert(`❌ Not enough points!\nNeed ${cost - appState.totalPoints} more for ${rewardName}.`);
  }
};

window.closeRedeemModal = function() {
  document.getElementById('redeemModal')?.classList.remove('active');
};