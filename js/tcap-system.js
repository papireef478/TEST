// ========== TCAP TEST SYSTEM ==========
let selectedTestOption = null;
let selectedSubjects = [];
let tcapTimer = null;
let tcapDuration = 7200;
const tcapQuestions = {
    math: [
        { q: "84 ÷ 7 = ?", options: ["10", "12", "14", "16"], answer: "12" },
        { q: "Which fraction is greater: 3/4 or 2/3?", options: ["3/4", "2/3", "They are equal"], answer: "3/4" },
        { q: "What is the area of a rectangle 5cm × 3cm?", options: ["8 cm²", "15 cm²", "16 cm²"], answer: "15 cm²" },
        { q: "Round 478 to the nearest ten:", options: ["470", "480", "500"], answer: "480" }
    ],
    ela: [
        { q: "Which word is a noun? (run, happiness, quickly)", options: ["run", "happiness", "quickly"], answer: "happiness" },
        { q: "What is the main idea of: 'Dolphins are smart mammals that communicate and live in groups'?", options: ["Dolphins are fish", "Dolphins are intelligent mammals", "Dolphins swim fast"], answer: "Dolphins are intelligent mammals" },
        { q: "Choose the correct verb: 'The group of students ___ ready.'", options: ["is", "are"], answer: "is" },
        { q: "What does 'infer' mean in reading?", options: ["To guess based on clues", "To read aloud", "To skip words"], answer: "To guess based on clues" }
    ],
    science: [
        { q: "Plants make food using sunlight: _________", options: ["respiration", "photosynthesis", "digestion"], answer: "photosynthesis" },
        { q: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth"], answer: "Mercury" },
        { q: "What do camels store in their humps?", options: ["Water", "Fat", "Food"], answer: "Fat" },
        { q: "What causes day and night?", options: ["Earth's orbit", "Earth's rotation", "The Moon"], answer: "Earth's rotation" }
    ],
    social: [
        { q: "Who wrote the Declaration of Independence?", options: ["George Washington", "Thomas Jefferson", "Ben Franklin"], answer: "Thomas Jefferson" },
        { q: "What is the capital of Tennessee?", options: ["Memphis", "Nashville", "Chattanooga"], answer: "Nashville" },
        { q: "Which branch of government makes laws?", options: ["Executive", "Legislative", "Judicial"], answer: "Legislative" },
        { q: "Tennessee is known as:", options: ["The Sunshine State", "The Volunteer State", "The Empire State"], answer: "The Volunteer State" }
    ]
};

function selectTestOption(option) {
    selectedTestOption = option;
    document.querySelectorAll('.tcap-option').forEach(opt => opt.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    const subjectSel = document.getElementById('subjectSelection');
    const singleOpts = document.getElementById('singleSubjectOptions');
    const twoOpts = document.getElementById('twoSubjectOptions');
    const timerDisplay = document.getElementById('tcap-timer-display');
    const sampleQ = document.getElementById('sampleQuestions');
    const tcapQ = document.getElementById('tcapQuestions');
    const results = document.getElementById('tcapResults');
    results.classList.remove('active');
    tcapQ.classList.remove('active');
    if (option === 'full-week') {
        subjectSel.classList.remove('active');
        timerDisplay.style.display = 'block';
        sampleQ.classList.remove('active');
        startCountdown(7200);
        alert('📅 Full Week Simulation selected! Timer starts now! ⏱️');
    } else if (option === 'one-subject') {
        subjectSel.classList.add('active');
        singleOpts.style.display = 'block';
        twoOpts.style.display = 'none';
        timerDisplay.style.display = 'none';
        sampleQ.classList.add('active');
    } else if (option === 'two-subjects') {
        subjectSel.classList.add('active');
        singleOpts.style.display = 'none';
        twoOpts.style.display = 'block';
        timerDisplay.style.display = 'none';
        sampleQ.classList.add('active');
    }
}

function startSelectedTest() {
    selectedSubjects = [];
    if (selectedTestOption === 'one-subject') {
        const checked = document.querySelector('input[name="tcap-subject-single"]:checked');
        if (checked) { selectedSubjects.push(checked.value); } 
        else { alert('⚠️ Please select ONE subject to continue.'); return; }
    } else if (selectedTestOption === 'two-subjects') {
        const checkedBoxes = document.querySelectorAll('#twoSubjectOptions input[type="checkbox"]:checked');
        if (checkedBoxes.length !== 2) { alert('⚠️ Please select exactly 2 subjects.'); return; }
        checkedBoxes.forEach(cb => selectedSubjects.push(cb.value));
    }
    if (selectedSubjects.length === 0) { alert('Please select at least one subject!'); return; }
    
    tcapDuration = selectedSubjects.length * 7200;
    startCountdown(tcapDuration);
    generateTCAPQuestions();
    document.getElementById('sampleQuestions').classList.remove('active');
    document.getElementById('subjectSelection').classList.remove('active');
    document.getElementById('tcapQuestions').classList.add('active');
    document.getElementById('tcap-timer-display').style.display = 'block';
}

function generateTCAPQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    selectedSubjects.forEach((subject, subIndex) => {
        const shuffled = [...tcapQuestions[subject]].sort(() => Math.random() - 0.5).slice(0, 3);
        shuffled.forEach((qObj, qIndex) => {
            const qId = `tcap_${subject}_${subIndex}_${qIndex}`;
            container.innerHTML += `<div class="tcap-question" data-subject="${subject}" data-qid="${qId}">
                <p class="question">${qObj.q}</p>
                ${qObj.options.map(opt => `<label><input type="radio" name="${qId}" value="${opt}"> ${opt}</label>`).join('')}
            </div>`;
        });
    });
}

function startCountdown(seconds) {
    clearInterval(tcapTimer);
    let remaining = seconds;
    function updateTimer() {
        const hrs = Math.floor(remaining / 3600);
        const mins = Math.floor((remaining % 3600) / 60);
        const secs = remaining % 60;
        document.getElementById('countdown').textContent = `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
        if (remaining <= 0) {
            clearInterval(tcapTimer);
            if (document.getElementById('tcapQuestions').classList.contains('active')) {
                alert('⏰ Time\'s up! Submitting your test...');
                submitTCAPTest();
            }
            return;
        }
        remaining--;
    }
    updateTimer();
    tcapTimer = setInterval(updateTimer, 1000);
}

function submitTCAPTest() {
    clearInterval(tcapTimer);
    const results = [];
    let correctCount = 0;
    document.querySelectorAll('.tcap-question').forEach(qEl => {
        const subject = qEl.dataset.subject;
        const qId = qEl.dataset.qid;
        const questionObj = tcapQuestions[subject].find(q => q.q === qEl.querySelector('.question').textContent);
        const studentAnswer = document.querySelector(`input[name="${qId}"]:checked`)?.value || 'No answer';
        const isCorrect = studentAnswer === questionObj.answer;
        if (isCorrect) correctCount++;
        results.push({ question: questionObj.q, subject, studentAnswer, correctAnswer: questionObj.answer, isCorrect });
    });
    
    let allResults = JSON.parse(localStorage.getItem('tcapResults') || '[]');
    allResults.push({ date: new Date().toLocaleString(), subjects: selectedSubjects, totalQuestions: results.length, correct: correctCount, score: Math.round((correctCount / results.length) * 100), details: results });
    localStorage.setItem('tcapResults', JSON.stringify(allResults));
    
    if (typeof addPoints === 'function') addPoints(50 * selectedSubjects.length, 'TCAP Test Complete!');
    if (typeof unlockAchievement === 'function') {
        if (correctCount === results.length) unlockAchievement('perfectScore', 150);
        if (selectedSubjects.length >= 2) unlockAchievement('tcapMaster', 250);
    }
    showStudentResults(correctCount, results.length);
}

function showStudentResults(correct, total) {
    document.getElementById('tcapQuestions').classList.remove('active');
    const resultsDiv = document.getElementById('tcapResults');
    resultsDiv.classList.add('active');
    const percent = Math.round((correct / total) * 100);
    resultsDiv.innerHTML = `
        <h3 style="margin-bottom:20px;text-align:center;">📊 Test Complete!</h3>
        <div style="text-align:center;font-size:3rem;margin:20px 0;">${percent >= 80 ? '🌟' : percent >= 60 ? '✨' : '💪'}</div>
        <p style="text-align:center;font-size:1.3rem;">You answered <strong>${correct} out of ${total}</strong> correctly!</p>
        <p style="text-align:center;color:#666;margin:15px 0;">Score: ${percent}%</p>
        <div style="background:#f0f0f0;padding:15px;border-radius:10px;margin:20px 0;">
            <p style="font-weight:bold;">📝 What happens next:</p>
            <ul style="margin-left:20px;margin-top:10px;line-height:1.8;">
                <li>Mommy Teacher will review your answers</li>
                <li>We'll plan lessons based on what you missed</li>
                <li>You earned <strong>${50 * selectedSubjects.length} points</strong>! ⭐</li>
            </ul>
        </div>
    `;
    if (typeof renderParentDashboard === 'function' && document.getElementById('parentModal').style.display === 'flex') renderParentDashboard();
}

function resetTCAPPage() {
    document.getElementById('tcapResults').classList.remove('active');
    document.getElementById('sampleQuestions').classList.add('active');
    document.getElementById('tcap-timer-display').style.display = 'none';
    document.querySelectorAll('.tcap-option').forEach(opt => opt.classList.remove('selected'));
    selectedTestOption = null;
    selectedSubjects = [];
}