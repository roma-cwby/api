import tmp from "./space-tmp.js";

const list = document.querySelector(".space-content-list");
const body = document.querySelector("body");
let show = null;
let modalId = null;

body.addEventListener("click", onClick);
list.addEventListener("click", onCard);

function onClick(e) {
  if (e.target.classList.contains("episodes")) getContent("e");
  else if (e.target.classList.contains("characters")) getContent("c");
  else if (e.target.classList.contains("locations")) getContent("l");
  else if (e.target.classList.contains("quotes")) getContent();
  else return;
}

function onCard(e) {
  if (e.target === e.currentTarget) return;

  getInfo(show, e.target.closest("li").id);
}

function getInfo(type, id) {
  if (type === "e")
    fetch(`https://finalspaceapi.com/api/v0/episode/${id}`)
      .then((response) => response.json())
      .then((data) => {
        body.insertAdjacentHTML("beforeend", tmp.card(data, type));
        modalId = document
          .querySelector(".space-modal-window")
          .addEventListener("click", closeModal);
      });
  else if (type === "c")
    fetch(`https://finalspaceapi.com/api/v0/character/${id}`)
      .then((response) => response.json())
      .then((data) => {
        body.insertAdjacentHTML("beforeend", tmp.card(data, type));
        modalId = document
          .querySelector(".space-modal-window")
          .addEventListener("click", closeModal);
      });
  else if (type === "l")
    fetch(`https://finalspaceapi.com/api/v0/location/${id}`)
      .then((response) => response.json())
      .then((data) => {
        body.insertAdjacentHTML("beforeend", tmp.card(data, type));
        modalId = document
          .querySelector(".space-modal-window")
          .addEventListener("click", closeModal);
      });
  else
    fetch("https://finalspaceapi.com/api/v0/character/")
      .then((response) => response.json())
      .then((data) => {
        const info = data.filter((item) => item.name === id);
        body.insertAdjacentHTML("beforeend", tmp.card(info[0], type));
        modalId = document
          .querySelector(".space-modal-window")
          .addEventListener("click", closeModal);
      });
}

function closeModal(e) {
  if (e.target === e.currentTarget) {
    document.querySelector(".space-modal-window").remove();
  }
}

function getContent(type) {
  if (type === "e")
    fetch("https://finalspaceapi.com/api/v0/episode/")
      .then((response) => response.json())
      .then((data) => {
        list.innerHTML = tmp.content(data, type);
        show = type;
      });
  else if (type === "c")
    fetch("https://finalspaceapi.com/api/v0/character/")
      .then((response) => response.json())
      .then((data) => {
        list.innerHTML = tmp.content(data, type);
        show = type;
      });
  else if (type === "l")
    fetch("https://finalspaceapi.com/api/v0/location/")
      .then((response) => response.json())
      .then((data) => {
        list.innerHTML = tmp.content(data, type);
        show = type;
      });
  else
    fetch("https://finalspaceapi.com/api/v0/quote/")
      .then((response) => response.json())
      .then((data) => {
        list.innerHTML = tmp.content(data, type);
        show = type;
      });
}
