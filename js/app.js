// ===== THIS IS YOUR EXACT JAVASCRIPT - NO CHANGES =====
// Just moved from <script> tags to external file

// Global state
let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
let quizzesCompleted = parseInt(localStorage.getItem('quizzesCompleted')) || 0;
let loginStreak = parseInt(localStorage.getItem('loginStreak')) || 0;
let achievements = JSON.parse(localStorage.getItem('achievements')) || {
  firstQuiz: false,
  mathMaster: false,
  readingStar: false,
  perfectScore: false,
  weekWarrior: false,
  tcapMaster: false
};

// Update points display
function updatePointsDisplay() {
  document.getElementById('studentPoints').textContent = `⭐${totalPoints} points`;
  document.getElementById('modalPoints').textContent = totalPoints;
  
  // Enable/disable redeem buttons
  document.querySelectorAll('.btn-redeem').forEach(btn => {
    const card = btn.closest('.reward-card');
    const cost = parseInt(card.dataset.cost);
    btn.disabled = totalPoints < cost;
  });
}

// Add points
function addPoints(amount, reason) {
  totalPoints += amount;
  localStorage.setItem('totalPoints', totalPoints);
  updatePointsDisplay();
  
  // Show celebration
  showCelebration(`+${amount} points for ${reason}! 🎉`);
}

// Show celebration animation
function showCelebration(message) {
  const celebration = document.createElement('div');
  celebration.className = 'celebration';
  celebration.textContent = message;
  celebration.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #ffb347, #ff9f43);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    z-index: 2000;
    animation: slideIn 0.3s ease, fadeOut 0.5s ease 2.5s forwards;
  `;
  document.body.appendChild(celebration);
  
  setTimeout(() => celebration.remove(), 3000);
}

// Unlock achievement
function unlockAchievement(name, points) {
  if (!achievements[name]) {
    achievements[name] = true;
    localStorage.setItem('achievements', JSON.stringify(achievements));
    addPoints(points, `Achievement: ${name}!`);
  }
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  updatePointsDisplay();
  
  // Rewards button
  document.getElementById('rewardsBtn')?.addEventListener('click', () => {
    openModal('rewardsModal');
  });
  
  // Parent dashboard button
  document.getElementById('parentDashboardBtn')?.addEventListener('click', () => {
    openModal('parentModal');
  });
  
  // Close modal handlers
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
      closeModal(this.closest('.modal').id);
    });
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target.id);
    }
  });
  
  // Parent login
  document.getElementById('parentLoginBtn')?.addEventListener('click', () => {
    const password = document.getElementById('parentPassword').value;
    if (password === 'TCAP2025') {
      window.location.href = 'parent.html';
    } else {
      document.getElementById('parentError').textContent = 'Incorrect password. Try again! 💕';
    }
  });
  
  // Reward redemption
  document.querySelectorAll('.btn-redeem').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.reward-card');
      const reward = card.querySelector('h4').textContent;
      const cost = parseInt(card.dataset.cost);
      
      if (totalPoints >= cost) {
        totalPoints -= cost;
        localStorage.setItem('totalPoints', totalPoints);
        updatePointsDisplay();
        
        // Track redemption
        const redemptions = JSON.parse(localStorage.getItem('redemptions') || '[]');
        redemptions.push({ reward, cost, date: new Date().toLocaleDateString() });
        localStorage.setItem('redemptions', JSON.stringify(redemptions));
        
        alert(`🎉 ${reward} redeemed! Mommy & Daddy will give this to you soon! 💕`);
        closeModal('rewardsModal');
      }
    });
  });
});