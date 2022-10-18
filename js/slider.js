let root = document.documentElement;
const list = document.querySelector(".slider-list");
const rigthBtn = document.querySelector(".slider-right-btn");
const leftBtn = document.querySelector(".slider-left-btn");
const sidesList = document.querySelectorAll(".slider-item");

let backImg = 0;
let rotateDeg = 0;

let width = null;

if (window.screen.width < 1000) {
  width = window.screen.width - 50;
  list.style.top = "70px";
  rigthBtn.style.display = "none";
  leftBtn.style.display = "none";
} else if (window.screen.width < 1500) {
  width = window.screen.width / 1.5;
} else {
  width = window.screen.width / 3;
}

root.style.setProperty("--width", width + "px");

rigthBtn.addEventListener("click", { handleEvent: rotate, side: "r" });
leftBtn.addEventListener("click", rotate);

startImg(sidesList);

let touchstartX = 0;
let touchendX = 0;

function checkDirection() {
  if (touchendX < touchstartX) rotate("r");
  if (touchendX > touchstartX) rotate();
}

document.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});

function rotate(touchSide = "l") {
  if (this.side === "r" || touchSide === "r") {
    rotateDeg -= 90;
    backImg += 1;
  } else {
    rotateDeg += 90;
    backImg -= 1;
  }

  if (backImg < 0) backImg = sidesList.length - 1;
  if (backImg > sidesList.length - 1) backImg = 0;

  getImg(sidesList[backImg]);

  list.style.transform = `translateZ(${
    (width / 2) * -1
  }px) rotateY(${rotateDeg}deg)`;
}

function startImg(list) {
  list.forEach((item) => {
    getImg(item);
  });
}

function getImg(side) {
  fetch("https://aws.random.cat/meow")
    .then((response) => response.json())
    .then((data) => {
      side.style = `background-image: url("${data.file}")`;
    });
}
