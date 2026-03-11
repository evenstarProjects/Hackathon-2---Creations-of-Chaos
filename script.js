// Opening and Collapsing Dialogue Box
const helpDialog = document.getElementById("helpDialog");
const helpButton = document.getElementById("questionMarkButton");
const closeDialog = document.getElementById("closeDialog");

helpButton.addEventListener("click", () => {
  helpDialog.showModal();
});

closeDialog.addEventListener("click", () => {
  helpDialog.close();
});

// Rewiring of keys
const cipher = {
  A: "C", B: "H", C: "A", D: "O", E: "S", F: "B",
  G: "D", H: "E", I: "F", J: "G", K: "I", L: "J",
  M: "K", N: "L", O: "M", P: "N", Q: "P", R: "Q",
  S: "R", T: "T", U: "U", V: "V", W: "W", X: "X",
  Y: "Y", Z: "Z"
};

