// Array Of Words
const words = [
  "Hello",
  "programming",
  "Code",
  "JavaScript",
  "Town",
  "Country",
  "Testing",
  "youtube",
  "linkedin",
  "Twitter",
  "Github",
  "LeeCode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "playing",
];

// Catch Selectors
let startButton = document.querySelector(".start");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-word");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish-message");
let levelSelect = document.querySelector(".lvl");

// Setting Levels
const lvlS = {
  Easy: 10,
  Normal: 5,
  Hard: 3,
};

// Default Level
let defaultLevelName = levelSelect.value;
let defaultLevelSeconds = lvlS[defaultLevelName];

// Update the default level when the user changes the level
levelSelect.addEventListener("change", function () {
  defaultLevelName = this.value;
  defaultLevelSeconds = lvlS[defaultLevelName];
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;

  // Store level in localStorage
  localStorage.setItem('selectedLevel', defaultLevelName);
});

// Setting Level Name + Seconds + Score (Initial Setup)
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  // Update level based on selected value
  defaultLevelName = levelSelect.value;
  defaultLevelSeconds = lvlS[defaultLevelName];
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;

  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
};

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get word index
  let wordIndex = words.indexOf(randomWord);
  // Remove word From Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congrats");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Word Box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}

window.onload = function () {
  let savedLevel = localStorage.getItem('selectedLevel');
  if (savedLevel) {
    defaultLevelName = savedLevel;
    defaultLevelSeconds = lvlS[defaultLevelName];
    levelSelect.value = savedLevel;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  }
};
