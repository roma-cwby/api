import tmp from "./space-tmp.js";

const list = document.querySelector(".space-content-list");
const body = document.querySelector("body");
let show = null;

body.addEventListener("click", onClick);
list.addEventListener("click", onCard);

function onClick(e) {
  if (e.target.classList.contains("episodes")) {
    showSpinner();
    getContent("episode");
  } else if (e.target.classList.contains("characters")) {
    showSpinner();
    getContent("character");
  } else if (e.target.classList.contains("locations")) {
    showSpinner();
    getContent("location");
  } else if (e.target.classList.contains("quotes")) {
    showSpinner();
    getContent();
  } else if (e.target.classList.contains("trailer")) {
    list.innerHTML = tmp.trailer();
    document
      .querySelector(".space-modal-window")
      .addEventListener("click", closeModal);
  } else return;
  setTimeout(() => {
    document.querySelector(".spinner").remove();
    list.classList.remove("hidden");
  }, 2000);
}

function onCard(e) {
  if (e.target === e.currentTarget) return;

  getInfo(show, e.target.closest("li").id);
}

function getInfo(type, id) {
  if (!type)
    return fetch("https://finalspaceapi.com/api/v0/character/")
      .then((response) => response.json())
      .then((data) => {
        const info = data.filter((item) => item.name === id);
        body.insertAdjacentHTML("beforeend", tmp.card(info[0], type));
        document
          .querySelector(".space-modal-window")
          .addEventListener("click", closeModal);
      });

  fetch(`https://finalspaceapi.com/api/v0/${type}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      body.insertAdjacentHTML("beforeend", tmp.card(data, type));
      document
        .querySelector(".space-modal-window")
        .addEventListener("click", closeModal);
    });
}

function closeModal(e) {
  if (e.target === e.currentTarget)
    document.querySelector(".space-modal-window").remove();
}

function getContent(type = "quote") {
  fetch(`https://finalspaceapi.com/api/v0/${type}/`)
    .then((response) => response.json())
    .then((data) => {
      list.innerHTML = tmp.content(data, type);
      type === "quote" ? (show = null) : (show = type);
    });
}

function showSpinner() {
  list.classList.add("hidden");
  body.insertAdjacentHTML(
    "beforeend",
    `<div class="spinner">
      <img class="space-spinner" src="./img/mooncake.gif" alt="spinner" />
      <p>Loading...</p>
    </div>`
  );
}
