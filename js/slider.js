let root = document.documentElement;
const list = document.querySelector(".slider-list");
const rigthBtn = document.querySelector(".slider-right-btn");
const leftBtn = document.querySelector(".slider-left-btn");
const sidesList = document.querySelectorAll(".slider-item");

let backImg = 0;
let rotateDeg = 0;

const width = window.screen.width / 4;
root.style.setProperty("--width", width + "px");

rigthBtn.addEventListener("click", { handleEvent: rotate, side: "r" });
leftBtn.addEventListener("click", rotate);

startImg(sidesList);

function rotate() {
  if (this.side === "r") {
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
