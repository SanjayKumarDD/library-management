const API_URL =
  "https://www.googleapis.com/books/v1/volumes?q=lord%20of%20the%20rings";
const SEARCH_API = 'https://www.googleapis.com/books/v1/volumes?q="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getLibrary(API_URL);

async function getLibrary(url) {
  const res = await fetch(url);
  const data = await res.json();
  showLibrary(data.items,data);
}

function countBooks(data){
  const { totalItems } = data;
  const count = document.createElement("p");
  count.innerHTML = `<p>About ${totalItems} results</p>`;
  main.appendChild(count);
}
function showLibrary(Library,data) {
  main.innerHTML = "";
  countBooks(data);
  Library.forEach((book) => {
    const { title, authors, averageRating, description } = book.volumeInfo;
    const { thumbnail } = book.volumeInfo.imageLinks;
    const bookEl = document.createElement("div");
    bookEl.classList.add("book");

    bookEl.innerHTML = `
           <img src = "${thumbnail}" alt="${title}"> 
           
           <div class="book-info">
           <h3>${title}</h3>
           <span class = "${getClassByRate(
             averageRating
           )}">${averageRating}</span>
           
          </div>
          <h3 class="author">By: ${authors}</h3>

          <div class="overview">
            <h3>Description</h3>
            ${description}
            </div>
          `;
    main.appendChild(bookEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 4) {
    return "green";
  } else if (vote >= 2) {
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
