// ========== GLOBAL APP STATE ==========
window.appState = {
  totalPoints: parseInt(localStorage.getItem('totalPoints')) || 0,
  achievements: JSON.parse(localStorage.getItem('achievements')) || {
    firstQuiz: false,
    mathMaster: false,
    readingStar: false,
    perfectScore: false,
    weekWarrior: false,
    tcapMaster: false,
    tcapPractice: false
  },
  quizzesCompleted: parseInt(localStorage.getItem('quizzesCompleted')) || 0,
  lastLoginDate: localStorage.getItem('lastLoginDate') || '',
  loginStreak: parseInt(localStorage.getItem('loginStreak')) || 0,
  currentSubject: 'home'
};

// Parent button - direct link
  document.getElementById('showParentBtn')?.addEventListener('click', () => {
    window.location.href = 'parent.html';
  });

// ========== LOGIN STREAK TRACKING ==========
function checkLoginStreak() {
  const today = new Date().toDateString();
  if (appState.lastLoginDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (appState.lastLoginDate === yesterday.toDateString()) {
      appState.loginStreak++;
    } else if (appState.lastLoginDate !== today) {
      appState.loginStreak = 1;
    }
    
    localStorage.setItem('lastLoginDate', today);
    localStorage.setItem('loginStreak', appState.loginStreak);
    
    if (appState.loginStreak >= 5 && !appState.achievements.weekWarrior) {
      unlockAchievement('weekWarrior', 200);
    }
  }
}

// ========== POINTS DISPLAY ==========
function updatePointsDisplay() {
  const el = document.getElementById('totalPoints');
  if (el) el.textContent = appState.totalPoints;
  localStorage.setItem('totalPoints', appState.totalPoints);
}

// ========== CELEBRATION ANIMATION ==========
function showCelebration(message) {
  const celebration = document.createElement('div');
  celebration.style.cssText = `
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    background:linear-gradient(135deg,#fa709a,#fee140);color:white;
    padding:30px 50px;border-radius:20px;font-size:2rem;font-weight:bold;
    z-index:5000;box-shadow:0 10px 40px rgba(0,0,0,0.3);
    animation:celebratePop 0.5s ease;
  `;
  celebration.textContent = message;
  document.body.appendChild(celebration);
  setTimeout(() => celebration.remove(), 2000);
}

// ========== SCENE MODAL FUNCTIONS ==========
function openSceneModal(content) {
  const modal = document.getElementById('sceneModal');
  const modalBody = document.getElementById('modalBody');
  if (modal && modalBody) {
    modalBody.innerHTML = content;
    modal.classList.add('active');
  }
}

function closeSceneModal() {
  const modal = document.getElementById('sceneModal');
  if (modal) modal.classList.remove('active');
}

