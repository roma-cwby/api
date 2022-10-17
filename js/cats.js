const BASE_URL = "https://catfact.ninja/";
const IMG_URL = "https://api.unsplash.com/";

const list = document.querySelector(".cat-list");
const factBtn = document.querySelector(".fact");
const factsBtn = document.querySelector(".facts");
const imgBtn = document.querySelector(".image");

const body = document.querySelector("body");
const img = document.querySelector(".cat");
const guard = document.querySelector(".guard");
let page = 1;

const options = {
  root: null,
  rootMargin: "30px",
};

const observer = new IntersectionObserver(onScroll, options);

getImg();

imgBtn.addEventListener("click", getImg);

factBtn.addEventListener("click", () => {
  factsBtn.disabled = false;
  observer.unobserve(guard);
  getData().then((res) => {
    addMarkup(res.fact);
  });
});
factsBtn.addEventListener("click", () => {
  factsBtn.disabled = true;
  getData(true).then((res) => {
    addMarkup(res.data);
    observer.observe(guard);
  });
});

function addMarkup(data) {
  if (typeof data === "string") {
    return (list.innerHTML = `<li>${data}</li>`);
  }

  const mkp = data.reduce((acc, item) => acc + `<li>${item.fact}</li>`, "");
  list.insertAdjacentHTML("beforeend", mkp);
}

function getData(isList = false) {
  if (!isList) {
    page = 1;
    return fetch(`${BASE_URL}fact`).then((responce) => responce.json());
  }

  page += 1;
  return fetch(`${BASE_URL}facts?page=${page}`).then((responce) =>
    responce.json()
  );
}

function getImg() {
  fetch("https://aws.random.cat/meow")
    .then((response) => response.json())
    .then((data) => {
      body.style = `background-image: url("${data.file}")`;
      //   img.src = data.file;
      //   img.style = "";
    });
}

function onScroll(entries) {
  if (entries[0].isIntersecting) {
    getData(true).then((res) => {
      addMarkup(res.data);
    });
  }
}
