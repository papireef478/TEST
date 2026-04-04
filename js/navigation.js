document.addEventListener('DOMContentLoaded', () => {
  // Handle clicks on clickable overlays
  document.querySelectorAll('.clickable-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
      const action = this.dataset.action;
      if (!action) return;

      // If it's a subject overlay, go to that page
      const routes = {
        'math': 'math.html',
        'science': 'science.html',
        'reading': 'reading.html',
        'history': 'history.html',
        'test': 'tcap.html'
      };

      if (routes[action]) {
        window.location.href = routes[action];
      } else {
        // Otherwise open a modal
        handleSceneAction(action);
      }
    });
  });
});

// Open Modals for Home Page
function handleSceneAction(action) {
  const modal = document.getElementById('sceneModal');
  const body = document.getElementById('modalBody');
  if (!modal || !body) return;

  let content = '';

  switch(action) {
    case 'window':
      content = `<h2>🌤️ Weather in Chattanooga</h2><p>72°F ☀️ Sunny. Perfect for a walk!</p>`;
      break;
    case 'calendar':
      content = `<h2>📅 Weekly Schedule</h2><ul><li><strong>Mon:</strong> Math & Reading</li><li><strong>Tue:</strong> Science & History</li><li><strong>Wed:</strong> TCAP Practice</li><li><strong>Thu:</strong> Art & Gym</li><li><strong>Fri:</strong> Review & Rewards</li></ul>`;
      break;
    case 'library':
      content = `<h2>📚 Library Corner</h2><p>Reading Goal: 20 mins/day! 📖✨</p><div style="display:flex;gap:10px;margin-top:10px;"><div style="background:#fff3cd;padding:10px;border-radius:8px;">Fiction</div><div style="background:#d1ecf1;padding:10px;border-radius:8px;">Non-Fiction</div></div>`;
      break;
    case 'laptop':
      content = `<h2>👩‍🏫 Message from Mommy Teacher</h2><p>"Hi Alli! I'm so proud of how hard you're working. Remember: mistakes help us learn! Keep going! 💕"</p>`;
      break;
    case 'plant':
      content = `<h2>🌱 Plant Care</h2><p>💧 Water: Every 3 days<br>☀️ Sunlight: Indirect<br>🌿 Tip: Talk to your plants!</p>`;
      break;
    case 'blm':
      content = `<h2>✊ Social Emotional Learning</h2><p>🌟 <strong>Theme:</strong> Courage & Unity<br>"We are stronger together." - Maya Angelou</p>`;
      break;
    case 'clock':
      content = `<h2>⏰ Current Time</h2><p style="font-size:2rem;font-weight:bold;">${new Date().toLocaleTimeString()}</p>`;
      break;
    default:
      content = `<h2>🔍 Explore</h2><p>Click around to discover more!</p>`;
  }

  body.innerHTML = content;
  modal.classList.add('active');
}

function closeSceneModal() {
  const modal = document.getElementById('sceneModal');
  if (modal) modal.classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('sceneModal');
  if (e.target === modal) closeSceneModal();
});