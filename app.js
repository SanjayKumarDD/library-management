const API_URL =
  "https://www.googleapis.com/books/v1/volumes?q=lord%20of%20the%20rings";
const SEARCH_API =
  'https://www.googleapis.com/books/v1/volumes?q="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getLibrary(API_URL);

async function getLibrary(url) {
  const res = await fetch(url);
  const data = await res.json();

  showLibrary(data.items);
}

function showLibrary(Library) {
  main.innerHTML = "";

  Library.forEach((book) => {
    const { title,authors,averageRating,description } = book.volumeInfo;

    const bookEl = document.createElement("div");
    bookEl.classList.add("book");

    bookEl.innerHTML = `
            
            <div class="book-info">
          <h3>${title}</h3>
          <div>${description}</div>
            </div>
          `
    main.appendChild(bookEl);
  });
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
