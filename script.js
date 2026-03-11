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
        // Show correct green tick
        rightMark.classList.add("visible");

        // Play correct sound
        const audio = document.getElementById("correctSound");
        audio.currentTime = 0;
        audio.play();

        // SPECIAL CASE: FINAL RIDDLE
        if (num === 6) {
            // Show tick  correct sound
            rightMark.classList.add("visible");
            const audio = document.getElementById("correctSound");
            audio.currentTime = 0;
            audio.play();

            // Start ring chase
            startRingChase();

            return;
        }

        // Otherwise reveal next riddle
        const next = document.getElementById(`riddle${num + 1}`);
        if (next) {
            next.classList.remove("hidden");
        }

    } else {
        // Wrong answer
        const audio = document.getElementById("wrongSound");
        audio.currentTime = 0;
        audio.play();

        wrongMark.classList.add("visible");
    }
}

// CIPHERING OF KEYS
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

// RING CHASE

// SAURON JUMPSCARE
