// js/app.js

// ========== GLOBAL STATE ==========
let currentSubject = 'home';
let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
let achievements = JSON.parse(localStorage.getItem('achievements')) || {
    firstQuiz: false, mathMaster: false, readingStar: false, perfectScore: false, weekWarrior: false, tcapMaster: false
};
let quizzesCompleted = parseInt(localStorage.getItem('quizzesCompleted')) || 0;
let lastLoginDate = localStorage.getItem('lastLoginDate') || '';
let loginStreak = parseInt(localStorage.getItem('loginStreak')) || 0;

// ========== POINTS & ACHIEVEMENTS ==========
function updatePointsDisplay() {
    document.getElementById('totalPoints').textContent = totalPoints;
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

function checkLoginStreak() {
    const today = new Date().toDateString();
    if (lastLoginDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastLoginDate === yesterday.toDateString()) loginStreak++;
        else loginStreak = 1;
        localStorage.setItem('lastLoginDate', today);
        localStorage.setItem('loginStreak', loginStreak);
        if (loginStreak >= 5 && !achievements.weekWarrior) unlockAchievement('weekWarrior', 200);
    }
}
checkLoginStreak();

// ========== NAVIGATION ==========
function goHome() {
    currentSubject = 'home';
    document.getElementById('classroomView').style.display = 'block';
    const container = document.getElementById('subjectPagesContainer');
    container.innerHTML = ''; // clear any injected subject page
    window.scrollTo(0, 0);
}

// Load subject page dynamically (simplified – we'll add full pages later)
function loadSubject(subject) {
    currentSubject = subject;
    document.getElementById('classroomView').style.display = 'none';
    const container = document.getElementById('subjectPagesContainer');
    // For now, just show a placeholder message
    container.innerHTML = `<div class="subject-page active-subject" style="padding:2rem;">
        <button class="back-home" onclick="goHome()">🏠 Back to Main Classroom</button>
        <h2>${subject.toUpperCase()} Page</h2>
        <p>Content for ${subject} will go here. Click the overlays to test functions.</p>
    </div>`;
}

// ========== OVERLAY HANDLING ==========
function openSceneModal(content) {
    const modal = document.getElementById('sceneModal');
    document.getElementById('modalBody').innerHTML = content;
    modal.classList.add('active');
}

function closeSceneModal() {
    document.getElementById('sceneModal').classList.remove('active');
}

// Stub functions for math overlays (to be expanded)
function startTimeQuiz() { alert("⏰ Time quiz coming soon!"); }
function showNumberOfTheDay() {
    let num = localStorage.getItem('numberOfTheDay');
    if (!num) alert("🔢 Number of the Day not set. Use Parent Dashboard.");
    else alert(`🔢 Today's number is ${num}. Click laptop for drill.`);
}
function startMultiplicationDrill(num) { alert(`✖️➗ Drill for ${num} coming soon!`); }
function showWeeklyPlan(subject) {
    let plans = JSON.parse(localStorage.getItem('weeklyPlans') || '{}');
    let week = plans[subject] || {};
    alert(`📅 Weekly ${subject} plan:\nMon: ${week.monday || 'Not set'}\nTue: ${week.tuesday || 'Not set'}\nWed: ${week.wednesday || 'Not set'}\nThu: ${week.thursday || 'Not set'}\nFri: ${week.friday || 'Not set'}`);
}
function showGradebook() {
    let grades = JSON.parse(localStorage.getItem('mathGrades') || '[]');
    if (!grades.length) alert("📘 No grades yet. Complete a drill.");
    else alert("📘 Grades: " + grades.map(g=>`${g.assignment}: ${g.score}%`).join(', '));
}

