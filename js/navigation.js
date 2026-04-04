// ========== NAVIGATION FUNCTIONS ==========

// Return to home page
function goHome() {
  window.location.href = 'index.html';
}

// Track current page for overlay functionality
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  appState.currentSubject = path.replace('.html', '');
  localStorage.setItem('currentSubject', appState.currentSubject);
});

// Subject page click handlers (for index.html only)
function setupClassroomNavigation() {
  document.querySelectorAll('.class-object[data-subject]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const subject = el.dataset.subject;
      const pageMap = {
        math: 'math.html',
        ela: 'reading.html',
        science: 'science.html',
        social: 'history.html',
        assessment: 'tcap.html',
        gym: 'gym.html',
        spanish: 'spanish.html',
        art: 'art.html'
      };
      if (pageMap[subject]) {
        window.location.href = pageMap[subject];
      }
    });
  });
}

// Run setup if on home page
if (document.querySelector('.class-object[data-subject]')) {
  setupClassroomNavigation();
}