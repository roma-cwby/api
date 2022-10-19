export default { content, card };

function content(arr, type) {
  if (type === "e")
    return arr.reduce(
      (acc, item) =>
        acc +
        `<li class="space-content-item" id="${item.id}">
      <img src="${item.img_url}" alt="Episode ${item.id}" width="400" />
      <h2>${item.name}</h2>
      <p>Director: ${item.director}</p>
    </li>`,
      ""
    );
  else if (type === "c")
    return arr.reduce(
      (acc, item) =>
        acc +
        `<li class="space-content-item" id="${item.id}">
  <img src="${item.img_url}" alt="Character ${item.id}" width="400" />
  <h2>${item.name}</h2>
  <p>Specie: ${item.species}</p>
  <p>Planet: ${item.origin}</p>
</li>`,
      ""
    );
  else if (type === "l")
    return arr.reduce(
      (acc, item) =>
        acc +
        `<li class="space-content-item" id="${item.id}">
      <img src="${item.img_url}" alt="Location ${item.id}" width="400" />
      <h2>${item.name}</h2>
      <p>Type: ${item.type}</p>
    </li>`,
      ""
    );
  else
    return arr.reduce(
      (acc, item) =>
        acc +
        `<li class="space-content-item" id="${item.by}">
      <img src="${item.image}" alt="Quote ${item.id}" width="400" />
      <h2>${item.by}</h2>
      <p class="space-quote">Quote: ${item.quote}</p>
    </li>`,
      ""
    );
}

function card(arr, type) {
  if (type === "e")
    return `<div class="space-modal-window">
      <div class="space-modal">
        <img src="${arr.img_url}" alt="Episode ${arr.name}" style="border-radius: 20px"/>
        <h1>${arr.name}</h1>
        <p>Director: ${arr.director}</p>
        <p>Writer: ${arr.writer}</p>
        <p>Date: ${arr.air_date}</p>
      </div>
    </div>`;
  else if (type === "c") {
    return `<div class="space-modal-window">
      <div class="space-modal">
        <img
          src="${arr.img_url}"
          alt="Episode ${arr.name}"
          style="border-radius: 20px"
        />
        <h1>${arr.name}</h1>
        <p>Species: ${arr.species}</p>
        <p>Gender: ${arr.gender}</p>
        <p>Hair: ${arr.hair}</p>
        <p>Origin: ${arr.origin}</p>
        <p>Atributes: ${arr.abilities.join(", ")}</p>
      </div>
    </div>`;
  } else if (type === "l") {
    return `<div class="space-modal-window">
      <div class="space-modal">
        <img
          src="${arr.img_url}"
          alt="Episode ${arr.name}"
          style="border-radius: 20px"
        />
        <h1>${arr.name}</h1>
        <p>Type: ${arr.type}</p>
        <p>Inhabitants: ${arr.inhabitants.join(", ")}</p>
      </div>
    </div>`;
  } else {
    return `<div class="space-modal-window">
      <div class="space-modal">
        <img
          src="${arr.img_url}"
          alt="Episode ${arr.name}"
          style="border-radius: 20px"
        />
        <h1>${arr.name}</h1>
        <p>Species: ${arr.species}</p>
        <p>Gender: ${arr.gender}</p>
        <p>Hair: ${arr.hair}</p>
        <p>Origin: ${arr.origin}</p>
        <p>Atributes: ${arr.abilities.join(", ")}</p>
      </div>
    </div>`;
  }
}
