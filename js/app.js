// ========== CORE STATE & INITIALIZATION ==========
let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
let achievements = JSON.parse(localStorage.getItem('achievements')) || {
  firstQuiz: false, mathMaster: false, readingStar: false, perfectScore: false, weekWarrior: false, tcapMaster: false
};
let quizzesCompleted = parseInt(localStorage.getItem('quizzesCompleted')) || 0;
let lastLoginDate = localStorage.getItem('lastLoginDate') || '';
let loginStreak = parseInt(localStorage.getItem('loginStreak')) || 0;
let currentSubject = 'home';

document.addEventListener('DOMContentLoaded', () => {
  checkLoginStreak();
  updatePointsDisplay();
  updateClassroomProgress();
  bindQuizzes();
  
  // Math Classroom Init
  drawClock();
  updateNumberOfTheDay();
  renderGradebook();
  
  // Achievement States
  if(achievements.firstQuiz) document.getElementById('ach-first-quiz')?.classList.remove('locked');
  if(achievements.mathMaster) document.getElementById('ach-math-master')?.classList.remove('locked');
  if(achievements.readingStar) document.getElementById('ach-reading-star')?.classList.remove('locked');
  if(achievements.perfectScore) document.getElementById('ach-perfect-score')?.classList.remove('locked');
  if(achievements.weekWarrior) document.getElementById('ach-week-warrior')?.classList.remove('locked');

  setTimeout(() => {
    if(document.getElementById('teacherMessage')) {
      document.getElementById('teacherMessage').innerHTML = `"Welcome to our digital classroom! Click on any station to start. I'm Mommy Teacher! 🍎"`;
    }
  }, 100);
});