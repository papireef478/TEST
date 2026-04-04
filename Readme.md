# **🎒 Alli's Digital Classroom 🍎**

### **TCAP 4th Grade Homeschool Learning Platform**

A mastery-based, adaptive digital classroom built for Tennessee 4th-5th grade standards. Designed with love by Mommy Teacher\! 💕  
---

## **📁 Project Structure**

01 allis-digital-classroom/  
02│  
03├── index.html               \# Main entry point \- contains all page HTML  
04│  
05├── css/   
06│   ├── main.css              \# Global styles, variables, header, buttons  
07│   ├── classroom.css         \# Home page grid, teacher desk, whiteboard  
08│   ├── subjects.css          \# Math, Reading, Science, TCAP page layouts  
09│   ├── modals.css            \# Scene modals, math modals, parent modal  
10│   ├── overlays.css          \# Clickable overlay zones (home \+ math)  
11│   ├── tcap-styles.css       \# TCAP test timer, options, questions  
12│   └── parent-dashboard.css  \# Parent modal, tables, weak-area alerts  
13│  
14├── js/                      \# JavaScript modules (organized by feature)  
15│   ├── app.js                \# Global state, initialization, DOM ready  
16│   ├── reward-system.js      \# Points, achievements, celebrations, etc  
17│   ├── navigation.js         \# Page switching, overlay handlers,modals  
18│   ├── quizzes.js            \# Quiz definitions, scoring, progress bar  
19│   ├── tcap-system.js        \# TCAP test logic, timer, questions  
20│   ├── math-classroom.js     \# Math overlays, time quiz, drills, grades  
21│   └── parent-dashboard.js   \# Dashboard, export, reset, planner  
22│  
23└── README.md                 \# You are here\! 👋  
---

## 

## **🚀 How to Run**

1. Download the entire folder to your computer.  
2. Open index.html in any modern browser (Chrome, Edge, Firefox, Safari).  
3. No server required\! Everything runs locally using localStorage.

💡 Tip: For best results, use Chrome or Edge in fullscreen mode (F11).  
---

## **🔐 Parent Access**

1. Click 🔒 Parent Dashboard in the top header.  
2. Enter password: TCAP2025  
3. You'll see:  
   * 📊 Overall mastery % and progress bar  
   * 📋 Quiz scores by Tennessee standard  
   * ⚠️ Areas needing extra support (highlighted in orange)  
   * 📝 Recent TCAP practice test history  
   * 🎁 Reward redemption history  
   * 🔧 Buttons: Reset, Export CSV, Redeem, Lesson Planner

### **📚 Lesson Planner (Parent Only)**

* Set the Number of the Day (2-12) for multiplication/division drills  
* Plan daily math focus for Monday-Friday  
* Changes instantly sync to:  
  * 🔢 Poster overlay (shows the number)  
  * 📅 Calendar overlay (shows weekly plan)  
  * 💻 Laptop drill (uses the number for questions)

---

## 

## **🧮 Math Classroom Overlays**

The Math Lab page has 5 interactive overlay zones (click the icons on the Google Slide):

| Overlay | Location | Function |
| ----- | ----- | ----- |
| ⏰ Clock | Top-left | Analog clock quiz \- student types time in HH:MM format |
| 🔢 Poster | Left side | Shows "Number of the Day" set by parent in planner |
| 💻 Laptop | Bottom-right | Launches timed multiplication/division drill using the Number of the Day |
| 📅 Calendar | Top-right | Displays the weekly math plan entered by parent |
| 📓 Notebook | Left bookcase | Shows student's math gradebook with assignment history |