function handleSceneAction(action) {
    switch(action) {
        case 'window': openSceneModal(`<h2>🌤️ Weather</h2><p>Sunny 72°F in Chattanooga</p>`); break;
        case 'calendar': openSceneModal(`<h2>📅 Calendar</h2><p>Today is ${new Date().toLocaleDateString()}</p>`); break;
        case 'library': openSceneModal(`<h2>📚 Library</h2><p>Read 20 minutes daily!</p>`); break;
        case 'laptop': openSceneModal(`<h2>👩‍🏫 Mommy Teacher</h2><p>You can do hard things!</p>`); break;
        case 'plant': openSceneModal(`<h2>🌱 Plant Care</h2><p>Water when soil is dry.</p>`); break;
        case 'blm': openSceneModal(`<h2>✊ Black History</h2><p>Learning about equality and heroes.</p>`); break;
        case 'math': openSceneModal(`<h2>🧮 Math Corner</h2><p>Practice multiplication!</p>`); break;
        case 'science': openSceneModal(`<h2>🔬 Science Lab</h2><p>Solar system and adaptations.</p>`); break;
        case 'reading': openSceneModal(`<h2>📖 Reading Nook</h2><p>Main idea and vocabulary.</p>`); break;
        case 'history': openSceneModal(`<h2>🏛️ History Hub</h2><p>Tennessee and American history.</p>`); break;
        case 'test': openSceneModal(`<h2>📝 Test Prep</h2><p>TCAP strategies.</p>`); break;
        case 'geography': openSceneModal(`<h2>🌍 Geography</h2><p>Continents and maps.</p>`); break;
        case 'clock': openSceneModal(`<h2>⏰ Time Practice</h2><p>Analog clock reading.</p>`); break;
        // Math page specific
        case 'timeQuiz': startTimeQuiz(); break;
        case 'numberOfTheDay': showNumberOfTheDay(); break;
        case 'drillTest':
            let num = localStorage.getItem('numberOfTheDay');
            if (num) startMultiplicationDrill(parseInt(num));
            else alert("Set Number of the Day first.");
            break;
        case 'weeklyPlan': showWeeklyPlan('math'); break;
        case 'gradebook': showGradebook(); break;
        default: openSceneModal(`<h2>🔍 Explore</h2><p>Click around!</p>`);
    }
}

// Attach overlay click handlers
document.querySelectorAll('.clickable-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = el.getAttribute('data-action');
        if (currentSubject === 'home' || currentSubject === 'math') {
            handleSceneAction(action);
        } else {
            console.log("Overlay only on home or math page.");
        }
    });
});

// Subject buttons
document.querySelectorAll('.class-object[data-subject]').forEach(btn => {
    btn.addEventListener('click', () => {
        const subject = btn.getAttribute('data-subject');
        loadSubject(subject);
    });
});

// Parent dashboard (simplified for now)
document.getElementById('showParentBtn').addEventListener('click', () => {
    const pwd = prompt("Enter Parent Password:");
    if (pwd === "TCAP2025") {
        document.getElementById('parentModal').style.display = 'flex';
        // render simple dashboard
        document.getElementById('parentDashboardContent').innerHTML = `<p>Total Points: ${totalPoints}</p><p>Quizzes: ${quizzesCompleted}</p>`;
    } else if(pwd) alert("Wrong password.");
});
document.getElementById('closeParentModal').addEventListener('click', () => {
    document.getElementById('parentModal').style.display = 'none';
});
document.getElementById('resetAllScoresBtn')?.addEventListener('click', () => {
    if(confirm("Reset all data?")) {
        localStorage.clear();
        location.reload();
    }
});
document.getElementById('setNumberBtn')?.addEventListener('click', () => {
    let num = prompt("Enter Number of the Day:");
    if(num && !isNaN(num)) localStorage.setItem('numberOfTheDay', num);
});
document.getElementById('setWeeklyPlanBtn')?.addEventListener('click', () => {
    let plan = {};
    plan.monday = prompt("Monday math:") || "";
    plan.tuesday = prompt("Tuesday math:") || "";
    plan.wednesday = prompt("Wednesday math:") || "";
    plan.thursday = prompt("Thursday math:") || "";
    plan.friday = prompt("Friday math:") || "";
    let weekly = JSON.parse(localStorage.getItem('weeklyPlans') || '{}');
    weekly.math = plan;
    localStorage.setItem('weeklyPlans', JSON.stringify(weekly));
    alert("Weekly plan saved!");
});

// Reward preview
function showRewardPreview() {
    document.getElementById('previewPoints').textContent = totalPoints;
    document.getElementById('rewardPreviewModal').classList.add('active');
}
function closeRewardPreview() {
    document.getElementById('rewardPreviewModal').classList.remove('active');
}
function closeRedeemModal() {
    document.getElementById('redeemModal').classList.remove('active');
}
function closeLessonPlan() {
    document.getElementById('lessonPlanModal').classList.remove('active');
}

// Initial update
updatePointsDisplay();