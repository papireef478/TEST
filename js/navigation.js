// ========== NAVIGATION & SCENE MODALS ==========
function goHome() {
  currentSubject = 'home';
  document.getElementById('classroomView').style.display = 'block';
  document.querySelectorAll('.subject-page').forEach(p => { p.classList.remove('active-subject'); p.style.display = 'none'; });
  updateClassroomProgress();
  window.scrollTo(0, 0);
}

function openSceneModal(content) {
  document.getElementById('modalBody').innerHTML = content;
  document.getElementById('sceneModal').classList.add('active');
}
function closeSceneModal() { document.getElementById('sceneModal').classList.remove('active'); }

// Overlay Click Handlers (Home Page Only)
document.querySelectorAll('.clickable-overlay').forEach(element => {
  element.addEventListener('click', function(e) {
    if (currentSubject === 'home') {
      e.stopPropagation();
      const action = this.getAttribute('data-action');
      handleSceneAction(action); // ← This calls the function above
    }
  });
});

// ========== INTERACTIVE SLIDE FUNCTIONS ==========
function handleSceneAction(action) {
  switch(action) {
    case 'window':
      openSceneModal(`
        <h2>🌤️ Weather in Chattanooga, TN</h2>
        <p>Current weather conditions for our city!</p>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; margin: 15px 0;">
          <p style="font-size: 2rem; margin: 10px 0;">🌡️ <span id="temp">72°F</span></p>
          <p>☀️ Sunny</p>
          <p>💧 Humidity: 45%</p>
          <p>💨 Wind: 8 mph</p>
        </div>
        <p><strong>Learning Connection:</strong> Weather affects what we wear and do each day. What would you wear in this weather?</p>
        <p style="margin-top: 10px; font-style: italic; color: #666;">📍 Chattanooga is in southeastern Tennessee, near the Tennessee River!</p>
      `);
      break;
      
    case 'calendar':
      const currentDate = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      openSceneModal(`
        <h2>📅 Classroom Calendar</h2>
        <p><strong>${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</strong></p>
        <p>Today is ${currentDate.toLocaleDateString('en-US', { weekday: 'long' })}, the ${currentDate.getDate()}th</p>
        <div style="margin-top: 20px; background: #f0f8ff; padding: 15px; border-radius: 10px;">
          <h3>📚 This Week's Schedule:</h3>
          <ul style="margin-top: 10px; margin-left: 20px; line-height: 1.8;">
            <li><strong>Monday:</strong> Math - Multiplication Practice</li>
            <li><strong>Tuesday:</strong> Reading - Main Idea & Details</li>
            <li><strong>Wednesday:</strong> Science - Solar System</li>
            <li><strong>Thursday:</strong> Social Studies - Tennessee History</li>
            <li><strong>Friday:</strong> Test Prep & Review</li>
          </ul>
        </div>
        <p style="margin-top: 15px;"><em>🌟 Remember: We learn something new every day!</em></p>
      `);
      break;
      
    case 'library':
      openSceneModal(`
        <h2>📚 Library & Reading Corner</h2>
        <p>Welcome to our cozy reading nook! Books take us on adventures.</p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px;">
          <div style="background: #fff3cd; padding: 15px; border-radius: 10px; border-left: 5px solid #ffc107;">
            <strong>📖 Fiction</strong><br>Stories, novels, and imagination
          </div>
          <div style="background: #d1ecf1; padding: 15px; border-radius: 10px; border-left: 5px solid #17a2b8;">
            <strong>🔬 Non-Fiction</strong><br>Facts, science, and real events
          </div>
          <div style="background: #d4edda; padding: 15px; border-radius: 10px; border-left: 5px solid #28a745;">
            <strong>🔢 Math Books</strong><br>Numbers and problem-solving
          </div>
          <div style="background: #f8d7da; padding: 15px; border-radius: 10px; border-left: 5px solid #dc3545;">
            <strong>🌍 Social Studies</strong><br>History, geography, culture
          </div>
        </div>
        <p style="margin-top: 15px;"><strong>Reading Challenge:</strong> Read for 20 minutes every day! 📖✨</p>
      `);
      break;
      
    case 'laptop':
      openSceneModal(`
        <h2>👩‍🏫 Welcome from Mommy Teacher!</h2>
        <p style="font-size: 1.2rem; color: #5a4a3a; margin: 15px 0;">Hi there, superstar! 🌟</p>
        <p>I'm so excited to have you in our digital classroom! Whether you call me Ms. French or Mommy Teacher, I'm here to help you learn and grow every single day.</p>
        <div style="background: #fff9e6; padding: 20px; border-radius: 15px; margin: 15px 0;">
          <h3>💖 What Makes Our Classroom Special:</h3>
          <ul style="margin-left: 20px; margin-top: 10px; line-height: 2;">
            <li>✨ We learn at our own pace</li>
            <li>✨ Mistakes help us grow</li>
            <li>✨ Every question is important</li>
            <li>✨ We celebrate every success</li>
            <li>✨ Learning is an adventure!</li>
          </ul>
        </div>
        <p style="font-style: italic; color: #666;">"You are brave, you are smart, and you can do hard things!" - Mommy Teacher 💕</p>
      `);
      break;
      
    case 'plant':
      openSceneModal(`
        <h2>🌱 Plant Care Station</h2>
        <p>Our classroom plants need love and care!</p>
        <div style="background: #e8f5e9; padding: 20px; border-radius: 15px; margin: 15px 0;">
          <h3>🌿 How to Care for Plants:</h3>
          <ul style="margin-left: 20px; margin-top: 10px; line-height: 2;">
            <li>💧 <strong>Water:</strong> Check soil - water when top inch is dry</li>
            <li>☀️ <strong>Sunlight:</strong> Most plants need 6-8 hours of light</li>
            <li>🌡️ <strong>Temperature:</strong> Keep away from cold drafts</li>
            <li>✂️ <strong>Trim:</strong> Remove dead leaves regularly</li>
          </ul>
        </div>
        <h3>🧪 Science Connection:</h3>
        <p><strong>Photosynthesis:</strong> Plants use sunlight, water, and carbon dioxide to make their own food and release oxygen for us to breathe!</p>
        <p style="margin-top: 10px; font-style: italic;">🌍 Plants are essential for life on Earth. Thank you for taking care of them!</p>
      `);
      break;
      
    case 'blm':
      openSceneModal(`
        <h2>✊ Social Emotional Learning & Black History</h2>
        <p>Learning about diversity, equality, and the amazing contributions of Black Americans to our world.</p>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; margin: 15px 0;">
          <h3>🌟 This Month's Focus:</h3>
          <p><strong>Theme:</strong> Courage and Change-Makers</p>
        </div>
        <h3>📚 Important Figures to Know:</h3>
        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 10px 0;">
          <strong>Martin Luther King Jr.</strong><br>
          Civil rights leader who fought for equality and justice for all people. "I have a dream..."
        </div>
        <div style="background: #d1ecf1; padding: 15px; border-radius: 10px; margin: 10px 0;">
          <strong>Rosa Parks</strong><br>
          "Mother of the Civil Rights Movement" - Her courage sparked change.
        </div>
        <div style="background: #d4edda; padding: 15px; border-radius: 10px; margin: 10px 0;">
          <strong>Maya Angelou</strong><br>
          Poet and author who inspired millions with her words.
        </div>
        <h3>💭 Social Emotional Learning:</h3>
        <ul style="margin-left: 20px; line-height: 2;">
          <li><strong>Empathy:</strong> Understanding how others feel</li>
          <li><strong>Respect:</strong> Treating everyone with kindness</li>
          <li><strong>Courage:</strong> Standing up for what's right</li>
          <li><strong>Unity:</strong> We're stronger together</li>
        </ul>
        <p style="margin-top: 15px; font-style: italic; background: #f8f9fa; padding: 10px; border-radius: 8px;">
          "We all should know that diversity makes for a rich tapestry, and we must understand that all the threads of the tapestry are equal in value." - Maya Angelou
        </p>
      `);
      break;
      
    case 'math':
      openSceneModal(`
        <h2>🧮 Math Corner</h2>
        <p>Let's explore the wonderful world of numbers!</p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px;">
          <div style="background: #fff3cd; padding: 15px; border-radius: 10px; text-align: center;">
            <div style="font-size: 2rem;">✖️</div><strong>Multiplication</strong>
          </div>
          <div style="background: #d1ecf1; padding: 15px; border-radius: 10px; text-align: center;">
            <div style="font-size: 2rem;">➗</div><strong>Division</strong>
          </div>
          <div style="background: #d4edda; padding: 15px; border-radius: 10px; text-align: center;">
            <div style="font-size: 2rem;">🍕</div><strong>Fractions</strong>
          </div>
          <div style="background: #f8d7da; padding: 15px; border-radius: 10px; text-align: center;">
            <div style="font-size: 2rem;">📐</div><strong>Geometry</strong>
          </div>
        </div>
        <p style="margin-top: 15px;"><strong>Today's Challenge:</strong> Practice your multiplication facts! Can you master the 6s and 7s?</p>
        <p style="font-style: italic; color: #666;">💡 Math is everywhere - in nature, music, art, and daily life!</p>
      `);
      break;
      
    case 'science':
      openSceneModal(`
        <h2>🔬 Science Lab</h2>
        <p>Discover the wonders of our universe!</p>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; margin: 15px 0;">
          <h3>🪐 Current Unit: Solar System</h3>
          <p>Exploring planets, stars, and space!</p>
        </div>
        <h3>🔭 Topics We're Studying:</h3>
        <ul style="margin-left: 20px; line-height: 2.2;">
          <li>☀️ The Sun - our closest star</li>
          <li>🌍 Earth and its unique features</li>
          <li>🌙 Moon phases and eclipses</li>
          <li>🪐 Eight planets and their characteristics</li>
          <li>⭐ Constellations and galaxies</li>
        </ul>
        <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin-top: 15px;">
          <strong>🧪 Fun Fact:</strong> Mercury is the closest planet to the Sun, but Venus is the hottest because of its thick atmosphere!
        </div>
        <p style="margin-top: 15px;"><em>🚀 "Science is not only a disciple of reason but also one of romance and passion." - Stephen Hawking</em></p>
      `);
      break;
      
    case 'reading':
      openSceneModal(`
        <h2>📖 Reading Nook</h2>
        <p>Where stories come alive and imaginations soar!</p>
        <div style="background: #fff9e6; padding: 20px; border-radius: 15px; margin: 15px 0;">
          <h3>📚 Reading Skills We're Building:</h3>
          <ul style="margin-left: 20px; margin-top: 10px; line-height: 2;">
            <li><strong>Main Idea:</strong> What's the story mostly about?</li>
            <li><strong>Details:</strong> Supporting facts and examples</li>
            <li><strong>Inference:</strong> Reading between the lines</li>
            <li><strong>Vocabulary:</strong> Learning new words</li>
            <li><strong>Comprehension:</strong> Understanding what we read</li>
          </ul>
        </div>
        <h3>📖 Book Genres to Explore:</h3>
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
          <span style="background: #ffc107; color: #000; padding: 5px 15px; border-radius: 20px;">Adventure</span>
          <span style="background: #17a2b8; color: white; padding: 5px 15px; border-radius: 20px;">Mystery</span>
          <span style="background: #28a745; color: white; padding: 5px 15px; border-radius: 20px;">Fantasy</span>
          <span style="background: #dc3545; color: white; padding: 5px 15px; border-radius: 20px;">Biography</span>
          <span style="background: #6f42c1; color: white; padding: 5px 15px; border-radius: 20px;">Poetry</span>
        </div>
        <p style="margin-top: 15px;"><strong>Reading Goal:</strong> 20 minutes of independent reading daily! 📚✨</p>
      `);
      break;
      
    case 'history':
      openSceneModal(`
        <h2>🏛️ History Hub</h2>
        <p>Learning from the past to build a better future!</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 15px 0;">
          <h3>📜 Current Unit: Tennessee & American History</h3>
          <ul style="margin-left: 20px; margin-top: 10px; line-height: 2;">
            <li>🏛️ Declaration of Independence</li>
            <li>🗽 Founding Fathers</li>
            <li>🎸 Tennessee's role in American history</li>
            <li>🏛️ Three branches of government</li>
            <li>📜 Important documents and their meaning</li>
          </ul>
        </div>
        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 15px 0;">
          <strong>💡 Did You Know?</strong><br>
          Thomas Jefferson wrote the Declaration of Independence in 1776, declaring America's freedom from Britain!
        </div>
        <h3>🗺️ Tennessee Facts:</h3>
        <ul style="margin-left: 20px; line-height: 2;">
          <li><strong>Capital:</strong> Nashville</li>
          <li><strong>State Bird:</strong> Mockingbird</li>
          <li><strong>State Flower:</strong> Iris</li>
          <li><strong>Known for:</strong> Music (Nashville, Memphis, Bristol)</li>
        </ul>
        <p style="margin-top: 15px; font-style: italic;">"Those who cannot remember the past are condemned to repeat it." - George Santayana</p>
      `);
      break;
      
    case 'test':
      openSceneModal(`
        <h2>📝 Test Prep Station</h2>
        <p>Getting ready for TCAP success!</p>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; margin: 15px 0;">
          <h3>🎯 TCAP Preparation</h3>
          <p>Tennessee Comprehensive Assessment Program</p>
        </div>
        <h3>📚 Test-Taking Strategies:</h3>
        <div style="background: #e8f5e9; padding: 15px; border-radius: 10px; margin: 10px 0;">
          <strong>✅ Before the Test:</strong>
          <ul style="margin-left: 20px; margin-top: 5px;">
            <li>Get a good night's sleep</li>
            <li>Eat a healthy breakfast</li>
            <li>Bring pencils and erasers</li>
            <li>Take deep breaths and stay calm</li>
          </ul>
        </div>
        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 10px 0;">
          <strong>✅ During the Test:</strong>
          <ul style="margin-left: 20px; margin-top: 5px;">
            <li>Read each question carefully</li>
            <li>Eliminate wrong answers first</li>
            <li>Manage your time wisely</li>
            <li>Review your answers if time allows</li>
          </ul>
        </div>
        <p style="margin-top: 15px;"><strong>💪 Remember:</strong> You've been preparing all year! Just do your best - that's all anyone can ask! 🌟</p>
      `);
      break;
      
    case 'geography':
      openSceneModal(`
        <h2>🌍 Geography Explorer</h2>
        <p>Discovering our world, one place at a time!</p>
        <div style="background: #e3f2fd; padding: 20px; border-radius: 15px; margin: 15px 0;">
          <h3>🗺️ What is Geography?</h3>
          <p>Geography is the study of places and the relationships between people and their environments.</p>
        </div>
        <h3>📍 The Five Themes of Geography:</h3>
        <div style="display: grid; gap: 10px; margin-top: 15px;">
          <div style="background: #fff3cd; padding: 12px; border-radius: 8px;">
            <strong>1. Location:</strong> Where is it? (Absolute & Relative)
          </div>
          <div style="background: #d1ecf1; padding: 12px; border-radius: 8px;">
            <strong>2. Place:</strong> What's it like there? (Physical & Human characteristics)
          </div>
          <div style="background: #d4edda; padding: 12px; border-radius: 8px;">
            <strong>3. Human-Environment Interaction:</strong> How do people affect and are affected by their environment?
          </div>
          <div style="background: #f8d7da; padding: 12px; border-radius: 8px;">
            <strong>4. Movement:</strong> How do people, goods, and ideas move?
          </div>
          <div style="background: #e2d4f0; padding: 12px; border-radius: 8px;">
            <strong>5. Region:</strong> How are places similar or different?
          </div>
        </div>
        <h3 style="margin-top: 15px;">🌎 Continents We're Studying:</h3>
        <p>North America, South America, Europe, Asia, Africa, Australia, Antarctica</p>
        <p style="margin-top: 10px; font-style: italic;">"The world is a book, and those who do not travel read only one page." - Saint Augustine</p>
      `);
      break;
      
    case 'clock':
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
      openSceneModal(`
        <h2>⏰ Time Practice Station</h2>
        <p>Learning to tell time is an important skill!</p>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 20px; margin: 15px 0; text-align: center;">
          <p style="font-size: 3rem; margin: 10px 0; font-weight: bold;">${displayHours}:${displayMinutes} ${ampm}</p>
          <p>Current Time</p>
        </div>
        <h3>📚 Time-Taking Tips:</h3>
        <div style="background: #fff9e6; padding: 15px; border-radius: 10px; margin: 10px 0;">
          <strong>Hour Hand (Short):</strong> Points to the hour<br>
          <strong>Minute Hand (Long):</strong> Points to the minutes<br>
          <strong>Second Hand (Thin):</strong> Counts seconds (if your clock has one)
        </div>
        <h3>🎯 Practice Questions:</h3>
        <div style="background: #e8f5e9; padding: 15px; border-radius: 10px; margin: 10px 0;">
          <p><strong>1.</strong> How many minutes in an hour? <em>(Answer: 60)</em></p>
          <p><strong>2.</strong> How many hours in a day? <em>(Answer: 24)</em></p>
          <p><strong>3.</strong> What time is it when the hour hand is on 3 and minute hand is on 12? <em>(Answer: 3:00)</em></p>
        </div>
        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin-top: 15px;">
          <strong>⏱️ Time Challenge:</strong> Practice reading analog clocks every day! Try to tell the time without looking at digital clocks.
        </div>
        <p style="margin-top: 15px; font-style: italic;">"Time is what we want most, but what we use worst." - William Penn</p>
      `);
      break;
      
    default:
      openSceneModal(`
        <h2>🔍 Explore Our Classroom</h2>
        <p>Click on different areas to discover learning opportunities!</p>
        <p style="margin-top: 15px;">Every corner of our classroom has something special to teach us. Keep exploring! 🌟</p>
      `);
  }
}

// Classroom Grid Navigation
document.querySelectorAll('.class-object[data-subject]').forEach(el => {
  el.addEventListener('click', () => {
    const subj = el.getAttribute('data-subject');
    currentSubject = subj;
    document.getElementById('classroomView').style.display = 'none';
    document.querySelectorAll('.subject-page').forEach(p => { p.classList.remove('active-subject'); p.style.display = 'none'; });
    
    const pageMap = { math:'mathPage', ela:'elaPage', science:'sciencePage', social:'socialPage', assessment:'assessmentPage', gym:'gymPage', spanish:'spanishPage', art:'artPage' };
    const target = pageMap[subj];
    if(target) {
      document.getElementById(target).classList.add('active-subject');
      document.getElementById(target).style.display = 'block';
      window.scrollTo(0, 0);
    }
  });
});

document.getElementById('sceneModal')?.addEventListener('click', function(e) { if (e.target === this) closeSceneModal(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeSceneModal(); });