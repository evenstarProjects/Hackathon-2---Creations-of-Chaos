// CAROUSEL
const helpDialog = document.getElementById("helpDialog");
const helpButton = document.getElementById("questionMarkButton");
const closeDialog = document.getElementById("closeDialog");

closeDialog.addEventListener("click", () => {
  helpDialog.close();
});

helpButton.addEventListener("click", () => {
  helpDialog.showModal();
});

// TO DO LIST
const checkSound = new Audio("Sounds/gandalfISupposeYouThinkThatWasClever.mp3");

const toDoList = document.querySelector(".toDoListUl");

toDoList.addEventListener("click", function (ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");

    // Play sound when checking
    if (ev.target.classList.contains('checked')) {
      checkSound.currentTime = 0; // rewind so it can play rapidly
      checkSound.play();
    }
  }
});

// HOBBIT RIDDLES
const answers = {
    1: ["mountain"],
    2: ["teeth"],
    3: ["wind"],
    4: ["egg"],
    5: ["time"],
    6: ["ring", "the ring", "one ring", "the one ring"]
};

function checkRiddle(num) {
  console.log(num);
  const input = document.getElementById(`riddleBox${num}`).value.trim().toLowerCase();
  const wrongMark = document.getElementById(`wrong${num}`);
  const rightMark = document.getElementById(`right${num}`);

  // Reset marks
  wrongMark.classList.remove("visible");
  rightMark.classList.remove("visible");

  // Check if answer is in the allowed list
  const correctAnswers = answers[num];
  const isCorrect = correctAnswers.includes(input);

  if (isCorrect) {

    // SPECIAL CASE: FINAL RIDDLE
    if (num === 6) {
      // Show tick  correct sound
      rightMark.classList.add("visible");
      const audio = document.getElementById("correctSound");
      audio.currentTime = 0;
      audio.play();

      // Change finger cursor
      document.body.classList.add("fingerCursor");

      // Start ring chase
      startRingChase();

      return;
    }

    // Show correct green tick
    rightMark.classList.add("visible");

    // Play correct sound
    const audio = document.getElementById("correctSound");
    audio.currentTime = 0;
    audio.play();

    // Otherwise reveal next riddle
    const next = document.getElementById(`riddle${num + 1}`);
    if (next) {
      next.classList.remove("hidden");
    }

    }
  else {
    // Wrong answer
    const audio = document.getElementById("wrongSound");
    audio.currentTime = 0;
    audio.play();

    wrongMark.classList.add("visible");
  }
}

// AUDIO FOR RING CHASE
let chaseAudio = [];
let currentAudioIndex = 0;
let audioPlaying = false;

function startChaseAudio() {
  // List of audio files in order
  chaseAudio = [
    new Audio("Sounds/gandalfNeverPutItOn.mp3"),
    new Audio("Sounds/itWantsToBeFound.mp3"),
    new Audio("Sounds/theRingOfPowerHasAWillOfItsOwn.mp3"),
    new Audio("Sounds/itEnsnaredANewBearer.mp3"),
    new Audio("Sounds/itsMineMyOwn.mp3"),
    new Audio("Sounds/gollumGollum.mp3"),
    new Audio("Sounds/iWouldUseThisForGood.mp3"),
    new Audio("Sounds/LegolasItMustBeDestroyed.mp3"),
    new Audio("Sounds/gandalfOneRingToRuleThemAll.mp3")
  ];

  currentAudioIndex = 0;
  audioPlaying = true;

  playNextAudio();
}

function playNextAudio() {
  if (!audioPlaying) return;
    const audio = chaseAudio[currentAudioIndex];
    if (!audio) return;
      audio.play();
      audio.onended = () => {
        currentAudioIndex++;

        // If we run out of files, loop the last few whispers forever
        if (currentAudioIndex >= chaseAudio.length) {
            currentAudioIndex = 2; // loop from whisper1 onward
        }
        playNextAudio();
    };
}

function stopChaseAudio() {
  audioPlaying = false;

  // Stop all audio immediately
  chaseAudio.forEach(a => {
    a.pause();
    a.currentTime = 0;
  });
}

// END CHASE AUDIO
function playFinalRingAudio() {
  const finalAudio = new Audio("Sounds/oneRingToRuleThemAll.mp3");
  finalAudio.play();

  // When this audio finishes, trigger the GIF
  finalAudio.onended = () => {
    showFinalGif();
  };
}