// ========== OVERLAY CLICK HANDLER ==========
function handleSceneAction(action) {
  const scenes = {
    window: `
      <h2>🌤️ Weather in Chattanooga, TN</h2>
      <p>Current weather conditions for our city!</p>
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; margin: 15px 0;">
        <p style="font-size: 2rem; margin: 10px 0;">🌡️ <span id="temp">72°F</span></p>
        <p>☀️ Sunny</p><p>💧 Humidity: 45%</p><p>💨 Wind: 8 mph</p>
      </div>
      <p><strong>Learning Connection:</strong> Weather affects what we wear and do each day. What would you wear in this weather?</p>
    `,
    calendar: `
      <h2>📅 Classroom Calendar</h2>
      <p><strong>Current Month</strong></p>
      <div style="margin-top: 20px; background: #f0f8ff; padding: 15px; border-radius: 10px;">
        <h3>📚 This Week's Schedule:</h3>
        <ul style="margin-top: 10px; margin-left: 20px; line-height: 1.8;">
          <li><strong>Monday:</strong> Math</li><li><strong>Tuesday:</strong> Reading</li>
          <li><strong>Wednesday:</strong> Science</li><li><strong>Thursday:</strong> Social Studies</li>
          <li><strong>Friday:</strong> Test Prep</li>
        </ul>
      </div>
    `,
    library: `
      <h2>📚 Library & Reading Corner</h2>
      <p>Welcome to our cozy reading nook!</p>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px;">
        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; border-left: 5px solid #ffc107;"><strong>📖 Fiction</strong></div>
        <div style="background: #d1ecf1; padding: 15px; border-radius: 10px; border-left: 5px solid #17a2b8;"><strong>🔬 Non-Fiction</strong></div>
      </div>
    `,
    laptop: `
      <h2>👩‍🏫 Welcome from Mommy Teacher!</h2>
      <p>I'm so excited to have you in our digital classroom! 💖</p>
      <ul style="margin-left: 20px; line-height: 2;">
        <li>We learn at our own pace</li><li>Mistakes help us grow</li><li>Every question is important</li>
      </ul>
    `,
    plant: `
      <h2>🌱 Plant Care Station</h2>
      <p>Check soil, water, sunlight, and temperature. <strong>Science Connection:</strong> Photosynthesis!</p>
    `,
    blm: `
      <h2>✊ Social Emotional Learning</h2>
      <p>Focus: Courage & Change-Makers. MLK Jr., Rosa Parks, Maya Angelou.</p>
    `,
    math: `<h2>🧮 Math Corner</h2><p>Multiplication, Division, Fractions, Geometry. Practice your 6s & 7s!</p>`,
    science: `<h2>🔬 Science Lab</h2><p>Current Unit: Solar System. Explore planets, stars, and space!</p>`,
    reading: `<h2>📖 Reading Nook</h2><p>Building Main Idea, Details, Inference, Vocabulary, Comprehension skills.</p>`,
    history: `<h2>🏛️ History Hub</h2><p>Current Unit: TN & American History. Declaration of Independence & 3 Branches.</p>`,
    test: `<h2>📝 Test Prep Station</h2><p>TCAP Strategies: Sleep well, read carefully, eliminate wrong answers, review.</p>`,
    geography: `<h2>🌍 Geography Explorer</h2><p>5 Themes: Location, Place, HEI, Movement, Region.</p>`,
    clock: `<h2>⏰ Time Practice</h2><p>Current: ${new Date().toLocaleTimeString()}. Hour hand (short), Minute hand (long).</p>`
  };
  
  openSceneModal(scenes[action] || `<h2>🔍 Explore</h2><p>Click different areas to discover learning!</p>`);
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStreak();
  updatePointsDisplay();
  
  // Update progress if function exists
  if (window.updateClassroomProgress) window.updateClassroomProgress();
  
  // Overlay click handlers (home page only)
  document.querySelectorAll('.clickable-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (appState.currentSubject === 'home') {
        e.stopPropagation();
        handleSceneAction(el.dataset.action);
      }
    });
  });
  
  // ========== OVERLAY CLICK HANDLERS (Home Page Only) ==========
function setupOverlayHandlers() {
  // Only bind overlays on home page
  if (appState.currentSubject !== 'home') return;
  
  document.querySelectorAll('.clickable-overlay').forEach(el => {
    // Remove any existing listeners to prevent duplicates
    el.replaceWith(el.cloneNode(true));
  });
  
  // Re-bind after cloning
  document.querySelectorAll('.clickable-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const action = el.dataset.action;
      if (action) {
        handleSceneAction(action);
      }
    });
    // Add visual feedback
    el.style.cursor = 'pointer';
  });
}

// Call this after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStreak();
  updatePointsDisplay();
  if (window.updateClassroomProgress) window.updateClassroomProgress();
  
  // Setup overlays AFTER DOM is ready
  setupOverlayHandlers();
  
  // Modal close handlers
  document.getElementById('sceneModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeSceneModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSceneModal();
  });
  
  
});