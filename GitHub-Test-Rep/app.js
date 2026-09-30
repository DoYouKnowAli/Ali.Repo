const boxes = document.querySelectorAll(".color");
const hint = document.getElementById("hint");
const generateBtn = document.getElementById("generateBtn");
const toast = document.getElementById("toast");

// Make a random hex color like #A3F01C
function randomColor() {
  const chars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Decide if the text should be black or white on this color
function textColorFor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000000" : "#FFFFFF";
}

// Give one box a new random color
function setColor(box) {
  const color = randomColor();
  const hexText = box.querySelector(".hex");
  box.style.backgroundColor = color;
  hexText.textContent = color;
  hexText.style.color = textColorFor(color);
}

// Change all 5 boxes
function generatePalette() {
  boxes.forEach(setColor);
}

// Copy hex to clipboard and show a message
function copyHex(hex) {
  navigator.clipboard.writeText(hex).then(function () {
    toast.textContent = hex + " copied!";
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 1500);
  });
}

// Set up each box
boxes.forEach(function (box, index) {
  // stagger the load animation: each box starts a bit later
  box.style.animationDelay = index * 0.1 + "s";

  setColor(box);

  // click on the box => new color for this box only
  box.addEventListener("click", function () {
    setColor(box);
  });

  // click on the hex text => copy (and don't change the color)
  box.querySelector(".hex").addEventListener("click", function (e) {
    e.stopPropagation();
    copyHex(e.target.textContent);
  });
});

// Space bar => new palette
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();
    generatePalette();
    hint.classList.add("hide");
  }
});

// Generate button (mobile/tablet)
generateBtn.addEventListener("click", generatePalette);

// Hide the hint after 5 seconds
setTimeout(function () {
  hint.classList.add("hide");
}, 5000);
