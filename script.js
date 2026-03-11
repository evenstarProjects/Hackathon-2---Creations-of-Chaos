// Opening and Collapsing Dialogue Box
const helpDialog = document.getElementById("helpDialog");
const helpButton = document.getElementById("questionMarkButton");
const closeDialog = document.getElementById("closeDialog");

closeDialog.addEventListener("click", () => {
  helpDialog.close();
});

helpButton.addEventListener("click", () => {
  helpDialog.showModal();
});



// Rewiring of keys
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

