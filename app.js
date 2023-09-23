// const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const IMG_PATH = "";
const SEARCH_API = "https://www.googleapis.com/books/v1/volumes?q=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getLibrary(API_URL);

async function getLibrary(url) {
  const res = await fetch(url);
  const data = await res.json();

  showLibrary(data.items.volumeInfo);
}

function showLibrary(Library) {
  main.innerHTML = "";

  Library.forEach((book) => {
    // const { title, authors,imageLinks.thumbnail , averageRating, description } = book
    const { title, authors, averageRating, description } = book;

    const bookEl = document.createElement("div");
    bookEl.classList.add("book");

    bookEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="book-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${averageRating}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${description}
        </div>
        `;
    main.appendChild(bookEl);
  });
}
//rating color
function getClassByRate(vote) {
  if (vote >= 4) {
    return "green";
  } else if (vote >= 2.5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getLibrary(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