// PLAY FINAL GIF
function showFinalGif() {
    const overlay = document.getElementById("finalGifOverlay");
    overlay.style.display = "flex";

    const sfx = new Audio("Sounds/nazgulScreech.mp3");
    sfx.play();
}

// RING CHASE
// this below was copied and pasted and I need to understand it
function startRingChase() {
  console.log("ring chase has begun!");

  const ring = document.getElementById("theOneRing");
  const container = document.getElementById("ringChaseContainer");

  ring.style.display = "block";

  // Start the whisper sequence
  startChaseAudio();

  let ringX = window.innerWidth / 2;
  let ringY = window.innerHeight / 2;

  let cursorX = null;
  let cursorY = null;

  // Velocity components (new)
  let vx = 0;
  let vy = 0;

  // Acceleration
  let acceleration = 0.1;
  let caught = false;

  // Track cursor position
  document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function animate() {
    // Waits until we have a real cursor position
    if (cursorX === null || cursorY === null) {
      requestAnimationFrame(animate);
      return;
    }

    const dx = cursorX - ringX;
    const dy = cursorY - ringY;
    const distance = Math.hypot(dx, dy);

    // COLLISION CHECK
    if (distance < 40) {
      console.log("COLLISION! The ring has caught the cursor.");
      caught = true;
      vx = 0;
      vy = 0;
      document.body.style.cursor = "none";
      ring.style.display = "none";

      // Stop all chase audio"
      stopChaseAudio();
      playFinalRingAudio();
      return; // stop animation loop
    }

    if (distance > 1) {
      // Normalised direction
      const ux = dx / distance;
      const uy = dy / distance;

      // Increase acceleration over time
      acceleration += 0.002;   // ← tweak this number for more/less chaos

      // Accelerate toward cursor
      vx += ux * acceleration;
      vy += uy * acceleration;

      // Apply velocity
      ringX += vx;
      ringY += vy;
    }

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    requestAnimationFrame(animate);
  }

  animate();
}

// RING COLLISION - CHASE END


// SAURON JUMPSCARE

// CIPHERING MAP
const cipher = {
  A: "C", B: "H", C: "A", D: "O", E: "S", F: "B",
  G: "D", H: "E", I: "F", J: "G", K: "I", L: "J",
  M: "K", N: "L", O: "M", P: "N", Q: "P", R: "Q",
  S: "R", T: "T", U: "U", V: "V", W: "W", X: "X",
  Y: "Y", Z: "Z", 
  a: "c", b: "h", c: "a", d: "o", e: "s", f: "b",
  g: "d", h: "e", i: "f", j: "g", k: "i", l: "j",
  m: "k", n: "l", o: "m", p: "n", q: "p", r: "q",
  s: "r", t: "t", u: "u", v: "v", w: "w", x: "x",
  y: "y", z: "z"
};

// CI)HER A SINGLE STRING
function cipherString(str) {
    let result = "";
    for (let char of str) {
        // If the character exists in the cipher map, use it. Else, keep the character as-is.
        result += cipher[char] || char;
    }
    return result;
}

// APPLY CIPHER TO ALL TEXT NODES EXCEPT THE DIALOG
function applyCipherToPage() {
    const dialog = document.querySelector(".carouselDialog");

    // Recursive function to walk through the DOM
    function walk(node) {
        // If this node is inside the dialog, skip it entirely
        if (dialog.contains(node)) return;

        // If this is a text node, cipher its content
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = cipherString(node.textContent);
        }

        // Otherwise, keep walking through its children
        node = node.firstChild;
        while (node) {
            walk(node);
            node = node.nextSibling;
        }
    }

    // Start walking from the body
    walk(document.body);
}

// TIMING LOGIC FOR GLITCH AND CYPHER SEQUENCE

// 1) After 10 seconds → turn on glitch font
setTimeout(() => {
    document.body.classList.add("glitchMode");

    const audio = document.getElementById("glitchNoise");
    audio.currentTime = 0;
    audio.play();
}, 7000); // 7,000 milliseconds = 7 seconds


// 2) After 15 seconds → turn off glitch font + apply cipher
setTimeout(() => {
    document.body.classList.remove("glitchMode");
    applyCipherToPage(); // we will write this function next
}, 8000); 