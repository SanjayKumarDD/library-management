const API_URL = "https://www.googleapis.com/books/v1/volumes?q=harrypotter";
const SEARCH_API = 'https://www.googleapis.com/books/v1/volumes?q="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const but = document.querySelector("#but");
const cou = document.querySelector("#cou");
const home = document.querySelector("#home");

getLibrary(API_URL);

async function getLibrary(url) {
  const res = await fetch(url);
  const data = await res.json();
  countBooks(data);
  showLibrary(data.items, data);
}

home1.addEventListener("click", (e) => {
  e.preventDefault();
  main.innerHTML = "";
  const term = SEARCH_API + "fantasy";
  getLibrary(term);
});
home2.addEventListener("click", (e) => {
  e.preventDefault();
  main.innerHTML = "";
  const term = SEARCH_API + "classic";
  getLibrary(term);
});
home3.addEventListener("click", (e) => {
  e.preventDefault();
  main.innerHTML = "";
  const term = SEARCH_API + "science";
  getLibrary(term);
});
home4.addEventListener("click", (e) => {
  e.preventDefault();
  main.innerHTML = "";
  const term = SEARCH_API + "comics";
  getLibrary(term);
});

function countBooks(data) {
  // const { totalItems } = data;
  const totalItems = data.items.length;
  const count = document.createElement("p");
  cou.innerHTML = "";
  count.innerHTML = `<p>About ${totalItems} results</p>`;
  cou.appendChild(count);
}

let Lib, dat;
function showLibrary(Library, data) {
  //
  Lib = Library;
  dat = data;
  //

  // main.innerHTML = "";
  // countBooks(data);
  Library.forEach((book) => {
    const { title, authors, averageRating, description, pageCount } =
      book.volumeInfo;
    const { thumbnail } = book.volumeInfo.imageLinks;
    const bookEl = document.createElement("div");
    bookEl.classList.add("book");
    bookEl.innerHTML = `
            <h3 class="author"> ${title}</h3>

            <button>Add to Cart</button>
            <button>Buy now</button>

            <img src = "${thumbnail}" alt="${title}"> 
           <span class= book-info>Pages: ${pageCount}</span>
           <div class="book-info">
          
           <h3>By: ${authors}</h3>
           <span class = "${getClassByRate(
             averageRating
           )}">${averageRating}</span>
           
          </div>
          
          <div class="overview">
            <h3>Description</h3>
            ${description}
            </div>
          `;
    main.appendChild(bookEl);
  });
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    showLibrary(Lib, dat);
  }
});

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
    main.innerHTML = "";
    getLibrary(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
