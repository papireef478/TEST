// ========== OVERLAY CLICK HANDLERS (Restored!) ==========
document.addEventListener('DOMContentLoaded', function() {
  
  // Subject preview content for modals
  const subjectPreviews = {
    math: {
      title: "🧮 Math Corner",
      content: "<p><strong>Today's Focus:</strong> Multiplication facts (6s and 7s)</p><p>🍕 Practice fractions<br>📐 Explore geometry<br>📊 Work with data</p>",
      link: "math.html"
    },
    reading: {
      title: "📖 Reading Nook", 
      content: "<p><strong>Today's Focus:</strong> Finding main ideas</p><p>🎯 Practice comprehension<br>🔍 Identify details<br>💭 Make inferences</p>",
      link: "reading.html"
    },
    // ... add other subjects similarly
  };

  // Overlay click functionality
  document.querySelectorAll('.overlay-zone').forEach(zone => {
    zone.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.dataset.target;
      const preview = subjectPreviews[target];
      
      if (preview) {
        document.getElementById('modalSubjectTitle').textContent = preview.title;
        document.getElementById('modalSubjectContent').innerHTML = preview.content;
        document.getElementById('modalGoToSubject').href = preview.link;
        document.getElementById('subjectModal').style.display = 'flex';
      }
    });
  });

  // Close modal handlers
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // Rewards button
  document.getElementById('rewardsBtn')?.addEventListener('click', function() {
    // Update points display from localStorage
    const points = localStorage.getItem('alliPoints') || 0;
    document.getElementById('modalPoints').textContent = points;
    document.getElementById('studentPoints').textContent = `⭐${points} points`;
    
    // Enable/disable redeem buttons
    document.querySelectorAll('.btn-redeem').forEach(btn => {
      const card = btn.closest('.reward-card');
      const cost = parseInt(card.dataset.cost);
      btn.disabled = points < cost;
    });
    
    document.getElementById('rewardsModal').style.display = 'flex';
  });

  // Parent dashboard button
  document.getElementById('parentDashboardBtn')?.addEventListener('click', function() {
    document.getElementById('parentModal').style.display = 'flex';
  });

  // Parent login
  document.getElementById('parentLoginBtn')?.addEventListener('click', function() {
    const password = document.getElementById('parentPassword').value;
    if (password === 'mommy123') { // Change to your secure password!
      window.location.href = 'parent.html';
    } else {
      document.getElementById('parentError').textContent = 'Incorrect password. Try again! 💕';
    }
  });
});