🎨 Overlay styling uses the Math Lab header color (\#2563eb) instead of yellow.

### **🕐 Time Quiz Features**

* Random analog clock with quarter/half hours  
* Instant feedback with hints  
* Scores saved to gradebook (+100 pts for correct)

### **🔢 Drill Features**

* 5 questions: 3 multiplication, 2 division using the Number of the Day  
* Auto-graded with color-coded feedback  
* Overall % calculated and saved to gradebook

---

## 

## **📝 TCAP Prep Station**

Three testing modes to build confidence:

| Mode | Description | Best For |
| ----- | ----- | ----- |
| 📅 Full Week | 4 subjects × 2 hrs, spread across week | Full TCAP simulation |
| 📚 One Subject | Single 2-hour timed test | Targeted practice |
| ⚡ Two Subjects | Two subjects back-to-back (4 hrs) | Building stamina |

### **Features:**

* ⏱️ Realistic countdown timer (persists if page refreshes)  
* 🎯 Questions aligned to Tennessee standards  
* 📈 Results saved for parent review  
* 🌟 Points awarded: 50 × number of subjects completed

---

## **🌟 Reward System**

Students earn points for:

* ✅ Quiz completion: \+20 pts per correct answer  
* 🎯 Perfect quiz score: \+150 pts bonus  
* 🔥 Login streak: \+200 pts for 5 consecutive days  
* 🧮 Math Master achievement: \+100 pts  
* 📚 Reading Star achievement: \+100 pts  
* 📝 TCAP practice tests: \+50 pts per subject

### 

### **Redeemable Rewards (Parent-Approved):**

| Reward | Points |
| ----- | ----- |
| 🍫 Candy Bar | 500 |
| 🎨 Art Supplies | 500 |
| 📚 New Book | 500 |
| 🎬 Movie Night | 750 |
| 🎮 Roblox Card ($10) | 2000 |
| 🏆 Special Prize | 5000 |

👨‍👩‍👧 Students can preview rewards, but only parents can redeem via the Parent Dashboard.  
---

## **🎨 Customization Tips**

### **Change Colors**

Edit CSS variables in css/main.css:  
:root {  
  \--math-primary: \#2563eb;    */\* Math blue \*/*  
  \--math-secondary: \#1e40af;  */\* Darker blue \*/*  
  \--math-bg: \#eff6ff;         */\* Light blue background \*/*  
}

### **Adjust Overlay Positions**

If overlays don't match your Google Slide:

1. Temporarily add this to css/overlays.css to make them visible:

.math-overlay-zone {  
  background: rgba(37, 99, 235, 0.25) \!important;  
  border: 2px dashed \#2563eb \!important;  
}

2. Adjust top, left, width, height values until they align.  
3. Remove the background/border lines when done.

### **Add New Quizzes**

In js/quizzes.js, add to the quizList array:  
{  
  id: "new\_quiz",  
  name: "Quiz Name",  
  standard: "TN.Standard.Code",  
  max: 1,  
  getScore: () \=\> (document.getElementById('answer\_id')?.value \=== 'correct') ? 1 : 0,  
  saveKey: "new\_quiz"  
}

---

## **🔗 Future: Google Sheets Integration**

When ready to add cloud sync:

1. Create a Google Apps Script Web App that accepts POST requests.  
2. Replace localStorage calls with fetch() to your endpoint:

*// Example: Save grade to Google Sheets*  
async function saveGradeToSheet(name, score) {  
  await fetch('YOUR\_APPS\_SCRIPT\_URL', {  
    method: 'POST',  
    body: JSON.stringify({ action: 'saveGrade', name, score, date: new Date() })  
  });  
}

3. Functions to update: addGrade(), renderGradebook(), savePlanner(), updateNumberOfTheDay().

📌 Keep the frontend logic separate from storage—this project is already structured for easy backend swapping\!  
---

## **🛠️ Troubleshooting**

| Issue | Solution |
| ----- | ----- |
| Overlays not clickable | Check currentSubject \=== 'home' logic in navigation.js; ensure overlays have z-index: 10 |
| Math drill not using correct number | Verify localStorage.getItem('math\_numberOfDay') is set; re-save in Parent Planner |
| TCAP timer not starting | Ensure selectTestOption() is called before startCountdown() |
| Points not saving | Check browser localStorage is enabled; try clearing cache and reloading |
| Parent password not working | Default is TCAP2025; case-sensitive |

### **Clear All Data (Reset)**

In Parent Dashboard → Click 🔄 Reset All Scores  
*Or manually clear localStorage in browser dev tools.*  
---

## **💡 Pro Tips for Mommy Teacher**

1. Set Number of the Day weekly: Pick a focus number (e.g., 7\) and plan the whole week around it.  
2. Use the Gradebook: Check the 📓 Notebook overlay to see which drills need review.  
3. Celebrate streaks: The login streak achievement motivates daily engagement.  
4. Export before resets: Use 📎 Export CSV to keep a backup of progress.  
5. Customize rewards: Edit the reward list in index.html or js/reward-system.js to match your family's incentives.

---

## 

## **❤️ Built With Love**

This project was created to support deep, mastery-based learning for a 4th-grade homeschooler in Tennessee. Every feature is designed to:

* ✅ Align with TN Academic Standards  
* ✅ Reduce assignment anxiety with adaptive practice  
* ✅ Make learning joyful and rewarding  
* ✅ Give parents clear visibility into progress

"You are brave, you are smart, and you can do hard things\!" — Mommy Teacher 💕  
---

*Last Updated: April 2026*  
*Compatible with: Chrome, Edge, Firefox, Safari (desktop & tablet)*  
